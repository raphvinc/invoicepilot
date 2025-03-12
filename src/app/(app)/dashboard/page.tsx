// src/app/(app)/dashboard/page.tsx
"use client";

import Link from 'next/link';
import InvoiceStatusChart from '@/components/dashboard/InvoiceStatusChart';
import PaymentTimelineChart from '@/components/dashboard/PaymentTimelineChart';
import ClientPaymentScoreChart from '@/components/dashboard/ClientPaymentScoreChart';

export default function DashboardPage() {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="mb-10 pt-4">
          <h1 className="text-3xl font-medium text-gray-900">Tableau de bord</h1>
          <p className="text-gray-500 mt-2">
            Bienvenue sur votre tableau de bord InvoicePilot
          </p>
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Carte statistique - Factures à payer */}
          <div className="bg-white rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] p-8">
            <div className="flex flex-col">
              <span className="text-4xl font-medium text-gray-900">8</span>
              <span className="text-sm text-gray-500 mt-1">Factures à payer</span>
            </div>
          </div>
  
          {/* Carte statistique - En retard */}
          <div className="bg-white rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] p-8">
            <div className="flex flex-col">
              <span className="text-4xl font-medium text-gray-900">3</span>
              <span className="text-sm text-gray-500 mt-1">En retard</span>
            </div>
          </div>
  
          {/* Carte statistique - Relances envoyées */}
          <div className="bg-white rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] p-8">
            <div className="flex flex-col">
              <span className="text-4xl font-medium text-gray-900">12</span>
              <span className="text-sm text-gray-500 mt-1">Relances envoyées</span>
            </div>
          </div>
  
          {/* Carte statistique - Montant dû */}
          <div className="bg-white rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] p-8">
            <div className="flex flex-col">
              <span className="text-4xl font-medium text-gray-900">12 540 €</span>
              <span className="text-sm text-gray-500 mt-1">Montant dû</span>
            </div>
          </div>
        </div>
        
        {/* Graphiques */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <InvoiceStatusChart />
          <PaymentTimelineChart />
        </div>
        
        <div className="mb-12">
          <ClientPaymentScoreChart />
        </div>
  
        {/* Section des factures récentes */}
        <div className="bg-white rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] overflow-hidden">
          <div className="p-8 border-b border-gray-100">
            <h2 className="text-xl font-medium text-gray-900">Factures récentes</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="px-8 py-4 text-left text-xs font-medium text-gray-500 uppercase">Facture</th>
                  <th className="px-8 py-4 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
                  <th className="px-8 py-4 text-left text-xs font-medium text-gray-500 uppercase">Date d'échéance</th>
                  <th className="px-8 py-4 text-left text-xs font-medium text-gray-500 uppercase">Montant</th>
                  <th className="px-8 py-4 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-900">FAC-2023-001</td>
                  <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-900">AgenceWeb Express</td>
                  <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-900">15/03/2023</td>
                  <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-900">3 500 €</td>
                  <td className="px-8 py-4 whitespace-nowrap">
                    <span className="inline-block rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-700">
                      En retard
                    </span>
                  </td>
                </tr>

                <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-900">FAC-2023-002</td>
                  <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-900">DigitalMarketing Pro</td>
                  <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-900">22/03/2023</td>
                  <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-900">2 800 €</td>
                  <td className="px-8 py-4 whitespace-nowrap">
                    <span className="inline-block rounded-full bg-yellow-50 px-3 py-1 text-xs font-medium text-yellow-700">
                      En attente
                    </span>
                  </td>
                </tr>

                <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-900">FAC-2023-003</td>
                  <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-900">Studio Graphique Créatif</td>
                  <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-900">28/03/2023</td>
                  <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-900">4 200 €</td>
                  <td className="px-8 py-4 whitespace-nowrap">
                    <span className="inline-block rounded-full bg-yellow-50 px-3 py-1 text-xs font-medium text-yellow-700">
                      En attente
                    </span>
                  </td>
                </tr>

                <tr className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-900">FAC-2023-004</td>
                  <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-900">Consulting Digital</td>
                  <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-900">05/03/2023</td>
                  <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-900">2 040 €</td>
                  <td className="px-8 py-4 whitespace-nowrap">
                    <span className="inline-block rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                      Payée
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="px-8 py-6 border-t border-gray-100">
            <Link href="/invoices" className="text-sm font-medium text-blue-500 hover:text-blue-600 transition-colors">
              Voir toutes les factures →
            </Link>
          </div>
        </div>
      </div>
    );
}