import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const RealModel = ({ isMobile, url = '/models/taj-mahal.glb', monumentId }) => {
  // We can use monumentId to load different models if available, but for now fallback to taj mahal
  const normalizedId = monumentId?.toLowerCase().replace(/ /g, '-');
  const modelUrl = normalizedId === 'taj-mahal' || !monumentId ? '/models/taj-mahal.glb' : url;
  const { scene } = useGLTF(modelUrl);
  
  // Apply material settings if needed, or rely on the model's baked materials
  scene.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = !isMobile;
      child.receiveShadow = !isMobile;
    }
  });

  // Scale down the model to fit our scene appropriately
  // You may need to adjust the scale/position based on the specific GLB's bounding box
  return <primitive object={scene} scale={0.015} position={[0, 0, 0]} />;
};

const ModelLoader = ({ type = 'hero', isMobile = false, monumentId = null, ...props }) => {
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (groupRef.current) {
      if (type === 'hero' && !isMobile) {
        const idleRotation = state.clock.getElapsedTime() * 0.15;
        const mouseOffset = state.mouse.x * Math.PI;
        const targetRotation = idleRotation + mouseOffset;
        groupRef.current.rotation.y += (targetRotation - groupRef.current.rotation.y) * 0.05;
      } else {
        groupRef.current.rotation.y += delta * 0.05;
      }
    }
  });

  const material = new THREE.MeshStandardMaterial({
    color: '#d4a373',
    roughness: 0.9,
    metalness: 0.1,
    envMapIntensity: 0.5,
  });

  // Helper to normalize id
  const normalizedId = monumentId?.toLowerCase().replace(/ /g, '-');

  // Load real model for Taj Mahal
  if (normalizedId === 'taj-mahal') {
    return (
      <group ref={groupRef} position={[0, -0.5, 0]} {...props}>
        <Float speed={1.5} rotationIntensity={0.05} floatIntensity={0.2}>
          <RealModel isMobile={isMobile} monumentId={monumentId} />
        </Float>
      </group>
    );
  }

  if (type === 'hero') {
    return (
      <group ref={groupRef} position={[0, 0, 0]} {...props}>
        <Float speed={1.5} rotationIntensity={0.05} floatIntensity={0.2}>
          <mesh position={[0, 4, 0]} material={material} castShadow={!isMobile} receiveShadow={!isMobile}>
            <sphereGeometry args={[2, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          </mesh>
          <mesh position={[0, 3.5, 0]} material={material} castShadow={!isMobile} receiveShadow={!isMobile}>
            <cylinderGeometry args={[2.2, 2.2, 1, 32]} />
          </mesh>
        </Float>
        {[-3, 3].map((x) => (
          <React.Fragment key={x}>
            {[-3, 3].map((z) => (
              <mesh key={`${x}-${z}`} position={[x, 2, z]} material={material} castShadow={!isMobile} receiveShadow={!isMobile}>
                <cylinderGeometry args={[0.4, 0.5, 4, 16]} />
              </mesh>
            ))}
          </React.Fragment>
        ))}
        <mesh position={[0, -0.25, 0]} material={material} castShadow={!isMobile} receiveShadow={!isMobile}>
          <boxGeometry args={[10, 0.5, 10]} />
        </mesh>
        <mesh position={[0, -0.75, 0]} material={material} castShadow={!isMobile} receiveShadow={!isMobile}>
          <boxGeometry args={[12, 0.5, 12]} />
        </mesh>
      </group>
    );
  }

  // Heritage / specific model placeholder
  return (
    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.5}>
      <mesh
        ref={groupRef}
        scale={1.2}
        material={material}
        castShadow={!isMobile}
        receiveShadow={!isMobile}
        {...props}
      >
        <cylinderGeometry args={[1, 1.3, 3.5, 64]} />
      </mesh>
    </Float>
  );
};

export default ModelLoader;

// Preload the default model for faster rendering
useGLTF.preload('/models/taj-mahal.glb');
