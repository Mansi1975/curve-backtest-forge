
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Play, Settings, Download, TrendingUp, DollarSign, Calendar, BarChart, Brain, Shield, Zap } from 'lucide-react';

const BacktestSection = () => {
  const [selectedStrategy, setSelectedStrategy] = useState('momentum');
  
  const strategies = [{
    id: 'momentum',
    name: 'Momentum Strategy',
    description: 'Buy high, sell higher. Capitalize on trending markets.',
    returns: '+24.7%',
    sharpe: '1.84',
    maxDrawdown: '-8.2%'
  }, {
    id: 'meanReversion',
    name: 'Mean Reversion',
    description: 'Profit from price corrections and oversold conditions.',
    returns: '+18.3%',
    sharpe: '1.92',
    maxDrawdown: '-5.1%'
  }, {
    id: 'breakout',
    name: 'Breakout Strategy',
    description: 'Capture explosive moves from key resistance levels.',
    returns: '+31.2%',
    sharpe: '1.67',
    maxDrawdown: '-12.4%'
  }];

  const startupFeatures = [
    {
      icon: Brain,
      title: 'AI-Powered Analytics',
      description: 'Advanced machine learning algorithms analyze market patterns and generate insights to optimize your trading strategies.'
    },
    {
      icon: Shield,
      title: 'Risk Management',
      description: 'Comprehensive risk assessment tools including drawdown analysis, volatility metrics, and position sizing recommendations.'
    },
    {
      icon: Zap,
      title: 'Real-Time Processing',
      description: 'Lightning-fast backtesting engine processes years of historical data in seconds with institutional-grade accuracy.'
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
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
            Test your strategies with historical data and get institutional-grade performance analytics.
          </p>
          
          {/* Trading Platform Info */}
          <div className="bg-gradient-to-r from-emerald-900/20 to-green-900/20 rounded-2xl p-8 backdrop-blur-sm border border-emerald-700/30 mb-12">
            <h3 className="text-2xl font-bold text-white mb-4">Complete Trading Analytics Platform</h3>
            <p className="text-gray-300 mb-6">
              Our comprehensive trading platform provides detailed insights with equity curves, drawdown analysis, 
              returns distribution, individual stock performance tracking, monthly P&L heatmaps, and advanced 
              performance metrics including Sharpe ratio, CAGR, win rates, and risk-adjusted returns.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="text-center">
                <TrendingUp className="text-emerald-400 mx-auto mb-2" size={20} />
                <span className="text-gray-300">Equity Curves</span>
              </div>
              <div className="text-center">
                <BarChart className="text-emerald-400 mx-auto mb-2" size={20} />
                <span className="text-gray-300">Performance Metrics</span>
              </div>
              <div className="text-center">
                <DollarSign className="text-emerald-400 mx-auto mb-2" size={20} />
                <span className="text-gray-300">P&L Analysis</span>
              </div>
              <div className="text-center">
                <Calendar className="text-emerald-400 mx-auto mb-2" size={20} />
                <span className="text-gray-300">Monthly Tracking</span>
              </div>
            </div>
          </div>
        </div>

        {/* Startup Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {startupFeatures.map((feature, index) => (
            <Card key={index} className="p-8 bg-gray-800/50 border-gray-700 text-center hover:border-emerald-500/50 transition-all duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-600 to-green-600 rounded-2xl mb-6">
                <feature.icon className="text-white" size={32} />
              </div>
              <h4 className="text-xl font-bold text-white mb-4">{feature.title}</h4>
              <p className="text-gray-300 leading-relaxed">{feature.description}</p>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Strategy Selection */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-6">Choose Your Strategy</h3>
            
            <div className="space-y-4">
              {strategies.map(strategy => (
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
