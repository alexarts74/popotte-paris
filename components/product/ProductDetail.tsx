"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/animations/gsap-register";
import { Product, PackSize, PACK_LABELS, PatternType, PlateConfig } from "@/lib/types";
import { useCartStore } from "@/lib/store/cart";
import PlateScene from "@/components/three/PlateScene";
import PlateConfigurator from "./PlateConfigurator";
import Button from "@/components/ui/Button";

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const addItem = useCartStore((s) => s.addItem);
  const [packSize, setPackSize] = useState<PackSize>("unit");
  const [middlePattern, setMiddlePattern] = useState<PatternType>(product.config.middle);
  const [topPattern, setTopPattern] = useState<PatternType>(product.config.top);

  const config: PlateConfig = {
    bottom: "uni",
    middle: middlePattern,
    top: topPattern,
  };

  useGSAP(
    () => {
      if (!containerRef.current) return;
      gsap.from(containerRef.current.querySelectorAll(".detail-animate"), {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
      });
    },
    { scope: containerRef }
  );

  const customProduct: Product = {
    ...product,
    config,
  };

  return (
    <div ref={containerRef} className="min-h-screen px-8 pt-28 pb-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-start">
          {/* 3D Scene */}
          <div className="detail-animate aspect-square rounded-lg bg-surface border border-border/30">
            <PlateScene config={config} interactive className="h-full w-full" />
          </div>

          {/* Details */}
          <div className="space-y-10">
            <div className="detail-animate">
              <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-accent">
                Collection Popote Paris
              </p>
              <h1 className="mt-3 font-[family-name:var(--font-display)] text-5xl font-light tracking-tight">
                {product.name}
              </h1>
              <p className="mt-4 font-[family-name:var(--font-display)] text-3xl font-light text-accent">
                {product.prices[packSize]}&nbsp;&euro;
              </p>
            </div>

            {/* Pack size */}
            <div className="detail-animate space-y-4">
              <h3 className="text-[10px] font-medium uppercase tracking-[0.25em] text-muted">
                Format
              </h3>
              <div className="flex gap-3">
                {(Object.keys(PACK_LABELS) as PackSize[]).map((size) => (
                  <button
                    key={size}
                    onClick={() => setPackSize(size)}
                    className={`rounded-full border px-5 py-2.5 text-[11px] uppercase tracking-[0.1em] transition-all duration-300 ${
                      packSize === size
                        ? "border-accent text-accent"
                        : "border-border/50 text-muted hover:border-foreground/30 hover:text-foreground"
                    }`}
                  >
                    {PACK_LABELS[size]}
                  </button>
                ))}
              </div>
            </div>

            {/* Configurator */}
            <div className="detail-animate">
              <PlateConfigurator
                middlePattern={middlePattern}
                topPattern={topPattern}
                onMiddleChange={setMiddlePattern}
                onTopChange={setTopPattern}
              />
            </div>

            {/* Add to cart */}
            <div className="detail-animate">
              <Button
                className="w-full"
                onClick={() => addItem(customProduct, packSize)}
              >
                Ajouter au panier — {product.prices[packSize]}&nbsp;&euro;
              </Button>
            </div>

            {/* Description */}
            <div className="detail-animate border-t border-border/30 pt-10">
              <p className="text-sm leading-[1.8] text-muted">
                Chaque set {product.name} se compose de trois pièces en porcelaine
                fine : un bol profond, une assiette creuse et une assiette plate.
                Les motifs sont appliqués à la main dans notre atelier de Limoges.
                Compatible lave-vaisselle et micro-ondes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
