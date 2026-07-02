# MFC — Miran Jee Food Club 🍕🍔

> Modern restaurant ordering website for MFC — Miran Jee Food Club, Jahanian.

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=flat&logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-Build-646CFF?style=flat&logo=vite)

---

## 📌 About

A full-featured, mobile-first online ordering website built for **MFC — Miran Jee Food Club**, a restaurant based in Jahanian, Punjab, Pakistan. Customers can browse the full menu, add items to cart, and place orders directly via WhatsApp — no third-party delivery app, no commission.

**Live Branch:** Near Ice Factory, Rahim Shah Road, Jahanian  
**Contact:** 0306-7587938 | 0309-7000178  
**Hours:** 10:00 AM – 02:00 AM Daily

---

## ✨ Features

- 🍕 **Full Menu** — 15 categories (Pizza, Burgers, Deals, Shakes & more), all items with sizes and prices from MFC's printed menu
- 🛒 **Cart System** — Add items, select sizes, adjust quantities, live total calculation
- 💬 **WhatsApp Ordering** — One-tap order placement; auto-formatted order message sent directly to MFC's WhatsApp
- 🕐 **Open/Closed Status** — Live badge showing open/closed based on operating hours (10AM–2AM)
- 🚫 **Closed-Hours Protection** — Checkout blocked with polite message during closed hours
- 📦 **3 Order Types** — Home Delivery, Take Away, Dine-in (with conditional address field)
- 💰 **Smart Delivery Charges** — Free above Rs 600, Rs 50 below (Home Delivery only)
- 🎯 **Deals Section** — All deal categories with filter chips (Pizza, Lunch & Midnight, 1 Person, 2 Person, Family, Student)
- 📱 **PWA Ready** — Installable on mobile as an app with custom chef logo icon
- ⭐ **Reviews Section** — Customer testimonials + feedback form
- 🌐 **Fully Responsive** — Mobile (375px), Tablet (768px), Desktop optimized

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend Framework | React 18 + TypeScript |
| Styling | Tailwind CSS |
| Build Tool | Vite |
| Routing | TanStack Router |
| Icons | Lucide React |
| Version Control | GitHub |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/itshammadkhalil/mfc-website.git
cd mfc-website

# Install dependencies
npm install
# or
bun install

# Start development server
npm run dev
# or
bun dev
```

The app will be available at `http://localhost:8080`

### Build for Production

```bash
npm run build
# or
bun run build
```

---

## 📁 Project Structure

```
mfc-website/
├── public/             # Static assets (logo, favicon, PWA icons)
├── src/
│   ├── components/     # Reusable UI components
│   │   ├── Navbar/
│   │   ├── Hero/
│   │   ├── Menu/
│   │   ├── Cart/
│   │   ├── Checkout/
│   │   ├── About/
│   │   ├── Reviews/
│   │   └── Footer/
│   ├── data/           # Menu data (items, categories, deals, prices)
│   ├── hooks/          # Custom React hooks (cart, open/closed status)
│   ├── pages/          # Page-level components
│   └── main.tsx        # App entry point
├── package.json
├── vite.config.ts
└── tailwind.config.ts
```

---

## 🗺️ Roadmap

- [ ] Reviews database with admin moderation panel
- [ ] Drink prices update (currently blank — to be confirmed with MFC)
- [ ] Online payment integration
- [ ] Order tracking system
- [ ] Multi-branch support

---

## 🏢 Developed By

**NovaStack**  
📧 Hello@novastackltd.com  
🌐 [novastackltd.com](https://novastackltd.com)

---

*© 2025 NovaStack. Built for MFC — Miran Jee Food Club.*
