import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Button from '../components/Button';
import PageTransition from '../components/PageTransition';
import InteractiveIndiaMap from '../components/InteractiveIndiaMap';

const HeritageMapPage = () => {
  return (
    <PageTransition className="flex-1 flex flex-col relative overflow-hidden bg-background pt-32 pb-12 px-4 min-h-screen">
      {/* Abstract dark background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--color-surface)_0%,_var(--color-background)_100%)] opacity-80 pointer-events-none" />
      
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center h-full flex-1">
        
        <div className="w-full flex justify-between items-center mb-8">
          <Link to="/">
            <Button 
              variant="secondary"
              icon={ArrowLeft}
              iconAnimation="translate"
              className="hidden md:flex"
            >
              Back
            </Button>
          </Link>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-cinzel font-bold text-text-primary text-center flex-1"
          >
            Heritage Map
          </motion.h1>
          
          <div className="hidden md:block w-[120px]"></div> {/* Spacer for centering */}
        </div>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg text-text-secondary font-light max-w-2xl mx-auto text-center mb-8"
        >
          Explore the rich cultural tapestry of India. Hover over a state to see its name and click to discover its heritage.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex-1 w-full flex items-center justify-center relative min-h-[600px]"
        >
          <InteractiveIndiaMap />
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default HeritageMapPage;
