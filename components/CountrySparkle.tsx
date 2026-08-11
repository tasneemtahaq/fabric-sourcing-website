"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

interface CountrySparkleProps {
  position: THREE.Vector3;
  onComplete: () => void;
}

export default function CountrySparkle({
  position,
  onComplete,
}: CountrySparkleProps) {
  const sparkle = useRef<THREE.Group>(null);

  const progress = useRef(0);

  useFrame((_, delta) => {
    if (!sparkle.current) return;

    progress.current += delta * 4;

    const t = progress.current;

    /*
     * Star grows quickly
     */
    const scale =
      Math.sin(Math.min(t, Math.PI)) * 1.8;

    sparkle.current.scale.setScalar(
      Math.max(scale, 0)
    );

    /*
     * Fade away
     */
    if (t > Math.PI) {
      sparkle.current.visible = false;

      onComplete();
    }
  });

  return (
    <group
      ref={sparkle}
      position={position}
      scale={0}
    >
      {/* CENTER STAR */}

      <mesh>
        <sphereGeometry
          args={[0.045, 16, 16]}
        />

        <meshBasicMaterial
          color="#FFFFFF"
        />
      </mesh>

      {/* VERTICAL LIGHT */}

      <mesh scale={[0.025, 1, 0.025]}>
        <planeGeometry args={[0.35, 0.35]} />

        <meshBasicMaterial
          color="#FFE7A0"
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* HORIZONTAL LIGHT */}

      <mesh
        rotation={[0, 0, Math.PI / 2]}
        scale={[0.025, 1, 0.025]}
      >
        <planeGeometry args={[0.35, 0.35]} />

        <meshBasicMaterial
          color="#FFFFFF"
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* STAR GLOW */}

      <pointLight
        color="#FFD76A"
        intensity={5}
        distance={1.2}
      />
    </group>
  );
}