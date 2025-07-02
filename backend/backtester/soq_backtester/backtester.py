#!/usr/bin/env python
# coding: utf-8

# In[ ]:


import pandas as pd
import numpy as np
import vectorbt as vbt
import tqdm
from tabulate import tabulate
import script as script
import importlib
import os

importlib.reload(script)

from script import Strategy 

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
        stats_eq = portfolio.stats()
        stats_df = stats_eq.to_frame(name='Value').reset_index()
        stats_df.columns = ['Metric', 'Value']
        
        portfolio.assets().to_csv('assets.csv')
        portfolio.orders.records_readable.to_csv('log.csv')
        
        df = pd.concat([portfolio.value(),portfolio.asset_value(),portfolio.cash()], axis=1)
        df.columns = ['portfolio', 'investment', 'cash']
        df.to_csv('portfolio.csv')

        print(tabulate(
            stats_df,
            headers='keys',
            tablefmt='psql',
            showindex=False,
            floatfmt=".3f"
        ))
        
        return portfolio
    

    def export_results(self, portfolio, save_path="frontend_data"):
        os.makedirs(save_path, exist_ok=True)

    # Compute key metrics
        equity = portfolio.value()
        returns = equity.pct_change().fillna(0)
        cum_max = equity.cummax()
        drawdown = (equity - cum_max) / cum_max

    # Save individual files
        equity.to_csv(f"{save_path}/equity_curve.csv", header=["equity"])
        drawdown.to_csv(f"{save_path}/drawdown.csv", header=["drawdown"])
        returns.to_csv(f"{save_path}/returns.csv", header=["returns"])

    # Save combined
        summary_df = pd.DataFrame({
            'date': equity.index,
            'equity': equity.values,
            'returns': returns.values,
            'drawdown': drawdown.values
    })
        summary_df.to_csv(f"{save_path}/portfolio_summary.csv", index=False)

        print(f"📁 Results exported to `{save_path}/`.")
        return summary_df


data = pd.read_csv(
    'data/multi_level_ohlcv.csv',
    index_col=0, header=[0,1], parse_dates=True
)[4500:]

tickers = data.columns.get_level_values(0).unique()[100:200]
data = data.loc[:, data.columns.get_level_values(0).isin(tickers)]

initial_value = 200000.0
backtester = Backtester(data, initial_value)
backtester.run()
backtester.all_signals.to_csv('signals.csv')
print(backtester.portfolio_value)
pf = backtester.vectorbt_run()
backtester.export_results(pf, save_path="curve-backtest-forge/backend/data/frontend_data")


# In[20]:


import plotly.graph_objects as go

stats_eq = pf.stats()
eq_curve = pf.value()

fig = go.Figure()
fig.add_trace(go.Scatter(
    x=eq_curve.index,
    y=eq_curve.values,
    mode='lines',
    name='Equity Curve',
    line=dict(color='green', width=3)
))
fig.update_layout(
    title='Portfolio Equity Curve',
    xaxis_title='Date',
    yaxis_title='Portfolio Value',
    template='plotly_white'
)
fig.show()


# In[87]:


from plotly.subplots import make_subplots
import plotly.graph_objects as go

returns = eq_curve.pct_change().fillna(0)
cum_max = eq_curve.cummax()
drawdown = (eq_curve - cum_max) / cum_max
mean_ret = returns.mean()
median_ret = returns.median()

fig = make_subplots(rows=1, cols=2, subplot_titles=('Daily Returns', 'Drawdown Curve'))
fig.add_trace(
    go.Histogram(
        x=returns,
        nbinsx=50,
        marker_color='orange',
        marker_line_color='white',
        marker_line_width=1,
        opacity=0.8,
        name='Returns'
    ),
    row=1, col=1
)

fig.add_trace(
    go.Scatter(
        x=drawdown.index,
        y=drawdown.values,
        mode='lines',
        line=dict(color='red', width=2),
        name='Drawdown'
    ),
    row=1, col=2
)

fig.update_xaxes(
    title_text='Return',
    row=1, col=1,
    nticks=20,
    showgrid=True
)
fig.update_yaxes(
    title_text='Frequency',
    row=1, col=1,
    showgrid=True
)

fig.update_xaxes(
    title_text='Date',
    row=1, col=2,
    showgrid=False
)
fig.update_yaxes(
    title_text='Drawdown',
    row=1, col=2,
    showgrid=True
)

fig.update_layout(
    title_text='Returns Distribution & Drawdown',
    bargap=0.1,               
    template='plotly_white',
    showlegend=False,
    width=900,
    height=400
)

fig.show()


# In[88]:


# Cell 7 — Candlestick + Trades + Holding Visualization (Plotly, box-zoom only, legend top-left)
import pandas as pd
import plotly.graph_objects as go
import plotly.io as pio

pio.renderers.default = 'notebook_connected'

TICKER = "360ONE"

if TICKER in backtester.data.columns.get_level_values(0):
    ohlcv = backtester.data[TICKER][["open", "high", "low", "close"]].copy()
    pos = backtester.all_positions[TICKER].reindex(ohlcv.index).ffill().fillna(0)
    # continue with the rest of the plotting logic
else:
    print(f"Ticker {TICKER} not found. Skipping candlestick plot.")

# 2) Remove weekends
mask = ohlcv.index.weekday < 5
ohlcv = ohlcv.loc[mask]
pos   = pos.loc[mask]

# 3) Build df, compute trades & holdings
df = ohlcv.assign(pos=pos)
df["dpos"]    = df["pos"].diff().fillna(df["pos"])
buys          = df.index[df["dpos"] >  0]
sells         = df.index[df["dpos"] <  0]
df["holding"] = df["pos"] != 0
df["grp"]     = (df["holding"] != df["holding"].shift(fill_value=False)).cumsum()

blocks = []
for _, sub in df.groupby("grp"):
    if sub["holding"].iat[0]:
        clr = "rgba(0,200,0,0.2)" if sub["pos"].mean() > 0 else "rgba(200,0,0,0.2)"
        blocks.append((sub.index[0], sub.index[-1], clr))

# 4) Build figure
fig = go.Figure()

# Candlestick trace
fig.add_trace(go.Candlestick(
    x=df.index,
    open=df["open"], high=df["high"],
    low=df["low"],   close=df["close"],
    name=TICKER
))

# Shaded holding periods
for start, end, color in blocks:
    fig.add_vrect(x0=start, x1=end, fillcolor=color, line_width=0)

# Buy markers
fig.add_trace(go.Scatter(
    x=buys, y=df.loc[buys,"low"]*0.99,
    mode="markers",
    marker=dict(symbol="triangle-up", color="green", size=10),
    name="Buy"
))

# Sell markers
fig.add_trace(go.Scatter(
    x=sells, y=df.loc[sells,"high"]*1.01,
    mode="markers",
    marker=dict(symbol="triangle-down", color="red", size=10),
    name="Sell"
))

# 5) Layout with box-zoom only and legend in top-left
fig.update_layout(
    title=f"{TICKER} Candlestick Chart with Trades & Holdings",
    dragmode="zoom",            # box zoom
    hovermode="x unified",
    xaxis=dict(
        title="Date",
        type="date",
        fixedrange=False,
        rangebreaks=[dict(bounds=["sat", "sun"])]
    ),
    yaxis=dict(
        title="Price",
        tickformat=",.2f",
        fixedrange=False
    ),
    template="plotly_white",
    legend=dict(
        orientation="h",
        x=0,      # left
        y=1,      # top
        xanchor="left",
        yanchor="top"
    )
)

# 6) Show with mode bar restricted to box zoom + reset only
fig.show(config={
    "scrollZoom": False,
    "modeBarButtonsToRemove": [
        "pan2d", "select2d", "lasso2d", 
        "zoomIn2d", "zoomOut2d", "autoScale2d"
    ]
})

