import React from 'react';
import { Link } from 'react-router-dom';
import { Box } from 'lucide-react';

const Footer = () => {
  const links = [
    { name: 'Explore', to: '/explore' },
    { name: 'Heritage Map', to: '/heritage-map' },
    { name: 'Ancient Scripts', to: '/ancient-scripts' },
    { name: 'Crafts', to: '/crafts' },
    { name: 'Heritage Quest', to: '/heritage-quest' },
    { name: 'AI Guide', to: '/ai-guide' }
  ];

  const technologies = [
    'Three.js',
    'React',
    'Node.js',
    'NLP'
  ];

  return (
    <footer className="relative z-10 bg-background border-t border-white/5 pt-20 pb-10 px-4 sm:px-6 lg:px-12 xl:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Section */}
          <div className="md:col-span-5 space-y-6">
            <Link to="/" className="inline-flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded p-1 -ml-1">
              <Box size={28} className="text-primary" strokeWidth={1.5} />
              <span className="text-2xl font-cinzel font-bold tracking-widest text-text-primary uppercase">
                BHARAT <span className="text-primary">SANGAM</span>
              </span>
            </Link>
            <p className="text-text-secondary font-light text-xl max-w-sm leading-relaxed">
              Experience India's Heritage. Preserve Its Stories.
            </p>
          </div>

          {/* Links Section */}
          <div className="md:col-span-3 space-y-6">
            <h4 className="text-base tracking-widest font-medium text-text-primary uppercase">Explore</h4>
            <ul className="space-y-4">
              {links.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.to} 
                    className="text-text-secondary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded transition-colors text-base font-light px-2 py-1 -ml-2"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Technology Section */}
          <div className="md:col-span-4 space-y-6">
            <h4 className="text-base tracking-widest font-medium text-text-primary uppercase">Technology</h4>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech) => (
                <span 
                  key={tech} 
                  className="px-4 py-1.5 border border-white/10 rounded-full text-sm tracking-wider text-text-secondary bg-surface-light/30 backdrop-blur-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-text-secondary/70 tracking-widest uppercase text-center md:text-left">
            Built for Heritage & Culture Innovation
          </p>
          <p className="text-sm text-text-secondary/70 tracking-widest uppercase">
            &copy; {new Date().getFullYear()} Bharat Sangamx
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
