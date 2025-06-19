
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter
} from 'recharts';
import { 
  TrendingUp, 
  DollarSign, 
  Target, 
  Activity, 
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Calendar,
  BarChart3
} from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const Platform = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('1Y');
  const [selectedStocks, setSelectedStocks] = useState(['AAPL', 'MSFT', 'GOOGL']);

  // Enhanced data with more comprehensive metrics
  const equityData = [
    { date: 'Jan', value: 100000, benchmark: 100000, drawdown: 0 },
    { date: 'Feb', value: 105000, benchmark: 102000, drawdown: 0 },
    { date: 'Mar', value: 112000, benchmark: 104000, drawdown: 0 },
    { date: 'Apr', value: 108000, benchmark: 103000, drawdown: -3.6 },
    { date: 'May', value: 121000, benchmark: 108000, drawdown: 0 },
    { date: 'Jun', value: 119000, benchmark: 109000, drawdown: -1.7 },
    { date: 'Jul', value: 128000, benchmark: 111000, drawdown: 0 },
    { date: 'Aug', value: 124000, benchmark: 110000, drawdown: -3.1 },
    { date: 'Sep', value: 132000, benchmark: 113000, drawdown: 0 },
    { date: 'Oct', value: 129000, benchmark: 112000, drawdown: -2.3 },
    { date: 'Nov', value: 138000, benchmark: 115000, drawdown: 0 },
    { date: 'Dec', value: 142000, benchmark: 118000, drawdown: 0 },
  ];

  const returnsHistogram = [
    { return: '-5%', frequency: 2 },
    { return: '-4%', frequency: 3 },
    { return: '-3%', frequency: 8 },
    { return: '-2%', frequency: 15 },
    { return: '-1%', frequency: 25 },
    { return: '0%', frequency: 35 },
    { return: '1%', frequency: 28 },
    { return: '2%', frequency: 18 },
    { return: '3%', frequency: 12 },
    { return: '4%', frequency: 6 },
    { return: '5%', frequency: 3 },
  ];

  const stockData = {
    AAPL: [
      { date: 'Jan', value: 10000, position: null },
      { date: 'Feb', value: 10500, position: 'buy' },
      { date: 'Mar', value: 11200, position: null },
      { date: 'Apr', value: 10800, position: null },
      { date: 'May', value: 12100, position: 'sell' },
      { date: 'Jun', value: 11900, position: null },
      { date: 'Jul', value: 12800, position: 'buy' },
      { date: 'Aug', value: 12400, position: null },
      { date: 'Sep', value: 13200, position: null },
      { date: 'Oct', value: 12900, position: 'sell' },
      { date: 'Nov', value: 13800, position: null },
      { date: 'Dec', value: 14200, position: null },
    ],
    MSFT: [
      { date: 'Jan', value: 8000, position: null },
      { date: 'Feb', value: 8200, position: 'buy' },
      { date: 'Mar', value: 8800, position: null },
      { date: 'Apr', value: 8500, position: null },
      { date: 'May', value: 9200, position: null },
      { date: 'Jun', value: 9100, position: 'sell' },
      { date: 'Jul', value: 9600, position: 'buy' },
      { date: 'Aug', value: 9300, position: null },
      { date: 'Sep', value: 9800, position: null },
      { date: 'Oct', value: 9600, position: null },
      { date: 'Nov', value: 10200, position: 'sell' },
      { date: 'Dec', value: 10500, position: null },
    ],
    GOOGL: [
      { date: 'Jan', value: 12000, position: null },
      { date: 'Feb', value: 11800, position: null },
      { date: 'Mar', value: 12300, position: 'buy' },
      { date: 'Apr', value: 11900, position: null },
      { date: 'May', value: 12600, position: null },
      { date: 'Jun', value: 12400, position: 'sell' },
      { date: 'Jul', value: 13100, position: 'buy' },
      { date: 'Aug', value: 12800, position: null },
      { date: 'Sep', value: 13400, position: null },
      { date: 'Oct', value: 13200, position: null },
      { date: 'Nov', value: 13900, position: 'sell' },
      { date: 'Dec', value: 14300, position: null },
    ],
  };

  const monthlyPnL = [
    { year: 2023, Jan: 2.5, Feb: -0.8, Mar: 4.2, Apr: -1.5, May: 3.8, Jun: -0.3, Jul: 5.1, Aug: -2.1, Sep: 3.6, Oct: -1.2, Nov: 4.5, Dec: 2.8 },
    { year: 2024, Jan: 3.2, Feb: 1.8, Mar: -2.3, Apr: 4.6, May: -0.9, Jun: 2.1, Jul: 3.7, Aug: -1.6, Sep: 5.2, Oct: -0.7, Nov: 3.9, Dec: 2.4 },
  ];

  const performanceMetrics = [
    { metric: 'Max Profit', value: '₹15,420', description: 'Largest single trade gain' },
    { metric: 'Max Loss', value: '₹-8,340', description: 'Largest single trade loss' },
    { metric: 'Average Return', value: '2.3%', description: 'Average return per trade' },
    { metric: 'Sharpe Ratio', value: '2.14', description: 'Risk-adjusted return measure' },
    { metric: 'Sortino Ratio', value: '2.67', description: 'Downside deviation measure' },
    { metric: 'CAGR', value: '18.5%', description: 'Compound Annual Growth Rate' },
    { metric: 'Win Rate', value: '68.2%', description: 'Percentage of profitable trades' },
    { metric: 'Max Drawdown', value: '-8.4%', description: 'Largest peak-to-trough decline' },
    { metric: 'Volatility', value: '12.3%', description: 'Standard deviation of returns' },
    { metric: 'Alpha', value: '0.045', description: 'Excess return vs benchmark' },
    { metric: 'Beta', value: '0.87', description: 'Correlation with market' },
    { metric: 'Total Trades', value: '247', description: 'Number of completed trades' },
  ];

  const timeframes = ['1M', '3M', '6M', '1Y', 'ALL'];
  const availableStocks = ['AAPL', 'MSFT', 'GOOGL', 'TSLA', 'NVDA', 'META', 'AMZN', 'NFLX'];

  const getPositionColor = (position: string | null) => {
    if (position === 'buy') return '#10b981';
    if (position === 'sell') return '#ef4444';
    return 'transparent';
  };

  const getPnLCellColor = (value: number) => {
    if (value > 3) return 'bg-green-600/30 text-green-300';
    if (value > 1) return 'bg-green-500/20 text-green-400';
    if (value > 0) return 'bg-green-400/10 text-green-500';
    if (value > -1) return 'bg-red-400/10 text-red-500';
    if (value > -2) return 'bg-red-500/20 text-red-400';
    return 'bg-red-600/30 text-red-300';
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-gray-900 to-black border-b border-emerald-900/20 pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
                Backtest Strategy Analysis
              </h1>
              <p className="text-gray-300 mt-2">
                Comprehensive backtesting results and performance metrics
              </p>
            </div>
            
            <div className="flex space-x-2">
              {timeframes.map((timeframe) => (
                <Button
                  key={timeframe}
                  variant={selectedTimeframe === timeframe ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTimeframe(timeframe)}
                  className={selectedTimeframe === timeframe 
                    ? "bg-emerald-600 hover:bg-emerald-700" 
                    : "border-emerald-700 text-emerald-400 hover:bg-emerald-900/30"
                  }
                >
                  {timeframe}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 bg-gray-800/50 border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Return</p>
                <p className="text-2xl font-bold text-emerald-400">+42.3%</p>
                <p className="text-sm text-emerald-400 flex items-center">
                  <ArrowUpRight size={16} className="mr-1" />
                  +5.2% this month
                </p>
              </div>
              <TrendingUp className="text-emerald-400" size={32} />
            </div>
          </Card>
          
          <Card className="p-6 bg-gray-800/50 border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Portfolio Value</p>
                <p className="text-2xl font-bold text-white">₹1,42,470</p>
                <p className="text-sm text-green-400 flex items-center">
                  <ArrowUpRight size={16} className="mr-1" />
                  +₹42,470
                </p>
              </div>
              <DollarSign className="text-green-400" size={32} />
            </div>
          </Card>
          
          <Card className="p-6 bg-gray-800/50 border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Sharpe Ratio</p>
                <p className="text-2xl font-bold text-blue-400">2.14</p>
                <p className="text-sm text-blue-400 flex items-center">
                  <ArrowUpRight size={16} className="mr-1" />
                  Excellent
                </p>
              </div>
              <Target className="text-blue-400" size={32} />
            </div>
          </Card>
          
          <Card className="p-6 bg-gray-800/50 border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Max Drawdown</p>
                <p className="text-2xl font-bold text-red-400">-8.4%</p>
                <p className="text-sm text-red-400 flex items-center">
                  <ArrowDownRight size={16} className="mr-1" />
                  Within limits
                </p>
              </div>
              <Activity className="text-red-400" size={32} />
            </div>
          </Card>
        </div>

        {/* Equity Curve and Drawdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="p-6 bg-gray-800/50 border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-6">Equity Curve</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={equityData}>
                <defs>
                  <linearGradient id="equityGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px'
                  }} 
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#10b981"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#equityGradient)"
                  name="Portfolio Value"
                />
                <Line
                  type="monotone"
                  dataKey="benchmark"
                  stroke="#6b7280"
                  strokeWidth={1}
                  strokeDasharray="5 5"
                  name="Benchmark"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6 bg-gray-800/50 border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-6">Drawdown Curve</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={equityData}>
                <defs>
                  <linearGradient id="drawdownGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px'
                  }} 
                />
                <Area
                  type="monotone"
                  dataKey="drawdown"
                  stroke="#ef4444"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#drawdownGradient)"
                  name="Drawdown %"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Returns Histogram */}
        <Card className="p-6 bg-gray-800/50 border-gray-700 mb-8">
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
            <BarChart3 className="mr-2" />
            Histogram of Returns
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={returnsHistogram}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="return" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1f2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px'
                }} 
              />
              <Bar dataKey="frequency" fill="#3b82f6" name="Frequency" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Stock Selection and Individual Curves */}
        <Card className="p-6 bg-gray-800/50 border-gray-700 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h3 className="text-xl font-semibold text-white">Individual Stock Performance</h3>
            <div className="flex flex-wrap gap-2">
              {availableStocks.map((stock) => (
                <div key={stock} className="flex items-center space-x-2">
                  <Checkbox
                    id={stock}
                    checked={selectedStocks.includes(stock)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedStocks([...selectedStocks, stock]);
                      } else {
                        setSelectedStocks(selectedStocks.filter(s => s !== stock));
                      }
                    }}
                  />
                  <label htmlFor={stock} className="text-sm text-gray-300">{stock}</label>
                </div>
              ))}
            </div>
          </div>
          
          <ResponsiveContainer width="100%" height={400}>
            <LineChart>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="date" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1f2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px'
                }} 
              />
              {selectedStocks.map((stock, index) => {
                const colors = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444', '#06b6d4', '#84cc16', '#f97316'];
                return stockData[stock as keyof typeof stockData] ? (
                  <Line
                    key={stock}
                    type="monotone"
                    dataKey="value"
                    data={stockData[stock as keyof typeof stockData]}
                    stroke={colors[index % colors.length]}
                    strokeWidth={2}
                    name={stock}
                    dot={(props: any) => {
                      const position = stockData[stock as keyof typeof stockData][props.index]?.position;
                      return position ? (
                        <circle
                          cx={props.cx}
                          cy={props.cy}
                          r={4}
                          fill={getPositionColor(position)}
                          stroke="#fff"
                          strokeWidth={1}
                        />
                      ) : null;
                    }}
                  />
                ) : null;
              })}
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Monthly PnL Heatmap */}
        <Card className="p-6 bg-gray-800/50 border-gray-700 mb-8">
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
            <Calendar className="mr-2" />
            Monthly P&L Heatmap
          </h3>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-gray-300">Year</TableHead>
                  <TableHead className="text-gray-300">Jan</TableHead>
                  <TableHead className="text-gray-300">Feb</TableHead>
                  <TableHead className="text-gray-300">Mar</TableHead>
                  <TableHead className="text-gray-300">Apr</TableHead>
                  <TableHead className="text-gray-300">May</TableHead>
                  <TableHead className="text-gray-300">Jun</TableHead>
                  <TableHead className="text-gray-300">Jul</TableHead>
                  <TableHead className="text-gray-300">Aug</TableHead>
                  <TableHead className="text-gray-300">Sep</TableHead>
                  <TableHead className="text-gray-300">Oct</TableHead>
                  <TableHead className="text-gray-300">Nov</TableHead>
                  <TableHead className="text-gray-300">Dec</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {monthlyPnL.map((yearData) => (
                  <TableRow key={yearData.year}>
                    <TableCell className="font-medium text-white">{yearData.year}</TableCell>
                    <TableCell className={`text-center font-medium ${getPnLCellColor(yearData.Jan)}`}>
                      {yearData.Jan > 0 ? '+' : ''}{yearData.Jan}%
                    </TableCell>
                    <TableCell className={`text-center font-medium ${getPnLCellColor(yearData.Feb)}`}>
                      {yearData.Feb > 0 ? '+' : ''}{yearData.Feb}%
                    </TableCell>
                    <TableCell className={`text-center font-medium ${getPnLCellColor(yearData.Mar)}`}>
                      {yearData.Mar > 0 ? '+' : ''}{yearData.Mar}%
                    </TableCell>
                    <TableCell className={`text-center font-medium ${getPnLCellColor(yearData.Apr)}`}>
                      {yearData.Apr > 0 ? '+' : ''}{yearData.Apr}%
                    </TableCell>
                    <TableCell className={`text-center font-medium ${getPnLCellColor(yearData.May)}`}>
                      {yearData.May > 0 ? '+' : ''}{yearData.May}%
                    </TableCell>
                    <TableCell className={`text-center font-medium ${getPnLCellColor(yearData.Jun)}`}>
                      {yearData.Jun > 0 ? '+' : ''}{yearData.Jun}%
                    </TableCell>
                    <TableCell className={`text-center font-medium ${getPnLCellColor(yearData.Jul)}`}>
                      {yearData.Jul > 0 ? '+' : ''}{yearData.Jul}%
                    </TableCell>
                    <TableCell className={`text-center font-medium ${getPnLCellColor(yearData.Aug)}`}>
                      {yearData.Aug > 0 ? '+' : ''}{yearData.Aug}%
                    </TableCell>
                    <TableCell className={`text-center font-medium ${getPnLCellColor(yearData.Sep)}`}>
                      {yearData.Sep > 0 ? '+' : ''}{yearData.Sep}%
                    </TableCell>
                    <TableCell className={`text-center font-medium ${getPnLCellColor(yearData.Oct)}`}>
                      {yearData.Oct > 0 ? '+' : ''}{yearData.Oct}%
                    </TableCell>
                    <TableCell className={`text-center font-medium ${getPnLCellColor(yearData.Nov)}`}>
                      {yearData.Nov > 0 ? '+' : ''}{yearData.Nov}%
                    </TableCell>
                    <TableCell className={`text-center font-medium ${getPnLCellColor(yearData.Dec)}`}>
                      {yearData.Dec > 0 ? '+' : ''}{yearData.Dec}%
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>

        {/* Performance Metrics Table */}
        <Card className="p-6 bg-gray-800/50 border-gray-700">
          <h3 className="text-xl font-semibold text-white mb-6">Performance Metrics</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {performanceMetrics.map((metric) => (
              <div key={metric.metric} className="p-4 bg-gray-700/30 rounded-lg border border-gray-600">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-sm font-medium text-gray-300">{metric.metric}</h4>
                  <span className={`text-lg font-bold ${
                    metric.value.includes('-') ? 'text-red-400' : 
                    metric.value.includes('+') || parseFloat(metric.value) > 0 ? 'text-green-400' : 
                    'text-white'
                  }`}>
                    {metric.value}
                  </span>
                </div>
                <p className="text-xs text-gray-400">{metric.description}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Platform;
