"use client";

import ArrowButton from "@/components/ui/ArrowButton";

interface HeroOverlayProps {
  progress: number;
  topPos: number;
  middlePos: number;
  onCyclePattern: (layer: "middle" | "top", direction: number) => void;
}

export default function HeroOverlay({
  progress,
  topPos,
  middlePos,
  onCyclePattern,
}: HeroOverlayProps) {
  const controlsOpacity = Math.max(0, progress * 3 - 1);

  return (
    <div className="pointer-events-none absolute inset-0">
      {/* Top plate control */}
      <div
        className="pointer-events-auto absolute left-0 right-0"
        style={{
          top: `${topPos}%`,
          opacity: controlsOpacity,
          transform: `translateY(calc(-50% + ${(1 - controlsOpacity) * 20}px))`,
        }}
      >
        <PatternControl
          onPrev={() => onCyclePattern("top", -1)}
          onNext={() => onCyclePattern("top", 1)}
        />
      </div>

      {/* Middle plate control */}
      <div
        className="pointer-events-auto absolute left-0 right-0"
        style={{
          top: `${middlePos}%`,
          opacity: controlsOpacity,
          transform: `translateY(calc(-50% + ${(1 - controlsOpacity) * 20}px))`,
        }}
      >
        <PatternControl
          onPrev={() => onCyclePattern("middle", -1)}
          onNext={() => onCyclePattern("middle", 1)}
        />
      </div>

      {/* Brand mark */}
      <p className="absolute bottom-8 right-8 font-[family-name:var(--font-display)] text-xl font-light tracking-[0.1em] uppercase text-muted/60">
        Popote Paris
      </p>
    </div>
  );
}

function PatternControl({
  onPrev,
  onNext,
}: {
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div className="flex w-full items-center justify-between px-8">
      <ArrowButton direction="left" onClick={onPrev} />
      <ArrowButton direction="right" onClick={onNext} />
    </div>
  );
}
