"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductGrid from "@/components/sections/ProductGrid";
import CartDrawer from "@/components/cart/CartDrawer";

export default function ProduitsPage() {
  return (
    <>
      <Header />
      <CartDrawer />
      <main className="pt-24">
        <ProductGrid />
      </main>
      <Footer />
    </>
  );
}
