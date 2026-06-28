import { useEffect, useState } from "react";
import { Menu, ShoppingCart, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";
import { cn } from "@/lib/utils";
import mfcLogo from "@/assets/mfc-logo.png";

const links = [
  { href: "#home", label: "Home" },
  { href: "#menu", label: "Menu" },
  { href: "#deals", label: "Deals" },
  { href: "#about", label: "About" },
  { href: "#reviews", label: "Reviews" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const { itemCount, setOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-300",
        scrolled
          ? "bg-background/95 backdrop-blur-md shadow-md border-b border-border"
          : "bg-background/40 backdrop-blur-sm",
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <a href="#home" className="flex min-w-0 items-center gap-3 shrink-0">
            <img
              src={mfcLogo}
              alt="MFC Miran Jee Food Club"
              className="h-9 w-9 sm:h-11 sm:w-11 shrink-0 object-contain"
              loading="eager"
              decoding="async"
            />
            <div className="hidden sm:block min-w-0">
              <div className="font-display text-lg leading-none text-foreground truncate">Miran Jee</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Food Club</div>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors relative group"
              >
                {l.label}
                <span className="absolute inset-x-3 -bottom-0.5 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 origin-left transition-transform" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setOpen(true)}
              className="relative border-primary/30 hover:bg-primary/10"
              aria-label="Open cart"
            >
              <ShoppingCart className="h-4 w-4" />
              {itemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground shadow">
                  {itemCount}
                </span>
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {mobileOpen && (
          <div className="lg:hidden pb-4 animate-fade-up">
            <nav className="flex flex-col gap-1 rounded-xl border border-border bg-card p-2">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-md px-3 py-2 text-sm font-medium hover:bg-primary/10 hover:text-primary"
                >
                  {l.label}
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
