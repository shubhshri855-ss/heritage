import React from 'react';
import { motion } from 'framer-motion';

const FeatureCard = ({ num, title, desc, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative p-8 rounded-2xl bg-surface-light/30 border border-white/5 hover:bg-black/80 hover:border-primary/30 transition-all duration-500 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <div className="relative z-10 flex flex-col h-full">
        <span className="text-4xl font-cinzel font-light text-primary/40 mb-12 group-hover:text-primary transition-colors duration-500">
          {num}
        </span>
        <div className="mt-auto">
          <h4 className="text-sm font-medium tracking-widest text-text-primary uppercase mb-4 group-hover:text-white transition-colors duration-300">
            {title}
          </h4>
          <p className="text-sm text-text-secondary font-light leading-relaxed group-hover:text-white/90 transition-colors duration-300">
            {desc}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default FeatureCard;
