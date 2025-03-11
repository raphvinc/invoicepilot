// src/components/layout/Footer.tsx
"use client";

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-sm font-medium text-gray-400 uppercase mb-4">Produit</h3>
            <ul className="space-y-3">
              <li><Link href="/#features" className="text-sm text-gray-500 hover:text-blue-500 transition-colors">Fonctionnalités</Link></li>
              <li><Link href="#" className="text-sm text-gray-500 hover:text-blue-500 transition-colors">Tarifs</Link></li>
              <li><Link href="#" className="text-sm text-gray-500 hover:text-blue-500 transition-colors">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-400 uppercase mb-4">Entreprise</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="text-sm text-gray-500 hover:text-blue-500 transition-colors">À propos</Link></li>
              <li><Link href="#" className="text-sm text-gray-500 hover:text-blue-500 transition-colors">Blog</Link></li>
              <li><Link href="#" className="text-sm text-gray-500 hover:text-blue-500 transition-colors">Carrières</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-400 uppercase mb-4">Support</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="text-sm text-gray-500 hover:text-blue-500 transition-colors">Centre d'aide</Link></li>
              <li><Link href="#" className="text-sm text-gray-500 hover:text-blue-500 transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-400 uppercase mb-4">Légal</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="text-sm text-gray-500 hover:text-blue-500 transition-colors">Confidentialité</Link></li>
              <li><Link href="#" className="text-sm text-gray-500 hover:text-blue-500 transition-colors">Conditions</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-100">
          <p className="text-sm text-gray-400 text-center">
            &copy; {new Date().getFullYear()} InvoicePilot.io. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}