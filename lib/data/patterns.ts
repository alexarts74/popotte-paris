import { Pattern } from "@/lib/types";

export const patterns: Pattern[] = [
  {
    id: "uni",
    name: "Uni",
    colors: { primary: "#f5f0eb", secondary: "#e8e0d6" },
  },
  {
    id: "floral",
    name: "Floral",
    colors: { primary: "#d4a574", secondary: "#8b6f47" },
  },
  {
    id: "geometrique",
    name: "Géométrique",
    colors: { primary: "#2c3e50", secondary: "#c8a97e" },
  },
  {
    id: "raye",
    name: "Rayé",
    colors: { primary: "#1a1a2e", secondary: "#f5f0eb" },
  },
];

export const patternMap = Object.fromEntries(
  patterns.map((p) => [p.id, p])
) as Record<string, Pattern>;
