"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/lib/store/cart";
import CartItemRow from "./CartItem";
import Button from "@/components/ui/Button";

export default function CartDrawer() {
  const router = useRouter();
  const { items, isOpen, closeCart, totalPrice } = useCartStore();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-black/60 transition-opacity ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 z-50 h-full w-full max-w-md transform bg-background border-l border-border transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border px-6 py-4">
            <h2 className="text-lg font-light uppercase tracking-widest">
              Panier
            </h2>
            <button
              onClick={closeCart}
              className="text-muted transition-colors hover:text-foreground"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto px-6">
            {items.length === 0 ? (
              <p className="py-12 text-center text-muted">
                Votre panier est vide
              </p>
            ) : (
              items.map((item) => (
                <CartItemRow
                  key={`${item.product.slug}-${item.packSize}`}
                  item={item}
                />
              ))
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-border px-6 py-6">
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm uppercase tracking-widest text-muted">
                  Total
                </span>
                <span className="text-xl font-light">
                  {totalPrice()}&nbsp;&euro;
                </span>
              </div>
              <Button className="w-full" onClick={() => { closeCart(); router.push("/merci"); }}>Commander</Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
