# 🎧 GadgetStore 3D — Interactive Electronics E-Commerce

Welcome to **GadgetStore 3D**, a modern e-commerce web application designed for electronic gadgets and tech products. Built with Next.js, TypeScript, and Tailwind CSS, this platform provides an immersive shopping experience by integrating dynamic 3D product viewports—allowing customers to rotate, inspect, and experience products in full 360° view before buying.

---

## ✨ Features

* 📦 **Interactive 3D Viewers:** Real-time 3D models (`.glb`/`.gltf`) on product detail pages with full camera controls, zoom, and auto-rotation.
* 📱 **Augmented Reality (AR):** Mobile-ready AR preview using `<model-viewer>` so users can place gadgets into their real-world environment.
* ⚡ **High Performance:** Built on Next.js with server-side rendering (SSR) and client-side optimization for smooth 3D frame rates.
* 🎨 **Modern & Clean UI:** Styled with Tailwind CSS for a sleek, responsive dark/light mode friendly layout.
* 🛒 **E-Commerce Engine:** Detailed product listings, category filters, and product details with fallbacks for standard 2D image previews.

---

## 🛠️ Tech Stack

* **Framework:** Next.js (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **3D Graphics:**
* `@google/model-viewer` (Lightweight AR / 3D web component)
* Three.js / `@react-three/fiber`


* **Version Control:** Git & GitHub

---

## 🚀 Getting Started

Follow these steps to run the project locally on your machine:

### 1. Prerequisites

Ensure you have Node.js (v18.x or higher) and npm installed:

```bash
node -v
npm -v

```

### 2. Clone the Repository

```bash
git clone https://github.com/FHajid/GadgetStore.git
cd GadgetStore

```

### 3. Install Dependencies

```bash
npm install
# or
yarn install

```

### 4. Add Your 3D Models

Place your compressed `.glb` or `.gltf` 3D files into the `public` directory:

```text
public/
└── models/
    ├── headphones.glb
    ├── smartphone.glb
    └── smartwatch.glb

```

### 5. Start the Development Server

```bash
npm run dev

```
DAILY LOGIN II

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 📂 Project Structure

```text
GadgetStore/
├── app/
│   ├── (store)/                 # Customer Storefront Routes
│   │   ├── page.tsx             # Store Homepage
│   │   ├── product/[id]/
│   │   │   └── page.tsx         # Product Detail Page (3D Viewer)
│   │   └── cart/                # Shopping Cart Page
│   ├── admin/                   # Admin Panel Routes
│   │   ├── page.tsx             # Admin Overview & Analytics
│   │   ├── products/            # Admin Inventory & CRUD
│   │   │   ├── page.tsx
│   │   │   └── new/page.tsx     # Add New Product + 3D Upload
│   │   └── orders/              # Order Management Dashboard
│   ├── api/                     # Next.js API Routes & Server Actions
│   │   ├── products/
│   │   └── upload-3d/           # 3D Asset Upload Endpoint
│   ├── components/
│   │   ├── store/
│   │   │   └── Product3DViewer.tsx
│   │   └── admin/
│   │       ├── AdminSidebar.tsx
│   │       └── ModelUploadZone.tsx
│   └── layout.tsx
├── public/
│   ├── images/                  # Static product thumbnails
│   └── models/                  # Local fallback 3D assets (.glb)
├── prisma/
│   └── schema.prisma            # Database Schema (Products, Orders, Users)
├── package.json
└── README.md

```

---

## 💡 How 3D Models Are Loaded

Products in `app/data/products.ts` include optional `model3d` asset paths alongside standard thumbnail images:

```typescript
export const products = [
  {
    id: "gadget-1",
    name: "Wireless Noise-Canceling Headphones",
    price: 199.99,
    image: "/images/headphones.jpg",
    model3d: "/models/headphones.glb", // Path to 3D asset
    description: "Experience spatial audio and active noise cancellation."
  }
];

```

When a user visits a product page, if `model3d` is defined, the page dynamically renders the interactive `Product3DViewer` component with automatic fallback to static images.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

Feel free to check out the issues page or submit a pull request.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more details.