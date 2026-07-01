import { useState } from "react";
import { Leaf, Moon, Snowflake, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import heroImg from "@/assets/hero-option-b.jpg";
import { isOpenNow, CLOSED_MESSAGE } from "@/lib/hours";

const WHATSAPP_URL =
  "https://wa.me/923097000178?text=Hi%20MFC!%20I%27d%20like%20to%20place%20an%20order%20%F0%9F%8D%95";

export function Hero() {
  const open = isOpenNow();
  const [closedNotice, setClosedNotice] = useState(false);

  const handleWhatsApp = (e: React.MouseEvent) => {
    if (!isOpenNow()) {
      e.preventDefault();
      setClosedNotice(true);
    }
  };

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
          <div
            className={`inline-flex items-center gap-2 rounded-full border ${open ? "border-accent/40 text-accent" : "border-red-400/40 text-red-300"} bg-background/10 backdrop-blur px-3 py-1 text-[11px] font-medium`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${open ? "bg-green-400 animate-pulse" : "bg-red-400"}`} />
            {open ? "Open Now" : "Closed Now"}
          </div>

          <h1 className="mt-6 font-display text-5xl sm:text-7xl lg:text-8xl text-cream leading-[0.95]">
            Miran Jee
            <span className="block text-gradient-warm">Food Club</span>
          </h1>
          <p className="mt-5 max-w-xl text-base sm:text-lg text-cream/85">
            Wood-fired pizzas, juicy burgers, sizzling broast and the deals everyone in Jahanian
            is talking about. Made fresh, delivered hot.
          </p>

          <div className="mt-7 flex flex-wrap gap-2">
            <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-warm h-9 px-3.5 text-xs rounded-md">
              <a href="#menu">View Menu</a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-9 px-3.5 text-xs rounded-md border-cream/40 bg-background/10 text-cream hover:bg-cream hover:text-charcoal backdrop-blur"
            >
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleWhatsApp}
              >
                💬 WhatsApp Us
              </a>
            </Button>
          </div>

          <div className="mt-7 flex flex-wrap gap-1.5 max-w-2xl">
            <Badge icon={<Snowflake className="h-3 w-3" />} label="Air Condition Hall" />
            <Badge icon={<Sparkles className="h-3 w-3" />} label="Hygienic Kitchen" />
            <Badge icon={<Leaf className="h-3 w-3" />} label="Fresh Food" />
          </div>
        </div>
      </div>

      <Dialog open={closedNotice} onOpenChange={setClosedNotice}>
        <DialogContent className="max-w-sm">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-primary/15">
            <Moon className="h-9 w-9 text-primary" />
          </div>
          <DialogHeader>
            <DialogTitle className="font-display text-2xl text-center">We're Closed Right Now</DialogTitle>
            <DialogDescription className="text-center text-sm leading-relaxed pt-2">
              {CLOSED_MESSAGE}
            </DialogDescription>
          </DialogHeader>
          <Button onClick={() => setClosedNotice(false)} className="w-full bg-primary hover:bg-primary/90">
            Okay, Got It
          </Button>
        </DialogContent>
      </Dialog>
    </section>
  );
}

function Badge({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="inline-flex items-center gap-1.5 rounded-full border border-cream/15 bg-background/10 backdrop-blur px-2 py-0.5">
      <span className="grid h-5 w-5 place-items-center rounded-full bg-primary/90 text-primary-foreground">
        {icon}
      </span>
      <span className="text-[10px] sm:text-[11px] font-medium text-cream pr-1">{label}</span>
    </div>
  );
}
