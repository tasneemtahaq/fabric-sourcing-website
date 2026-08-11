"use client";

import { Canvas } from "@react-three/fiber";

import {
  PerspectiveCamera,
  Environment,
  Stars,
  OrbitControls,
} from "@react-three/drei";

import { useState } from "react";

import * as THREE from "three";

import Globe from "./Globe";
import TwinJetAircraft from "./TwinJetAircraft";
import DigitalPackage from "./DigitalPackage";
import CountrySparkle from "./CountrySparkle";

import { destinations } from "../lib/destination";
import { latLonToVector3 } from "@/lib/globe";

type Drop = {
  id: number;
  start: THREE.Vector3;
  target: THREE.Vector3;
};

export default function TwinJetScene() {
  const [drops, setDrops] =
    useState<Drop[]>([]);

  const [sparkles, setSparkles] =
    useState<
      {
        id: number;
        position: THREE.Vector3;
      }[]
    >([]);

  const handleDrop = (
    index: number,
    aircraftPosition: THREE.Vector3
  ) => {
    const destination =
      destinations[index];

    /*
     * Exact country position
     */

    const target =
      latLonToVector3(
        destination.lat,
        destination.lon,
        2.55
      );

    setDrops((current) => [
      ...current,
      {
        id: Date.now(),
        start: aircraftPosition.clone(),
        target: target.clone(),
      },
    ]);
  };

  return (
    <Canvas
      dpr={[1, 2]}
      gl={{
        antialias: true,
        alpha: true,
      }}
    >
      <PerspectiveCamera
        makeDefault
        position={[0, 0, 9]}
        fov={40}
      />

      {/* LIGHTING */}

      <ambientLight intensity={0.35} />

      <directionalLight
        position={[5, 6, 8]}
        intensity={3}
        color="#FFF4DF"
      />

      <pointLight
        position={[-5, 3, 5]}
        intensity={3}
        color="#C9A86A"
      />

      <Environment preset="studio" />

      {/* SPACE */}

      <Stars
        radius={30}
        depth={20}
        count={500}
        factor={1}
        saturation={0}
        fade
        speed={0.2}
      />

      {/* EARTH */}

      <Globe />

      {/* AIRCRAFT */}

      <TwinJetAircraft
        onDrop={handleDrop}
      />

      {/* FALLING PACKAGES */}

      {drops.map((drop) => (
        <DigitalPackage
          key={drop.id}
          start={drop.start}
          target={drop.target}
          onComplete={() => {
            setDrops((current) =>
              current.filter(
                (item) =>
                  item.id !== drop.id
              )
            );

            setSparkles((current) => [
              ...current,
              {
                id: drop.id,
                position:
                  drop.target.clone(),
              },
            ]);
          }}
        />
      ))}

      {/* IMPACT SPARKLES */}

      {sparkles.map((sparkle) => (
        <CountrySparkle
          key={sparkle.id}
          position={sparkle.position}
          onComplete={() => {
            setSparkles((current) =>
              current.filter(
                (item) =>
                  item.id !== sparkle.id
              )
            );
          }}
        />
      ))}

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={false}
      />
    </Canvas>
  );
}