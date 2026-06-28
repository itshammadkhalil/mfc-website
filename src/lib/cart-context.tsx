import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { restaurant } from "@/data/menu";

export type CartLine = {
  id: string;
  name: string;
  size?: string;
  unitPrice: number;
  quantity: number;
  category: string;
};

type CartContextValue = {
  lines: CartLine[];
  addItem: (line: Omit<CartLine, "quantity"> & { quantity?: number }) => void;
  updateQty: (id: string, qty: number) => void;
  removeItem: (id: string) => void;
  clear: () => void;
  itemCount: number;
  subtotal: number;
  deliveryCharge: number;
  total: number;
  isOpen: boolean;
  setOpen: (v: boolean) => void;
  checkoutOpen: boolean;
  setCheckoutOpen: (v: boolean) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const addItem: CartContextValue["addItem"] = (line) => {
    setLines((prev) => {
      const existing = prev.find((l) => l.id === line.id);
      if (existing) {
        return prev.map((l) =>
          l.id === line.id ? { ...l, quantity: l.quantity + (line.quantity ?? 1) } : l,
        );
      }
      return [...prev, { ...line, quantity: line.quantity ?? 1 }];
    });
    setOpen(true);
  };

  const updateQty = (id: string, qty: number) => {
    if (qty <= 0) {
      setLines((prev) => prev.filter((l) => l.id !== id));
      return;
    }
    setLines((prev) => prev.map((l) => (l.id === id ? { ...l, quantity: qty } : l)));
  };

  const removeItem = (id: string) => setLines((prev) => prev.filter((l) => l.id !== id));
  const clear = () => setLines([]);

  const value = useMemo<CartContextValue>(() => {
    const itemCount = lines.reduce((s, l) => s + l.quantity, 0);
    const subtotal = lines.reduce((s, l) => s + l.unitPrice * l.quantity, 0);
    const deliveryCharge =
      subtotal === 0 ? 0 : subtotal >= restaurant.delivery.minOrder ? 0 : restaurant.delivery.belowMinCharge;
    return {
      lines,
      addItem,
      updateQty,
      removeItem,
      clear,
      itemCount,
      subtotal,
      deliveryCharge,
      total: subtotal + deliveryCharge,
      isOpen,
      setOpen,
      checkoutOpen,
      setCheckoutOpen,
    };
  }, [lines, isOpen, checkoutOpen]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export const formatPKR = (n: number) => `Rs ${n.toLocaleString("en-PK")}`;
