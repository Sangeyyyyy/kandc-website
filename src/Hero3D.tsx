import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { MeshTransmissionMaterial, Float, Environment, Lightformer } from '@react-three/drei';
import * as THREE from 'three';

export default function Hero3D() {
  const groupRef = useRef<THREE.Group>(null);
  const orb1Ref = useRef<THREE.Mesh>(null);
  const orb2Ref = useRef<THREE.Mesh>(null);
  const orb3Ref = useRef<THREE.Mesh>(null);
  const orb4Ref = useRef<THREE.Mesh>(null);
  
  const { viewport } = useThree();

  useFrame(({ pointer, clock }) => {
    const t = clock.getElapsedTime();
    
    if (groupRef.current) {
      // 1. Parallax Hover (Base Layer)
      const targetX = (pointer.x * viewport.width) / 10;
      const targetY = (pointer.y * viewport.height) / 10;
      
      groupRef.current.position.x += (targetX - groupRef.current.position.x) * 0.05;
      groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.05;

      // 2. Dynamic Refraction (Subtle Group Rotation based on mouse)
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, pointer.x * 0.5, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -pointer.y * 0.5, 0.05);
    }

    // 3. Orbital Animation & Repulsion
    // Calculate distance of pointer from center (mapped to 0-1 range)
    const dist = Math.sqrt(pointer.x * pointer.x + pointer.y * pointer.y);
    // Repel factor: strong when pointer is near center, 0 when far
    const repelFactor = Math.max(0, 1 - dist * 2.0); 
    // Target scale for orbits: they widen when repelled
    const targetScale = 1 + repelFactor * 0.8;

    // Orb 1: Central Core (Spins in place, slightly shrinks when repelled)
    if (orb1Ref.current) {
      orb1Ref.current.rotation.y += 0.005;
      orb1Ref.current.rotation.z += 0.002;
      const currentScale = orb1Ref.current.scale.x;
      const newScale = THREE.MathUtils.lerp(currentScale, 1 - repelFactor * 0.15, 0.1);
      orb1Ref.current.scale.set(newScale, newScale, newScale);
    }

    // Orb 2: Large Orb (Horizontal Orbit)
    if (orb2Ref.current) {
      const angle = t * 0.4;
      const baseRadius = 2.2;
      const radius = THREE.MathUtils.lerp(
        Math.sqrt(orb2Ref.current.position.x ** 2 + orb2Ref.current.position.z ** 2) || baseRadius,
        baseRadius * targetScale,
        0.1
      );
      orb2Ref.current.position.x = Math.cos(angle) * radius;
      orb2Ref.current.position.z = Math.sin(angle) * radius;
      orb2Ref.current.rotation.x += 0.01;
      orb2Ref.current.rotation.y += 0.02;
    }

    // Orb 3: Medium Orb (Vertical/Z Orbit)
    if (orb3Ref.current) {
      const angle = t * 0.6 + Math.PI;
      const baseRadius = 1.8;
      const radius = THREE.MathUtils.lerp(
        Math.sqrt(orb3Ref.current.position.y ** 2 + orb3Ref.current.position.z ** 2) || baseRadius,
        baseRadius * targetScale,
        0.1
      );
      orb3Ref.current.position.y = Math.cos(angle) * radius;
      orb3Ref.current.position.z = Math.sin(angle) * radius;
    }

    // Orb 4: Small Fast Orb (X/Y Orbit)
    if (orb4Ref.current) {
      const angle = t * 0.9;
      const baseRadius = 2.8;
      const radius = THREE.MathUtils.lerp(
        Math.sqrt(orb4Ref.current.position.x ** 2 + orb4Ref.current.position.y ** 2) || baseRadius,
        baseRadius * targetScale,
        0.1
      );
      orb4Ref.current.position.x = Math.cos(angle) * radius;
      orb4Ref.current.position.y = Math.sin(angle) * radius;
    }
  });

  // Base transmission settings
  const baseGlass = {
    backside: true,
    transmission: 1,
    roughness: 0.1,
    ior: 1.4,
    chromaticAberration: 0.08,
    anisotropy: 0.3,
    distortion: 0.1,
    distortionScale: 0.2,
    temporalDistortion: 0.05,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
    color: "#ffffff",
    attenuationDistance: 3,
    attenuationColor: "#eec0bf",
  };

  return (
    <>
      <color attach="background" args={['#0c0508']} />
      
      <ambientLight intensity={1.5} />
      <directionalLight position={[10, 10, 5]} intensity={3} color="#eec0bf" />
      <directionalLight position={[-10, -10, -5]} intensity={1.5} color="#ffffff" />
      
      <Environment resolution={256}>
        <group rotation={[-Math.PI / 3, 0, 1]}>
          <Lightformer form="circle" intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={2} color="#eec0bf" />
          <Lightformer form="circle" intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={2} />
          <Lightformer form="circle" intensity={3} rotation-y={Math.PI / 2} position={[10, 1, 0]} scale={8} color="#60213a" />
          <Lightformer form="ring" color="#ffffff" intensity={80} onUpdate={(self) => self.lookAt(0, 0, 0)} position={[0, 10, 0]} scale={10} />
        </group>
      </Environment>

      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5} floatingRange={[-0.15, 0.15]}>
        <group ref={groupRef}>
          {/* Central Core Sphere - High Quality */}
          <mesh ref={orb1Ref}>
            <sphereGeometry args={[1.3, 64, 64]} />
            <MeshTransmissionMaterial {...baseGlass} samples={16} resolution={1024} thickness={2.5} ior={1.5} />
          </mesh>

          {/* Large Orbiting Sphere - Medium Quality */}
          <mesh ref={orb2Ref}>
            <sphereGeometry args={[0.9, 48, 48]} />
            <MeshTransmissionMaterial {...baseGlass} samples={8} resolution={256} thickness={1.5} />
          </mesh>

          {/* Medium Orbiting Sphere - Medium Quality */}
          <mesh ref={orb3Ref}>
            <sphereGeometry args={[0.6, 48, 48]} />
            <MeshTransmissionMaterial {...baseGlass} samples={8} resolution={256} thickness={1.0} chromaticAberration={0.15} />
          </mesh>

          {/* Small Fast Sphere - Medium Quality */}
          <mesh ref={orb4Ref}>
            <sphereGeometry args={[0.35, 32, 32]} />
            <MeshTransmissionMaterial {...baseGlass} samples={6} resolution={256} thickness={0.5} attenuationColor="#60213a" />
          </mesh>
        </group>
      </Float>
    </>
  );
}
