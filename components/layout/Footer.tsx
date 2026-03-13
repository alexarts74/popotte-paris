import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border/50 bg-background px-8 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-16 md:grid-cols-3">
          <div>
            <h3 className="font-[family-name:var(--font-display)] text-xl font-light tracking-[0.1em] uppercase">
              Popote Paris
            </h3>
            <p className="mt-5 text-sm leading-[1.8] text-muted">
              Assiettes empilables artisanales, conçues et fabriquées en France.
              Trois strates, des motifs interchangeables, une table unique.
            </p>
          </div>

          <div>
            <h4 className="text-[10px] font-medium uppercase tracking-[0.25em] text-accent">
              Navigation
            </h4>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <Link href="/histoire" className="text-muted transition-colors duration-300 hover:text-foreground">
                  Le concept
                </Link>
              </li>
              <li>
                <Link href="/produits" className="text-muted transition-colors duration-300 hover:text-foreground">
                  Collection
                </Link>
              </li>
              <li>
                <Link href="/histoire" className="text-muted transition-colors duration-300 hover:text-foreground">
                  Notre histoire
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-medium uppercase tracking-[0.25em] text-accent">
              Contact
            </h4>
            <ul className="mt-5 space-y-3 text-sm text-muted">
              <li>hello@popote-paris.fr</li>
              <li>Paris, France</li>
            </ul>
          </div>
        </div>

        <div className="mt-20 flex items-center justify-between border-t border-border/30 pt-8">
          <p className="text-[11px] text-muted/60">
            &copy; {new Date().getFullYear()} Popote Paris
          </p>
          <div className="h-px flex-1 mx-8 bg-gradient-to-r from-transparent via-border/30 to-transparent" />
          <p className="text-[11px] text-muted/60">
            Fabriqué à Limoges
          </p>
        </div>
      </div>
    </footer>
  );
}
