import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Button from '../components/Button';
import PageTransition from '../components/PageTransition';

const PlaceholderPage = ({ title }) => {
  return (
    <PageTransition className="flex-1 flex flex-col items-center justify-center relative overflow-hidden bg-background py-32 px-4">
      {/* Abstract dark background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--color-surface)_0%,_var(--color-background)_100%)] opacity-80 pointer-events-none" />
      
      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center space-y-12">
        
        {/* Subtle decorative element */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-24 h-24 rounded-full border border-primary/20 flex items-center justify-center mb-4"
        >
          <div className="w-16 h-16 rounded-full border border-primary/40 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-primary/20 animate-pulse" />
          </div>
        </motion.div>

        <div className="space-y-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-cinzel font-bold text-text-primary"
          >
            {title}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-text-secondary font-light max-w-2xl mx-auto"
          >
            Coming in the next experience.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="pt-8"
        >
          <Link to="/">
            <Button 
              variant="secondary"
              icon={ArrowLeft}
              iconAnimation="translate"
            >
              Return Home
            </Button>
          </Link>
        </motion.div>

      </div>
    </PageTransition>
  );
};

export default PlaceholderPage;
