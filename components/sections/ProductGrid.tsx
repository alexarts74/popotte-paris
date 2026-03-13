"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/animations/gsap-register";
import { products } from "@/lib/data/products";
import ProductCard from "./ProductCard";

export default function ProductGrid() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      gsap.from(sectionRef.current.querySelectorAll(".product-card"), {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section id="produits" ref={sectionRef} className="px-8 py-40">
      <div className="mx-auto max-w-6xl">
        <p className="text-center text-[11px] font-medium uppercase tracking-[0.3em] text-accent">
          Nos créations
        </p>
        <h2 className="mt-4 text-center font-[family-name:var(--font-display)] text-4xl font-light tracking-tight md:text-6xl">
          La Collection
        </h2>
        <p className="mx-auto mt-8 max-w-xl text-center text-muted leading-relaxed">
          Six compositions soigneusement sélectionnées. Chaque set est disponible
          à l&apos;unité ou en lot.
        </p>

        <div className="mt-20 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div key={product.slug} className="product-card">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
