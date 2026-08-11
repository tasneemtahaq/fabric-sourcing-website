"use client";


import { useTexture } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

export default function Globe() {
  const globe = useRef<THREE.Group>(null);

  const earthTexture = useTexture("/earth/earth-night.jpg");

 

  return (
    <group ref={globe}>
      {/* EARTH */}

      <mesh>
        <sphereGeometry args={[2.5, 128, 128]} />

        <meshStandardMaterial
          map={earthTexture}
          metalness={0.15}
          roughness={0.72}
        />
      </mesh>

      {/* SUBTLE ATMOSPHERE */}

      <mesh scale={1.025}>
        <sphereGeometry args={[2.5, 96, 96]} />

        <meshBasicMaterial
          color="#8EEBFF"
          transparent
          opacity={0.055}
          side={THREE.BackSide}
        />
      </mesh>

      {/* INNER GOLD/WHITE GLOW */}

      <mesh scale={1.012}>
        <sphereGeometry args={[2.5, 96, 96]} />

        <meshBasicMaterial
          color="#D9C7A0"
          transparent
          opacity={0.025}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}