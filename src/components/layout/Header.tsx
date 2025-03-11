// src/components/layout/Header.tsx
"use client";

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white">
      <nav className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-medium text-blue-500">
              InvoicePilot.io
            </Link>
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/login" className="text-gray-500 hover:text-gray-900 text-sm font-medium">
              Se connecter
            </Link>
            <Link
              href="/register"
              className="bg-blue-500 text-white px-5 py-2.5 rounded-full hover:bg-blue-600 transition-colors text-sm font-medium"
            >
              S'inscrire
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-400 hover:text-gray-500 focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={1.5} 
                    d="M6 18L18 6M6 6l12 12" 
                  />
                ) : (
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={1.5} 
                    d="M4 6h16M4 12h16M4 18h16" 
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 space-y-3 py-3">
            <Link 
              href="/login" 
              className="block px-4 py-2 rounded-lg text-base font-medium text-gray-500 hover:bg-gray-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Se connecter
            </Link>
            <Link 
              href="/register" 
              className="block px-4 py-2 rounded-lg text-base font-medium text-white bg-blue-500 hover:bg-blue-600"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              S'inscrire
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}