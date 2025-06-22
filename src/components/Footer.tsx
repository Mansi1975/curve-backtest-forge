
import { ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back to Top Button */}
        <div className="text-center mb-8">
          <button
            onClick={scrollToTop}
            className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-emerald-600 to-green-600 rounded-full hover:from-emerald-700 hover:to-green-700 transition-all duration-300 hover:scale-110"
          >
            <ArrowUp size={20} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-green-600 bg-clip-text text-transparent mb-4">
              QuantEdge
            </h3>
            <p className="text-gray-300 mb-4 max-w-md">
              Empowering traders with advanced backtesting capabilities. 
              Test, optimize, and perfect your trading strategies with our institutional-grade platform.
            </p>
            <div className="text-sm text-gray-400">
              © 2024 QuantEdge. All rights reserved.
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#home" className="hover:text-emerald-400 transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-emerald-400 transition-colors">About Us</a></li>
              <li><a href="#backtest" className="hover:text-emerald-400 transition-colors">Backtest Strategy</a></li>
              <li><a href="#contact" className="hover:text-emerald-400 transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">API Reference</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Community</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Border */}
        <div className="border-t border-gray-800 pt-8">
          <div className="text-center text-gray-400 text-sm">
            Built with ❤️ for the trading community
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
