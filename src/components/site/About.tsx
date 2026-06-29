import { Clock, MapPin, Snowflake } from "lucide-react";
import { restaurant } from "@/data/menu";

export function About() {
  return (
    <section id="about" className="relative py-20 sm:py-28 bg-charcoal text-cream overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,oklch(0.68_0.21_42/0.2),transparent_60%)]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-accent font-semibold">Our Story</div>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl lg:text-6xl">Bold Flavours, <span className="text-gradient-warm">Family Roots</span></h2>
          <p className="mt-6 text-cream/80 leading-relaxed">
            MFC — Miran Jee Food Club is Jahanian's favourite spot for fresh, hand-crafted pizzas,
            sizzling burgers, broast and pastas. Sit back in our spacious <strong className="text-cream">Air Conditioned hall</strong>,
            or let us bring the feast to your doorstep.
          </p>
          <p className="mt-3 text-cream/80 leading-relaxed">
            From the wood-fired Mataka pizzas to our signature MFC 20-20 burger, every dish is
            cooked to order with the same care since day one.
          </p>
          <div className="mt-8 grid sm:grid-cols-2 gap-3">
            <Info icon={<MapPin className="h-4 w-4" />} title="Branch" value={restaurant.branch} />
            <Info icon={<Clock className="h-4 w-4" />} title="Opening Hours" value={restaurant.timing} />
            <Info icon={<Snowflake className="h-4 w-4" />} title="Indoor Dining" value="Air Conditioned Hall" />
            <Info icon={<MapPin className="h-4 w-4" />} title="Delivery" value="Free within 3km · Outside city available" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Stat n="22+" l="Pizza flavours" />
          <Stat n="100+" l="Dishes to explore" />
          <Stat n="FRESH" l="Made to order" />
          <Stat n="5★" l="Customer rated" />

        </div>

      </div>
    </section>
  );
}

function Info({ icon, title, value }: { icon: React.ReactNode; title: string; value: string }) {
  return (
    <div className="flex gap-3 rounded-xl border border-cream/10 bg-cream/5 p-4 backdrop-blur">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground">{icon}</span>
      <div className="min-w-0">
        <p className="text-xs uppercase tracking-wider text-cream/60">{title}</p>
        <p className="text-sm text-cream mt-0.5">{value}</p>
      </div>
    </div>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div className="rounded-2xl border border-cream/10 bg-gradient-to-br from-cream/10 to-cream/0 p-6 text-center backdrop-blur">
      <div className="font-display text-4xl sm:text-5xl text-gradient-warm">{n}</div>
      <div className="mt-1 text-xs uppercase tracking-wider text-cream/70">{l}</div>
    </div>
  );
}
