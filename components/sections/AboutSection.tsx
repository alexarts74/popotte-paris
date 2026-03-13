"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/animations/gsap-register";

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      gsap.from(sectionRef.current.querySelectorAll(".about-animate"), {
        y: 50,
        opacity: 0,
        stagger: 0.15,
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
    <section id="about" ref={sectionRef} className="px-8 py-40">
      <div className="mx-auto max-w-4xl">
        <div className="grid gap-20 md:grid-cols-2 md:items-center">
          <div>
            <p className="about-animate text-[11px] font-medium uppercase tracking-[0.3em] text-accent">
              L&apos;atelier
            </p>
            <h2 className="about-animate mt-4 font-[family-name:var(--font-display)] text-4xl font-light tracking-tight md:text-5xl">
              Notre histoire
            </h2>
            <p className="about-animate mt-8 text-muted leading-[1.8]">
              Popote Paris est née d&apos;une idée simple : et si vos assiettes
              pouvaient évoluer avec vos envies ? En 2024, deux designers
              parisiens passionnés de gastronomie ont imaginé un système
              d&apos;assiettes empilables en trois strates.
            </p>
            <p className="about-animate mt-5 text-muted leading-[1.8]">
              Chaque pièce est fabriquée en porcelaine fine dans un atelier de
              Limoges, avec des motifs créés par des artistes contemporains.
              Le résultat : une vaisselle modulaire, élégante, et profondément
              personnelle.
            </p>
          </div>

          <div className="about-animate grid grid-cols-2 gap-5">
            {[
              { value: "3", label: "Strates" },
              { value: "4", label: "Motifs" },
              { value: "\u221E", label: "Combinaisons" },
              { value: "100%", label: "Français" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center justify-center rounded-lg border border-border/50 bg-surface/50 p-10 transition-colors duration-300 hover:border-accent/30"
              >
                <span className="font-[family-name:var(--font-display)] text-3xl font-light text-accent">
                  {stat.value}
                </span>
                <span className="mt-3 text-[10px] uppercase tracking-[0.2em] text-muted">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
