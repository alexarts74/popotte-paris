"use client";

import { Suspense, useRef } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment } from "@react-three/drei";
import * as THREE from "three";
import PlateStack3D from "./PlateStack3D";
import { HEIGHTS, NEST_OVERLAP } from "./PlateModel";
import { PlateConfig } from "@/lib/types";

interface PlatePositions {
  top: number;
  middle: number;
}

interface PlateSceneProps {
  config: PlateConfig;
  progress?: number;
  interactive?: boolean;
  className?: string;
  cameraPosition?: [number, number, number];
  onPlatePositions?: (pos: PlatePositions) => void;
}

function PositionReporter({
  progress,
  onPositions,
}: {
  progress: number;
  onPositions: (pos: PlatePositions) => void;
}) {
  const { camera } = useThree();
  const lastRef = useRef({ top: 50, middle: 50 });

  useFrame(() => {
    // Replicate exact spread logic from PlateStack3D
    let spread: number;
    let middleOffset: number;
    if (progress <= 0.5) {
      const p = progress * 2;
      spread = p * 0.3;
      middleOffset = 0;
    } else if (progress <= 0.88) {
      const p = (progress - 0.5) / 0.38;
      spread = (1 - p) * 0.3;
      middleOffset = 0;
    } else {
      const p = (progress - 0.88) / 0.12;
      const bounce = Math.sin(p * Math.PI) * 0.1;
      spread = -bounce;
      middleOffset = -bounce * 0.4;
    }

    const topRestY = HEIGHTS.bottom + HEIGHTS.middle - NEST_OVERLAP * 2;
    const middleRestY = HEIGHTS.bottom - NEST_OVERLAP;

    const topWorldY = topRestY + spread + HEIGHTS.top / 2;
    const middleWorldY = middleRestY + middleOffset + HEIGHTS.middle / 2;

    const topNDC = new THREE.Vector3(0, topWorldY, 0).project(camera);
    const midNDC = new THREE.Vector3(0, middleWorldY, 0).project(camera);

    const top = ((1 - topNDC.y) / 2) * 100;
    const middle = ((1 - midNDC.y) / 2) * 100;

    if (
      Math.abs(top - lastRef.current.top) > 0.1 ||
      Math.abs(middle - lastRef.current.middle) > 0.1
    ) {
      lastRef.current = { top, middle };
      onPositions({ top, middle });
    }
  });

  return null;
}

export default function PlateScene({
  config,
  progress = 0,
  interactive = false,
  className = "",
  cameraPosition = [0, 0.25, 4.2],
  onPlatePositions,
}: PlateSceneProps) {
  return (
    <div className={className}>
      <Canvas
        frameloop="demand"
        camera={{ position: cameraPosition, fov: 30 }}
        gl={{ antialias: true, alpha: true, toneMapping: 3 }}
        style={{ background: "transparent" }}
        onCreated={({ camera }) => {
          camera.lookAt(0, 0.25, 0);
          camera.updateProjectionMatrix();
        }}
      >
        <Suspense fallback={null}>
          {/* Key light — warm, from above-right */}
          <directionalLight
            position={[4, 6, 4]}
            intensity={1.5}
            castShadow
            color="#fff5eb"
          />
          {/* Fill light — cool, subtle */}
          <directionalLight
            position={[-3, 4, -2]}
            intensity={0.4}
            color="#e0e8f0"
          />
          {/* Rim light — from behind */}
          <directionalLight
            position={[0, 2, -5]}
            intensity={0.6}
            color="#ffffff"
          />
          {/* Ambient base */}
          <ambientLight intensity={0.3} color="#f0ece6" />

          <PlateStack3D
            config={config}
            progress={progress}
            interactive={interactive}
          />

          {onPlatePositions && (
            <PositionReporter
              progress={progress}
              onPositions={onPlatePositions}
            />
          )}

          <ContactShadows
            position={[0, -0.02, 0]}
            opacity={0.25}
            scale={4}
            blur={2.5}
            far={2}
            color="#1a1510"
          />

          <Environment preset="studio" environmentIntensity={0.6} />
        </Suspense>
      </Canvas>
    </div>
  );
}
