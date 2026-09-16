import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';

const ThreeCanvas = ({ 
  children, 
  camera = { position: [0, 4, 15], fov: 45 },
  className = "absolute inset-0 w-full h-full bg-[#050505]",
  includeBaseLighting = true,
  preset = "night"
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className={className}>
      <Canvas 
        shadows={!isMobile} 
        dpr={isMobile ? [1, 1] : [1, 1.5]} 
        camera={camera}
      >
        <color attach="background" args={['#050505']} />
        <fog attach="fog" args={['#050505', 10, 40]} />
        
        {includeBaseLighting && (
          <>
            <ambientLight intensity={0.2} />
            <spotLight 
              castShadow={!isMobile} 
              position={[10, 15, 10]} 
              intensity={800} 
              angle={0.6}
              penumbra={0.5}
              color="#c9a25b"
              shadow-mapSize={isMobile ? [1024, 1024] : [2048, 2048]}
            />
            <spotLight 
              position={[-10, 5, -10]} 
              intensity={200} 
              angle={1}
              penumbra={1}
              color="#e07a5f"
            />
          </>
        )}

        <Environment preset={preset} />
        {children}
      </Canvas>
    </div>
  );
};

export default ThreeCanvas;
