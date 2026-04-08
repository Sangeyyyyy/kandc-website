import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { TorusKnot, MeshTransmissionMaterial, Float, Environment, Lightformer } from '@react-three/drei';
import * as THREE from 'three';

export default function Hero3D() {
  const mesh = useRef<THREE.Mesh>(null);

  // Gentle rotation on the Y axis over time
  useFrame((_, delta) => {
    if (mesh.current) {
      mesh.current.rotation.y += delta * 0.15;
      mesh.current.rotation.x += delta * 0.05;
    }
  });

  return (
    <>
      <color attach="background" args={['transparent']} />
      
      {/* Studio Lighting Setup for high-end glass reflections */}
      <ambientLight intensity={1.5} />
      <directionalLight position={[10, 10, 5]} intensity={3} />
      <directionalLight position={[-10, -10, -5]} intensity={1.5} color="#ffffff" />
      
      {/* Dynamic Environment for the glass to reflect */}
      <Environment resolution={256}>
        <group rotation={[-Math.PI / 3, 0, 1]}>
          <Lightformer form="circle" intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={2} />
          <Lightformer form="circle" intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={2} />
          <Lightformer form="circle" intensity={2} rotation-y={Math.PI / 2} position={[10, 1, 0]} scale={8} />
          <Lightformer form="ring" color="#fff" intensity={80} onUpdate={(self) => self.lookAt(0, 0, 0)} position={[0, 10, 0]} scale={10} />
        </group>
      </Environment>

      {/* Floating Abstract Crystal/Gem */}
      <Float
        speed={2} // Animation speed
        rotationIntensity={0.5} // XYZ rotation intensity
        floatIntensity={0.8} // Up/down float intensity
        floatingRange={[-0.1, 0.1]} // Range of y-axis float
      >
        <TorusKnot ref={mesh} args={[1.5, 0.4, 256, 64]} position={[0, 0, 0]}>
          <MeshTransmissionMaterial 
            backside={true}
            samples={16} // Increased for better glass quality
            resolution={512} // Increased resolution for refraction
            transmission={1} // CRITICAL: This makes it act like glass instead of plastic
            roughness={0.1} // Slightly frosted to catch more light
            thickness={1.5}
            ior={1.5} // Index of Refraction for standard glass
            chromaticAberration={0.06}
            anisotropy={0.1}
            distortion={0.1}
            distortionScale={0.3}
            temporalDistortion={0.1}
            clearcoat={1}
            clearcoatRoughness={0.1}
            color="#ffffff"
            attenuationDistance={2}
            attenuationColor="#ffffff" 
          />
        </TorusKnot>
      </Float>
    </>
  );
}
