"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

interface TwinJetAircraftProps {
  onDrop?: (
    index: number,
    aircraftPosition: THREE.Vector3
  ) => void;
}

export default function TwinJetAircraft({
  onDrop,
}: TwinJetAircraftProps) {
  const jet = useRef<THREE.Group>(null);

  const progress = useRef(0);
  const lastDrop = useRef(-1);

  useFrame((_, delta) => {
    const aircraft = jet.current;

    if (!aircraft) return;

    // ==========================================
    // AIRCRAFT ORBIT PROGRESS
    // ==========================================

    progress.current += delta * 0.055;

    // Restart the journey after completing one orbit
    if (progress.current > 1) {
      progress.current = 0;
      lastDrop.current = -1;
    }

    const t = progress.current;

    // ==========================================
    // AIRCRAFT ORBIT
    // ==========================================

    const radius = 3.35;

    const angle = t * Math.PI * 2;

    const x = Math.cos(angle) * radius;

    const z = Math.sin(angle) * radius;

    // Small vertical movement
    const y =
      Math.sin(angle * 2) * 0.45;

    aircraft.position.set(
      x,
      y,
      z
    );

    // ==========================================
    // AIRCRAFT FACING DIRECTION
    // ==========================================

    const nextAngle =
      angle + 0.01;

    const nextPosition =
      new THREE.Vector3(
        Math.cos(nextAngle) * radius,

        Math.sin(nextAngle * 2) *
          0.45,

        Math.sin(nextAngle) * radius
      );

    aircraft.lookAt(nextPosition);

    // ==========================================
    // DELIVERY POINTS
    // ==========================================

    const dropPoints = [
      0.08, // Pakistan
      0.30, // UAE
      0.52, // Saudi Arabia
      0.74, // UK
    ];

    dropPoints.forEach(
      (dropPoint, index) => {
        if (
          t >= dropPoint &&
          t < dropPoint + 0.008 &&
          lastDrop.current !== index
        ) {
          // Prevent the same package
          // from being dropped repeatedly
          lastDrop.current = index;

          // Save aircraft's current position
          const aircraftPosition =
            aircraft.position.clone();

          // Tell TwinJetScene to create
          // the falling package
          onDrop?.(
            index,
            aircraftPosition
          );
        }
      }
    );
  });

  return (
    <group
      ref={jet}
      scale={0.055}
    >
      {/* ==========================================
          MAIN AIRCRAFT BODY
      ========================================== */}

      <mesh>
        <capsuleGeometry
          args={[
            0.2,
            2.3,
            8,
            32,
          ]}
        />

        <meshPhysicalMaterial
          color="#EDE8FF"
          metalness={0.8}
          roughness={0.15}
          clearcoat={1}
          emissive="#5B4DFF"
          emissiveIntensity={0.35}
        />
      </mesh>

      {/* ==========================================
          NOSE
      ========================================== */}

      <mesh
        position={[
          0,
          0,
          1.35,
        ]}
        rotation={[
          Math.PI / 2,
          0,
          0,
        ]}
      >
        <coneGeometry
          args={[
            0.19,
            0.75,
            32,
          ]}
        />

        <meshPhysicalMaterial
          color="#FFFFFF"
          metalness={0.9}
          roughness={0.08}
          emissive="#B64DFF"
          emissiveIntensity={0.6}
        />
      </mesh>

      {/* ==========================================
          NEON WINGS
      ========================================== */}

      <mesh
        position={[
          0,
          0,
          0.05,
        ]}
        rotation={[
          0,
          0,
          Math.PI / 2,
        ]}
      >
        <boxGeometry
          args={[
            2,
            0.07,
            0.6,
          ]}
        />

        <meshPhysicalMaterial
          color="#FF5BD6"
          metalness={0.5}
          roughness={0.15}
          emissive="#FF159F"
          emissiveIntensity={2}
        />
      </mesh>

      {/* ==========================================
          SECOND NEON ACCENT
      ========================================== */}

      <mesh
        position={[
          0,
          0.08,
          -0.25,
        ]}
        rotation={[
          0,
          0,
          Math.PI / 2,
        ]}
      >
        <boxGeometry
          args={[
            1.2,
            0.045,
            0.3,
          ]}
        />

        <meshBasicMaterial
          color="#55F6FF"
        />
      </mesh>

      {/* ==========================================
          COCKPIT
      ========================================== */}

      <mesh
        position={[
          0,
          0.15,
          0.55,
        ]}
        scale={[
          0.6,
          0.18,
          0.42,
        ]}
      >
        <sphereGeometry
          args={[
            0.3,
            32,
            16,
          ]}
        />

        <meshPhysicalMaterial
          color="#101020"
          metalness={0.6}
          roughness={0.05}
          emissive="#6B5CFF"
          emissiveIntensity={1}
        />
      </mesh>

      {/* ==========================================
          LEFT ENGINE
      ========================================== */}

      <mesh
        position={[
          -0.27,
          -0.12,
          -0.6,
        ]}
        rotation={[
          Math.PI / 2,
          0,
          0,
        ]}
      >
        <cylinderGeometry
          args={[
            0.11,
            0.13,
            0.5,
            20,
          ]}
        />

        <meshPhysicalMaterial
          color="#6C61FF"
          metalness={0.7}
          roughness={0.15}
          emissive="#5C55FF"
          emissiveIntensity={2}
        />
      </mesh>

      {/* ==========================================
          RIGHT ENGINE
      ========================================== */}

      <mesh
        position={[
          0.27,
          -0.12,
          -0.6,
        ]}
        rotation={[
          Math.PI / 2,
          0,
          0,
        ]}
      >
        <cylinderGeometry
          args={[
            0.11,
            0.13,
            0.5,
            20,
          ]}
        />

        <meshPhysicalMaterial
          color="#FF4FCB"
          metalness={0.7}
          roughness={0.15}
          emissive="#FF159F"
          emissiveIntensity={2}
        />
      </mesh>

      {/* ==========================================
          ENGINE GLOW
      ========================================== */}

      <pointLight
        position={[
          0,
          0,
          -1,
        ]}
        color="#61F7FF"
        intensity={4}
        distance={2}
      />

      {/* ==========================================
          TINY DIGITAL PACKAGE
          CARRIED BY AIRCRAFT
      ========================================== */}

      <group
        position={[
          0,
          -0.42,
          0,
        ]}
      >
        <mesh>
          <boxGeometry
            args={[
              0.12,
              0.08,
              0.12,
            ]}
          />

          <meshPhysicalMaterial
            color="#FFE7A0"
            metalness={0.7}
            roughness={0.18}
            clearcoat={1}
            emissive="#FFD86A"
            emissiveIntensity={1.5}
          />
        </mesh>

        <pointLight
          color="#FFD76A"
          intensity={1}
          distance={0.6}
        />
      </group>
    </group>
  );
}