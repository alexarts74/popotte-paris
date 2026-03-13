"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { PatternType } from "@/lib/types";
import { patternMap } from "@/lib/data/patterns";

const RIM_COLOR = "#d4b896"; // gold accent for rim area
const PORCELAIN = "#f5f0eb";

function generatePatternTexture(
  type: PatternType,
  size = 1024
): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const pattern = patternMap[type];

  // Base porcelain white
  ctx.fillStyle = type === "uni" ? PORCELAIN : pattern.colors.primary;
  ctx.fillRect(0, 0, size, size);

  switch (type) {
    case "uni": {
      // Clean porcelain — very subtle warm grain
      for (let i = 0; i < 400; i++) {
        const x = Math.random() * size;
        const y = Math.random() * size;
        ctx.globalAlpha = Math.random() * 0.03;
        ctx.fillStyle = "#e8ddd4";
        ctx.beginPath();
        ctx.arc(x, y, Math.random() * 1.5 + 0.5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      break;
    }

    case "floral": {
      ctx.globalAlpha = 0.6;
      const count = 16;
      for (let i = 0; i < count; i++) {
        const cx = ((i % 4) + 0.5) * (size / 4);
        const cy = (Math.floor(i / 4) + 0.5) * (size / 4) + (i % 2 === 0 ? 20 : -20);
        drawFlower(ctx, cx, cy, 28 + Math.random() * 12, pattern.colors.secondary);
      }
      // Add delicate stems/leaves
      ctx.strokeStyle = pattern.colors.secondary;
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.25;
      for (let i = 0; i < 20; i++) {
        const sx = Math.random() * size;
        const sy = Math.random() * size;
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.quadraticCurveTo(
          sx + (Math.random() - 0.5) * 40,
          sy + Math.random() * 30,
          sx + (Math.random() - 0.5) * 60,
          sy + Math.random() * 50
        );
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      break;
    }

    case "geometrique": {
      ctx.strokeStyle = pattern.colors.secondary;
      ctx.lineWidth = 1.5;
      ctx.globalAlpha = 0.7;
      const step = size / 10;
      for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 10; col++) {
          const x = col * step;
          const y = row * step;
          const cx = x + step / 2;
          const cy = y + step / 2;

          // Hexagonal pattern
          ctx.beginPath();
          for (let k = 0; k < 6; k++) {
            const angle = (k / 6) * Math.PI * 2 - Math.PI / 6;
            const px = cx + Math.cos(angle) * step * 0.4;
            const py = cy + Math.sin(angle) * step * 0.4;
            if (k === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.closePath();
          ctx.stroke();
        }
      }
      ctx.globalAlpha = 1;
      break;
    }

    case "raye": {
      ctx.strokeStyle = pattern.colors.secondary;
      ctx.lineWidth = 3;
      ctx.globalAlpha = 0.5;
      const spacing = size / 20;
      for (let i = 0; i < 20; i++) {
        const y = i * spacing + spacing / 2;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(size, y);
        ctx.stroke();
      }
      // Thinner intermediate lines
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.2;
      for (let i = 0; i < 20; i++) {
        const y = i * spacing + spacing;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(size, y);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      break;
    }
  }

  // Gold rim accent — top band of the texture (maps to the rim of the plate)
  const rimHeight = size * 0.04;
  const gradient = ctx.createLinearGradient(0, 0, 0, rimHeight);
  gradient.addColorStop(0, RIM_COLOR);
  gradient.addColorStop(0.5, RIM_COLOR);
  gradient.addColorStop(1, "transparent");
  ctx.fillStyle = gradient;
  ctx.globalAlpha = 0.6;
  ctx.fillRect(0, 0, size, rimHeight);
  ctx.globalAlpha = 1;

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function drawFlower(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  r: number,
  color: string
) {
  ctx.fillStyle = color;
  const petals = 6;
  for (let i = 0; i < petals; i++) {
    const angle = (i / petals) * Math.PI * 2;
    const px = cx + Math.cos(angle) * r * 0.45;
    const py = cy + Math.sin(angle) * r * 0.45;
    ctx.beginPath();
    ctx.ellipse(px, py, r * 0.3, r * 0.14, angle, 0, Math.PI * 2);
    ctx.fill();
  }
  // Center dot
  ctx.fillStyle = PORCELAIN;
  ctx.beginPath();
  ctx.arc(cx, cy, r * 0.12, 0, Math.PI * 2);
  ctx.fill();
}

export function usePatternTexture(type: PatternType) {
  return useMemo(() => generatePatternTexture(type), [type]);
}
