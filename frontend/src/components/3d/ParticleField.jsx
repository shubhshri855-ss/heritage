import React, { useState, useEffect } from 'react';
import { Sparkles } from '@react-three/drei';

const ParticleField = ({ 
  count = 150, 
  scale = 15, 
  size = 2.5, 
  speed = 0.2, 
  opacity = 0.3, 
  color = "#c9a25b" 
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <Sparkles 
      count={isMobile ? Math.floor(count / 3) : count} 
      scale={scale} 
      size={isMobile ? size * 0.6 : size} 
      speed={speed} 
      opacity={opacity} 
      color={color} 
    />
  );
};

export default ParticleField;
