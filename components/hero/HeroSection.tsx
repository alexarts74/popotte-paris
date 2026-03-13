"use client";

import { useRef, useState, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "@/lib/animations/gsap-register";
import PlateScene from "@/components/three/PlateScene";
import HeroOverlay from "./HeroOverlay";
import { patterns } from "@/lib/data/patterns";
import { PatternType, PlateConfig } from "@/lib/types";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [middlePattern, setMiddlePattern] = useState<PatternType>("floral");
  const [topPattern, setTopPattern] = useState<PatternType>("floral");
  const [platePositions, setPlatePositions] = useState({ top: 50, middle: 50 });

  const config: PlateConfig = {
    bottom: "uni",
    middle: middlePattern,
    top: topPattern,
  };

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom top",
      scrub: 0.5,
      onUpdate: (self) => setScrollProgress(self.progress),
    });
  }, { scope: containerRef });

  const cyclePattern = useCallback(
    (layer: "middle" | "top", direction: number) => {
      const patternTypes = patterns.map((p) => p.id);
      const setter = layer === "middle" ? setMiddlePattern : setTopPattern;
      setter((prev) => {
        const idx = patternTypes.indexOf(prev);
        const next = (idx + direction + patternTypes.length) % patternTypes.length;
        return patternTypes[next];
      });
    },
    []
  );

  return (
    <section ref={containerRef} className="relative h-[200vh]">
      <div className="sticky top-0 h-dvh">
        <PlateScene
          config={config}
          progress={scrollProgress}
          className="absolute inset-0 h-full w-full"
          onPlatePositions={setPlatePositions}
        />
        <HeroOverlay
          progress={scrollProgress}
          topPos={platePositions.top}
          middlePos={platePositions.middle}
          onCyclePattern={cyclePattern}
        />
      </div>
    </section>
  );
}
