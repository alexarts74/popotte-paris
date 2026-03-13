import { Product } from "@/lib/types";

export const products: Product[] = [
  {
    slug: "classique-blanc",
    name: "Classique Blanc",
    config: { bottom: "uni", middle: "uni", top: "uni" },
    prices: { unit: 45, pack4: 160, pack6: 220 },
  },
  {
    slug: "jardin-fleuri",
    name: "Jardin Fleuri",
    config: { bottom: "uni", middle: "floral", top: "floral" },
    prices: { unit: 55, pack4: 195, pack6: 270 },
  },
  {
    slug: "art-deco",
    name: "Art Déco",
    config: { bottom: "uni", middle: "geometrique", top: "geometrique" },
    prices: { unit: 55, pack4: 195, pack6: 270 },
  },
  {
    slug: "marin",
    name: "Marin",
    config: { bottom: "uni", middle: "raye", top: "raye" },
    prices: { unit: 55, pack4: 195, pack6: 270 },
  },
  {
    slug: "contraste",
    name: "Contraste",
    config: { bottom: "uni", middle: "geometrique", top: "floral" },
    prices: { unit: 60, pack4: 215, pack6: 295 },
  },
  {
    slug: "elegance",
    name: "Élégance",
    config: { bottom: "uni", middle: "raye", top: "floral" },
    prices: { unit: 60, pack4: 215, pack6: 295 },
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
