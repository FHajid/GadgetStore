'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* 1. Left: Logo */}
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-gray-900">
          <span className="text-2xl">🎧</span>
          <span>GadgetStore<span className="text-blue-600">3D</span></span>
        </Link>

        {/* 2. Middle: Desktop Navigation Links (Hidden on Mobile) */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <Link href="/" className="hover:text-blue-600 transition">Home</Link>
          <Link href="/products" className="hover:text-blue-600 transition">Products</Link>
          <Link href="/categories" className="hover:text-blue-600 transition">Categories</Link>
        </div>

        {/* 3. Right: Account Icon & Hamburger Toggle Button */}
        <div className="flex items-center gap-2 sm:gap-4">
          
          {/* Account Icon */}
          <Link 
            href="/login" 
            aria-label="Account"
            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-full transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </Link>

          {/* Hamburger Button (Only visible on screens below `md`) */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="md:hidden p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition"
          >
            {isMenuOpen ? (
              // "X" Close Icon
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              // Hamburger Icon
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

        </div>
      </div>

      {/* 4. Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pt-2 pb-4 space-y-2">
          <Link 
            href="/" 
            onClick={() => setIsMenuOpen(false)}
            className="block py-2 text-gray-700 hover:text-blue-600 font-medium"
          >
            Home
          </Link>
          <Link 
            href="/products" 
            onClick={() => setIsMenuOpen(false)}
            className="block py-2 text-gray-700 hover:text-blue-600 font-medium"
          >
            Products
          </Link>
          <Link 
            href="/categories" 
            onClick={() => setIsMenuOpen(false)}
            className="block py-2 text-gray-700 hover:text-blue-600 font-medium"
          >
            Categories
          </Link>
        </div>
      )}
    </nav>
  );
}