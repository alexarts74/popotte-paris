"use client";

import { useParams } from "next/navigation";
import { getProductBySlug } from "@/lib/data/products";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductDetail from "@/components/product/ProductDetail";
import CartDrawer from "@/components/cart/CartDrawer";
import Link from "next/link";

export default function ProductPage() {
  const params = useParams<{ slug: string }>();
  const product = getProductBySlug(params.slug);

  if (!product) {
    return (
      <>
        <Header />
        <div className="flex min-h-screen flex-col items-center justify-center gap-4">
          <h1 className="text-2xl font-light">Produit introuvable</h1>
          <Link href="/" className="text-accent underline">
            Retour à l&apos;accueil
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <CartDrawer />
      <ProductDetail product={product} />
      <Footer />
    </>
  );
}
