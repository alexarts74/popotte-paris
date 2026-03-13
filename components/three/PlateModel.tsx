"use client";

import { useMemo, useRef, useEffect } from "react";
import { useFrame, invalidate } from "@react-three/fiber";
import * as THREE from "three";
import { usePatternTexture } from "./PatternMaterial";
import { PatternType } from "@/lib/types";

export type PlateType = "bottom" | "middle" | "top";

interface PlateModelProps {
  type: PlateType;
  pattern: PatternType;
  positionY?: number;
  rotationY?: number;
  tiltX?: number;
}

// Cylindrical nesting plates — straight vertical walls, flat bottom.
// Stacked they form a single smooth cylinder (like the reference photo).
// Each piece is slightly smaller in radius to nest inside the one below.
// Gold accent rim at top edge.

const R = 1.0;
const WALL = 0.028;
const GAP = 0.005;
const LIP = 0.012;

export const NEST_OVERLAP = 0.15;

// Heights — stacked total ≈ 0.50
export const HEIGHTS = {
  bottom: 0.22,
  middle: 0.16,
  top: 0.12,
};

function createPlateProfile(type: PlateType): THREE.Vector2[] {
  const layerIndex = type === "bottom" ? 0 : type === "middle" ? 1 : 2;
  const outerR = R - layerIndex * (WALL + GAP);
  const innerR = outerR - WALL;
  const h = HEIGHTS[type];

  return [
    // Bottom flat base
    new THREE.Vector2(0, 0),
    new THREE.Vector2(innerR * 0.4, 0),
    new THREE.Vector2(innerR * 0.8, 0.001),
    new THREE.Vector2(outerR - 0.015, 0.001),
    // Subtle rounded corner bottom→wall
    new THREE.Vector2(outerR - 0.006, 0.004),
    new THREE.Vector2(outerR, 0.012),
    // Straight vertical outer wall
    new THREE.Vector2(outerR, h - 0.008),
    // Rim — outward lip only on top plate (decorative); flush on others
    ...(type === "top"
      ? [
          new THREE.Vector2(outerR + LIP * 0.5, h - 0.003),
          new THREE.Vector2(outerR + LIP, h),
          new THREE.Vector2(outerR + LIP, h - WALL * 0.35),
        ]
      : [
          new THREE.Vector2(outerR + 0.002, h - 0.002),
          new THREE.Vector2(outerR, h),
          new THREE.Vector2(outerR, h - WALL * 0.35),
        ]),
    new THREE.Vector2(innerR + 0.006, h - WALL * 0.6),
    // Inner wall going down (straight vertical)
    new THREE.Vector2(innerR, h - 0.012),
    new THREE.Vector2(innerR, 0.025),
    // Inner floor — very slightly concave
    new THREE.Vector2(innerR - 0.015, 0.018),
    new THREE.Vector2(innerR * 0.5, WALL + 0.004),
    new THREE.Vector2(innerR * 0.15, WALL + 0.006),
    new THREE.Vector2(0, WALL + 0.006),
  ];
}

export default function PlateModel({
  type,
  pattern,
  positionY = 0,
  rotationY = 0,
  tiltX = 0,
}: PlateModelProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = usePatternTexture(pattern);

  // Transition animation state
  const transitionRef = useRef({
    active: false,
    progress: 0,
    prevPattern: pattern,
  });

  // Trigger animation when pattern changes
  useEffect(() => {
    if (transitionRef.current.prevPattern !== pattern) {
      transitionRef.current.active = true;
      transitionRef.current.progress = 0;
      transitionRef.current.prevPattern = pattern;
      invalidate(); // kick-start the render loop in demand mode
    }
  }, [pattern]);

  // Store base props in a ref so useFrame can access them
  const propsRef = useRef({ positionY, rotationY, tiltX });
  propsRef.current = { positionY, rotationY, tiltX };

  useFrame((_, delta) => {
    const t = transitionRef.current;
    const mesh = meshRef.current;
    if (!mesh) return;

    if (t.active) {
      t.progress += delta * 2.5; // ~0.4s animation

      if (t.progress >= 1) {
        t.active = false;
        t.progress = 0;
      }
    }

    // Apply base props + animated offsets
    const bounce = t.active ? Math.sin(t.progress * Math.PI) : 0;
    const { positionY: py, rotationY: ry, tiltX: tx } = propsRef.current;

    mesh.position.y = py + bounce * 0.12;
    mesh.rotation.set(tx, ry + bounce * Math.PI * 0.5, 0);
    mesh.scale.setScalar(1 + bounce * 0.06);

    if (t.active) invalidate();
  });

  const geometry = useMemo(() => {
    const profile = createPlateProfile(type);
    const geo = new THREE.LatheGeometry(profile, 128);
    geo.computeVertexNormals();
    return geo;
  }, [type]);

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      position={[0, positionY, 0]}
      rotation={[tiltX, rotationY, 0]}
      castShadow
      receiveShadow
    >
      <meshPhysicalMaterial
        map={texture}
        roughness={0.15}
        metalness={0.0}
        clearcoat={0.8}
        clearcoatRoughness={0.1}
        reflectivity={0.5}
        envMapIntensity={1.2}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
