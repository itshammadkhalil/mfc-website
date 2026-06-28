import { Leaf, Snowflake, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero-food.jpg";

export function Hero() {
  return (
    <section id="home" className="relative isolate min-h-[100svh] flex items-center overflow-hidden">
      <img
        src={heroImg}
        alt="Premium pizza and burger spread"
        width={1920}
        height={1080}
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-charcoal/95 via-charcoal/80 to-maroon/70" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_50%,oklch(0.68_0.21_42/0.25),transparent_60%)]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-28 sm:py-32 w-full">
        <div className="max-w-3xl animate-float-in">
          {(() => {
            const h = new Date().getHours();
            const isOpen = h >= 10 || h < 2;
            return (
              <div className={`inline-flex items-center gap-2 rounded-full border ${isOpen ? "border-accent/40 text-accent" : "border-red-400/40 text-red-300"} bg-background/10 backdrop-blur px-4 py-1.5 text-xs font-medium`}>
                <span className={`h-1.5 w-1.5 rounded-full ${isOpen ? "bg-green-400 animate-pulse" : "bg-red-400"}`} />
                {isOpen ? "Open Now" : "Closed Now"}
              </div>
            );
          })()}

          <h1 className="mt-6 font-display text-5xl sm:text-7xl lg:text-8xl text-cream leading-[0.95]">
            Miran Jee
            <span className="block text-gradient-warm">Food Club</span>
          </h1>
          <p className="mt-5 max-w-xl text-base sm:text-lg text-cream/85">
            Wood-fired pizzas, juicy burgers, sizzling broast and the deals everyone in Jahanian
            is talking about. Made fresh, delivered hot.
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-warm h-10 px-4 text-sm rounded-md">
              <a href="#menu">View Menu</a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-10 px-4 text-sm rounded-md border-cream/40 bg-background/10 text-cream hover:bg-cream hover:text-charcoal backdrop-blur"
            >
              <a href="#deals">Order Now</a>
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap gap-2 max-w-2xl">
            <Badge icon={<Snowflake className="h-3.5 w-3.5" />} label="Air Condition Hall" />
            <Badge icon={<Sparkles className="h-3.5 w-3.5" />} label="Hygienic Kitchen" />
            <Badge icon={<Leaf className="h-3.5 w-3.5" />} label="Fresh Food" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Badge({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="inline-flex items-center gap-1.5 rounded-full border border-cream/15 bg-background/10 backdrop-blur px-2.5 py-1">
      <span className="grid h-6 w-6 place-items-center rounded-full bg-primary/90 text-primary-foreground">
        {icon}
      </span>
      <span className="text-[11px] sm:text-xs font-medium text-cream pr-1">{label}</span>
    </div>
  );
}
