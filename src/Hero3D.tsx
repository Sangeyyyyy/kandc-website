import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { TorusKnot, MeshTransmissionMaterial, Float, Environment, Lightformer } from '@react-three/drei';
import * as THREE from 'three';

export default function Hero3D() {
  const mesh = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();

  // Gentle rotation and mouse follow on the Y and X axes
  useFrame(({ pointer }) => {
    if (mesh.current) {
      // Base continuous rotation
      mesh.current.rotation.y += 0.003;
      mesh.current.rotation.x += 0.001;
      
      // Mouse follow effect mapped to the viewport
      const targetX = (pointer.x * viewport.width) / 10;
      const targetY = (pointer.y * viewport.height) / 10;
      
      mesh.current.position.x += (targetX - mesh.current.position.x) * 0.05;
      mesh.current.position.y += (targetY - mesh.current.position.y) * 0.05;
    }
  });

  return (
    <>
      <color attach="background" args={['#0c0508']} /> {/* Dark ink background */}
      
      {/* Studio Lighting Setup for high-end glass reflections */}
      <ambientLight intensity={1.5} />
      <directionalLight position={[10, 10, 5]} intensity={3} color="#eec0bf" /> {/* Rose tint */}
      <directionalLight position={[-10, -10, -5]} intensity={1.5} color="#ffffff" />
      
      {/* Dynamic Environment for the glass to reflect */}
      <Environment resolution={256}>
        <group rotation={[-Math.PI / 3, 0, 1]}>
          <Lightformer form="circle" intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={2} color="#eec0bf" />
          <Lightformer form="circle" intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={2} />
          <Lightformer form="circle" intensity={3} rotation-y={Math.PI / 2} position={[10, 1, 0]} scale={8} color="#60213a" /> {/* Burgundy tint */}
          <Lightformer form="ring" color="#ffffff" intensity={80} onUpdate={(self) => self.lookAt(0, 0, 0)} position={[0, 10, 0]} scale={10} />
        </group>
      </Environment>

      {/* Floating Abstract Crystal/Lens */}
      <Float
        speed={1.5} // Animation speed
        rotationIntensity={0.5} // XYZ rotation intensity
        floatIntensity={0.8} // Up/down float intensity
        floatingRange={[-0.2, 0.2]} // Range of y-axis float
      >
        <TorusKnot ref={mesh} args={[2.5, 0.8, 256, 64]} position={[0, 0, 0]}>
          <MeshTransmissionMaterial 
            backside={true}
            samples={16} // High sample count for premium render
            resolution={1024} // High resolution for refraction clarity
            transmission={1} // CRITICAL: Acts like glass
            roughness={0.15} // Slightly frosted
            thickness={2} // Gives depth to the refraction
            ior={1.5} // Index of Refraction for standard glass
            chromaticAberration={0.05} // Subtle color splitting
            anisotropy={0.3}
            distortion={0.2} // Organic liquid feel
            distortionScale={0.3}
            temporalDistortion={0.1} // Evolves over time
            clearcoat={1}
            clearcoatRoughness={0.1}
            color="#ffffff"
            attenuationDistance={3}
            attenuationColor="#eec0bf" // Rose internal reflection
          />
        </TorusKnot>
      </Float>
    </>
  );
}
