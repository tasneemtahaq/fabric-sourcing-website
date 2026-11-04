"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import Robot from "./Robot";

interface RobotSceneProps {
  frameloop: "always" | "demand" | "never";
  reducedMotion: boolean;
}

export default function RobotScene({ frameloop, reducedMotion }: RobotSceneProps) {
  return (
    <Canvas
      frameloop={frameloop}
      dpr={[1, 1.75]}
      camera={{ position: [0, 0.3, 7], fov: 32 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
    >
      {/* Warm golden key from the sun side, cyan + purple rims */}
      <ambientLight intensity={0.35} />
      <directionalLight position={[-4, 5, 3]} intensity={2.4} color="#ffc783" />
      <directionalLight position={[5, 2, -3]} intensity={2.2} color="#4cc9ff" />
      <pointLight position={[0, -2, 4]} intensity={18} color="#a78bfa" distance={12} />

      {/* Procedural studio environment: gives the ceramic/glass real reflections, no network fetch */}
      <Environment resolution={256} environmentIntensity={0.9}>
        <Lightformer form="rect" intensity={4} color="#ffd9a0" position={[-5, 4, 3]} scale={[6, 4, 1]} />
        <Lightformer form="rect" intensity={3} color="#5cc8ff" position={[5, 2, -3]} scale={[6, 3, 1]} />
        <Lightformer form="ring" intensity={2} color="#a78bfa" position={[0, -3, 4]} scale={4} />
        <Lightformer form="rect" intensity={1.5} color="#ffffff" position={[0, 6, 0]} rotation-x={Math.PI / 2} scale={[10, 10, 1]} />
      </Environment>

      <Suspense fallback={null}>
        <Robot reducedMotion={reducedMotion} />
      </Suspense>
    </Canvas>
  );
}
