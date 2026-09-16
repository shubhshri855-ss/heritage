import React, { useState, useEffect } from 'react';
import { ContactShadows } from '@react-three/drei';
import ThreeCanvas from './ThreeCanvas';
import ParticleField from './ParticleField';
import CameraController from './CameraController';
import ModelLoader from './ModelLoader';

function Ground({ isMobile }) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow={!isMobile}>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial color="#0a0a0a" roughness={1} metalness={0} />
    </mesh>
  );
}

export default function HeroScene() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full bg-[#050505]">
      <ThreeCanvas className="w-full h-full" preset="night">
        {/* Atmosphere */}
        <ParticleField />

        {/* Scene Architecture */}
        <ModelLoader type="hero" isMobile={isMobile} />
        <Ground isMobile={isMobile} />
        
        {/* Disable expensive shadows on mobile */}
        {!isMobile && (
          <ContactShadows position={[0, -0.99, 0]} opacity={0.9} scale={20} blur={2.5} far={4} color="#000000" />
        )}

        {/* Interaction */}
        <CameraController mode="parallax" />
      </ThreeCanvas>
      
      {/* Vignette Overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505] opacity-80 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-transparent opacity-60 pointer-events-none" />
    </div>
  );
}
