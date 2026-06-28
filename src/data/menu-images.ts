// Representative Unsplash photos per menu category.
// Pizza categories rotate through several photos so cards don't all look identical.

const u = (id: string) =>
  `https://images.unsplash.com/${id}?w=640&q=80&auto=format&fit=crop`;

const pizzaPool = [
  u("photo-1565299624946-b28f40a0ae38"),
  u("photo-1513104890138-7c749659a591"),
  u("photo-1574071318508-1cdbab80d002"),
];

const dealsPool = [
  u("photo-1513104890138-7c749659a591"),
  u("photo-1568901346375-23c9450c58cd"),
  u("photo-1565299507177-b0ac66763828"),
];

const singleByCategory: Record<string, string> = {
  Burgers: u("photo-1568901346375-23c9450c58cd"),
  "French Fries": u("photo-1573080496219-bb080dd4f877"),
  "Chicken Rolls": u("photo-1626700051175-6818013e1d4f"),
  "Hot Wings": u("photo-1608039755401-742074f0548d"),
  Pasta: u("photo-1551183053-bf91a1d81141"),
  Sandwich: u("photo-1528735602780-2552fd46c7af"),
  "Broast Chicken": u("photo-1562967914-608f82629710"),
  "Fruit Chaat": u("photo-1490474504059-bf2db5ab2348"),
  "Ice Cream Shakes": u("photo-1572490122747-3968b75cc699"),
  "Cold Coffee": u("photo-1461023058943-07fcbe16d735"),
  "Ice Cream": u("photo-1567206563064-6f60f40a2b57"),
  Margarita: u("photo-1551538827-9c037cb4f32a"),
  Cake: u("photo-1578985545062-69928b1d9587"),
  Drinks: u("photo-1622483767028-3f66f32aef97"),
};

export function getMenuItemImage(category: string, index = 0): string {
  if (category.toLowerCase().includes("pizza")) {
    return pizzaPool[index % pizzaPool.length];
  }
  return singleByCategory[category] ?? pizzaPool[0];
}

export function getDealImage(index = 0): string {
  return dealsPool[index % dealsPool.length];
}
