"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import { useCartStore } from "@/lib/store/cart";
import { CartItem, PACK_LABELS } from "@/lib/types";

export default function MerciPage() {
  const items = useCartStore((s) => s.items);
  const totalPrice = useCartStore((s) => s.totalPrice);
  const [savedItems, setSavedItems] = useState<CartItem[]>([]);
  const [savedTotal, setSavedTotal] = useState(0);
  const hasCleared = useRef(false);

  useEffect(() => {
    if (hasCleared.current) return;
    hasCleared.current = true;

    if (items.length > 0) {
      setSavedItems([...items]);
      setSavedTotal(totalPrice());
      useCartStore.setState({ items: [] });
    }
  }, [items, totalPrice]);

  const hasOrder = savedItems.length > 0;

  return (
    <>
      <Header />
      <main className="min-h-screen flex items-center justify-center px-6 pt-32 pb-24">
        <div className="w-full max-w-lg text-center">
          {/* Checkmark icon */}
          <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full border border-accent/40">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-accent"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          {/* Title */}
          <h1 className="font-serif text-3xl font-light tracking-wide md:text-4xl">
            Merci pour votre commande
          </h1>

          {/* Subtitle */}
          <p className="mt-4 text-sm leading-relaxed text-muted">
            {hasOrder
              ? "Votre commande a bien été enregistrée. Vous recevrez une confirmation par email."
              : "Il semble que vous n\u2019ayez pas de commande en cours."}
          </p>

          {/* Order recap */}
          {hasOrder && (
            <div className="mt-10 border border-border/50 rounded-2xl p-6 text-left">
              <h2 className="text-[10px] font-medium uppercase tracking-[0.25em] text-accent mb-5">
                Récapitulatif
              </h2>
              <ul className="space-y-4">
                {savedItems.map((item) => (
                  <li
                    key={`${item.product.slug}-${item.packSize}`}
                    className="flex items-center justify-between text-sm"
                  >
                    <div>
                      <span className="font-medium">{item.product.name}</span>
                      <span className="ml-2 text-muted text-xs">
                        {PACK_LABELS[item.packSize]} &times; {item.quantity}
                      </span>
                    </div>
                    <span className="text-muted">
                      {(item.product.prices[item.packSize] * item.quantity).toFixed(2)}&nbsp;&euro;
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex items-center justify-between border-t border-border/30 pt-4">
                <span className="text-[11px] font-medium uppercase tracking-[0.15em]">
                  Total
                </span>
                <span className="font-serif text-lg">
                  {savedTotal.toFixed(2)}&nbsp;&euro;
                </span>
              </div>
            </div>
          )}

          {/* CTA */}
          <Link href="/produits" className="mt-10 inline-block">
            <Button variant="secondary">Retour à la collection</Button>
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
