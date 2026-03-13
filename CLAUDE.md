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
- Fonts: Geist Sans and Geist Mono (loaded via `next/font/google`)

## Project Structure

- `app/` — Next.js App Router directory. Uses `layout.tsx` for root layout and `page.tsx` for routes.
- `public/` — Static assets
- Path alias: `@/*` maps to project root (configured in tsconfig.json)

## Styling

Tailwind CSS v4 uses the new `@import "tailwindcss"` syntax and `@theme inline` for custom theme tokens in `app/globals.css`. Custom CSS variables `--background` and `--foreground` are mapped to Tailwind colors via `--color-background` and `--color-foreground`.
