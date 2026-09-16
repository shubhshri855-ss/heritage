import React from 'react';
import { motion } from 'framer-motion';
import { Bot, User } from 'lucide-react';

const AIChatMessage = ({ message }) => {
  const isAI = message.sender === 'ai';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`flex w-full gap-4 ${isAI ? 'justify-start' : 'justify-end'} mb-6`}
    >
      {/* AI Avatar */}
      {isAI && (
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center text-primary mt-1">
          <Bot size={20} />
        </div>
      )}

      {/* Message Bubble */}
      <div 
        className={`max-w-[80%] md:max-w-[70%] px-5 py-4 rounded-2xl ${
          isAI 
            ? 'bg-surface-light border border-white/5 text-text-secondary rounded-tl-none' 
            : 'bg-primary/20 border border-primary/30 text-text-primary rounded-tr-none backdrop-blur-md'
        }`}
      >
        <p className="whitespace-pre-wrap leading-relaxed text-sm md:text-base font-light">
          {message.text}
        </p>
        <span className="text-[10px] uppercase tracking-widest opacity-40 mt-2 block">
          {message.timestamp}
        </span>
      </div>

      {/* User Avatar */}
      {!isAI && (
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-text-secondary mt-1">
          <User size={20} />
        </div>
      )}
    </motion.div>
  );
};

export default AIChatMessage;
