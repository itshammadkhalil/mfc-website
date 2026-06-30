// Photorealistic food photography per category.
import pizza1 from "@/assets/menu/pizza-1.jpg";
import pizza2 from "@/assets/menu/pizza-2.jpg";
import pizza3 from "@/assets/menu/pizza-3.jpg";
import burgers from "@/assets/menu/burgers.jpg";
import fries from "@/assets/menu/fries.jpg";
import rolls from "@/assets/menu/rolls.jpg";
import wings from "@/assets/menu/wings.jpg";
import pasta from "@/assets/menu/pasta.jpg";
import sandwich from "@/assets/menu/sandwich.jpg";
import broast from "@/assets/menu/broast.jpg";
import fruitChaat from "@/assets/menu/fruit-chaat.jpg";
import shakes from "@/assets/menu/shakes.jpg";
import iceCream from "@/assets/menu/ice-cream.jpg";
import margarita from "@/assets/menu/margarita.jpg";
import cake from "@/assets/menu/cake.jpg";
import drinks from "@/assets/menu/drinks.jpg";
import deals from "@/assets/menu/deals.jpg";

const PIZZA_POOL = [pizza1, pizza2, pizza3];

const BY_CATEGORY: Record<string, string> = {
  Pizza: pizza1,
  Burgers: burgers,
  "French Fries": fries,
  "Chicken Rolls": rolls,
  "Hot Wings": wings,
  Pasta: pasta,
  Sandwich: sandwich,
  "Broast Chicken": broast,
  "Fruit Chaat": fruitChaat,
  "Shakes & Cold Coffee": shakes,
  "Ice Cream": iceCream,
  Margarita: margarita,
  Cake: cake,
  Drinks: drinks,
  Deals: deals,
};

export const FALLBACK_IMAGE = deals;

export function getCategoryIcon(category: string): string {
  return BY_CATEGORY[category] ?? FALLBACK_IMAGE;
}

export function getPizzaImage(index: number): string {
  return PIZZA_POOL[index % PIZZA_POOL.length];
}
