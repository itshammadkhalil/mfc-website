import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Minus, Plus, Search, Tag, X } from "lucide-react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  menuCategories,
  dealsGroup,
  type MenuItem,
  type MenuCategory,
  type DealItem,
} from "@/data/menu";


import { getCategoryIcon, getPizzaImage, FALLBACK_IMAGE } from "@/data/menu-images";
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

        <div className="mt-10 space-y-6">
          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search the menu…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-9 bg-card"
            />
          </div>

          {/* Category tabs — wrap on all breakpoints */}
          <div className="flex flex-wrap justify-center gap-2">
            {TAB_ORDER.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => handleSelect(c)}
                className={cn(
                  "whitespace-nowrap px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all border",
                  active === c && !searchActive
                    ? "bg-primary text-primary-foreground border-primary shadow-warm"
                    : "bg-card text-foreground/80 border-border hover:border-primary/40 hover:text-primary",
                )}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Content */}
          <div ref={contentRef} className="space-y-12 scroll-mt-20 pt-4">
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

function PizzaTab(_: { filter: string; setFilter: (v: string) => void }) {
  const cat = menuCategories.find((c) => c.category === "Pizza")!;
  const items = cat.items;
  return (
    <div className="animate-fade-up">
      <div className="flex items-end justify-between border-b border-border pb-3 mb-6">
        <h3 className="font-display text-3xl sm:text-4xl text-foreground">Pizza</h3>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {items.map((item, i) => (
          <ItemCard
            key={(item.type ?? "") + item.name}
            category="Pizza"
            item={item}
            image={getPizzaImage(i)}
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
  const allItems = dealsGroup.items;
  const items = filter === "All" ? allItems : allItems.filter((d) => d.type === filter);
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
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
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
    <div className="group flex flex-col overflow-hidden rounded-xl sm:rounded-2xl border border-border bg-card transition-all hover:border-primary/40 hover:shadow-warm hover:-translate-y-0.5">
      <CardImage image={image} alt={deal.name} />
      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <div className="flex items-center gap-1.5 text-accent">
          <Tag className="h-3 w-3" />
          <span className="text-[9px] sm:text-[10px] uppercase tracking-wider font-semibold truncate">{deal.type}</span>
        </div>
        <p className="mt-1.5 flex-1 text-xs sm:text-sm leading-snug text-foreground">{deal.name}</p>
        <div className="mt-3 flex items-center justify-between gap-2">
          <span className="font-display text-lg sm:text-xl text-primary">{formatPKR(deal.price)}</span>
          <Button size="sm" onClick={onAdd} className="h-8 px-2.5 text-xs bg-primary hover:bg-primary/90">
            Add
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
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
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
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
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
    <div className="relative aspect-square sm:aspect-[4/3] w-full overflow-hidden bg-muted">
      {!loaded && <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-muted via-muted/60 to-muted" />}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        width={1024}
        height={768}
        onLoad={() => setLoaded(true)}
        onError={() => {
          if (didFallback) return;
          setDidFallback(true);
          setSrc(FALLBACK_IMAGE);
          setLoaded(true);
        }}
        className={cn(
          "h-full w-full object-cover transition-all duration-500 group-hover:scale-105",
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
  const { addItem } = useCart();
  const [open, setOpen] = useState(false);
  const [qty, setQty] = useState(1);

  const validPrices = item.prices.filter((p): p is number => p != null);
  const minPrice = validPrices.length ? Math.min(...validPrices) : null;
  const hasOptions = validIndices.length > 1;
  const onlySize = item.sizes[initial];
  const showSizeInName = onlySize && onlySize !== "Standard";

  const onDirectAdd = () => {
    if (minPrice == null) {
      toast.error("Price not available — please call to order.");
      return;
    }
    addItem({
      id: `${category}::${item.type ?? ""}::${item.name}::${onlySize}`,
      name: item.name,
      size: showSizeInName ? onlySize : undefined,
      unitPrice: item.prices[initial]!,
      quantity: 1,
      category: item.type ? `${category} — ${item.type}` : category,
    });
    toast.success(`Added ${item.name}`);
  };

  const onClickAdd = () => {
    if (hasOptions) {
      setQty(1);
      setOpen(true);
    } else {
      onDirectAdd();
    }
  };

  return (
    <>
      <div className="group flex flex-col overflow-hidden rounded-xl sm:rounded-2xl border border-border bg-card transition-all hover:border-primary/40 hover:shadow-warm hover:-translate-y-0.5">
        <CardImage image={image} alt={item.name} />
        <div className="flex flex-1 flex-col p-3 sm:p-4">
          {badge && (
            <span className="inline-block self-start mb-1 px-1.5 py-0.5 rounded-full bg-secondary/15 text-secondary text-[9px] font-bold uppercase tracking-wider">
              {badge}
            </span>
          )}
          <h4 className="font-semibold text-sm sm:text-base text-foreground leading-snug line-clamp-2">
            {item.name}
          </h4>
          <div className="mt-2 flex-1" />
          <div className="mt-2 flex items-end justify-between gap-2">
            <div className="min-w-0">
              {hasOptions && (
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">From</div>
              )}
              <span className="font-display text-base sm:text-lg text-primary">
                {minPrice != null ? formatPKR(minPrice) : "—"}
              </span>
            </div>
            <Button
              onClick={onClickAdd}
              disabled={minPrice == null}
              size="sm"
              className="h-8 px-3 text-xs bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Add
            </Button>
          </div>
        </div>
      </div>

      {hasOptions && (
        <ItemOptionsDialog
          open={open}
          onOpenChange={setOpen}
          category={category}
          item={item}
          image={image}
          badge={badge}
          qty={qty}
          setQty={setQty}
        />
      )}
    </>
  );
}

function ItemOptionsDialog({
  open,
  onOpenChange,
  category,
  item,
  image,
  badge,
  qty,
  setQty,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  category: string;
  item: MenuItem;
  image: string;
  badge?: string;
  qty: number;
  setQty: (updater: (q: number) => number) => void;
}) {
  const validIndices = item.prices.map((p, i) => (p == null ? -1 : i)).filter((i) => i >= 0);
  const [sizeIdx, setSizeIdx] = useState(validIndices[0] ?? 0);
  const { addItem } = useCart();

  useEffect(() => {
    if (open) setSizeIdx(validIndices[0] ?? 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const price = item.prices[sizeIdx];
  const size = item.sizes[sizeIdx];
  const total = price != null ? price * qty : null;

  const onConfirm = () => {
    if (price == null) return;
    addItem({
      id: `${category}::${item.type ?? ""}::${item.name}::${size}`,
      name: item.name,
      size,
      unitPrice: price,
      quantity: qty,
      category: item.type ? `${category} — ${item.type}` : category,
    });
    toast.success(`Added ${qty} × ${item.name} (${size})`);
    onOpenChange(false);
  };

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
        />
        <DialogPrimitive.Content
          className={cn(
            "fixed z-50 bg-card text-card-foreground shadow-2xl overflow-hidden flex flex-col",
            // Mobile: bottom sheet
            "inset-x-0 bottom-0 max-h-[92vh] rounded-t-3xl",
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom data-[state=closed]:duration-200 data-[state=open]:duration-300",
            // sm+: centered modal
            "sm:inset-x-auto sm:bottom-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-md sm:rounded-2xl sm:max-h-[90vh]",
            "sm:data-[state=open]:slide-in-from-bottom-0 sm:data-[state=closed]:slide-out-to-bottom-0 sm:data-[state=open]:zoom-in-95 sm:data-[state=closed]:zoom-out-95",
          )}
        >
          {/* Drag handle (mobile only) */}
          <div className="sm:hidden flex justify-center pt-2.5 pb-1 shrink-0">
            <div className="h-1.5 w-12 rounded-full bg-muted-foreground/30" />
          </div>

          <div className="relative overflow-y-auto">
            {/* Image */}
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted">
              <img src={image} alt={item.name} className="h-full w-full object-cover" />
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-card/80 to-transparent" />
            </div>

            {/* Close button — floating top-right */}
            <DialogPrimitive.Close
              className="absolute right-3 top-3 sm:right-4 sm:top-4 grid h-9 w-9 place-items-center rounded-full bg-black/50 text-white backdrop-blur-md hover:bg-black/70 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </DialogPrimitive.Close>

            <div className="p-5 sm:p-6">
              <div className="text-left">
                {badge && (
                  <span className="inline-block mb-1.5 px-2 py-0.5 rounded-full bg-secondary/15 text-secondary text-[10px] font-bold uppercase tracking-wider">
                    {badge}
                  </span>
                )}
                <DialogPrimitive.Title className="font-display text-2xl sm:text-3xl text-foreground leading-tight">
                  {item.name}
                </DialogPrimitive.Title>
              </div>

              <div className="mt-5">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-2.5">
                  Choose size
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {item.sizes.map((s, i) => {
                    const p = item.prices[i];
                    if (p == null) return null;
                    const active = sizeIdx === i;
                    return (
                      <button
                        key={s}
                        onClick={() => setSizeIdx(i)}
                        className={cn(
                          "flex items-center justify-between rounded-xl border px-3.5 py-3 text-sm transition-all",
                          active
                            ? "bg-secondary text-secondary-foreground border-secondary shadow-warm"
                            : "bg-background text-foreground border-border hover:border-primary/40",
                        )}
                      >
                        <span className="font-semibold">{s}</span>
                        <span className={cn("text-xs", active ? "opacity-90" : "text-muted-foreground")}>
                          {formatPKR(p)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between gap-3">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Quantity
                </div>
                <div className="flex items-center rounded-lg border border-border bg-background">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="grid h-10 w-10 place-items-center text-muted-foreground hover:text-primary"
                    aria-label="Decrease"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-8 text-center text-sm font-semibold">{qty}</span>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    className="grid h-10 w-10 place-items-center text-muted-foreground hover:text-primary"
                    aria-label="Increase"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <Button
                onClick={onConfirm}
                disabled={price == null}
                className="mt-6 w-full h-12 text-base bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl"
              >
                Add to Cart{total != null ? ` — ${formatPKR(total)}` : ""}
              </Button>
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
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
