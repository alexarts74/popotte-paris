"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCartStore } from "@/lib/store/cart";
import { useTheme } from "@/lib/theme";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const toggleCart = useCartStore((s) => s.toggleCart);
  const items = useCartStore((s) => s.items);
  const lastAddedAt = useCartStore((s) => s.lastAddedAt);
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (lastAddedAt === 0) return;
    setAnimate(true);
    const timeout = setTimeout(() => setAnimate(false), 600);
    return () => clearTimeout(timeout);
  }, [lastAddedAt]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 backdrop-blur-xl bg-background/40 border-b border-border/30">
      <Link
        href="/"
        className="font-[family-name:var(--font-display)] text-xl font-light tracking-[0.15em] uppercase"
      >
        Popote Paris
      </Link>

      <nav className="hidden items-center gap-10 text-[11px] font-medium uppercase tracking-[0.2em] text-muted md:flex absolute left-1/2 -translate-x-1/2">
        <Link href="/histoire" className="transition-colors duration-300 hover:text-foreground">
          Concept
        </Link>
        <Link href="/produits" className="transition-colors duration-300 hover:text-foreground">
          Collection
        </Link>
        <Link href="/histoire" className="transition-colors duration-300 hover:text-foreground">
          Histoire
        </Link>
      </nav>

      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="transition-colors duration-300 hover:text-accent"
        >
          {theme === "light" ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          )}
        </button>

      <button
        onClick={toggleCart}
        className={`relative flex items-center gap-2 transition-colors duration-300 hover:text-accent ${animate ? "animate-cart-bounce" : ""}`}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 01-8 0" />
        </svg>
        {totalItems > 0 && (
          <span className={`absolute -top-1.5 -right-2.5 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-accent text-[10px] text-black font-medium ${animate ? "animate-badge-pop" : ""}`}>
            {totalItems}
          </span>
        )}
      </button>
      </div>
    </header>
  );
}
