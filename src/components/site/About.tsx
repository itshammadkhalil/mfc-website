import { Clock, MapPin, Snowflake } from "lucide-react";
import { restaurant } from "@/data/menu";

export function About() {
  return (
    <section id="about" className="relative py-20 sm:py-28 bg-charcoal text-cream overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,oklch(0.68_0.21_42/0.2),transparent_60%)]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-accent font-semibold">Our Story</div>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl lg:text-6xl">Cooked with Love, <span className="text-gradient-warm">Served with Pride</span></h2>
          <p className="mt-6 text-cream/80 leading-relaxed">
            MFC — Miran Jee Food Club began with a simple promise: feed Jahanian the way we'd
            feed our own family — fresh, generous, and made with genuine care. Every pizza,
            burger, and broast that leaves our kitchen carries that same promise, whether
            you're dining in our <strong className="text-cream">air-conditioned hall</strong> or
            welcoming us to your doorstep.
          </p>
          <p className="mt-3 text-cream/80 leading-relaxed">
            No shortcuts, no compromises — just real ingredients, cooked to order, the same way
            since day one. From our wood-fired Mataka pizzas to the signature MFC 20-20 burger,
            every dish is made fresh because that's the only way we know how to cook.
          </p>
          <div className="mt-8 grid sm:grid-cols-2 gap-3">
            <Info icon={<MapPin className="h-4 w-4" />} title="Branch" value={restaurant.branch} />
            <Info icon={<Clock className="h-4 w-4" />} title="Opening Hours" value={restaurant.timing} />
            <Info icon={<Snowflake className="h-4 w-4" />} title="Indoor Dining" value="Air Conditioned Hall" />
            <Info icon={<MapPin className="h-4 w-4" />} title="Delivery" value="Free within 3km · Outside city available" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Stat n="100%" l="Natural ingredients" />
          <Stat n="FRESH" l="Cooked daily, never frozen" />
          <Stat n="0" l="Preservatives added" />
          <Stat n="MADE" l="To order, every time" />


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
