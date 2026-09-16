import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Box } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import logoImg from '../assets/logo.jpg';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getDashboardLink = () => {
    if (!user) return '/login';
    switch (user.role) {
      case 'artisan': return '/dashboard/artisan';
      case 'organization': return '/dashboard/organization';
      case 'expert': return '/dashboard/expert';
      default: return '/dashboard/student'; // Generic dashboard
    }
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Explore', to: '/explore' },
    { name: 'Heritage Map', to: '/heritage-map' },
    { name: 'Ancient Scripts', to: '/ancient-scripts' },
    { name: 'Crafts', to: '/crafts' },
    { name: 'Heritage Quest', to: '/heritage-quest' },
    { name: 'AI Guide', to: '/ai-guide' },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ease-in-out ${
        isScrolled
          ? 'bg-background/80 backdrop-blur-md border-b border-white/5 py-4 shadow-lg'
          : 'bg-transparent py-8 lg:py-10'
      }`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between relative w-full">
          
          {/* Left: Logo */}
          <div className="flex-1 flex justify-start">
            <Link to="/" className="flex items-center gap-3 relative z-[60] group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded p-1 -ml-1">
              <img src={logoImg} alt="Bharat Sangam Logo" className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-primary/50 shadow-[0_0_15px_rgba(201,162,91,0.5)] group-hover:scale-110 transition-transform duration-300 object-cover" />
              <span className="text-3xl lg:text-4xl font-cinzel font-bold tracking-widest text-text-primary uppercase">
                BHARAT <span className="text-primary">SANGAM</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-center flex-[2]">
            <ul className="flex items-center gap-8 xl:gap-12 text-base lg:text-lg font-medium tracking-widest uppercase text-text-secondary">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.to}
                    className="hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded px-3 py-2 transition-colors duration-200 whitespace-nowrap"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Mobile Toggle & Translate */}
          <div className="flex items-center justify-end gap-6 relative z-[60] flex-1">
            <div id="google_translate_element" className="hidden lg:block"></div>
            
            {user ? (
              <>
                <Link
                  to={getDashboardLink()}
                  className="hidden lg:inline-flex items-center justify-center px-4 py-2 border border-primary/30 text-primary hover:bg-primary hover:text-background font-medium tracking-widest uppercase rounded transition-all duration-300"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="hidden lg:inline-flex items-center justify-center px-4 py-2 border border-red-500/30 text-red-500 hover:bg-red-500 hover:text-white font-medium tracking-widest uppercase rounded transition-all duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex items-center gap-8">
                <Link
                  to="/login"
                  className="hidden lg:inline-flex items-center justify-center px-5 py-2 border border-primary/30 text-primary hover:bg-primary hover:text-background font-medium tracking-widest uppercase rounded transition-all duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="hidden lg:inline-flex items-center justify-center px-5 py-2 bg-primary/30 border border-primary text-primary hover:bg-primary hover:text-background font-medium tracking-widest uppercase rounded transition-all duration-300"
                >
                  Sign Up
                </Link>
              </div>
            )}



            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-text-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded p-2 transition-colors"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Animated Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-0 bg-background/95 backdrop-blur-xl transition-all duration-300 ease-in-out z-50 ${
          isMobileMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'
        }`}
      >
        <div className="flex flex-col h-full pt-28 px-6 pb-8 overflow-y-auto">
          <ul className="flex flex-col space-y-8 text-lg font-medium tracking-widest uppercase text-text-primary">
            {navLinks.map((link) => (
              <li key={link.name} className="border-b border-white/5 pb-4">
                <Link
                  to={link.to}
                  className="hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded px-2 py-1 transition-colors duration-200 block w-full"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
            
            {/* Mobile Translate Div */}
            <li className="pt-4">
              <div id="google_translate_element_mobile" className="w-full"></div>
            </li>
          </ul>

        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
