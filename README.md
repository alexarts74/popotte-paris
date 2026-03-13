# Popote Paris

Site e-commerce pour **Popote Paris**, marque d'assiettes empilables en 3 strates avec motifs interchangeables. Design français, artisanat moderne.

## Concept

Chaque assiette est composée de 3 couches superposables (bottom, middle, top) avec des motifs personnalisables : Uni, Floral, Geometrique, Raye. Les assiettes sont disponibles a l'unite ou en lots (pack de 4, pack de 6).

Le site propose un configurateur 3D interactif permettant de visualiser les combinaisons de motifs en temps reel.

## Tech Stack

- **Framework** : Next.js 16 (App Router, React 19)
- **Langage** : TypeScript
- **Styling** : Tailwind CSS v4
- **3D** : Three.js + React Three Fiber + Drei
- **Animations** : GSAP
- **State** : Zustand (panier persiste en localStorage)
- **Fonts** : Cormorant Garamond (titres) + DM Sans (corps)

## Getting Started

```bash
# Installation des dependances
npm install

# Lancer le serveur de dev
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

## Scripts

| Commande | Description |
|---|---|
| `npm run dev` | Serveur de developpement |
| `npm run build` | Build de production |
| `npm run start` | Serveur de production |
| `npm run lint` | Linting ESLint |

## Structure du projet

```
app/
  page.tsx              # Homepage avec hero 3D
  produits/page.tsx     # Catalogue produits
  products/[slug]/      # Fiche produit avec configurateur
  histoire/page.tsx     # Histoire de la marque
  merci/page.tsx        # Confirmation de commande
components/
  three/                # Scenes 3D (PlateScene, PlateModel, PlateStack3D)
  hero/                 # Section hero animee
  sections/             # Sections de page (Concept, About, ProductGrid)
  product/              # Detail produit et configurateur
  cart/                 # Panier (drawer + items)
  layout/               # Header, Footer
  ui/                   # Composants UI reutilisables
lib/
  data/                 # Donnees produits et motifs
  store/                # Store Zustand (panier)
  animations/           # Configuration GSAP
  types.ts              # Types TypeScript
  theme.tsx             # Provider de theme (light/dark)
```

## Produits

| Nom | Motifs | Prix unitaire |
|---|---|---|
| Classique Blanc | Uni / Uni / Uni | 45 EUR |
| Jardin Fleuri | Uni / Floral / Floral | 55 EUR |
| Art Deco | Uni / Geometrique / Geometrique | 55 EUR |
| Marin | Uni / Raye / Raye | 55 EUR |
| Contraste | Uni / Geometrique / Floral | 60 EUR |
| Elegance | Uni / Raye / Floral | 60 EUR |

## License

Projet prive.
