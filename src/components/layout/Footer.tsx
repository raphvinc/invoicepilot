"use client";

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase mb-4">Produit</h3>
            <ul className="space-y-3">
              <li><Link href="/#features" className="text-base text-gray-600 hover:text-gray-900">Fonctionnalités</Link></li>
              <li><Link href="#" className="text-base text-gray-600 hover:text-gray-900">Tarifs</Link></li>
              <li><Link href="#" className="text-base text-gray-600 hover:text-gray-900">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase mb-4">Entreprise</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="text-base text-gray-600 hover:text-gray-900">À propos</Link></li>
              <li><Link href="#" className="text-base text-gray-600 hover:text-gray-900">Blog</Link></li>
              <li><Link href="#" className="text-base text-gray-600 hover:text-gray-900">Carrières</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase mb-4">Support</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="text-base text-gray-600 hover:text-gray-900">Centre d'aide</Link></li>
              <li><Link href="#" className="text-base text-gray-600 hover:text-gray-900">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase mb-4">Légal</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="text-base text-gray-600 hover:text-gray-900">Confidentialité</Link></li>
              <li><Link href="#" className="text-base text-gray-600 hover:text-gray-900">Conditions</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-base text-gray-500 text-center">
            &copy; {new Date().getFullYear()} InvoicePilot.io. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}