import { useState } from "react";
import { Minus, Moon, Plus, ShoppingBag, Trash2 } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useCart, formatPKR } from "@/lib/cart-context";
import { restaurant } from "@/data/menu";
import { isOpenNow, CLOSED_MESSAGE } from "@/lib/hours";

export function CartDrawer() {
  const { isOpen, setOpen, lines, updateQty, removeItem, subtotal, deliveryCharge, total, setCheckoutOpen } = useCart();
  const [closedNotice, setClosedNotice] = useState(false);

  const handleProceed = () => {
    if (!isOpenNow()) {
      setClosedNotice(true);
      return;
    }
    setOpen(false);
    setCheckoutOpen(true);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle className="font-display text-2xl">Your Cart</SheetTitle>
          <SheetDescription>Review items and checkout to place your order.</SheetDescription>
        </SheetHeader>

        {lines.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
            <div className="grid h-16 w-16 place-items-center rounded-full bg-muted">
              <ShoppingBag className="h-7 w-7 text-muted-foreground" />
            </div>
            <p className="mt-4 font-medium">Your cart is empty</p>
            <p className="text-sm text-muted-foreground mt-1">Add items from the menu to get started.</p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto -mx-6 px-6 py-2 space-y-3">
              {lines.map((l) => (
                <div key={l.id} className="rounded-xl border border-border bg-card p-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="font-medium text-sm leading-snug">{l.name}</p>
                      {l.size && <p className="text-xs text-muted-foreground mt-0.5">{l.size}</p>}
                      <p className="text-xs text-muted-foreground">{formatPKR(l.unitPrice)} each</p>
                    </div>
                    <button
                      onClick={() => removeItem(l.id)}
                      className="text-muted-foreground hover:text-destructive shrink-0"
                      aria-label="Remove"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center rounded-lg border border-border">
                      <button
                        onClick={() => updateQty(l.id, l.quantity - 1)}
                        className="grid h-7 w-7 place-items-center hover:text-primary"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-7 text-center text-sm font-semibold">{l.quantity}</span>
                      <button
                        onClick={() => updateQty(l.id, l.quantity + 1)}
                        className="grid h-7 w-7 place-items-center hover:text-primary"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    <span className="font-semibold text-sm">{formatPKR(l.unitPrice * l.quantity)}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-4 space-y-2">
              <Row label="Subtotal" value={formatPKR(subtotal)} />
              <Row
                label={`Delivery ${deliveryCharge === 0 ? "(Free)" : `(under Rs ${restaurant.delivery.minOrder})`}`}
                value={deliveryCharge === 0 ? "Free" : formatPKR(deliveryCharge)}
              />
              <div className="flex justify-between pt-2 border-t border-border">
                <span className="font-display text-lg">Total</span>
                <span className="font-display text-xl text-primary">{formatPKR(total)}</span>
              </div>
              {subtotal < restaurant.delivery.minOrder && (
                <p className="text-xs text-muted-foreground">
                  Add {formatPKR(restaurant.delivery.minOrder - subtotal)} more for free delivery within 3km.
                </p>
              )}
              <Button
                className="w-full mt-3 h-11 bg-primary hover:bg-primary/90"
                onClick={handleProceed}
              >
                Proceed to Checkout
              </Button>
            </div>
          </>
        )}
      </SheetContent>

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
    </Sheet>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
