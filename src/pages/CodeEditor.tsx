
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Play, Settings, TrendingUp, Save, Download, Upload } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

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

  // Sample data for charts
  const equityData = [
    { date: 'Jan', value: 100000 },
    { date: 'Feb', value: 105000 },
    { date: 'Mar', value: 98000 },
    { date: 'Apr', value: 112000 },
    { date: 'May', value: 108000 },
    { date: 'Jun', value: 125000 },
  ];

  const returnsData = [
    { range: '-5%', count: 2 },
    { range: '-2%', count: 5 },
    { range: '0%', count: 12 },
    { range: '2%', count: 8 },
    { range: '5%', count: 3 },
  ];

  const handleRunStrategy = () => {
    setIsRunning(true);
    // Simulate running strategy
    setTimeout(() => {
      setIsRunning(false);
      console.log('Strategy executed successfully');
    }, 2000);
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

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/login')}
                className="flex items-center space-x-2 text-gray-300 hover:text-emerald-400 transition-colors"
              >
                <ArrowLeft size={20} />
                <span>Back to Login</span>
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
                style={{ minHeight: '500px' }}
                placeholder="Write your trading strategy here..."
              />
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

          {/* Right Side - Graphs Simulator */}
          <Card className="p-6 bg-gray-800/50 border-gray-700 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">Live Results</h2>
              <div className="flex items-center space-x-2 text-emerald-400">
                <TrendingUp size={20} />
                <span className="text-sm">+25.7% Returns</span>
              </div>
            </div>

            <div className="flex-1 space-y-6">
              {/* Equity Curve */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Equity Curve</h3>
                <div className="h-48 bg-gray-900 rounded-lg p-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={equityData}>
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
                        stroke="#10B981" 
                        strokeWidth={2}
                        dot={{ fill: '#10B981', r: 4 }}
                      />
                    </LineChart>
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

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-900 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-emerald-400">1.84</div>
                  <div className="text-sm text-gray-400">Sharpe Ratio</div>
                </div>
                <div className="bg-gray-900 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-red-400">-8.2%</div>
                  <div className="text-sm text-gray-400">Max Drawdown</div>
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
