"use client";

import { useRef } from "react";
import { useFrame, invalidate } from "@react-three/fiber";
import * as THREE from "three";
import PlateModel, { HEIGHTS, NEST_OVERLAP } from "./PlateModel";
import { PlateConfig } from "@/lib/types";

interface PlateStack3DProps {
  config: PlateConfig;
  progress?: number;
  interactive?: boolean;
}

export default function PlateStack3D({
  config,
  progress = 0,
  interactive = false,
}: PlateStack3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  const prevProgress = useRef(progress);

  useFrame(() => {
    if (!groupRef.current) return;

    if (interactive) {
      groupRef.current.rotation.y += 0.003;
      invalidate();
    }

    if (Math.abs(prevProgress.current - progress) > 0.001) {
      prevProgress.current = progress;
      invalidate();
    }
  });

  // When nested (progress=0): pieces stack to form a single cylinder.
  // Overlap slightly so rims nest visually (outer radii shrink per layer).
  const bottomRestY = 0;
  const middleRestY = HEIGHTS.bottom - NEST_OVERLAP;
  const topRestY = HEIGHTS.bottom + HEIGHTS.middle - NEST_OVERLAP * 2;

  // 3 phases : séparation (0→0.5), retour (0.5→0.88), snap/bounce (0.88→1)
  let spread: number;
  let middleOffset: number;
  let tilt: number;
  let baseRotation: number;

  if (progress <= 0.5) {
    // Phase 1 — séparation
    const p = progress * 2;
    spread = p * 0.39;
    middleOffset = 0;
    tilt = p * 0.04;
    baseRotation = p * Math.PI * 0.35;
  } else if (progress <= 0.88) {
    // Phase 2 — retour vers position de repos
    const p = (progress - 0.5) / 0.38; // 0→1
    spread = (1 - p) * 0.39;
    middleOffset = 0;
    tilt = (1 - p) * 0.04;
    baseRotation = (1 - p) * Math.PI * 0.35;
  } else {
    // Phase 3 — bounce : compression au-delà du repos puis retour
    const p = (progress - 0.88) / 0.12; // 0→1
    const bounce = Math.sin(p * Math.PI) * 0.10;
    spread = -bounce;
    middleOffset = -bounce * 0.4;
    tilt = 0;
    baseRotation = 0;
  }

  return (
    <group ref={groupRef}>
      <PlateModel
        type="bottom"
        pattern={config.bottom}
        positionY={bottomRestY - spread}
        rotationY={baseRotation}
        tiltX={tilt * 0.5}
      />
      <PlateModel
        type="middle"
        pattern={config.middle}
        positionY={middleRestY + middleOffset}
        rotationY={baseRotation * 0.8}
        tiltX={tilt * 0.3}
      />
      <PlateModel
        type="top"
        pattern={config.top}
        positionY={topRestY + spread}
        rotationY={baseRotation * 0.6}
        tiltX={-tilt * 0.4}
      />
    </group>
  );
}
