import { useState } from "react";
import { CheckCircle2, Phone } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useCart, formatPKR } from "@/lib/cart-context";
import { restaurant } from "@/data/menu";

import { cn } from "@/lib/utils";

type Mode = "delivery" | "takeaway" | "dinein";

const MODE_LABEL: Record<Mode, string> = {
  delivery: "Home Delivery",
  takeaway: "Take Away",
  dinein: "Dine-in",
};

const MODE_EMOJI: Record<Mode, string> = {
  delivery: "🛵",
  takeaway: "🥡",
  dinein: "🍽️",
};

const WHATSAPP_NUMBER = "923097000178";

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">
    {children}
  </p>
);

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 0 1 8.413 3.488 11.82 11.82 0 0 1 3.48 8.414c-.003 6.555-5.338 11.89-11.893 11.89a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.149-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
  </svg>
);

export function CheckoutDialog() {
  const { checkoutOpen, setCheckoutOpen, lines, subtotal, deliveryCharge, total, clear } = useCart();
  const [mode, setMode] = useState<Mode>("dinein");
  const [confirmed, setConfirmed] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", address: "", notes: "" });
  const [errors, setErrors] = useState<{ name?: string; phone?: string; address?: string }>({});

  const effectiveDelivery = mode === "delivery" ? deliveryCharge : 0;
  const effectiveTotal = subtotal + effectiveDelivery;

  const buildWhatsAppMessage = () => {
    const lineItems = lines
      .map(
        (l) =>
          `• ${l.quantity}x ${l.name}${l.size ? ` (${l.size})` : ""} — ${formatPKR(l.unitPrice * l.quantity)}`,
      )
      .join("\n");

    const deliveryLine =
      mode === "delivery"
        ? effectiveDelivery === 0
          ? "Delivery: Free"
          : `Delivery: ${formatPKR(effectiveDelivery)}`
        : null;

    const parts = [
      "🍕 New Order — MFC Miran Jee Food Club",
      "",
      `Order Type: ${MODE_EMOJI[mode]} ${MODE_LABEL[mode]}`,
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      mode === "delivery" ? `Address: ${form.address}` : null,
      form.notes.trim() ? `Notes: ${form.notes.trim()}` : null,
      "",
      "Order:",
      lineItems,
      "",
      `Subtotal: ${formatPKR(subtotal)}`,
      deliveryLine,
      `*Total: ${formatPKR(effectiveTotal)}*`,
      "",
      "Thank you for ordering from MFC! We'll confirm your order shortly. 🙏",
    ].filter(Boolean);

    return parts.join("\n");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    if (mode === "delivery" && !form.address.trim()) newErrors.address = "Delivery address is required";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    if (lines.length === 0) return;

    const text = encodeURIComponent(buildWhatsAppMessage());
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank", "noopener,noreferrer");

    setConfirmed(true);
    clear();
  };

  const reset = () => {
    setConfirmed(false);
    setMode("dinein");
    setForm({ name: "", phone: "", address: "", notes: "" });
    setErrors({});
    setCheckoutOpen(false);
  };

  return (
    <Dialog
      open={checkoutOpen}
      onOpenChange={(v) => {
        if (!v) reset();
      }}
    >
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        {confirmed ? (
          <div className="text-center py-4">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-primary/15">
              <CheckCircle2 className="h-9 w-9 text-primary" />
            </div>
            <DialogHeader className="mt-4">
              <DialogTitle className="font-display text-2xl text-center">Order Sent!</DialogTitle>
              <DialogDescription className="text-center">
                ✅ We've opened WhatsApp for you to confirm — thank you for choosing MFC!
              </DialogDescription>
            </DialogHeader>
            <p className="mt-4 text-sm text-muted-foreground">
              If WhatsApp didn't open, please call us:
            </p>
            <div className="mt-3 flex flex-col gap-2">
              {restaurant.phones.map((p) => (
                <a
                  key={p}
                  href={`tel:${p.replace(/-/g, "")}`}
                  className="inline-flex items-center justify-center gap-2 text-primary font-semibold hover:underline"
                >
                  <Phone className="h-4 w-4" /> {p}
                </a>
              ))}
            </div>
            <Button onClick={reset} className="mt-6 w-full bg-primary hover:bg-primary/90">
              Done
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="font-display text-2xl">Checkout</DialogTitle>
              <DialogDescription>Complete your order details below.</DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Order Type */}
              <div>
                <SectionLabel>Order Type</SectionLabel>
                <div className="flex flex-wrap gap-2">
                  {(["delivery", "takeaway", "dinein"] as const).map((m) => {
                    const active = mode === m;
                    return (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setMode(m)}
                        className={cn(
                          "flex-1 min-w-[90px] flex flex-col items-center justify-center gap-1 rounded-xl border-2 px-2 py-3 transition-all",
                          active
                            ? "border-primary bg-primary/10 shadow-sm scale-[1.03] text-foreground"
                            : "border-border bg-muted/30 text-muted-foreground hover:border-primary/40 hover:bg-muted/60",
                        )}
                      >
                        <span className="text-2xl leading-none">{MODE_EMOJI[m]}</span>
                        <span className={cn("text-xs font-semibold", active && "text-primary")}>
                          {MODE_LABEL[m]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Your Details */}
              <div>
                <SectionLabel>Your Details</SectionLabel>
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      placeholder="Your full name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                    {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="03XX-XXXXXXX"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    />
                    {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
                  </div>
                </div>
              </div>

              {/* Order Details */}
              <div>
                <SectionLabel>Order Details</SectionLabel>
                <div className="space-y-3">
                  {mode === "delivery" && (
                    <div>
                      <Label htmlFor="addr">Delivery Address</Label>
                      <Textarea
                        id="addr"
                        rows={2}
                        placeholder="House #, Street, Area..."
                        value={form.address}
                        onChange={(e) => setForm({ ...form, address: e.target.value })}
                      />
                      {errors.address && (
                        <p className="text-xs text-destructive mt-1">{errors.address}</p>
                      )}
                      <p className="text-[11px] text-muted-foreground mt-1">
                        Free delivery within 3km on orders above Rs 600. Rs 50 delivery charge applies below Rs 600. Delivery available outside the city too.
                      </p>
                    </div>
                  )}
                  <div>
                    <Label htmlFor="notes">Order Notes (optional)</Label>
                    <Textarea
                      id="notes"
                      rows={2}
                      placeholder="Any special requests? (e.g. extra spicy, no onions...)"
                      value={form.notes}
                      onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 text-sm shadow-sm">
                <p className="font-semibold mb-2 flex items-center justify-between">
                  <span>Order Summary</span>
                  <span className="text-[10px] uppercase tracking-wider text-primary font-bold">
                    Final
                  </span>
                </p>
                <div className="space-y-1 max-h-32 overflow-y-auto">
                  {lines.map((l) => (
                    <div key={l.id} className="flex justify-between text-xs">
                      <span className="truncate pr-2">
                        {l.quantity}× {l.name}
                        {l.size ? ` (${l.size})` : ""}
                      </span>
                      <span className="shrink-0">{formatPKR(l.unitPrice * l.quantity)}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-2 pt-2 border-t border-primary/20 space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Subtotal</span>
                    <span>{formatPKR(subtotal)}</span>
                  </div>
                  {mode === "delivery" && (
                    <div className="flex justify-between text-xs">
                      <span>Delivery</span>
                      <span>{effectiveDelivery === 0 ? "Free" : formatPKR(effectiveDelivery)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-semibold pt-1 text-base">
                    <span>Total</span>
                    <span className="text-primary">{formatPKR(effectiveTotal)}</span>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                disabled={lines.length === 0}
                className="w-full h-12 bg-[#25D366] hover:bg-[#1ebe57] text-white font-semibold text-base shadow-md"
              >
                <WhatsAppIcon className="h-5 w-5" />
                Place Order via WhatsApp
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
