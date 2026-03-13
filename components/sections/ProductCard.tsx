"use client";

import Link from "next/link";
import { Product } from "@/lib/types";
import { useCartStore } from "@/lib/store/cart";
import PlateScene from "@/components/three/PlateScene";
import Button from "@/components/ui/Button";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);

  return (
    <div className="group flex flex-col">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-square overflow-hidden rounded-lg bg-surface border border-border/30 transition-colors duration-500 group-hover:border-accent/20">
          <PlateScene
            config={product.config}
            interactive
            className="h-full w-full"
          />
        </div>
        <h3 className="mt-5 font-[family-name:var(--font-display)] text-xl font-light transition-colors duration-300 group-hover:text-accent">
          {product.name}
        </h3>
      </Link>
      <p className="mt-1 text-sm text-muted">
        À partir de {product.prices.unit}&nbsp;&euro;
      </p>
      <Button
        variant="secondary"
        className="mt-4 w-full"
        onClick={() => addItem(product, "unit")}
      >
        Ajouter au panier
      </Button>
    </div>
  );
}
