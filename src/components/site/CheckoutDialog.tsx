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

export function CheckoutDialog() {
  const { checkoutOpen, setCheckoutOpen, lines, subtotal, deliveryCharge, total, clear } = useCart();
  const [mode, setMode] = useState<"delivery" | "dinein">("delivery");
  const [confirmed, setConfirmed] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", phone: "", address: "", table: "", notes: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;
    if (mode === "delivery" && !form.address) return;
    if (mode === "dinein" && !form.table) return;
    const orderNo = "MFC-" + Math.floor(100000 + Math.random() * 900000);
    setConfirmed(orderNo);
    clear();
  };

  const reset = () => {
    setConfirmed(null);
    setForm({ name: "", phone: "", address: "", table: "", notes: "" });
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
              <DialogTitle className="font-display text-2xl text-center">Order Placed!</DialogTitle>
              <DialogDescription className="text-center">
                Your order number is <span className="font-mono font-bold text-foreground">{confirmed}</span>
              </DialogDescription>
            </DialogHeader>
            <p className="mt-4 text-sm text-muted-foreground">
              We'll call you shortly to confirm. For any issues, contact us:
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
              {(["delivery", "dinein"] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMode(m)}
                  className={cn(
                    "flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    mode === m ? "bg-background shadow-sm text-foreground" : "text-muted-foreground",
                  )}
                >
                  {m === "delivery" ? "Home Delivery" : "Dine-in"}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" required type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              </div>
              {mode === "delivery" ? (
                <div>
                  <Label htmlFor="addr">Delivery Address</Label>
                  <Textarea id="addr" required rows={2} value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
                </div>
              ) : (
                <div>
                  <Label htmlFor="table">Table Number</Label>
                  <Input id="table" required value={form.table} onChange={(e) => setForm({ ...form, table: e.target.value })} />
                </div>
              )}
              <div>
                <Label htmlFor="notes">Order Notes (optional)</Label>
                <Textarea id="notes" rows={2} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
              </div>

              <div className="rounded-lg border border-border bg-muted/40 p-3 text-sm">
                <p className="font-semibold mb-2">Order Summary</p>
                <div className="space-y-1 max-h-32 overflow-y-auto">
                  {lines.map((l) => (
                    <div key={l.id} className="flex justify-between text-xs">
                      <span className="truncate pr-2">
                        {l.quantity}× {l.name}{l.size ? ` (${l.size})` : ""}
                      </span>
                      <span className="shrink-0">{formatPKR(l.unitPrice * l.quantity)}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-2 pt-2 border-t border-border space-y-1">
                  <div className="flex justify-between text-xs"><span>Subtotal</span><span>{formatPKR(subtotal)}</span></div>
                  <div className="flex justify-between text-xs"><span>Delivery</span><span>{deliveryCharge === 0 ? "Free" : formatPKR(deliveryCharge)}</span></div>
                  <div className="flex justify-between font-semibold pt-1"><span>Total</span><span className="text-primary">{formatPKR(total)}</span></div>
                </div>
              </div>

              <Button type="submit" disabled={lines.length === 0} className="w-full h-11 bg-primary hover:bg-primary/90">
                Place Order
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
