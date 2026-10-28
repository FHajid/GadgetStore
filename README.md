🎧 GadgetStore 3D — Interactive Electronics E-Commerce

Welcome to GadgetStore 3D, a modern e-commerce web application designed for electronic gadgets and tech products. Built with Next.js, TypeScript, and Tailwind CSS, this platform provides an immersive shopping experience by integrating dynamic 3D product viewports—allowing customers to rotate, inspect, and experience products in full 360° view before buying.

✨ Features

📦 Interactive 3D Viewers: Real-time 3D models (.glb/.gltf) on product detail pages with full camera controls, zoom, and auto-rotation.

📱 Augmented Reality (AR): Mobile-ready AR preview using <model-viewer> so users can place gadgets into their real-world environment.

⚡ High Performance: Built on Next.js with server-side rendering (SSR) and client-side optimization for smooth 3D frame rates.

🎨 Modern & Clean UI: Styled with Tailwind CSS for a sleek, responsive dark/light mode friendly layout.

🛒 E-Commerce Engine: Detailed product listings, category filters, and product details with fallbacks for standard 2D image previews.

🛠️ Tech Stack

Framework: Next.js (App Router)

Language: TypeScript

Styling: Tailwind CSS

3D Graphics:

@google/model-viewer (Lightweight AR / 3D web component)

Three.js / @react-three/fiber

Version Control: Git & GitHub

🚀 Getting Started

Follow these steps to run the project locally on your machine:

1. Prerequisites

Ensure you have Node.js (v18.x or higher) and npm installed:

node -v
npm -v


2. Clone the Repository

git clone https://github.com/FHajid/GadgetStore.git
cd GadgetStore


3. Install Dependencies

npm install
# or
yarn install


4. Add Your 3D Models

Place your compressed .glb or .gltf 3D files into the public directory:

public/
└── models/
    ├── headphones.glb
    ├── smartphone.glb
    └── smartwatch.glb


5. Start the Development Server

npm run dev


Open http://localhost:3000 in your browser to view the application.

📂 Project Structure

GadgetStore/
├── app/
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── ProductCard.tsx
│   │   └── Product3DViewer.tsx   # Client-side 3D viewport component
│   ├── data/
│   │   └── products.ts           # Product catalog schema & mock data
│   ├── product/[id]/
│   │   └── page.tsx              # Product Detail Page (PDP)
│   ├── layout.tsx
│   └── page.tsx                  # Storefront homepage
├── public/
│   ├── images/                   # Static thumbnails
│   └── models/                   # 3D GLTF/GLB models
├── package.json
├── tsconfig.json
└── README.md


💡 How 3D Models Are Loaded

Products in app/data/products.ts include optional model3d asset paths alongside standard thumbnail images:

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


When a user visits a product page, if model3d is defined, the page dynamically renders the interactive Product3DViewer component with automatic fallback to static images.

🤝 Contributing

Contributions, issues, and feature requests are welcome!

Feel free to check out the issues page or submit a pull request.

📄 License

Distributed under the MIT License. See LICENSE for more details.