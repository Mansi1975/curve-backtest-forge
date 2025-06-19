
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
  Cell
} from 'recharts';
import { 
  TrendingUp, 
  DollarSign, 
  Target, 
  Activity, 
  PieChart as PieChartIcon,
  ArrowUpRight,
  ArrowDownRight,
  Minus
} from 'lucide-react';

const Platform = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('1Y');

  // Sample data for charts
  const equityData = [
    { date: 'Jan', value: 10000, benchmark: 10000 },
    { date: 'Feb', value: 10500, benchmark: 10200 },
    { date: 'Mar', value: 11200, benchmark: 10400 },
    { date: 'Apr', value: 10800, benchmark: 10300 },
    { date: 'May', value: 12100, benchmark: 10800 },
    { date: 'Jun', value: 11900, benchmark: 10900 },
    { date: 'Jul', value: 12800, benchmark: 11100 },
    { date: 'Aug', value: 12400, benchmark: 11000 },
    { date: 'Sep', value: 13200, benchmark: 11300 },
    { date: 'Oct', value: 12900, benchmark: 11200 },
    { date: 'Nov', value: 13800, benchmark: 11500 },
    { date: 'Dec', value: 14200, benchmark: 11800 },
  ];

  const positionData = [
    { symbol: 'AAPL', value: 25, profit: 1250 },
    { symbol: 'MSFT', value: 20, profit: 980 },
    { symbol: 'GOOGL', value: 15, profit: -340 },
    { symbol: 'TSLA', value: 12, profit: 760 },
    { symbol: 'NVDA', value: 10, profit: 1450 },
    { symbol: 'META', value: 8, profit: -280 },
    { symbol: 'AMZN', value: 6, profit: 520 },
    { symbol: 'NFLX', value: 4, profit: 180 },
  ];

  const performanceData = [
    { metric: 'Win Rate', value: '68%', change: '+2.3%', trend: 'up' },
    { metric: 'Avg Win', value: '$1,245', change: '+5.7%', trend: 'up' },
    { metric: 'Avg Loss', value: '$523', change: '-1.2%', trend: 'down' },
    { metric: 'Max Drawdown', value: '8.4%', change: '-0.8%', trend: 'down' },
  ];

  const portfolioAllocation = [
    { name: 'Tech', value: 35, color: '#10b981' },
    { name: 'Healthcare', value: 20, color: '#3b82f6' },
    { name: 'Finance', value: 18, color: '#8b5cf6' },
    { name: 'Energy', value: 12, color: '#f59e0b' },
    { name: 'Consumer', value: 10, color: '#ef4444' },
    { name: 'Cash', value: 5, color: '#6b7280' },
  ];

  const sharpeRatioData = [
    { period: 'Q1', sharpe: 1.2, volatility: 12.5 },
    { period: 'Q2', sharpe: 1.8, volatility: 11.2 },
    { period: 'Q3', sharpe: 1.5, volatility: 13.8 },
    { period: 'Q4', sharpe: 2.1, volatility: 10.9 },
  ];

  const timeframes = ['1M', '3M', '6M', '1Y', 'ALL'];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-gray-900 to-black border-b border-emerald-900/20 pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
                Trading Platform
              </h1>
              <p className="text-gray-300 mt-2">
                Real-time portfolio tracking and backtesting results
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
                <p className="text-2xl font-bold text-white">$142,470</p>
                <p className="text-sm text-green-400 flex items-center">
                  <ArrowUpRight size={16} className="mr-1" />
                  +$8,340
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

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Equity Curve */}
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
                  name="Portfolio"
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

          {/* Sharpe Ratio */}
          <Card className="p-6 bg-gray-800/50 border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-6">Sharpe Ratio & Volatility</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={sharpeRatioData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="period" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px'
                  }} 
                />
                <Bar dataKey="sharpe" fill="#3b82f6" name="Sharpe Ratio" />
                <Bar dataKey="volatility" fill="#8b5cf6" name="Volatility %" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Position Breakdown */}
          <Card className="p-6 bg-gray-800/50 border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-6">Top Positions</h3>
            <div className="space-y-4">
              {positionData.map((position, index) => (
                <div key={position.symbol} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center text-xs font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-white">{position.symbol}</p>
                      <p className="text-sm text-gray-400">{position.value}%</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${position.profit > 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {position.profit > 0 ? '+' : ''}${position.profit}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Performance Metrics */}
          <Card className="p-6 bg-gray-800/50 border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-6">Performance Metrics</h3>
            <div className="space-y-6">
              {performanceData.map((metric) => (
                <div key={metric.metric} className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">{metric.metric}</p>
                    <p className="text-white font-semibold text-lg">{metric.value}</p>
                  </div>
                  <div className={`flex items-center space-x-1 ${
                    metric.trend === 'up' ? 'text-green-400' : 
                    metric.trend === 'down' ? 'text-red-400' : 'text-gray-400'
                  }`}>
                    {metric.trend === 'up' ? <ArrowUpRight size={16} /> : 
                     metric.trend === 'down' ? <ArrowDownRight size={16} /> : <Minus size={16} />}
                    <span className="text-sm">{metric.change}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Portfolio Allocation */}
          <Card className="p-6 bg-gray-800/50 border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-6">Portfolio Allocation</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={portfolioAllocation}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {portfolioAllocation.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {portfolioAllocation.map((item) => (
                <div key={item.name} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm text-gray-300">{item.name} {item.value}%</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Platform;
