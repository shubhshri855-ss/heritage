import React, { useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

const CameraController = ({ mode = 'parallax', ...props }) => {
  const { camera, mouse } = useThree();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Parallax mode for Hero Scene
  useFrame(() => {
    if (mode === 'parallax' && !isMobile) {
      // Smoothly interpolate camera position based on mouse
      const targetX = (mouse.x * 2);
      const targetY = (mouse.y * 1) + 4; // base height
      
      camera.position.x += (targetX - camera.position.x) * 0.05;
      camera.position.y += (targetY - camera.position.y) * 0.05;
      camera.lookAt(0, 2, 0);
    }
  });

  if (mode === 'orbit') {
    return (
      <OrbitControls 
        enablePan={false} 
        minDistance={5} 
        maxDistance={20} 
        maxPolarAngle={Math.PI / 2 - 0.05} // Prevent going below ground
        autoRotate
        autoRotateSpeed={0.5}
        {...props}
      />
    );
  }

  return null;
};

export default CameraController;
