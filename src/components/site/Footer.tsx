import { Clock, Facebook, Instagram, MapPin, Phone } from "lucide-react";
import { restaurant } from "@/data/menu";

export function Footer() {
  return (
    <footer id="contact" className="bg-charcoal text-cream pt-16 pb-8 border-t border-cream/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-warm">
                <span className="font-display text-xl text-primary-foreground">MFC</span>
              </div>
              <div>
                <div className="font-display text-lg leading-none">Miran Jee</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-cream/60">Food Club</div>
              </div>
            </div>
            <p className="mt-4 text-sm text-cream/70">{restaurant.tagline}</p>
            <div className="mt-4 flex gap-2">
              <a href="#" aria-label="Facebook" className="grid h-9 w-9 place-items-center rounded-lg border border-cream/15 hover:bg-primary hover:border-primary transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" aria-label="Instagram" className="grid h-9 w-9 place-items-center rounded-lg border border-cream/15 hover:bg-primary hover:border-primary transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-cream/70">
              <li><a href="#menu" className="hover:text-primary">Menu</a></li>
              <li><a href="#deals" className="hover:text-primary">Deals</a></li>
              <li><a href="#about" className="hover:text-primary">About</a></li>
              <li><a href="#reviews" className="hover:text-primary">Reviews</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-cream/70">
              {restaurant.phones.map((p) => (
                <li key={p} className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-primary shrink-0" />
                  <a href={`tel:${p.replace(/-/g, "")}`} className="hover:text-primary">{p}</a>
                </li>
              ))}
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span>{restaurant.branch}</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary shrink-0" />
                <span>{restaurant.timing}</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg mb-4">Delivery</h4>
            <p className="text-sm text-cream/70 leading-relaxed">
              Free delivery within 3km · Rs 50 charge below Rs 600 order · Delivery available outside city.
            </p>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-cream/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-cream/60">
          <p>© {new Date().getFullYear()} MFC — Miran Jee Food Club. All rights reserved.</p>
          <p>
            Made by{" "}
            <a
              href="https://novastackltd.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline underline-offset-2"
            >
              NovaStack
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
