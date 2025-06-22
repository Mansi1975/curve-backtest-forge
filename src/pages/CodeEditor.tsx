import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowLeft, Play, Settings, TrendingUp, Save, Download, Upload, Sparkles, DollarSign, Target, Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, AreaChart, Area } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const CodeEditor = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState(`# Sample Trading Strategy
def momentum_strategy(data):
    """
    Simple momentum strategy
    Buy when price > 20-day moving average
    Sell when price < 20-day moving average
    """
    signals = []
    for i in range(len(data)):
        if data[i].close > data[i].ma_20:
            signals.append("BUY")
        else:
            signals.append("SELL")
    return signals

# Run backtest
backtest_results = run_backtest(
    strategy=momentum_strategy,
    start_date="2023-01-01",
    end_date="2024-01-01",
    initial_capital=100000
)`);

  const [isRunning, setIsRunning] = useState(false);
  const [selectedAnalytic, setSelectedAnalytic] = useState('histogram');

  // Sample data for live results
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

  const returnsData = [
    { range: '-5%', count: 2 },
    { range: '-2%', count: 5 },
    { range: '0%', count: 12 },
    { range: '2%', count: 8 },
    { range: '5%', count: 3 },
  ];

  const stockData = {
    AAPL: [
      { date: 'Jan', value: 10000, position: null },
      { date: 'Feb', value: 10500, position: 'buy' },
      { date: 'Mar', value: 11200, position: null },
      { date: 'Apr', value: 10800, position: null },
      { date: 'May', value: 12100, position: 'sell' },
      { date: 'Jun', value: 11900, position: null },
    ],
    MSFT: [
      { date: 'Jan', value: 8000, position: null },
      { date: 'Feb', value: 8200, position: 'buy' },
      { date: 'Mar', value: 8800, position: null },
      { date: 'Apr', value: 8500, position: null },
      { date: 'May', value: 9200, position: null },
      { date: 'Jun', value: 9100, position: 'sell' },
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
    { metric: 'CAGR', value: '18.5%', description: 'Compound Annual Growth Rate' },
    { metric: 'Win Rate', value: '68.2%', description: 'Percentage of profitable trades' },
  ];

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

  const handleRunStrategy = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      console.log('Strategy executed successfully');
    }, 2000);
  };

  const handleGenerateCode = () => {
    console.log('Generating AI code...');
  };

  const handleSaveStrategy = () => {
    console.log('Strategy saved');
  };

  const handleLoadStrategy = () => {
    console.log('Loading strategy...');
  };

  const handleDownloadResults = () => {
    console.log('Downloading results...');
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  const renderSelectedAnalytic = () => {
    switch (selectedAnalytic) {
      case 'histogram':
        return (
          <div className="h-64 bg-gray-900 rounded-lg p-4">
            <h4 className="text-sm font-medium text-white mb-3">Returns Histogram</h4>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={returnsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="range" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="count" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        );
      
      case 'monthly-pnl':
        return (
          <div className="h-64 bg-gray-900 rounded-lg p-4 overflow-x-auto">
            <h4 className="text-sm font-medium text-white mb-3">Monthly P&L Heatmap</h4>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-gray-300 text-xs">Year</TableHead>
                  <TableHead className="text-gray-300 text-xs">Jan</TableHead>
                  <TableHead className="text-gray-300 text-xs">Feb</TableHead>
                  <TableHead className="text-gray-300 text-xs">Mar</TableHead>
                  <TableHead className="text-gray-300 text-xs">Apr</TableHead>
                  <TableHead className="text-gray-300 text-xs">May</TableHead>
                  <TableHead className="text-gray-300 text-xs">Jun</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {monthlyPnL.map((yearData) => (
                  <TableRow key={yearData.year}>
                    <TableCell className="font-medium text-white text-xs">{yearData.year}</TableCell>
                    <TableCell className={`text-center font-medium text-xs ${getPnLCellColor(yearData.Jan)}`}>
                      {yearData.Jan > 0 ? '+' : ''}{yearData.Jan}%
                    </TableCell>
                    <TableCell className={`text-center font-medium text-xs ${getPnLCellColor(yearData.Feb)}`}>
                      {yearData.Feb > 0 ? '+' : ''}{yearData.Feb}%
                    </TableCell>
                    <TableCell className={`text-center font-medium text-xs ${getPnLCellColor(yearData.Mar)}`}>
                      {yearData.Mar > 0 ? '+' : ''}{yearData.Mar}%
                    </TableCell>
                    <TableCell className={`text-center font-medium text-xs ${getPnLCellColor(yearData.Apr)}`}>
                      {yearData.Apr > 0 ? '+' : ''}{yearData.Apr}%
                    </TableCell>
                    <TableCell className={`text-center font-medium text-xs ${getPnLCellColor(yearData.May)}`}>
                      {yearData.May > 0 ? '+' : ''}{yearData.May}%
                    </TableCell>
                    <TableCell className={`text-center font-medium text-xs ${getPnLCellColor(yearData.Jun)}`}>
                      {yearData.Jun > 0 ? '+' : ''}{yearData.Jun}%
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        );
      
      case 'performance-metrics':
        return (
          <div className="h-64 bg-gray-900 rounded-lg p-4">
            <h4 className="text-sm font-medium text-white mb-3">Performance Metrics</h4>
            <div className="grid grid-cols-2 gap-3 h-full overflow-y-auto">
              {performanceMetrics.map((metric) => (
                <div key={metric.metric} className="p-2 bg-gray-700/30 rounded border border-gray-600">
                  <div className="flex justify-between items-center mb-1">
                    <h5 className="text-xs font-medium text-gray-300">{metric.metric}</h5>
                    <span className={`text-sm font-bold ${
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
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBackToLogin}
                className="flex items-center space-x-2 text-gray-300 hover:text-emerald-400 transition-colors"
              >
                <ArrowLeft size={20} />
                <span>Back</span>
              </button>
              <div className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-green-600 bg-clip-text text-transparent">
                QuantEdge
              </div>
              <span className="text-sm text-gray-400">Strategy Simulator</span>
            </div>
            <div className="flex items-center space-x-2">
              <Button 
                onClick={handleSaveStrategy}
                variant="outline" 
                size="sm" 
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                <Save className="mr-2" size={16} />
                Save
              </Button>
              <Button 
                onClick={handleLoadStrategy}
                variant="outline" 
                size="sm" 
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                <Upload className="mr-2" size={16} />
                Load
              </Button>
              <Button 
                onClick={handleRunStrategy}
                disabled={isRunning}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                <Play className="mr-2" size={16} />
                {isRunning ? 'Running...' : 'Run Strategy'}
              </Button>
              <Button 
                onClick={() => navigate('/platform')}
                className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700"
              >
                Advanced Platform
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-120px)]">
          {/* Left Side - Code Editor */}
          <Card className="p-6 bg-gray-800/50 border-gray-700 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">Strategy Code Editor</h2>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                  <Settings size={16} />
                </Button>
              </div>
            </div>
            
            <div className="flex-1 bg-gray-900 rounded-lg border border-gray-600 overflow-hidden">
              <div className="bg-gray-800 px-4 py-2 border-b border-gray-600 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="ml-4 text-sm text-gray-400">strategy.py</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button 
                    onClick={handleDownloadResults}
                    variant="ghost" 
                    size="sm"
                    className="text-gray-400 hover:text-white"
                  >
                    <Download size={14} />
                  </Button>
                </div>
              </div>
              
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-full p-4 bg-gray-900 text-gray-100 font-mono text-sm resize-none focus:outline-none"
                style={{ minHeight: '400px' }}
                placeholder="Write your trading strategy here..."
              />
            </div>

            {/* Generate Button */}
            <div className="mt-4">
              <Button 
                onClick={handleGenerateCode}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                <Sparkles className="mr-2" size={16} />
                Generate Code with AI
              </Button>
            </div>

            <div className="mt-4 p-3 bg-gray-900 rounded-lg border border-gray-600">
              <div className="text-sm text-gray-400 mb-2">Console Output:</div>
              <div className="text-green-400 font-mono text-xs">
                {isRunning ? (
                  <>
                    → Strategy compiling...<br/>
                    → Running backtest...<br/>
                    → Processing data...
                  </>
                ) : (
                  <>
                    → Strategy compiled successfully<br/>
                    → Backtest period: 2023-01-01 to 2024-01-01<br/>
                    → Total returns: +25.7%<br/>
                    → Sharpe ratio: 1.84
                  </>
                )}
              </div>
            </div>
          </Card>

          {/* Right Side - Live Results */}
          <Card className="p-6 bg-gray-800/50 border-gray-700 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">Live Backtest Results</h2>
              <div className="flex items-center space-x-2 text-emerald-400">
                <TrendingUp size={20} />
                <span className="text-sm">+42.3% Returns</span>
              </div>
            </div>

            {/* Key Metrics at Top */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-gray-900 rounded-lg p-3 text-center">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-400">Total Return</span>
                  <TrendingUp className="text-emerald-400" size={16} />
                </div>
                <div className="text-lg font-bold text-emerald-400">+42.3%</div>
              </div>
              <div className="bg-gray-900 rounded-lg p-3 text-center">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-400">Portfolio Value</span>
                  <DollarSign className="text-green-400" size={16} />
                </div>
                <div className="text-lg font-bold text-white">₹1,42,470</div>
              </div>
              <div className="bg-gray-900 rounded-lg p-3 text-center">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-400">Sharpe Ratio</span>
                  <Target className="text-blue-400" size={16} />
                </div>
                <div className="text-lg font-bold text-blue-400">2.14</div>
              </div>
              <div className="bg-gray-900 rounded-lg p-3 text-center">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-400">Max Drawdown</span>
                  <Activity className="text-red-400" size={16} />
                </div>
                <div className="text-lg font-bold text-red-400">-8.4%</div>
              </div>
            </div>

            {/* Scrollable Charts Section */}
            <div className="flex-1 mb-4">
              <ScrollArea className="h-full">
                <div className="space-y-4 pr-4">
                  {/* Equity Curve */}
                  <div className="h-48 bg-gray-900 rounded-lg p-4">
                    <h3 className="text-sm font-semibold text-white mb-3">Equity Curve</h3>
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={equityData}>
                        <defs>
                          <linearGradient id="equityGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="date" stroke="#9CA3AF" />
                        <YAxis stroke="#9CA3AF" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#1F2937', 
                            border: '1px solid #374151',
                            borderRadius: '8px'
                          }}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="value" 
                          stroke="#10B981" 
                          strokeWidth={2}
                          fillOpacity={1}
                          fill="url(#equityGradient)"
                        />
                        <Line
                          type="monotone"
                          dataKey="benchmark"
                          stroke="#6b7280"
                          strokeWidth={1}
                          strokeDasharray="5 5"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Drawdown Curve */}
                  <div className="h-48 bg-gray-900 rounded-lg p-4">
                    <h3 className="text-sm font-semibold text-white mb-3">Drawdown Curve</h3>
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={equityData}>
                        <defs>
                          <linearGradient id="drawdownGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="date" stroke="#9CA3AF" />
                        <YAxis stroke="#9CA3AF" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#1F2937', 
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
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Individual Stock Performance */}
                  <div className="h-48 bg-gray-900 rounded-lg p-4">
                    <h3 className="text-sm font-semibold text-white mb-3">Individual Stock Performance</h3>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="date" stroke="#9CA3AF" />
                        <YAxis stroke="#9CA3AF" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#1F2937', 
                            border: '1px solid #374151',
                            borderRadius: '8px'
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="value"
                          data={stockData.AAPL}
                          stroke="#10b981"
                          strokeWidth={2}
                          name="AAPL"
                          dot={(props: any) => {
                            const position = stockData.AAPL[props.index]?.position;
                            return position ? (
                              <circle
                                key={props.index}
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
                        <Line
                          type="monotone"
                          dataKey="value"
                          data={stockData.MSFT}
                          stroke="#3b82f6"
                          strokeWidth={2}
                          name="MSFT"
                          dot={(props: any) => {
                            const position = stockData.MSFT[props.index]?.position;
                            return position ? (
                              <circle
                                key={props.index}
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
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </ScrollArea>
            </div>

            {/* Analytics Dropdown and Selected View */}
            <div className="space-y-3">
              <Select value={selectedAnalytic} onValueChange={setSelectedAnalytic}>
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue placeholder="Select Analytics" />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  <SelectItem value="histogram" className="text-white hover:bg-gray-600">
                    Returns Histogram
                  </SelectItem>
                  <SelectItem value="monthly-pnl" className="text-white hover:bg-gray-600">
                    Monthly P&L
                  </SelectItem>
                  <SelectItem value="performance-metrics" className="text-white hover:bg-gray-600">
                    Performance Metrics
                  </SelectItem>
                </SelectContent>
              </Select>
              
              {renderSelectedAnalytic()}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
