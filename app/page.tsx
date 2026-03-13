"use client";

import Header from "@/components/layout/Header";
import HeroSection from "@/components/hero/HeroSection";
import CartDrawer from "@/components/cart/CartDrawer";

export default function Home() {
  return (
    <>
      <Header />
      <CartDrawer />
      <main>
        <HeroSection />
      </main>
    </>
  );
}
