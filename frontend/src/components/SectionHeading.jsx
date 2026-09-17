import React from 'react';
import { motion } from 'framer-motion';

const SectionHeading = ({ subtitle, title, titleHighlight, className = '' }) => {
  return (
    <div className={`max-w-4xl mb-16 ${className}`}>
      {subtitle && (
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-primary tracking-[0.2em] uppercase text-sm font-medium mb-4"
        >
          {subtitle}
        </motion.p>
      )}
      <motion.h3 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: subtitle ? 0.1 : 0 }}
        className="text-4xl md:text-5xl lg:text-6xl font-cinzel font-semibold text-text-primary leading-normal pb-2"
      >
        {title} {titleHighlight && <span className="text-primary italic font-light">{titleHighlight}</span>}
      </motion.h3>
    </div>
  );
};

export default SectionHeading;
