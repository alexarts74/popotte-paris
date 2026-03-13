"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ConceptSection from "@/components/sections/ConceptSection";
import AboutSection from "@/components/sections/AboutSection";
import CartDrawer from "@/components/cart/CartDrawer";

export default function HistoirePage() {
  return (
    <>
      <Header />
      <CartDrawer />
      <main className="pt-24">
        <ConceptSection />
        <AboutSection />
      </main>
      <Footer />
    </>
  );
}
