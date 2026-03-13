"use client";

import { PatternType } from "@/lib/types";
import { patterns, patternMap } from "@/lib/data/patterns";
import ArrowButton from "@/components/ui/ArrowButton";

interface PlateConfiguratorProps {
  middlePattern: PatternType;
  topPattern: PatternType;
  onMiddleChange: (p: PatternType) => void;
  onTopChange: (p: PatternType) => void;
}

export default function PlateConfigurator({
  middlePattern,
  topPattern,
  onMiddleChange,
  onTopChange,
}: PlateConfiguratorProps) {
  const cycle = (
    current: PatternType,
    direction: number,
    setter: (p: PatternType) => void
  ) => {
    const ids = patterns.map((p) => p.id);
    const idx = ids.indexOf(current);
    const next = (idx + direction + ids.length) % ids.length;
    setter(ids[next]);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xs font-medium uppercase tracking-widest text-muted">
        Personnalisez vos motifs
      </h3>

      <ConfigRow
        label="Assiette plate (dessus)"
        pattern={topPattern}
        onPrev={() => cycle(topPattern, -1, onTopChange)}
        onNext={() => cycle(topPattern, 1, onTopChange)}
      />

      <ConfigRow
        label="Assiette creuse (milieu)"
        pattern={middlePattern}
        onPrev={() => cycle(middlePattern, -1, onMiddleChange)}
        onNext={() => cycle(middlePattern, 1, onMiddleChange)}
      />

      <div className="flex items-center gap-3 py-2">
        <div
          className="h-4 w-4 rounded-full border border-border"
          style={{ backgroundColor: patternMap["uni"].colors.primary }}
        />
        <span className="text-sm text-muted">Bol (base) — toujours Uni</span>
      </div>
    </div>
  );
}

function ConfigRow({
  label,
  pattern,
  onPrev,
  onNext,
}: {
  label: string;
  pattern: PatternType;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm">{label}</span>
      <div className="flex items-center gap-3">
        <ArrowButton direction="left" onClick={onPrev} />
        <div className="flex items-center gap-2 w-32 justify-center">
          <div
            className="h-4 w-4 rounded-full border border-border"
            style={{ backgroundColor: patternMap[pattern].colors.primary }}
          />
          <span className="text-sm font-medium">{patternMap[pattern].name}</span>
        </div>
        <ArrowButton direction="right" onClick={onNext} />
      </div>
    </div>
  );
}
