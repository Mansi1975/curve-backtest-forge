
import { useState, useEffect } from 'react';
import { Menu, X, LogIn } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../QElogo.png';


const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [{
    name: 'Home',
    href: '#home',
    route: '/'
  }, {
    name: 'About Us',
    href: '#about',
    route: '/'
  }, {
    name: 'Contact Us',
    href: '#contact',
    route: '/'
  }];

  const handleNavigation = (item: typeof navItems[0]) => {
    if (item.route === '/') {
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const element = document.querySelector(item.href);
          if (element) {
            element.scrollIntoView({
              behavior: 'smooth'
            });
          }
        }, 100);
      } else {
        const element = document.querySelector(item.href);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth'
          });
        }
      }
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/90 backdrop-blur-md border-b border-emerald-900/20' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* <div className="flex-shrink-0">
            <button onClick={() => navigate('/')} className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-green-600 bg-clip-text text-transparent">QuantEdge</button>
          </div> */}
          <div className="flex-shrink-0 flex items-center space-x-2">
 <img 
  src={logo} 
  alt="QuantEdge Logo"
  className="h-20 w-20 object-contain mt-4"
/>

  <button 
    onClick={() => navigate('/')} 
    className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-green-600 bg-clip-text text-transparent"
  >
    QuantEdge
  </button>
</div>


          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map(item => 
                <button key={item.name} onClick={() => handleNavigation(item)} className="nav-link px-3 py-2 text-sm font-medium">
                  {item.name}
                </button>
              )}
              <button onClick={() => navigate('/signup')} className="flex items-center space-x-2 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 px-4 py-2 rounded-lg text-white transition-all duration-300">
                <LogIn size={16} />
                <span>Sign Up</span>
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-300 hover:text-emerald-400 transition-colors">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && 
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-black/90 backdrop-blur-md rounded-lg mt-2">
              {navItems.map(item => 
                <button key={item.name} onClick={() => handleNavigation(item)} className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-emerald-400 hover:bg-emerald-900/20 rounded-md transition-colors w-full text-left">
                  {item.name}
                </button>
              )}
              <button onClick={() => navigate('/signup')} className="flex items-center space-x-2 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 px-3 py-2 rounded-md text-white transition-all duration-300 w-full">
                <LogIn size={16} />
                <span>Sign Up</span>
              </button>
            </div>
          </div>
        }
      </div>
    </nav>
  );
};

export default Navigation;
