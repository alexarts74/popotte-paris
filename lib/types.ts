export type PatternType = "uni" | "floral" | "geometrique" | "raye";

export interface Pattern {
  id: PatternType;
  name: string;
  colors: {
    primary: string;
    secondary: string;
  };
}

export type PackSize = "unit" | "pack4" | "pack6";

export interface PlateConfig {
  bottom: PatternType; // always "uni"
  middle: PatternType;
  top: PatternType;
}

export interface Product {
  slug: string;
  name: string;
  config: PlateConfig;
  prices: Record<PackSize, number>;
}

export interface CartItem {
  product: Product;
  packSize: PackSize;
  quantity: number;
}

export const PACK_LABELS: Record<PackSize, string> = {
  unit: "À l'unité",
  pack4: "Lot de 4",
  pack6: "Lot de 6",
};
