"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/animations/gsap-register";

const strates = [
  {
    title: "Le Bol",
    subtitle: "Strate 1 — La base",
    description:
      "La fondation de chaque set. Un bol profond en porcelaine blanche, toujours uni. Pour les soupes, bouillons et céréales.",
  },
  {
    title: "L'Assiette Creuse",
    subtitle: "Strate 2 — Le cœur",
    description:
      "La strate centrale aux motifs interchangeables. Idéale pour les pâtes, risottos et plats en sauce.",
  },
  {
    title: "L'Assiette Plate",
    subtitle: "Strate 3 — La surface",
    description:
      "Coiffe élégante de la pile, toile de vos compositions. Pour les plats principaux et le dressage créatif.",
  },
];

export default function ConceptSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      gsap.from(sectionRef.current.querySelectorAll(".concept-item"), {
        y: 60,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section id="concept" ref={sectionRef} className="px-8 py-40">
      <div className="mx-auto max-w-5xl">
        <p className="text-center text-[11px] font-medium uppercase tracking-[0.3em] text-accent">
          Le système
        </p>
        <h2 className="mt-4 text-center font-[family-name:var(--font-display)] text-4xl font-light tracking-tight md:text-6xl">
          Trois strates, une assiette
        </h2>
        <p className="mx-auto mt-8 max-w-xl text-center text-muted leading-relaxed">
          Chaque set Popote Paris se compose de trois pièces qui s&apos;emboîtent
          en un cylindre parfait. Changez les motifs, gardez la cohérence.
        </p>

        <div className="mt-24 grid gap-16 md:grid-cols-3">
          {strates.map((s, i) => (
            <div key={i} className="concept-item text-center">
              <div className="mx-auto mb-8 flex h-14 w-14 items-center justify-center rounded-full border border-accent/30">
                <span className="font-[family-name:var(--font-display)] text-2xl font-light text-accent">
                  {i + 1}
                </span>
              </div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted mb-3">
                {s.subtitle}
              </p>
              <h3 className="font-[family-name:var(--font-display)] text-2xl font-light">
                {s.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
