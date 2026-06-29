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

const WHATSAPP_NUMBER = "923097000178";

export function CheckoutDialog() {
  const { checkoutOpen, setCheckoutOpen, lines, subtotal, deliveryCharge, total, clear } = useCart();
  const [mode, setMode] = useState<Mode>("delivery");
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
      `Order Type: ${MODE_LABEL[mode]}`,
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
    setClosedNotice(false);
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

            <div className="flex rounded-lg border border-border p-1 bg-muted">
              {(["delivery", "takeaway", "dinein"] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMode(m)}
                  className={cn(
                    "flex-1 px-2 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors",
                    mode === m ? "bg-background shadow-sm text-foreground" : "text-muted-foreground",
                  )}
                >
                  {MODE_LABEL[m]}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
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
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
                {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
              </div>
              {mode === "delivery" && (
                <div>
                  <Label htmlFor="addr">Delivery Address</Label>
                  <Textarea
                    id="addr"
                    rows={2}
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                  />
                  {errors.address && <p className="text-xs text-destructive mt-1">{errors.address}</p>}
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
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                />
              </div>

              <div className="rounded-lg border border-border bg-muted/40 p-3 text-sm">
                <p className="font-semibold mb-2">Order Summary</p>
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
                <div className="mt-2 pt-2 border-t border-border space-y-1">
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
                  <div className="flex justify-between font-semibold pt-1">
                    <span>Total</span>
                    <span className="text-primary">{formatPKR(effectiveTotal)}</span>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                disabled={lines.length === 0}
                className="w-full h-11 bg-primary hover:bg-primary/90"
              >
                Place Order via WhatsApp
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
