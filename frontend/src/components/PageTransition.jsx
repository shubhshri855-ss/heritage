import React from 'react';
import { motion } from 'framer-motion';

const PageTransition = ({ children, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      onAnimationComplete={(definition) => {
        if (definition.opacity === 1) {
          const el = document.querySelector('.page-transition-wrapper');
          if (el) el.style.transform = 'none';
        }
      }}
      className={`page-transition-wrapper w-full h-full ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
