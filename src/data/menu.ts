export type MenuItem = {
  name: string;
  prices: (number | null)[];
};

export type MenuCategory = {
  category: string;
  sizes: string[];
  items: MenuItem[];
  addOn?: { name: string; price: number };
  addOns?: { name: string; price: number }[];
  note?: string;
};

export type DealItem = { name: string; price: number };
export type DealCategory = {
  category: string;
  items: DealItem[];
  note?: string;
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

export const menuCategories: MenuCategory[] = [
  {
    category: "Standard Pizza",
    sizes: ["Small", "Medium", "Large", "Family"],
    items: [
      { name: "Vege Lover Pizza", prices: [550, 1100, 1450, 2000] },
      { name: "Supreme Pizza", prices: [550, 1100, 1450, 2000] },
      { name: "Cheese Lover Pizza", prices: [550, 1100, 1450, 2000] },
      { name: "Shahi Pizza", prices: [550, 1100, 1450, 2000] },
      { name: "Chicken Tikka Pizza", prices: [550, 1100, 1450, 2000] },
      { name: "Achari Pizza", prices: [550, 1100, 1450, 2000] },
      { name: "Chicken Fajita Pizza", prices: [550, 1100, 1450, 2000] },
      { name: "Bonfire Pizza", prices: [550, 1100, 1450, 2000] },
      { name: "Simple Malai Boti Pizza", prices: [550, 1100, 1450, 2000] },
    ],
  },
  {
    category: "Classic Pizza",
    sizes: ["Small", "Medium", "Large", "Family"],
    items: [
      { name: "Crush Kabab Pizza", prices: [600, 1200, 1600, 2100] },
      { name: "Crunchy Pizza", prices: [600, 1200, 1600, 2100] },
      { name: "Creamy Pizza", prices: [600, 1200, 1600, 2100] },
      { name: "Pepperoni Pizza", prices: [600, 1200, 1600, 2100] },
    ],
  },
  {
    category: "Premium Pizza",
    sizes: ["Small", "Medium", "Large", "Family"],
    items: [
      { name: "Lazania Malai Boti Pizza", prices: [700, 1350, 1750, 2350] },
      { name: "Cheese Crust Pizza", prices: [700, 1350, 1750, 2350] },
      { name: "Behari Kabab Pizza", prices: [700, 1350, 1750, 2350] },
      { name: "Multani Pizza", prices: [700, 1350, 1750, 2350] },
      { name: "Seekh Kabab Pizza", prices: [700, 1350, 1750, 2350] },
      { name: "Lazania Pizza", prices: [700, 1350, 1750, 2350] },
      { name: "Extreme Pizza", prices: [700, 1350, 1750, 2350] },
      { name: "Crown Crust Pizza", prices: [700, 1350, 1750, 2350] },
      { name: "Squire Crust Pizza", prices: [700, 1350, 1750, 2350] },
    ],
  },
  {
    category: "Special Pizzaz",
    sizes: ["Small", "Medium", "Large", "Family"],
    items: [
      { name: "Double Seekh Kabab Pizza", prices: [800, 1550, 1900, 2750] },
      { name: "Crispy Crust Pizza", prices: [800, 1550, 1900, 2750] },
      { name: "Special Multan Sultan Pizza", prices: [800, 1550, 1900, 2750] },
      { name: "4X Pizza (Any 4 Flavours)", prices: [800, 1550, 1900, 2750] },
      { name: "Mughlai Pizza", prices: [800, 1550, 1900, 2750] },
      { name: "Royal Crust Pizza", prices: [800, 1550, 1900, 2750] },
    ],
  },
  {
    category: "New Addition Pizza",
    sizes: ["Medium", "Large"],
    items: [
      { name: "Double Extreme Pizza", prices: [1600, 2200] },
      { name: "Lazania Double Extreme", prices: [1600, 2200] },
      { name: "Seekh Kabab Double Extreme", prices: [1600, 2200] },
      { name: "Parry Parry Extreme", prices: [1600, 2200] },
    ],
  },
  {
    category: "Special Mazz Pizza",
    sizes: ["Large", "Family"],
    items: [{ name: "Special Mazz Pizza", prices: [2400, 3200] }],
  },
  {
    category: "Mataka Pizza",
    sizes: ["Standard"],
    items: [
      { name: "Malai Boti Pizza (Mataka)", prices: [1100] },
      { name: "Tikka Boti Pizza (Mataka)", prices: [1100] },
      { name: "Kabab Pizza (Mataka)", prices: [1100] },
    ],
  },
  {
    category: "Special Steak Pizza",
    sizes: ["Medium", "Large"],
    items: [{ name: "Special Steak Pizza", prices: [1100, 1400] }],
  },
  {
    category: "Burgers",
    sizes: ["Standard"],
    items: [
      { name: "Zinger Burger", prices: [370] },
      { name: "Chicken Burger", prices: [320] },
      { name: "Mighty Burger", prices: [650] },
      { name: "Pizza Burger", prices: [600] },
      { name: "Jalapeno Burger", prices: [370] },
      { name: "Tikka Burger", prices: [320] },
      { name: "Double Decker Burger", prices: [600] },
      { name: "Double Patty Burger", prices: [600] },
      { name: "MFC 20-20 Burger", prices: [660] },
      { name: "Special Grill Tikka Burger", prices: [500] },
      { name: "Special Sunny Grill Burger", prices: [650] },
      { name: "Special Beef Burger", prices: [650] },
    ],
    addOn: { name: "Extra Cheese Slice", price: 70 },
  },
  {
    category: "French Fries",
    sizes: ["Standard"],
    items: [
      { name: "French Fries Small", prices: [250] },
      { name: "French Fries Large", prices: [350] },
      { name: "French Fries Family", prices: [500] },
      { name: "Loaded Pizza Fries Small", prices: [500] },
      { name: "Loaded Pizza Fries Large", prices: [700] },
      { name: "Crunchy Pizza Fries Small", prices: [550] },
      { name: "Crunchy Pizza Fries Large", prices: [800] },
    ],
  },
  {
    category: "Chicken Rolls",
    sizes: ["Standard"],
    items: [
      { name: "MFC Special Malai Boti Roll", prices: [350] },
      { name: "Shawarma Roll", prices: [220] },
      { name: "Cheese Shawarma Roll", prices: [320] },
      { name: "Pratha Roll", prices: [320] },
      { name: "Zinger Pratha Roll", prices: [380] },
      { name: "Zinger Shawarma Roll", prices: [380] },
      { name: "Kabab Roll", prices: [320] },
      { name: "Arabian Shamoli", prices: [320] },
      { name: "Twister Roll", prices: [340] },
      { name: "Shapata Roll", prices: [800] },
    ],
    addOn: { name: "Extra Cheese Slice", price: 70 },
  },
  {
    category: "Hot Wings",
    sizes: ["Standard"],
    items: [
      { name: "6 Pc Hot Wings / Nuggets", prices: [320] },
      { name: "12 Pc Hot Wings / Nuggets", prices: [600] },
      { name: "10 Pc Oven Baked Wings", prices: [600] },
      { name: "10 Pc Honey Wings", prices: [600] },
      { name: "10 Pc Crunchy Hot Shot", prices: [450] },
      { name: "Hot Shot Shakers", prices: [500] },
    ],
  },
  {
    category: "Pasta",
    sizes: ["Half", "Full"],
    items: [
      { name: "MFC 20 20 Pasta", prices: [550, 750] },
      { name: "Flaming Pasta", prices: [500, 700] },
      { name: "Crunchy Pasta", prices: [550, 750] },
      { name: "White Sauce Pasta", prices: [550, 750] },
    ],
  },
  {
    category: "Sandwich",
    sizes: ["Standard"],
    items: [
      { name: "Tikka Sandwich", prices: [600] },
      { name: "Mexican Sandwich", prices: [650] },
      { name: "Malai Boti Sandwich", prices: [650] },
      { name: "Kabab Sandwich", prices: [650] },
    ],
  },
  {
    category: "Broast Chicken",
    sizes: ["Standard"],
    items: [
      { name: "Leg Broast / Grill Leg", prices: [380] },
      { name: "Chest Broast / Grill Chest", prices: [400] },
      { name: "Quarter Broast (1 Thigh, 1 Breast, 1 Bun, 1 Fries, 1 Garlic Dip)", prices: [650] },
      { name: "Half Broast (1 Leg, 1 Thigh, 1 Wing, 1 Breast, 1 Bun, Fries, 1 Garlic Dip)", prices: [1200] },
      { name: "Full Injected Broast (2 Legs, 2 Thighs, 2 Wings, 2 Breasts, 2 Bun, Fries, 2 Garlic Dips)", prices: [2400] },
    ],
    addOns: [
      { name: "Extra Bun", price: 50 },
      { name: "Extra Dip Sauce", price: 50 },
    ],
  },
  {
    category: "Fruit Chaat",
    sizes: ["Standard"],
    items: [
      { name: "Fruit Chaat", prices: [300] },
      { name: "Russian Salad", prices: [400] },
    ],
  },
  {
    category: "Ice Cream Shakes",
    sizes: ["Standard"],
    items: [
      { name: "Browine Shake", prices: [400] },
      { name: "Love Story Shake", prices: [400] },
      { name: "Oreo Shake", prices: [400] },
      { name: "Kit Kat Shake", prices: [400] },
      { name: "Strawberry Shake", prices: [400] },
      { name: "Vanilla Shake", prices: [400] },
      { name: "Chocolate Shake", prices: [400] },
      { name: "Coffee Shake", prices: [400] },
      { name: "Mango Shake", prices: [400] },
      { name: "Kulfa Shake", prices: [400] },
      { name: "Caramel Shake", prices: [400] },
    ],
  },
  {
    category: "Cold Coffee",
    sizes: ["Standard"],
    items: [
      { name: "MFC Special Cold Coffee", prices: [500] },
      { name: "Cold Coffee", prices: [400] },
      { name: "Simple Cold Coffee", prices: [400] },
      { name: "Lotus Special", prices: [400] },
    ],
  },
  {
    category: "Ice Cream",
    sizes: ["Standard"],
    items: [
      { name: "Vanilla Ice Cream", prices: [250] },
      { name: "Chocolate Ice Cream", prices: [250] },
      { name: "Pesta Ice Cream", prices: [250] },
      { name: "Strawberry Ice Cream", prices: [250] },
      { name: "Mango Ice Cream", prices: [250] },
      { name: "Tutti Fruti", prices: [250] },
      { name: "Kulfa", prices: [250] },
      { name: "Creamel", prices: [250] },
    ],
  },
  {
    category: "Margarita",
    sizes: ["Standard"],
    items: [
      { name: "Fresh Lime", prices: [150] },
      { name: "Mint Margarita", prices: [200] },
      { name: "Strawberry Margarita", prices: [200] },
      { name: "Blue Berry Margarita", prices: [200] },
    ],
  },
  {
    category: "Cake",
    sizes: ["Standard"],
    items: [
      { name: "1 Pound Chocolate Cake", prices: [600] },
      { name: "1 Pound Pineapple Cake", prices: [600] },
      { name: "2 Pound Chocolate Cake", prices: [1200] },
      { name: "2 Pound Pineapple Cake", prices: [1200] },
    ],
  },
  {
    category: "Drinks",
    sizes: ["Standard"],
    items: [
      { name: "500ml Drink", prices: [null] },
      { name: "1000ml Drink", prices: [null] },
      { name: "1500ml Drink", prices: [null] },
      { name: "2.25 Liter Drink", prices: [null] },
    ],
    note: "Prices not visible on menu image — to be added manually",
  },
];

export const dealCategories: DealCategory[] = [
  {
    category: "Special Pizza Deals",
    items: [
      { name: "Deal 1: 1 Small Lazania Pizza + 1 Zinger Burger + 1 500ml Drink", price: 1150 },
      { name: "Deal 2: 1 Tikka Pizza Small + 1 Fajita Pizza Small + 1 Drink 500ml", price: 1150 },
      { name: "Deal 3: 1 Tikka Pizza Medium + 1 Fajita Pizza Small + 1000ml Drink", price: 1750 },
      { name: "Deal 4: 1 Seekh Kabab Pizza Large + 12 Pc Hot Wings + 1500ml Drink", price: 2450 },
      { name: "Deal 5: 1 Tikka Pizza Medium + 1 Fajita Pizza Medium + 1000ml Drink", price: 2350 },
      { name: "Deal 6: 1 Tikka Pizza Large + 1 Fajita Pizza Large + 1500ml Drink", price: 2950 },
    ],
  },
  {
    category: "Lunch & Midnight Deals",
    note: "Lunch Time: 1:00pm to 3:00pm | Midnight: 10:00pm to 12:00am",
    items: [
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
    ],
  },
  {
    category: "1 Person Deals",
    items: [
      { name: "Deal 1: 1 Chicken Burger + 1 500ml Drink", price: 410 },
      { name: "Deal 2: 1 Tikka Burger + 1 500ml Drink", price: 410 },
      { name: "Deal 3: 1 Zinger Burger + 1 500ml Drink", price: 460 },
      { name: "Deal 4: 1 Jalapeno Burger + 1 500ml Drink", price: 440 },
      { name: "Deal 5: 1 Chicken Burger + 1 500ml Drink + 1 Small Fries", price: 650 },
      { name: "Deal 6: 1 Zinger Burger + 1 Small Fries + 1 500ml Drink", price: 700 },
    ],
  },
  {
    category: "2 Person Deals",
    items: [
      { name: "Deal 1: 2 Shawarma Rolls + 1 500ml Drink", price: 500 },
      { name: "Deal 2: 2 Chicken Burgers + 1 500ml Drink", price: 720 },
      { name: "Deal 3: 2 Pratha Rolls + 1 500ml Drink", price: 720 },
      { name: "Deal 4: 1 Flaming Pasta Full + 1 500ml Drink", price: 780 },
      { name: "Deal 5: 4 Pc Behari Roll + 1 500ml Drink", price: 650 },
      { name: "Deal 6: 2 Zinger Burgers + 1 500ml Drink", price: 820 },
    ],
  },
  {
    category: "Family Deals",
    items: [
      { name: "Deal 1: 5 Zinger Burgers + 1500ml Drink", price: 1950 },
      { name: "Deal 2: 2 Small Tikka Pizzas + 4 Zinger Burgers + Large Fries + 1500ml Drink", price: 3050 },
      { name: "Deal 3: 1 Large Lazania Pizza + 2 Zinger Burgers + 2 Chicken Burgers + Large Fries + 2.25 Liter Drink", price: 3200 },
    ],
  },
  {
    category: "Student Deals",
    items: [
      { name: "Deal 1: 1 Small Pizza Kabab + 6 Pc Wings + 1 500ml Drink", price: 1080 },
      { name: "Deal 2: 1 Medium Pizza Kabab + 1 Liter Drink", price: 1450 },
      { name: "Deal 3: 1 Large Simple Malai Boti Pizza + 1 Liter Drink", price: 1550 },
    ],
  },
];

export const extras = [
  { name: "Dip Sauce", price: 60 },
  { name: "Mayo Sauce", price: 60 },
  { name: "Extra Cheese Slice", price: 70 },
  { name: "Extra Bun", price: 50 },
  { name: "Extra Dip Sauce", price: 50 },
];
