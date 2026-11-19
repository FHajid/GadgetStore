'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface Product {
  id: number;
  name: string;
  price: string;
  category: string;
  model3d: string;
}

export default function SimpleAdminPage() {
  // Sample starting products (stored in local state for now)
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: 'Wireless 3D Headphones', price: '199.99', category: 'Audio', model3d: '/models/headphones.glb' },
    { id: 2, name: 'Pro Smartphone', price: '799.99', category: 'Mobile', model3d: '/models/phone.glb' },
  ]);

  // Form inputs
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Audio');
  const [model3d, setModel3d] = useState('');

  // Add product to the list
  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price) return;

    const newProduct: Product = {
      id: Date.now(),
      name,
      price,
      category,
      model3d: model3d || 'None',
    };

    setProducts([newProduct, ...products]);
    setName('');
    setPrice('');
    setModel3d('');
  };

  // Delete product from the list
  const handleDelete = (id: number) => {
    setProducts(products.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10 text-slate-900">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex items-center justify-between bg-white p-5 rounded-2xl border border-slate-200">
          <div>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-slate-500 text-sm">Manage your 3D store products</p>
          </div>
          <Link
            href="/"
            className="text-sm font-medium bg-slate-900 text-white px-4 py-2 rounded-xl hover:bg-slate-800 transition"
          >
            ← Back to Store
          </Link>
        </div>

        {/* Add Product Form */}
        <form
          onSubmit={handleAddProduct}
          className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4"
        >
          <h2 className="text-lg font-bold">Add New Gadget</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Gadget Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="px-3 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="number"
              step="0.01"
              placeholder="Price ($)"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="px-3 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-3 py-2 border border-slate-300 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Audio">Audio</option>
              <option value="Mobile">Mobile</option>
              <option value="Wearables">Wearables</option>
              <option value="Accessories">Accessories</option>
            </select>

            <input
              type="text"
              placeholder="3D Path (e.g. /models/watch.glb)"
              value={model3d}
              onChange={(e) => setModel3d(e.target.value)}
              className="px-3 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition"
          >
            + Add Product
          </button>
        </form>

        {/* Product List */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="p-5 border-b border-slate-200">
            <h2 className="text-lg font-bold">Product List ({products.length})</h2>
          </div>

          <div className="divide-y divide-slate-100">
            {products.map((product) => (
              <div
                key={product.id}
                className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <h3 className="font-semibold text-slate-900">{product.name}</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Category: <span className="font-medium text-slate-700">{product.category}</span> • 
                    Price: <span className="font-medium text-slate-700">${product.price}</span> • 
                    3D Model: <span className="text-blue-600">{product.model3d}</span>
                  </p>
                </div>

                <button
                  onClick={() => handleDelete(product.id)}
                  className="self-start sm:self-center text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}