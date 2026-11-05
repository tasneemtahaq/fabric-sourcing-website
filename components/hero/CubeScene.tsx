"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, Lightformer, Sparkles } from "@react-three/drei";
import type { MotionValue } from "framer-motion";
import RubiksCube from "./RubiksCube";

interface CubeSceneProps {
  progress: MotionValue<number>;
  frameloop: "always" | "demand" | "never";
  reducedMotion: boolean;
  onReady: () => void;
}

export default function CubeScene({ progress, frameloop, reducedMotion, onReady }: CubeSceneProps) {
  return (
    <Canvas
      frameloop={frameloop}
      dpr={[1, 1.75]}
      camera={{ position: [0, 0.4, 13], fov: 30 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
      onCreated={() => onReady()}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[-5, 4, 4]} intensity={40} color="#22e5d0" distance={20} />
      <pointLight position={[0, -3, 5]} intensity={55} color="#ec4899" distance={20} />
      <pointLight position={[6, 1, 3]} intensity={35} color="#fbbf24" distance={20} />

      {/* procedural environment: coloured reflections on the glass, no network fetch */}
      <Environment resolution={256} environmentIntensity={0.9}>
        <Lightformer form="rect" intensity={4} color="#22e5d0" position={[-5, 4, 3]} scale={[6, 4, 1]} />
        <Lightformer form="rect" intensity={3} color="#7c3aed" position={[5, 2, -3]} scale={[6, 3, 1]} />
        <Lightformer form="ring" intensity={3} color="#ec4899" position={[0, -3, 4]} scale={4} />
        <Lightformer form="rect" intensity={2} color="#fbbf24" position={[4, -1, 4]} scale={[3, 3, 1]} />
        <Lightformer form="rect" intensity={1.5} color="#ffffff" position={[0, 6, 0]} rotation-x={Math.PI / 2} scale={[10, 10, 1]} />
      </Environment>

      <Sparkles
        count={50}
        scale={[14, 8, 6]}
        size={2.2}
        speed={reducedMotion ? 0 : 0.25}
        color="#a5b4fc"
        opacity={0.7}
      />

      <RubiksCube progress={progress} reducedMotion={reducedMotion} />
    </Canvas>
  );
}
