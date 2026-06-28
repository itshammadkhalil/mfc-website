import { useState } from "react";
import { Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { dealCategories } from "@/data/menu";
import { getDealImage } from "@/data/menu-images";
import { useCart, formatPKR } from "@/lib/cart-context";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { SectionHeader } from "./MenuSection";

function DealImage({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="relative -mx-6 -mt-6 mb-4 h-[180px] overflow-hidden bg-muted">
      {!loaded && <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-muted to-muted/60" />}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={cn(
          "h-full w-full object-cover transition-opacity duration-500",
          loaded ? "opacity-100" : "opacity-0",
        )}
      />
    </div>
  );
}

export function DealsSection() {
  const [active, setActive] = useState(dealCategories[0].category);
  const { addItem } = useCart();
  const current = dealCategories.find((c) => c.category === active)!;

  return (
    <section id="deals" className="relative py-20 sm:py-28 bg-gradient-to-b from-background via-muted/40 to-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Limited Deals" title="Save Big, Eat Bigger" />

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {dealCategories.map((c) => (
            <button
              key={c.category}
              onClick={() => setActive(c.category)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium border transition-all",
                active === c.category
                  ? "bg-secondary text-secondary-foreground border-secondary shadow-warm"
                  : "bg-card border-border hover:border-primary/40",
              )}
            >
              {c.category}
            </button>
          ))}
        </div>

        {current.note && (
          <p className="mt-6 text-center text-sm text-secondary font-medium">{current.note}</p>
        )}

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {current.items.map((deal) => (
            <div
              key={deal.name}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-warm hover:border-primary/40 animate-fade-up"
            >
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-primary/10 blur-2xl group-hover:bg-primary/20 transition-colors" />
              <div className="flex items-center gap-2 text-accent">
                <Tag className="h-4 w-4" />
                <span className="text-xs uppercase tracking-wider font-semibold">Deal</span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-foreground min-h-[5rem]">
                {deal.name}
              </p>
              <div className="mt-5 flex items-center justify-between">
                <span className="font-display text-3xl text-gradient-warm">{formatPKR(deal.price)}</span>
                <Button
                  size="sm"
                  onClick={() => {
                    addItem({
                      id: `deal::${current.category}::${deal.name}`,
                      name: deal.name,
                      unitPrice: deal.price,
                      category: current.category,
                    });
                    toast.success("Deal added to cart");
                  }}
                  className="bg-primary hover:bg-primary/90"
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
