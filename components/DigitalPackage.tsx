"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

interface DigitalPackageProps {
  start: THREE.Vector3;
  target: THREE.Vector3;
  onComplete: () => void;
}

export default function DigitalPackage({
  start,
  target,
  onComplete,
}: DigitalPackageProps) {
  const packageRef = useRef<THREE.Group>(null);

  const progress = useRef(0);
  const completed = useRef(false);

  // Save starting and ending positions
  const startPosition = useRef(start.clone());
  const targetPosition = useRef(target.clone());

  useFrame((_, delta) => {
    if (!packageRef.current) return;

    if (completed.current) return;

    // Increase drop progress
    progress.current += delta * 0.8;

    // Keep between 0 and 1
    const t = Math.min(progress.current, 1);

    // Smooth falling animation
    const eased = 1 - Math.pow(1 - t, 3);

    // Move package from aircraft → country
    packageRef.current.position.lerpVectors(
      startPosition.current,
      targetPosition.current,
      eased
    );

    // Rotate while falling
    packageRef.current.rotation.x += delta * 4;
    packageRef.current.rotation.y += delta * 5;

    // When package reaches Earth
    if (t >= 1) {
      completed.current = true;

      // Hide package
      packageRef.current.visible = false;

      // Tell TwinJetScene that delivery is complete
      onComplete();
    }
  });

  return (
    <group
      ref={packageRef}
      position={start.toArray()}
      scale={0.35}
    >
      {/* DIGITAL PACKAGE */}

      <mesh>
        <boxGeometry
          args={[0.18, 0.13, 0.18]}
        />

        <meshPhysicalMaterial
          color="#F8E7B0"
          metalness={0.7}
          roughness={0.18}
          clearcoat={1}
          emissive="#FFD86A"
          emissiveIntensity={1.5}
        />
      </mesh>

      {/* Package glow */}

      <pointLight
        color="#FFD76A"
        intensity={2}
        distance={0.8}
      />
    </group>
  );
}