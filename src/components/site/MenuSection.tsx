import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Minus, Plus, Search, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  menuCategories,
  dealsGroup,
  type MenuItem,
  type MenuCategory,
  type DealItem,
} from "@/data/menu";
import { getCategoryIcon, FALLBACK_IMAGE } from "@/data/menu-images";
import { useCart, formatPKR } from "@/lib/cart-context";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const TAB_ORDER = [
  "Pizza",
  "Burgers",
  "French Fries",
  "Chicken Rolls",
  "Hot Wings",
  "Pasta",
  "Sandwich",
  "Broast Chicken",
  "Fruit Chaat",
  "Shakes & Cold Coffee",
  "Ice Cream",
  "Margarita",
  "Cake",
  "Drinks",
  "Deals",
] as const;

export function MenuSection() {
  const [active, setActive] = useState<string>(TAB_ORDER[0]);
  const [query, setQuery] = useState("");
  const [pizzaFilter, setPizzaFilter] = useState<string>("All");
  const [dealFilter, setDealFilter] = useState<string>("All");
  const contentRef = useRef<HTMLDivElement>(null);

  // Sync from URL hash (#deals, #menu-burgers, etc.)
  useEffect(() => {
    const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const apply = () => {
      const h = window.location.hash.replace(/^#/, "").toLowerCase();
      if (!h) return;
      const match = TAB_ORDER.find((t) => slug(t) === h || `menu-${slug(t)}` === h);
      if (match) {
        setActive(match);
        setQuery("");
        setTimeout(() => {
          document.getElementById("menu")?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 0);
      }
    };
    apply();
    window.addEventListener("hashchange", apply);
    return () => window.removeEventListener("hashchange", apply);
  }, []);

  const handleSelect = (c: string) => {
    setQuery("");
    setActive(c);
    if (window.matchMedia("(max-width: 1023px)").matches) {
      setTimeout(() => contentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
    }
  };

  const orderedCategories = useMemo(
    () => TAB_ORDER.map((t) => menuCategories.find((c) => c.category === t)).filter(Boolean) as MenuCategory[],
    [],
  );

  const searchActive = query.trim().length > 0;
  const q = query.trim().toLowerCase();

  // Search across everything (including deals)
  const searchResults = useMemo(() => {
    if (!searchActive) return null;
    const cats = orderedCategories
      .map((c) => ({ ...c, items: c.items.filter((i) => i.name.toLowerCase().includes(q)) }))
      .filter((c) => c.items.length > 0);
    const deals = dealsGroup.items.filter((d) => d.name.toLowerCase().includes(q));
    return { cats, deals };
  }, [searchActive, q, orderedCategories]);

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
            <div className="relative">
              <div className="flex flex-wrap lg:flex-col gap-2 pb-1 lg:pb-0">
                {TAB_ORDER.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => handleSelect(c)}
                    className={cn(
                      "whitespace-nowrap text-left px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all border",
                      active === c && !searchActive
                        ? "bg-primary text-primary-foreground border-primary shadow-warm"
                        : "bg-card text-foreground/80 border-border hover:border-primary/40 hover:text-primary",
                    )}
                  >
                    {c}
                  </button>
                ))}
              </div>
              <div className="pointer-events-none absolute top-0 right-0 h-full w-8 bg-gradient-to-l from-background to-transparent lg:hidden" />
            </div>
          </aside>

          {/* Content */}
          <div className="space-y-12">
            {searchActive ? (
              <SearchResults
                cats={searchResults!.cats}
                deals={searchResults!.deals}
                query={query}
              />
            ) : active === "Deals" ? (
              <DealsTab filter={dealFilter} setFilter={setDealFilter} />
            ) : active === "Pizza" ? (
              <PizzaTab filter={pizzaFilter} setFilter={setPizzaFilter} />
            ) : (
              <CategoryBlock cat={menuCategories.find((c) => c.category === active)!} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- Pizza tab ----------
const PIZZA_CHIPS = ["All", "Standard", "Classic", "Premium", "Special Pizzaz", "New Addition", "Mazz", "Mataka", "Steak"];

function PizzaTab({ filter, setFilter }: { filter: string; setFilter: (v: string) => void }) {
  const cat = menuCategories.find((c) => c.category === "Pizza")!;
  const items = filter === "All" ? cat.items : cat.items.filter((i) => i.type === filter);
  const icon = getCategoryIcon("Pizza");
  return (
    <div className="animate-fade-up">
      <div className="flex items-end justify-between border-b border-border pb-3 mb-6">
        <h3 className="font-display text-3xl sm:text-4xl text-foreground">Pizza</h3>
      </div>
      <ChipRow>
        {PIZZA_CHIPS.map((c) => (
          <FilterChip key={c} label={c} active={filter === c} onClick={() => setFilter(c)} />
        ))}
      </ChipRow>
      <div className="grid sm:grid-cols-2 gap-4">
        {items.map((item) => (
          <ItemCard
            key={(item.type ?? "") + item.name}
            category="Pizza"
            item={item}
            image={icon}
            badge={item.type}
          />
        ))}
      </div>
    </div>
  );
}

// ---------- Deals tab ----------
const DEAL_CHIPS = ["All", "Pizza Deals", "Lunch & Midnight", "1 Person", "2 Person", "Family", "Student"];

function DealsTab({ filter, setFilter }: { filter: string; setFilter: (v: string) => void }) {
  const { addItem } = useCart();
  const items = filter === "All" ? dealsGroup.items : dealsGroup.items.filter((d) => d.type === filter);
  const note = filter !== "All" ? dealsGroup.notes[filter] : undefined;
  const icon = getCategoryIcon("Deals");
  return (
    <div className="animate-fade-up">
      <div className="flex items-end justify-between border-b border-border pb-3 mb-6">
        <h3 className="font-display text-3xl sm:text-4xl text-foreground">Deals & Offers</h3>
      </div>
      <ChipRow>
        {DEAL_CHIPS.map((c) => (
          <FilterChip key={c} label={c} active={filter === c} onClick={() => setFilter(c)} />
        ))}
      </ChipRow>
      {note && <p className="mb-5 text-sm text-secondary font-medium italic">{note}</p>}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((deal) => (
          <DealCard
            key={deal.type + deal.name}
            deal={deal}
            image={icon}
            onAdd={() => {
              addItem({
                id: `deal::${deal.type}::${deal.name}`,
                name: deal.name,
                unitPrice: deal.price,
                category: `Deals — ${deal.type}`,
              });
              toast.success("Deal added to cart");
            }}
          />
        ))}
      </div>
    </div>
  );
}

function DealCard({ deal, image, onAdd }: { deal: DealItem; image: string; onAdd: () => void }) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-primary/40 hover:shadow-warm hover:-translate-y-0.5">
      <CardImage image={image} alt={deal.name} />
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2 text-accent">
          <Tag className="h-3.5 w-3.5" />
          <span className="text-[10px] uppercase tracking-wider font-semibold">{deal.type}</span>
        </div>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-foreground">{deal.name}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="font-display text-2xl text-primary">{formatPKR(deal.price)}</span>
          <Button size="sm" onClick={onAdd} className="bg-primary hover:bg-primary/90">
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}

// ---------- Search results ----------
function SearchResults({
  cats,
  deals,
  query,
}: {
  cats: MenuCategory[];
  deals: DealItem[];
  query: string;
}) {
  const { addItem } = useCart();
  if (cats.length === 0 && deals.length === 0) {
    return <p className="text-center text-muted-foreground py-12">No items match "{query}".</p>;
  }
  return (
    <div className="space-y-12">
      {cats.map((cat) => (
        <CategoryBlock key={cat.category} cat={cat} />
      ))}
      {deals.length > 0 && (
        <div className="animate-fade-up">
          <div className="flex items-end justify-between border-b border-border pb-3 mb-6">
            <h3 className="font-display text-3xl sm:text-4xl text-foreground">Deals</h3>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {deals.map((d) => (
              <DealCard
                key={d.type + d.name}
                deal={d}
                image={getCategoryIcon("Deals")}
                onAdd={() => {
                  addItem({
                    id: `deal::${d.type}::${d.name}`,
                    name: d.name,
                    unitPrice: d.price,
                    category: `Deals — ${d.type}`,
                  });
                  toast.success("Deal added to cart");
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ---------- Standard category block ----------
function CategoryBlock({ cat }: { cat: MenuCategory }) {
  const icon = getCategoryIcon(cat.category);
  return (
    <div className="animate-fade-up">
      <div className="flex items-end justify-between border-b border-border pb-3 mb-6 gap-3">
        <h3 className="font-display text-3xl sm:text-4xl text-foreground">{cat.category}</h3>
        {cat.addOn && (
          <span className="text-xs text-muted-foreground hidden sm:block">
            Add-on: {cat.addOn.name} — {formatPKR(cat.addOn.price)}
          </span>
        )}
      </div>
      {cat.addOns && (
        <p className="text-xs text-muted-foreground mb-4">
          Add-ons:{" "}
          {cat.addOns.map((a, i) => (
            <span key={a.name}>
              {i > 0 ? ", " : ""}
              {a.name} — {formatPKR(a.price)}
            </span>
          ))}
        </p>
      )}
      {cat.note && <p className="text-xs text-muted-foreground mb-4 italic">{cat.note}</p>}
      <div className="grid sm:grid-cols-2 gap-4">
        {cat.items.map((item) => (
          <ItemCard
            key={cat.category + item.name}
            category={cat.category}
            item={item}
            image={icon}
          />
        ))}
      </div>
    </div>
  );
}

// ---------- Shared image / chip ----------
function ChipRow({ children }: { children: ReactNode }) {
  return (
    <div className="mb-5">
      <div className="flex flex-wrap gap-2 pb-1">
        {children}
      </div>
    </div>
  );
}

function FilterChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "whitespace-nowrap px-3 py-1.5 sm:px-3.5 rounded-full text-[11px] sm:text-xs font-semibold border transition-all",
        active
          ? "bg-secondary text-secondary-foreground border-secondary shadow-warm"
          : "bg-card text-foreground/80 border-border hover:border-primary/40 hover:text-primary",
      )}
    >
      {label}
    </button>
  );
}

function CardImage({ image, alt }: { image: string; alt: string }) {
  const [loaded, setLoaded] = useState(false);
  const [src, setSrc] = useState(image);
  const [didFallback, setDidFallback] = useState(false);
  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-br from-secondary/10 to-primary/5">
      {!loaded && <div className="absolute inset-0 animate-pulse bg-muted/40" />}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => {
          if (didFallback) return;
          setDidFallback(true);
          setSrc(FALLBACK_IMAGE);
          setLoaded(true);
        }}
        className={cn(
          "h-full w-full object-contain p-3 transition-all duration-500 group-hover:scale-105",
          loaded ? "opacity-100" : "opacity-0",
        )}
      />
    </div>
  );
}

// ---------- Item card ----------
function ItemCard({
  category,
  item,
  image,
  badge,
}: {
  category: string;
  item: MenuItem;
  image: string;
  badge?: string;
}) {
  const validIndices = item.prices.map((p, i) => (p == null ? -1 : i)).filter((i) => i >= 0);
  const initial = validIndices[0] ?? 0;
  const [sizeIdx, setSizeIdx] = useState(initial);
  const [qty, setQty] = useState(1);
  const { addItem } = useCart();

  const price = item.prices[sizeIdx];
  const size = item.sizes[sizeIdx];
  const hasOptions = item.sizes.length > 1;
  const disabled = price == null;

  const onAdd = () => {
    if (price == null) {
      toast.error("Price not available — please call to order.");
      return;
    }
    addItem({
      id: `${category}::${item.type ?? ""}::${item.name}::${size}`,
      name: item.name,
      size: hasOptions || item.sizes[0] !== "Standard" ? size : undefined,
      unitPrice: price,
      quantity: qty,
      category: item.type ? `${category} — ${item.type}` : category,
    });
    toast.success(`Added ${qty} × ${item.name}`);
    setQty(1);
  };

  return (
    <div className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-primary/40 hover:shadow-warm hover:-translate-y-0.5">
      <CardImage image={image} alt={item.name} />
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            {badge && (
              <span className="inline-block mb-1 px-2 py-0.5 rounded-full bg-secondary/15 text-secondary text-[10px] font-bold uppercase tracking-wider">
                {badge}
              </span>
            )}
            <h4 className="font-semibold text-base text-foreground leading-snug">{item.name}</h4>
          </div>
          <span className="shrink-0 font-display text-xl text-primary">
            {price != null ? formatPKR(price) : "—"}
          </span>
        </div>

        {hasOptions && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {item.sizes.map((s, i) => {
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
