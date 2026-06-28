import { useMemo, useState } from "react";
import { Minus, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { menuCategories, type MenuItem, type MenuCategory } from "@/data/menu";
import { getMenuItemImage } from "@/data/menu-images";
import { useCart, formatPKR } from "@/lib/cart-context";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export function MenuSection() {
  const [active, setActive] = useState(menuCategories[0].category);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return menuCategories;
    const q = query.toLowerCase();
    return menuCategories
      .map((c) => ({ ...c, items: c.items.filter((i) => i.name.toLowerCase().includes(q)) }))
      .filter((c) => c.items.length > 0);
  }, [query]);

  const current = query.trim()
    ? filtered
    : menuCategories.filter((c) => c.category === active);

  return (
    <section id="menu" className="relative py-20 sm:py-28 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="The Menu" title="Made Fresh, Served Hot" />

        <div className="mt-10 grid lg:grid-cols-[260px_1fr] gap-8">
          {/* Sidebar / tabs */}
          <aside className="lg:sticky lg:top-24 self-start">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search the menu…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-9 bg-card"
              />
            </div>
            <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 -mx-1 px-1">
              {menuCategories.map((c) => (
                <button
                  key={c.category}
                  onClick={() => {
                    setQuery("");
                    setActive(c.category);
                  }}
                  className={cn(
                    "shrink-0 lg:shrink whitespace-nowrap text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all border",
                    active === c.category && !query
                      ? "bg-primary text-primary-foreground border-primary shadow-warm"
                      : "bg-card text-foreground/80 border-border hover:border-primary/40 hover:text-primary",
                  )}
                >
                  {c.category}
                </button>
              ))}
            </div>
          </aside>

          {/* Items */}
          <div className="space-y-12">
            {current.map((cat) => (
              <CategoryBlock key={cat.category} cat={cat} />
            ))}
            {current.length === 0 && (
              <p className="text-center text-muted-foreground py-12">No items match "{query}".</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function CategoryBlock({ cat }: { cat: MenuCategory }) {
  return (
    <div key={cat.category} className="animate-fade-up">
      <div className="flex items-end justify-between border-b border-border pb-3 mb-6">
        <h3 className="font-display text-3xl sm:text-4xl text-foreground">{cat.category}</h3>
        {cat.addOn && (
          <span className="text-xs text-muted-foreground hidden sm:block">
            Add-on: {cat.addOn.name} — {formatPKR(cat.addOn.price)}
          </span>
        )}
      </div>
      {cat.note && (
        <p className="text-xs text-muted-foreground mb-4 italic">{cat.note}</p>
      )}
      <div className="grid sm:grid-cols-2 gap-4">
        {cat.items.map((item, idx) => (
          <ItemCard
            key={cat.category + item.name}
            category={cat.category}
            sizes={cat.sizes}
            item={item}
            image={getMenuItemImage(cat.category, idx)}
          />
        ))}
      </div>
    </div>
  );
}

function ItemCard({
  category,
  sizes,
  item,
  image,
}: {
  category: string;
  sizes: string[];
  item: MenuItem;
  image: string;
}) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const validIndices = item.prices.map((p, i) => (p == null ? -1 : i)).filter((i) => i >= 0);
  const initial = validIndices[0] ?? 0;
  const [sizeIdx, setSizeIdx] = useState(initial);
  const [qty, setQty] = useState(1);
  const { addItem } = useCart();

  const price = item.prices[sizeIdx];
  const size = sizes[sizeIdx];
  const hasOptions = sizes.length > 1;
  const disabled = price == null;

  const onAdd = () => {
    if (price == null) {
      toast.error("Price not available — please call to order.");
      return;
    }
    addItem({
      id: `${category}::${item.name}::${size}`,
      name: item.name,
      size: hasOptions ? size : undefined,
      unitPrice: price,
      quantity: qty,
      category,
    });
    toast.success(`Added ${qty} × ${item.name}`);
    setQty(1);
  };

  return (
    <div className="group rounded-2xl border border-border bg-card p-5 transition-all hover:border-primary/40 hover:shadow-warm hover:-translate-y-0.5">
      <div className="flex items-start justify-between gap-3">
        <h4 className="font-semibold text-base text-foreground leading-snug">{item.name}</h4>
        <span className="shrink-0 font-display text-xl text-primary">
          {price != null ? formatPKR(price) : "—"}
        </span>
      </div>

      {hasOptions && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {sizes.map((s, i) => {
            const p = item.prices[i];
            if (p == null) return null;
            return (
              <button
                key={s}
                onClick={() => setSizeIdx(i)}
                className={cn(
                  "px-3 py-1 rounded-md text-xs font-medium border transition-colors",
                  sizeIdx === i
                    ? "bg-secondary text-secondary-foreground border-secondary"
                    : "bg-background text-foreground/70 border-border hover:border-primary/40",
                )}
              >
                {s}
              </button>
            );
          })}
        </div>
      )}

      <div className="mt-5 flex items-center justify-between gap-3">
        <div className="flex items-center rounded-lg border border-border">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="grid h-8 w-8 place-items-center text-muted-foreground hover:text-primary"
            aria-label="Decrease"
          >
            <Minus className="h-3.5 w-3.5" />
          </button>
          <span className="w-8 text-center text-sm font-semibold">{qty}</span>
          <button
            onClick={() => setQty((q) => q + 1)}
            className="grid h-8 w-8 place-items-center text-muted-foreground hover:text-primary"
            aria-label="Increase"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>
        <Button
          onClick={onAdd}
          disabled={disabled}
          size="sm"
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
}

export function SectionHeader({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <div className="text-center max-w-2xl mx-auto">
      <div className="inline-block text-xs uppercase tracking-[0.3em] text-primary font-semibold">
        {eyebrow}
      </div>
      <h2 className="mt-3 font-display text-4xl sm:text-5xl lg:text-6xl text-foreground">{title}</h2>
      {subtitle && <p className="mt-4 text-muted-foreground">{subtitle}</p>}
      <div className="mt-5 mx-auto h-1 w-16 rounded-full bg-gradient-warm" />
    </div>
  );
}
