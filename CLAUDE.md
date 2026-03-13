# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- **Dev server**: `npm run dev`
- **Build**: `npm run build`
- **Start production**: `npm run start`
- **Lint**: `npm run lint` (ESLint with next/core-web-vitals and next/typescript configs)

## Tech Stack

- Next.js 16 with App Router (React 19)
- TypeScript (strict mode)
- Tailwind CSS v4 (via PostCSS plugin `@tailwindcss/postcss`)
- Three.js with React Three Fiber (`@react-three/fiber`) and Drei (`@react-three/drei`) for 3D rendering
- GSAP for animations (with `@gsap/react` integration)
- Zustand for state management (cart store with `persist` middleware)
- Fonts: Cormorant Garamond (display, `--font-display`) and DM Sans (body, `--font-body`) via `next/font/google`

## Project Structure

- `app/` — Next.js App Router (lang: `fr`)
  - `page.tsx` — Homepage
  - `produits/page.tsx` — Products listing
  - `products/[slug]/page.tsx` — Product detail page
  - `histoire/page.tsx` — Brand story page
  - `merci/page.tsx` — Order confirmation page
  - `layout.tsx` — Root layout with ThemeProvider
  - `globals.css` — Tailwind config, theme variables, custom animations
- `components/` — React components organized by domain:
  - `hero/` — Hero section (HeroSection, HeroOverlay)
  - `sections/` — Page sections (ConceptSection, AboutSection, ProductGrid, ProductCard)
  - `three/` — Three.js 3D components (PlateScene, PlateModel, PlateStack3D, PatternMaterial)
  - `product/` — Product detail & configurator (ProductDetail, PlateConfigurator)
  - `cart/` — Shopping cart (CartDrawer, CartItem)
  - `layout/` — Header, Footer
  - `ui/` — Reusable UI (Button, ArrowButton)
- `lib/` — Shared logic:
  - `types.ts` — TypeScript types (Product, CartItem, PlateConfig, Pattern, PackSize)
  - `data/products.ts` — Product catalog data
  - `data/patterns.ts` — Pattern definitions
  - `store/cart.ts` — Zustand cart store (persisted to localStorage)
  - `animations/gsap-register.ts` — GSAP plugin registration
  - `theme.tsx` — Theme context provider (light/dark, persisted to localStorage)
- `public/` — Static assets (SVG icons)
- Path alias: `@/*` maps to project root (configured in tsconfig.json)

## Domain Context

Popote Paris is a French e-commerce site selling stackable plates ("assiettes empilables") in 3 layers (strates) with interchangeable patterns. Products are configured with bottom/middle/top pattern layers. Available in unit, pack of 4, or pack of 6.

## Styling

Tailwind CSS v4 uses `@import "tailwindcss"` syntax and `@theme` for custom tokens in `app/globals.css`. The app supports light/dark themes via `data-theme` attribute on `<html>`. CSS variables (`--background`, `--foreground`, `--accent`, etc.) are mapped to Tailwind colors via `--color-*` tokens. Custom `@utility` directives define animations (`animate-cart-bounce`, `animate-badge-pop`).

## 3D Rendering

Three.js scenes use React Three Fiber for rendering plate models with customizable pattern materials. Components in `components/three/` handle the 3D plate visualization and configurator. Use `"use client"` directive for all Three.js components.
