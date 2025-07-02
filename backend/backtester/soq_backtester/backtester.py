import pandas as pd
import numpy as np
import vectorbt as vbt
import tqdm
from tabulate import tabulate
import script as script
import importlib
import os
import json

importlib.reload(script)

from script import Strategy 
import plotly.io as pio
from plotly.subplots import make_subplots
import plotly.graph_objects as go
import datetime

class Backtester:
    def __init__(self, data: pd.DataFrame, initial_value: float):
        self.data = data
        self.portfolio_value = initial_value
        self.cash = initial_value
        self.investment = 0.0
        self.current_index = 1
        tickers = data.columns.get_level_values(0).unique()
        self.positions = pd.Series(0, index=tickers)
        self.all_positions = pd.DataFrame(columns=tickers)
        self.tradingState = {}
        self.dates = []
        self.portfolio_history = []
        self.cash_history = []
        self.investment_history = []
        self.all_signals = pd.DataFrame(columns=tickers)

    def calculate_positions(self, signal: pd.Series, value, open=True) -> pd.Series:
        if (signal < 0).any():
            raise ValueError(f'For timestamp {self.data.index[self.current_index]}, signal contains negative values: {signal[signal < 0]}')
        if not isinstance(signal, pd.Series):
            raise TypeError(f'For timestamp {self.data.index[self.current_index]}, signal must be a pandas Series, got {type(signal)}')
        if abs(signal).sum() - 1 > 1e-6:
            raise ValueError(f'For timestamp {self.data.index[self.current_index]} the sum of the abs(signals) must not be greater than 1, got {abs(signal).sum()}')

        prices = (
            self.data.xs('open', level=1, axis=1).iloc[self.current_index]
            if open
            else self.data.xs('close', level=1, axis=1).iloc[self.current_index]
        )
        prices = prices.reindex(signal.index)
        
        nan_index = signal.isna()
        value -= (self.positions[nan_index]*prices[nan_index]).sum()

        float_shares = (signal.replace(0,np.nan) * value) / prices.replace(0, np.nan)

        float_shares = (
            float_shares
            .replace([np.inf, -np.inf], 0)
            .fillna(0)
        )

        new_positions = pd.Series(0, index=float_shares.index, dtype=int)
        longs  = float_shares > 0
        shorts = float_shares < 0

        new_positions[longs]  = np.floor(float_shares[longs]).astype(int)
        new_positions[shorts] = np.ceil (float_shares[shorts]).astype(int)
        
        new_positions[nan_index] = self.positions[nan_index]

        return new_positions

    def calculate_cash(self, positions: pd.Series, open=True) -> float:
        index = self.current_index
        price = self.data.xs('open',level=1,axis=1).iloc[index] if open else self.data.xs('close',level=1,axis=1).iloc[index]
        return self.portfolio_value - (abs(positions) * price).sum()

    def update_investment(self, positions: pd.Series, new_day=False) -> float:
        index = self.current_index
        price1 = self.data.xs('close',level=1,axis=1).iloc[index-1] if new_day else self.data.xs('open',level=1,axis=1).iloc[index]
        price2 = self.data.xs('open',level=1,axis=1).iloc[index] if new_day else self.data.xs('close',level=1,axis=1).iloc[index]
        return (positions * (price2 - price1)).sum() + self.investment

    def run(self):
        processed_data = Strategy().process_data(self.data)
        self.all_positions.loc[self.data.index[0]] = self.positions
        traderData = 1
        for i in tqdm.tqdm(range(1, len(self.data))):
            self.tradingState = {
                'processed_data': processed_data[:i],
                'investment': self.investment,
                'cash': self.cash,
                'current_timestamp': self.data.index[self.current_index],
                'traderData': traderData,
                'positions': self.positions,
            }
            signal, traderData = Strategy().get_signals(self.tradingState)
            if signal is None:
                raise ValueError(f'For timestamp {self.data.index[self.current_index]}, signal is None')
            self.investment = self.update_investment(self.positions, new_day=True)
            self.portfolio_value = self.investment + self.cash
            self.positions = self.calculate_positions(signal, self.portfolio_value)
            self.cash = self.calculate_cash(self.positions)
            self.investment = self.portfolio_value - self.cash
            self.investment = self.update_investment(self.positions, new_day=False)
            self.portfolio_value = self.investment + self.cash
            self.all_positions.loc[self.data.index[i]] = self.positions
            self.all_signals.loc[self.data.index[i-1]] = signal
            self.current_index += 1

    def vectorbt_run(self):
        open_prices = self.data.xs('open', level=1, axis=1).loc[self.all_positions.index, self.all_positions.columns]
        close_prices = self.data.xs('close', level=1, axis=1).loc[self.all_positions.index, self.all_positions.columns]
        
        order_size = self.all_positions.diff().fillna(0).astype(int)
        order_size = order_size.mask(order_size == 0)
        
        portfolio = vbt.Portfolio.from_orders(
            close=close_prices,
            size=order_size,
            price=open_prices,
            init_cash=initial_value,
            freq='1D',
            cash_sharing=True,
            ffill_val_price=True,
            call_seq='auto',
            log=True,  
        )
        return portfolio
    
    def export_results(self, portfolio, save_path="frontend_data"):
        os.makedirs(save_path, exist_ok=True)
        charts_dir = os.path.join(save_path, "charts")
        plots_dir = os.path.join(save_path, "plots")
        os.makedirs(charts_dir, exist_ok=True)
        os.makedirs(plots_dir, exist_ok=True)

        # 1. Portfolio summary data
        equity = portfolio.value()
        returns = equity.pct_change().fillna(0)
        cum_max = equity.cummax()
        drawdown = (equity - cum_max) / cum_max

        portfolio_summary = pd.DataFrame({
            'date': equity.index,
            'equity': equity.values,
            'returns': returns.values,
            'drawdown': drawdown.values
        })
        portfolio_summary.to_csv(os.path.join(save_path, "portfolio_summary.csv"), index=False)
        
        # Save as JSON for frontend
        portfolio_json = portfolio_summary.to_dict(orient='records')
        with open(os.path.join(save_path, "portfolio_summary.json"), 'w') as f:
            json.dump(portfolio_json, f, default=str)  # default=str handles datetime conversion

        # 2. Export portfolio value breakdown
        df = pd.concat([portfolio.value(), portfolio.asset_value(), portfolio.cash()], axis=1)
        df.columns = ['portfolio', 'investment', 'cash']
        df.to_csv(os.path.join(save_path, "portfolio.csv"))
        
        # 3. Save signals
        self.all_signals.to_csv(os.path.join(save_path, "signals.csv"))
        
        # 4. Generate candlestick data for each ticker
        tickers = self.data.columns.get_level_values(0).unique()
        for ticker in tqdm.tqdm(tickers, desc="Exporting ticker charts"):
            ticker_data = self.get_candlestick_data(ticker)
            with open(os.path.join(charts_dir, f"{ticker}.json"), 'w') as f:
                json.dump(ticker_data, f, default=str)

        print(f"📁 Results exported to `{save_path}/`.")
        return portfolio_summary

    def get_candlestick_data(self, ticker: str) -> dict:
        ohlcv = self.data[ticker][["open", "high", "low", "close"]].copy()
        ohlcv.index = pd.to_datetime(ohlcv.index)
        pos = self.all_positions[ticker].reindex(ohlcv.index).ffill().fillna(0)
        
        # Remove weekends
        mask = ohlcv.index.weekday < 5
        ohlcv = ohlcv.loc[mask]
        pos = pos.loc[mask]
        
        # Create dataframe with all data
        df = ohlcv.assign(position=pos)
        df["action"] = "hold"
        df["dpos"] = df["position"].diff().fillna(df["position"])
        
        # Identify buy/sell actions
        df.loc[df["dpos"] > 0, "action"] = "buy"
        df.loc[df["dpos"] < 0, "action"] = "sell"
        
        # Identify holding periods
        df["holding"] = df["position"] != 0
        df["grp"] = (df["holding"] != df["holding"].shift(fill_value=False)).cumsum()
        
        holdings = []
        for _, sub in df.groupby("grp"):
            if sub["holding"].iat[0]:
                holdings.append({
                    "start": sub.index[0].strftime("%Y-%m-%d"),
                    "end": sub.index[-1].strftime("%Y-%m-%d"),
                    "position": sub["position"].mean()
                })
        
        # Convert to frontend-friendly format
        data = []
        for date, row in df.iterrows():
            data.append({
                "date": date.strftime("%Y-%m-%d"),
                "open": row["open"],
                "high": row["high"],
                "low": row["low"],
                "close": row["close"],
                "position": row["position"],
                "action": row["action"]
            })
        
        return {
            "ticker": ticker,
            "data": data,
            "holdings": holdings
        }


# ... (keep all imports and class definition the same) ...

if __name__ == "__main__":
    # Get the directory of the current script
    script_dir = os.path.dirname(os.path.abspath(__file__))
    
    # Construct the path to the data file
    data_path = os.path.join(script_dir, 'data', 'multi_level_ohlcv.csv')
    
    # Verify the file exists
    if not os.path.exists(data_path):
        raise FileNotFoundError(f"Data file not found at: {data_path}")
    
    # Load the data
    data = pd.read_csv(
        data_path,
        index_col=0, header=[0,1], parse_dates=True
    )[4500:]

    tickers = data.columns.get_level_values(0).unique()[100:200]
    data = data.loc[:, data.columns.get_level_values(0).isin(tickers)]

    initial_value = 200000.0
    backtester = Backtester(data, initial_value)
    backtester.run()
    pf = backtester.vectorbt_run()
    
    # FIX: Change save path to be outside the backtester directory
    save_path = os.path.join(script_dir, "..", "..", "data", "frontend_data")
    os.makedirs(save_path, exist_ok=True)
    backtester.export_results(pf, save_path=save_path)