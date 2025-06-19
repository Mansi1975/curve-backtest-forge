
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Play, Settings, Download, TrendingUp, DollarSign, Calendar, BarChart } from 'lucide-react';

const BacktestSection = () => {
  const [selectedStrategy, setSelectedStrategy] = useState('momentum');

  const strategies = [
    {
      id: 'momentum',
      name: 'Momentum Strategy',
      description: 'Buy high, sell higher. Capitalize on trending markets.',
      returns: '+24.7%',
      sharpe: '1.84',
      maxDrawdown: '-8.2%'
    },
    {
      id: 'meanReversion',
      name: 'Mean Reversion',
      description: 'Profit from price corrections and oversold conditions.',
      returns: '+18.3%',
      sharpe: '1.92',
      maxDrawdown: '-5.1%'
    },
    {
      id: 'breakout',
      name: 'Breakout Strategy',
      description: 'Capture explosive moves from key resistance levels.',
      returns: '+31.2%',
      sharpe: '1.67',
      maxDrawdown: '-12.4%'
    }
  ];

  return (
    <section id="backtest" className="relative py-24 bg-gray-900">
      {/* Top curve */}
      <div className="absolute top-0 left-0 w-full">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-16 md:h-24 transform rotate-180">
          <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="fill-black"></path>
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
              Backtest
            </span>
            <span className="text-white"> Your Strategy</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Test your trading ideas with our powerful backtesting engine. Get instant insights 
            and optimize your strategies for maximum profitability.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Strategy Selection */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-6">Choose Your Strategy</h3>
            
            <div className="space-y-4">
              {strategies.map((strategy) => (
                <Card 
                  key={strategy.id}
                  className={`p-6 cursor-pointer transition-all duration-300 hover:border-emerald-500/50 ${
                    selectedStrategy === strategy.id 
                      ? 'bg-emerald-900/30 border-emerald-500' 
                      : 'bg-gray-800/50 border-gray-700'
                  }`}
                  onClick={() => setSelectedStrategy(strategy.id)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-lg font-semibold text-white">{strategy.name}</h4>
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      selectedStrategy === strategy.id 
                        ? 'bg-emerald-500 border-emerald-500' 
                        : 'border-gray-400'
                    }`}></div>
                  </div>
                  <p className="text-gray-300 mb-4">{strategy.description}</p>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-emerald-400 font-bold">{strategy.returns}</div>
                      <div className="text-xs text-gray-400">Returns</div>
                    </div>
                    <div className="text-center">
                      <div className="text-emerald-400 font-bold">{strategy.sharpe}</div>
                      <div className="text-xs text-gray-400">Sharpe</div>
                    </div>
                    <div className="text-center">
                      <div className="text-red-400 font-bold">{strategy.maxDrawdown}</div>
                      <div className="text-xs text-gray-400">Max DD</div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="flex space-x-4">
              <Button className="flex-1 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white">
                <Play className="mr-2" size={16} />
                Run Backtest
              </Button>
              <Button variant="outline" className="border-emerald-700 text-emerald-400 hover:bg-emerald-900/30">
                <Settings className="mr-2" size={16} />
                Settings
              </Button>
            </div>
          </div>

          {/* Results Dashboard */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-6">Backtest Results</h3>
            
            {/* Performance Metrics */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-6 bg-gray-800/50 border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <TrendingUp className="text-emerald-400" size={24} />
                  <span className="text-2xl font-bold text-emerald-400">+24.7%</span>
                </div>
                <div className="text-gray-300">Total Return</div>
              </Card>
              
              <Card className="p-6 bg-gray-800/50 border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <DollarSign className="text-green-400" size={24} />
                  <span className="text-2xl font-bold text-green-400">$12,470</span>
                </div>
                <div className="text-gray-300">Total Profit</div>
              </Card>
              
              <Card className="p-6 bg-gray-800/50 border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <Calendar className="text-blue-400" size={24} />
                  <span className="text-2xl font-bold text-blue-400">247</span>
                </div>
                <div className="text-gray-300">Trading Days</div>
              </Card>
              
              <Card className="p-6 bg-gray-800/50 border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <BarChart className="text-purple-400" size={24} />
                  <span className="text-2xl font-bold text-purple-400">1.84</span>
                </div>
                <div className="text-gray-300">Sharpe Ratio</div>
              </Card>
            </div>

            {/* Equity Curve Placeholder */}
            <Card className="p-6 bg-gray-800/50 border-gray-700">
              <h4 className="text-lg font-semibold text-white mb-4">Equity Curve</h4>
              <div className="h-48 bg-gradient-to-br from-emerald-900/20 to-green-900/20 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <BarChart className="text-emerald-400 mx-auto mb-2" size={48} />
                  <div className="text-gray-300">Interactive chart will appear here</div>
                </div>
              </div>
            </Card>

            <Button className="w-full bg-gray-700 hover:bg-gray-600 text-white">
              <Download className="mr-2" size={16} />
              Download Report
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom curve */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-16 md:h-24">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-black"></path>
        </svg>
      </div>
    </section>
  );
};

export default BacktestSection;
