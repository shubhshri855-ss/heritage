import React, { useState, useEffect } from 'react';
import { ContactShadows } from '@react-three/drei';
import ThreeCanvas from './ThreeCanvas';
import ParticleField from './ParticleField';
import CameraController from './CameraController';
import ModelLoader from './ModelLoader';

function Ground({ isMobile }) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow={!isMobile}>
      <planeGeometry args={[100, 100]} />
      {/* Very dark floor to blend with the background */}
      <meshStandardMaterial color="#0a0a0a" roughness={0.9} metalness={0.1} />
    </mesh>
  );
}

export default function HeritageScene({ monumentId }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="w-full h-full bg-[#050505] relative overflow-hidden flex-1">
      <ThreeCanvas 
        className="w-full h-full" 
        camera={{ position: [6, 4, 8], fov: 45 }} 
        preset="night" 
        includeBaseLighting={false}
      >
        <ambientLight intensity={0.1} />
        
        {/* Main dramatic spotlight */}
        <spotLight 
          castShadow={!isMobile} 
          position={[5, 10, 5]} 
          intensity={500} 
          angle={0.5}
          penumbra={0.5}
          color="#c9a25b" // Muted gold light
          shadow-mapSize={isMobile ? [1024, 1024] : [2048, 2048]}
        />
        
        {/* Soft fill light */}
        <spotLight 
          position={[-5, 5, -5]} 
          intensity={100} 
          angle={1}
          penumbra={1}
          color="#e07a5f" // Terracotta fill
        />
        
        {/* Atmosphere */}
        <ParticleField count={100} scale={10} size={2} />

        {/* Objects */}
        <ModelLoader type="heritage" isMobile={isMobile} position={[0, -0.5, 0]} monumentId={monumentId} />
        <Ground isMobile={isMobile} />
        
        {/* Deep shadows */}
        {!isMobile && (
          <ContactShadows position={[0, -1.99, 0]} opacity={0.8} scale={15} blur={2.5} far={4} color="#000000" />
        )}

        {/* Controls */}
        <CameraController mode="orbit" />
      </ThreeCanvas>
      
      {/* Overlay UI */}
      <div className="absolute top-6 left-6 pointer-events-none z-10">
        <h3 className="text-xl font-cinzel font-bold text-text-primary tracking-wider">Virtual Relic</h3>
        <p className="text-sm text-text-secondary mt-1 font-light tracking-wide uppercase">Interactive Sandbox</p>
      </div>
      <div className="absolute bottom-6 right-6 pointer-events-none z-10">
        <div className="px-4 py-2 bg-background/80 backdrop-blur-md rounded-full border border-white/5 text-xs text-primary tracking-widest uppercase shadow-xl">
          Drag to explore
        </div>
      </div>
    </div>
  );
}
