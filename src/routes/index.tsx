import { createFileRoute } from "@tanstack/react-router";
import { CartProvider } from "@/lib/cart-context";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { MenuSection } from "@/components/site/MenuSection";
import { DealsSection } from "@/components/site/DealsSection";
import { About } from "@/components/site/About";
import { Reviews } from "@/components/site/Reviews";
import { Footer } from "@/components/site/Footer";
import { CartDrawer } from "@/components/site/CartDrawer";
import { CheckoutDialog } from "@/components/site/CheckoutDialog";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MFC - Miran Jee Food Club | Pizza, Burgers & More in Jahanian" },
      {
        name: "description",
        content:
          "Order premium pizza, burgers, broast and family deals from MFC. Air Conditioned Hall, free delivery within 3km, open 10AM–2AM. Call 0306-7587938.",
      },
      { property: "og:title", content: "MFC - Miran Jee Food Club" },
      {
        property: "og:description",
        content: "Air Conditioned Hall | Pizza, Burgers & More. Free home delivery within 3km.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main>
          <Hero />
          <MenuSection />
          <DealsSection />
          <About />
          <Reviews />
        </main>
        <Footer />
        <CartDrawer />
        <CheckoutDialog />
        <Toaster position="top-center" richColors />
      </div>
    </CartProvider>
  );
}
