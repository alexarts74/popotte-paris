"use client";

import { CartItem as CartItemType, PACK_LABELS } from "@/lib/types";
import { useCartStore } from "@/lib/store/cart";
import PlateScene from "@/components/three/PlateScene";

interface CartItemProps {
  item: CartItemType;
}

export default function CartItemRow({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCartStore();

  return (
    <div className="flex items-center gap-4 border-b border-border py-4">
      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-md bg-surface">
        <PlateScene
          config={item.product.config}
          className="h-full w-full"
          cameraPosition={[0, 0.3, 4.8]}
        />
      </div>
      <div className="flex-1">
        <p className="font-medium">{item.product.name}</p>
        <p className="text-sm text-muted">{PACK_LABELS[item.packSize]}</p>
        <p className="mt-1 text-sm text-accent">
          {item.product.prices[item.packSize]}&nbsp;&euro;
        </p>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() =>
            updateQuantity(item.product.slug, item.packSize, item.quantity - 1)
          }
          className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-sm transition-colors hover:border-foreground"
        >
          &minus;
        </button>
        <span className="w-8 text-center text-sm">{item.quantity}</span>
        <button
          onClick={() =>
            updateQuantity(item.product.slug, item.packSize, item.quantity + 1)
          }
          className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-sm transition-colors hover:border-foreground"
        >
          +
        </button>
      </div>

      <button
        onClick={() => removeItem(item.product.slug, item.packSize)}
        className="text-muted transition-colors hover:text-foreground"
        aria-label="Supprimer"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  );
}
