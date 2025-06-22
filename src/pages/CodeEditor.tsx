import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Play, Settings, TrendingUp, Save, Download, Upload, Sparkles } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, AreaChart, Area } from 'recharts';

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

  // Sample data for live results
  const equityData = [
    { date: 'Jan', value: 100000, benchmark: 100000 },
    { date: 'Feb', value: 105000, benchmark: 102000 },
    { date: 'Mar', value: 98000, benchmark: 104000 },
    { date: 'Apr', value: 112000, benchmark: 103000 },
    { date: 'May', value: 108000, benchmark: 108000 },
    { date: 'Jun', value: 125000, benchmark: 109000 },
  ];

  const returnsData = [
    { range: '-5%', count: 2 },
    { range: '-2%', count: 5 },
    { range: '0%', count: 12 },
    { range: '2%', count: 8 },
    { range: '5%', count: 3 },
  ];

  const performanceMetrics = [
    { metric: 'Total Return', value: '+25.7%' },
    { metric: 'Sharpe Ratio', value: '1.84' },
    { metric: 'Max Drawdown', value: '-8.2%' },
    { metric: 'Win Rate', value: '68.2%' },
  ];

  const handleRunStrategy = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      console.log('Strategy executed successfully');
    }, 2000);
  };

  const handleGenerateCode = () => {
    console.log('Generating AI code...');
    // Implement AI code generation
  };

  const handleSaveStrategy = () => {
    console.log('Strategy saved');
    // Implement save functionality
  };

  const handleLoadStrategy = () => {
    console.log('Loading strategy...');
    // Implement load functionality
  };

  const handleDownloadResults = () => {
    console.log('Downloading results...');
    // Implement download functionality
  };

  const handleBackToLogin = () => {
    navigate('/login');
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

          {/* Right Side - Live Backtest Results */}
          <Card className="p-6 bg-gray-800/50 border-gray-700 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">Live Backtest Results</h2>
              <div className="flex items-center space-x-2 text-emerald-400">
                <TrendingUp size={20} />
                <span className="text-sm">+25.7% Returns</span>
              </div>
            </div>

            <div className="flex-1 space-y-6 overflow-y-auto">
              {/* Key Metrics */}
              <div className="grid grid-cols-2 gap-4">
                {performanceMetrics.map((metric) => (
                  <div key={metric.metric} className="bg-gray-900 rounded-lg p-4 text-center">
                    <div className={`text-xl font-bold ${
                      metric.value.includes('-') ? 'text-red-400' : 'text-emerald-400'
                    }`}>
                      {metric.value}
                    </div>
                    <div className="text-sm text-gray-400">{metric.metric}</div>
                  </div>
                ))}
              </div>

              {/* Equity Curve */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Equity Curve</h3>
                <div className="h-48 bg-gray-900 rounded-lg p-4">
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
              </div>

              {/* Returns Distribution */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Returns Distribution</h3>
                <div className="h-48 bg-gray-900 rounded-lg p-4">
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
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
