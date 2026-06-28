export type MenuItem = {
  name: string;
  sizes: string[];
  prices: (number | null)[];
  type?: string;
};

export type MenuCategory = {
  category: string;
  items: MenuItem[];
  types?: string[];
  addOn?: { name: string; price: number };
  addOns?: { name: string; price: number }[];
  note?: string;
};

export type DealItem = { type: string; name: string; price: number };
export type DealGroup = {
  category: string;
  types: string[];
  notes: Record<string, string>;
  items: DealItem[];
};

export const restaurant = {
  name: "MFC - Miran Jee Food Club",
  tagline: "Air Conditioned Hall | Pizza, Burgers & More",
  timing: "10:00 AM to 02:00 AM",
  branch: "Near Ice Factory, Rahim Shah Road, Jahanian",
  phones: ["0306-7587938", "0309-7000178"],
  delivery: {
    minOrder: 600,
    belowMinCharge: 50,
    freeRadiusKm: 3,
    outOfCity: true,
  },
};

// ---------- Pizza ----------
const standardSizes = ["Small", "Medium", "Large", "Family"];
const mk = (
  type: string,
  sizes: string[],
  prices: (number | null)[],
  names: string[],
): MenuItem[] => names.map((name) => ({ name, type, sizes, prices }));

const pizzaItems: MenuItem[] = [
  ...mk("Standard", standardSizes, [550, 1100, 1450, 2000], [
    "Vege Lover Pizza",
    "Supreme Pizza",
    "Cheese Lover Pizza",
    "Shahi Pizza",
    "Chicken Tikka Pizza",
    "Achari Pizza",
    "Chicken Fajita Pizza",
    "Bonfire Pizza",
    "Simple Malai Boti Pizza",
  ]),
  ...mk("Classic", standardSizes, [600, 1200, 1600, 2100], [
    "Crush Kabab Pizza",
    "Crunchy Pizza",
    "Creamy Pizza",
    "Pepperoni Pizza",
  ]),
  ...mk("Premium", standardSizes, [700, 1350, 1750, 2350], [
    "Lazania Malai Boti Pizza",
    "Cheese Crust Pizza",
    "Behari Kabab Pizza",
    "Multani Pizza",
    "Seekh Kabab Pizza",
    "Lazania Pizza",
    "Extreme Pizza",
    "Crown Crust Pizza",
    "Squire Crust Pizza",
  ]),
  ...mk("Special Pizzaz", standardSizes, [800, 1550, 1900, 2750], [
    "Double Seekh Kabab Pizza",
    "Crispy Crust Pizza",
    "Special Multan Sultan Pizza",
    "4X Pizza (Any 4 Flavours)",
    "Mughlai Pizza",
    "Royal Crust Pizza",
  ]),
  ...mk("New Addition", ["Medium", "Large"], [1600, 2200], [
    "Double Extreme Pizza",
    "Lazania Double Extreme",
    "Seekh Kabab Double Extreme",
    "Parry Parry Extreme",
  ]),
  ...mk("Mazz", ["Large", "Family"], [2400, 3200], ["Special Mazz Pizza"]),
  ...mk("Mataka", ["Standard"], [1100], [
    "Malai Boti Pizza (Mataka)",
    "Tikka Boti Pizza (Mataka)",
    "Kabab Pizza (Mataka)",
  ]),
  ...mk("Steak", ["Medium", "Large"], [1100, 1400], ["Special Steak Pizza"]),
];

const single = (name: string, price: number | null): MenuItem => ({
  name,
  sizes: ["Standard"],
  prices: [price],
});

export const menuCategories: MenuCategory[] = [
  {
    category: "Pizza",
    types: ["Standard", "Classic", "Premium", "Special Pizzaz", "New Addition", "Mazz", "Mataka", "Steak"],
    items: pizzaItems,
  },
  {
    category: "Burgers",
    addOn: { name: "Extra Cheese Slice", price: 70 },
    items: [
      single("Zinger Burger", 370),
      single("Chicken Burger", 320),
      single("Mighty Burger", 650),
      single("Pizza Burger", 600),
      single("Jalapeno Burger", 370),
      single("Tikka Burger", 320),
      single("Double Decker Burger", 600),
      single("Double Patty Burger", 600),
      single("MFC 20-20 Burger", 660),
      single("Special Grill Tikka Burger", 500),
      single("Special Sunny Grill Burger", 650),
      single("Special Beef Burger", 650),
    ],
  },
  {
    category: "French Fries",
    items: [
      single("French Fries Small", 250),
      single("French Fries Large", 350),
      single("French Fries Family", 500),
      single("Loaded Pizza Fries Small", 500),
      single("Loaded Pizza Fries Large", 700),
      single("Crunchy Pizza Fries Small", 550),
      single("Crunchy Pizza Fries Large", 800),
    ],
  },
  {
    category: "Chicken Rolls",
    addOn: { name: "Extra Cheese Slice", price: 70 },
    items: [
      single("MFC Special Malai Boti Roll", 350),
      single("Shawarma Roll", 220),
      single("Cheese Shawarma Roll", 320),
      single("Pratha Roll", 320),
      single("Zinger Pratha Roll", 380),
      single("Zinger Shawarma Roll", 380),
      single("Kabab Roll", 320),
      single("Arabian Shamoli", 320),
      single("Twister Roll", 340),
      single("Shapata Roll", 800),
    ],
  },
  {
    category: "Hot Wings",
    items: [
      single("6 Pc Hot Wings / Nuggets", 320),
      single("12 Pc Hot Wings / Nuggets", 600),
      single("10 Pc Oven Baked Wings", 600),
      single("10 Pc Honey Wings", 600),
      single("10 Pc Crunchy Hot Shot", 450),
      single("Hot Shot Shakers", 500),
    ],
  },
  {
    category: "Pasta",
    items: [
      { name: "MFC 20 20 Pasta", sizes: ["Half", "Full"], prices: [550, 750] },
      { name: "Flaming Pasta", sizes: ["Half", "Full"], prices: [500, 700] },
      { name: "Crunchy Pasta", sizes: ["Half", "Full"], prices: [550, 750] },
      { name: "White Sauce Pasta", sizes: ["Half", "Full"], prices: [550, 750] },
    ],
  },
  {
    category: "Sandwich",
    items: [
      single("Tikka Sandwich", 600),
      single("Mexican Sandwich", 650),
      single("Malai Boti Sandwich", 650),
      single("Kabab Sandwich", 650),
    ],
  },
  {
    category: "Broast Chicken",
    addOns: [
      { name: "Extra Bun", price: 50 },
      { name: "Extra Dip Sauce", price: 50 },
    ],
    items: [
      single("Leg Broast / Grill Leg", 380),
      single("Chest Broast / Grill Chest", 400),
      single("Quarter Broast (1 Thigh, 1 Breast, 1 Bun, 1 Fries, 1 Garlic Dip)", 650),
      single("Half Broast (1 Leg, 1 Thigh, 1 Wing, 1 Breast, 1 Bun, Fries, 1 Garlic Dip)", 1200),
      single("Full Injected Broast (2 Legs, 2 Thighs, 2 Wings, 2 Breasts, 2 Bun, Fries, 2 Garlic Dips)", 2400),
    ],
  },
  {
    category: "Fruit Chaat",
    items: [single("Fruit Chaat", 300), single("Russian Salad", 400)],
  },
  {
    category: "Shakes & Cold Coffee",
    items: [
      single("Browine Shake", 400),
      single("Love Story Shake", 400),
      single("Oreo Shake", 400),
      single("Kit Kat Shake", 400),
      single("Strawberry Shake", 400),
      single("Vanilla Shake", 400),
      single("Chocolate Shake", 400),
      single("Coffee Shake", 400),
      single("Mango Shake", 400),
      single("Kulfa Shake", 400),
      single("Caramel Shake", 400),
      single("MFC Special Cold Coffee", 500),
      single("Cold Coffee", 400),
      single("Simple Cold Coffee", 400),
      single("Lotus Special", 400),
    ],
  },
  {
    category: "Ice Cream",
    items: [
      single("Vanilla Ice Cream", 250),
      single("Chocolate Ice Cream", 250),
      single("Pesta Ice Cream", 250),
      single("Strawberry Ice Cream", 250),
      single("Mango Ice Cream", 250),
      single("Tutti Fruti", 250),
      single("Kulfa", 250),
      single("Creamel", 250),
    ],
  },
  {
    category: "Margarita",
    items: [
      single("Fresh Lime", 150),
      single("Mint Margarita", 200),
      single("Strawberry Margarita", 200),
      single("Blue Berry Margarita", 200),
    ],
  },
  {
    category: "Cake",
    items: [
      single("1 Pound Chocolate Cake", 600),
      single("1 Pound Pineapple Cake", 600),
      single("2 Pound Chocolate Cake", 1200),
      single("2 Pound Pineapple Cake", 1200),
    ],
  },
  {
    category: "Drinks",
    note: "Prices vary — please call to confirm.",
    items: [
      single("500ml Drink", null),
      single("1000ml Drink", null),
      single("1500ml Drink", null),
      single("2.25 Liter Drink", null),
    ],
  },
];

// ---------- Deals ----------
const d = (type: string, items: { name: string; price: number }[]): DealItem[] =>
  items.map((i) => ({ type, name: i.name, price: i.price }));

export const dealsGroup: DealGroup = {
  category: "Deals",
  types: ["Pizza Deals", "Lunch & Midnight", "1 Person", "2 Person", "Family", "Student"],
  notes: {
    "Lunch & Midnight": "Lunch Time: 1:00pm to 3:00pm | Midnight: 10:00pm to 12:00am",
  },
  items: [
    ...d("Pizza Deals", [
      { name: "Deal 1: 1 Small Lazania Pizza + 1 Zinger Burger + 1 500ml Drink", price: 1150 },
      { name: "Deal 2: 1 Tikka Pizza Small + 1 Fajita Pizza Small + 1 Drink 500ml", price: 1150 },
      { name: "Deal 3: 1 Tikka Pizza Medium + 1 Fajita Pizza Small + 1000ml Drink", price: 1750 },
      { name: "Deal 4: 1 Seekh Kabab Pizza Large + 12 Pc Hot Wings + 1500ml Drink", price: 2450 },
      { name: "Deal 5: 1 Tikka Pizza Medium + 1 Fajita Pizza Medium + 1000ml Drink", price: 2350 },
      { name: "Deal 6: 1 Tikka Pizza Large + 1 Fajita Pizza Large + 1500ml Drink", price: 2950 },
    ]),
    ...d("Lunch & Midnight", [
      { name: "Deal 1: 3 Zinger Burgers + 1 Liter Drink", price: 1200 },
      { name: "Deal 2: 1 Medium Tikka Pizza + Half Liter Coke", price: 1170 },
      { name: "Deal 3: 1 Large Tikka Pizza + 1 Liter Drink", price: 1550 },
      { name: "Deal 4: 4 Zinger Burgers + 1.5 Liter Coke", price: 1600 },
      { name: "Deal 5: 1 Large Tikka Pizza + 1 Small Kabab Pizza + 1.5 Liter Coke", price: 2150 },
      { name: "Deal 6: 1 Large Lazania Pizza + 1 Large Kabab Pizza + 1 Large Fajita Pizza + 2.25 Liter Coke", price: 4800 },
      { name: "Deal 7: 1 Creamy Sandwich + 1 Drink 500ml", price: 700 },
      { name: "Deal 8: 1 Family Tikka Pizza + 1 Drink 1.5 Liter", price: 2100 },
      { name: "Deal 9: 6 Wings + 6 Nuggets + 1 Small Kabab Pizza + 1 Liter Drink", price: 1350 },
      { name: "Deal 10: 1 Shahi Pizza Large + 1 Bonfire Pizza Medium + 1 Liter Drink", price: 2550 },
      { name: "Deal 11: 1 Lazania Small + 1 Drink 500ml", price: 750 },
      { name: "Deal 12: 1 Paratha Roll + 1 Malai Boti Roll + 1 Shawarma Roll + 1 Zinger Paratha Roll + 1 Liter Drink", price: 1250 },
    ]),
    ...d("1 Person", [
      { name: "Deal 1: 1 Chicken Burger + 1 500ml Drink", price: 410 },
      { name: "Deal 2: 1 Tikka Burger + 1 500ml Drink", price: 410 },
      { name: "Deal 3: 1 Zinger Burger + 1 500ml Drink", price: 460 },
      { name: "Deal 4: 1 Jalapeno Burger + 1 500ml Drink", price: 440 },
      { name: "Deal 5: 1 Chicken Burger + 1 500ml Drink + 1 Small Fries", price: 650 },
      { name: "Deal 6: 1 Zinger Burger + 1 Small Fries + 1 500ml Drink", price: 700 },
    ]),
    ...d("2 Person", [
      { name: "Deal 1: 2 Shawarma Rolls + 1 500ml Drink", price: 500 },
      { name: "Deal 2: 2 Chicken Burgers + 1 500ml Drink", price: 720 },
      { name: "Deal 3: 2 Pratha Rolls + 1 500ml Drink", price: 720 },
      { name: "Deal 4: 1 Flaming Pasta Full + 1 500ml Drink", price: 780 },
      { name: "Deal 5: 4 Pc Behari Roll + 1 500ml Drink", price: 650 },
      { name: "Deal 6: 2 Zinger Burgers + 1 500ml Drink", price: 820 },
    ]),
    ...d("Family", [
      { name: "Deal 1: 5 Zinger Burgers + 1500ml Drink", price: 1950 },
      { name: "Deal 2: 2 Small Tikka Pizzas + 4 Zinger Burgers + Large Fries + 1500ml Drink", price: 3050 },
      { name: "Deal 3: 1 Large Lazania Pizza + 2 Zinger Burgers + 2 Chicken Burgers + Large Fries + 2.25 Liter Drink", price: 3200 },
    ]),
    ...d("Student", [
      { name: "Deal 1: 1 Small Pizza Kabab + 6 Pc Wings + 1 500ml Drink", price: 1080 },
      { name: "Deal 2: 1 Medium Pizza Kabab + 1 Liter Drink", price: 1450 },
      { name: "Deal 3: 1 Large Simple Malai Boti Pizza + 1 Liter Drink", price: 1550 },
    ]),
  ],
};

export const extras = [
  { name: "Dip Sauce", price: 60 },
  { name: "Mayo Sauce", price: 60 },
  { name: "Extra Cheese Slice", price: 70 },
  { name: "Extra Bun", price: 50 },
  { name: "Extra Dip Sauce", price: 50 },
];

// Backwards-compat re-export for any legacy import (DealsSection has been removed).
export const dealCategories: { category: string; items: { name: string; price: number }[]; note?: string }[] = [];
