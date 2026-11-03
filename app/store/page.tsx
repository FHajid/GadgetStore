'use client';

import React, { useState } from 'react';

// Product Catalog Data
const products = [
  {
    id: 1,
    name: 'Mechanical Developer Keyboard',
    price: '$129.99',
    category: 'Hardware',
    description: 'Tactile switches optimized for long coding sessions.',
    icon: '⌨️',
  },
  {
    id: 2,
    name: 'Clean Code & Architecture Book',
    price: '$29.99',
    category: 'Digital',
    description: 'Comprehensive guide to writing scalable React & Next.js code.',
    icon: '📘',
  },
  {
    id: 3,
    name: 'Ergonomic Debugging Hoodie',
    price: '$49.99',
    category: 'Apparel',
    description: 'Ultra-soft cotton hoodie built for late-night bug fixing.',
    icon: '👕',
  },
  {
    id: 4,
    name: 'Ultra-Wide Dev Monitor 34"',
    price: '$499.99',
    category: 'Hardware',
    description: 'Curved display built for multi-window programming.',
    icon: '🖥️',
  },
];

export default function Store() {
  const [cartCount, setCartCount] = useState<number>(0);

  const handleAddToCart = () => {
    setCartCount((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6 md:p-12">
      {/* Header */}
      <header className="max-w-6xl mx-auto flex justify-between items-center pb-8 border-b border-slate-800">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            DevGear <span className="text-blue-500">Store</span>
          </h1>
          <p className="text-slate-400 text-sm mt-1">Essential tools & gear for software developers.</p>
        </div>

        {/* Cart Counter */}
        <div className="bg-slate-800 px-4 py-2 rounded-xl border border-slate-700 flex items-center gap-2">
          <span>🛒</span>
          <span className="text-sm font-semibold">Cart: {cartCount}</span>
        </div>
      </header>

      {/* Product Grid */}
      <main className="max-w-6xl mx-auto mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-5 flex flex-col justify-between hover:border-blue-500/50 transition duration-200"
          >
            <div>
              <div className="h-36 bg-slate-900/60 rounded-xl flex items-center justify-center text-5xl mb-4">
                {product.icon}
              </div>
              <span className="text-xs uppercase tracking-wider font-semibold text-blue-400">
                {product.category}
              </span>
              <h2 className="text-lg font-bold text-white mt-1">{product.name}</h2>
              <p className="text-slate-400 text-xs mt-2 leading-relaxed">{product.description}</p>
            </div>

            <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-700/50">
              <span className="text-xl font-bold text-white">{product.price}</span>
              <button
                onClick={handleAddToCart}
                className="bg-blue-600 hover:bg-blue-500 active:scale-95 text-white text-xs font-semibold px-4 py-2 rounded-lg transition"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}