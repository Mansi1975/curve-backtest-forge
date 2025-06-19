import { Shield, Zap, Target, Users } from 'lucide-react';
const AboutSection = () => {
  const features = [{
    icon: Shield,
    title: 'Secure & Reliable',
    description: 'Bank-grade security with 99.9% uptime guarantee. Your data and strategies are protected with enterprise-level encryption.'
  }, {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Process thousands of backtests in seconds with our optimized algorithms and cloud infrastructure.'
  }, {
    icon: Target,
    title: 'Precision Analytics',
    description: 'Get detailed insights with advanced metrics, risk analysis, and performance attribution reporting.'
  }, {
    icon: Users,
    title: 'Community Driven',
    description: 'Join a thriving community of traders sharing strategies, insights, and best practices.'
  }];
  return <section id="about" className="relative py-24 bg-black">
      {/* Top curve */}
      <div className="absolute top-0 left-0 w-full">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-16 md:h-24 transform rotate-180">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-gray-900"></path>
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-white">About </span>
            <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
              CurveBacktest
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We're revolutionizing how traders test and optimize their strategies. Our platform combines 
            cutting-edge technology with intuitive design to deliver unparalleled backtesting capabilities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => <div key={index} className="group glass-effect rounded-2xl p-8 text-center hover:bg-emerald-900/20 transition-all duration-300 transform hover:-translate-y-2">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-600 to-green-600 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
              <p className="text-gray-300 leading-relaxed">{feature.description}</p>
            </div>)}
        </div>

        <div className="bg-gradient-to-r from-emerald-900/30 to-green-900/30 rounded-3xl p-8 md:p-12 backdrop-blur-sm border border-emerald-700/30">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-white mb-6">
                Why Choose CurveBacktest?
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  <span className="text-gray-300">Real-time backtesting engine</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  <span className="text-gray-300">Advanced risk management tools</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  <span className="text-gray-300">No-code AI strategy builder</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  <span className="text-gray-300">Custom indicator development</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-emerald-500/20 to-green-600/20 rounded-2xl p-8 backdrop-blur-sm">
                <div className="text-center">
                  <div className="text-4xl font-bold text-emerald-400 mb-2">15+ Years</div>
                  <div className="text-gray-300 mb-4 px-0">At QuantEdge we democratize quantitative trading my making sophisticated algorithmic strategies accessible to everyone. Our AI-Powered platform eliminates the complexity of coding while providing institutional -grade backtesting capabilities.</div>
                  <div className="text-4xl font-bold text-emerald-400 mb-2">50K+</div>
                  <div className="text-gray-300">institutional-grade backtesting capabilities.

AI-powered strategy generation from natural language

Comprehensive Indian market data integration

Professional-grade performance analytics</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom curve */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-16 md:h-24">
          <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="fill-gray-900"></path>
        </svg>
      </div>
    </section>;
};
export default AboutSection;