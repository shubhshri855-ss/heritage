import React from 'react';
import { Box } from 'lucide-react';

const LoadingScreen = ({ title, subtitle = "Loading 3D Assets" }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center space-y-8 p-8 h-full w-full">
      <Box size={64} className="mx-auto text-primary opacity-50 animate-pulse" strokeWidth={1} />
      <div className="text-center">
        <p className="text-primary tracking-widest text-sm uppercase mb-2">{subtitle}</p>
        <h2 className="text-4xl md:text-6xl font-cinzel text-text-primary">{title || 'Loading'}</h2>
      </div>
    </div>
  );
};

export default LoadingScreen;
