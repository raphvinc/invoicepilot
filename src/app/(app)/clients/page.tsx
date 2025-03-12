// src/app/(app)/clients/page.tsx
"use client";

import Link from 'next/link';

export default function ClientsPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-10 pt-4 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-medium text-gray-900">Clients</h1>
          <p className="text-gray-500 mt-2">
            Gérez vos clients et leur historique de paiement
          </p>
        </div>
        <button className="bg-blue-500 text-white px-5 py-2.5 rounded-full hover:bg-blue-600 transition-colors shadow-[0_2px_10px_rgba(0,0,0,0.03)] flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Nouveau client
        </button>
      </div>

      {/* Filtres de recherche */}
      <div className="bg-white rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] mb-8 p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <label htmlFor="score" className="block text-sm font-medium text-gray-500 mb-2">
              Score de paiement
            </label>
            <select
              id="score"
              name="score"
              className="block w-full rounded-lg border-gray-200 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors duration-200 p-2 "
            >
              <option value="">Tous les scores</option>
              <option value="excellent">Excellent</option>
              <option value="good">Bon</option>
              <option value="average">Moyen</option>
              <option value="poor">Faible</option>
            </select>
          </div>
          <div>
            <label htmlFor="lastInvoice" className="block text-sm font-medium text-gray-500 mb-2">
              Dernière facture
            </label>
            <select
              id="lastInvoice"
              name="lastInvoice"
              className="block w-full rounded-lg border-gray-200 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors duration-200 p-2"
            >
              <option value="">Toutes les périodes</option>
              <option value="30">30 derniers jours</option>
              <option value="90">90 derniers jours</option>
              <option value="180">6 derniers mois</option>
              <option value="365">12 derniers mois</option>
            </select>
          </div>
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-500 mb-2">
              Recherche
            </label>
            <input
              type="text"
              id="search"
              name="search"
              placeholder="Rechercher un client..."
              className="block w-full rounded-lg border-gray-200 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors duration-200  p-2"
            />
          </div>
        </div>
      </div>

      {/* Liste des clients */}
      <div className="bg-white rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="px-8 py-4 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
                <th className="px-8 py-4 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-8 py-4 text-left text-xs font-medium text-gray-500 uppercase">Téléphone</th>
                <th className="px-8 py-4 text-left text-xs font-medium text-gray-500 uppercase">Factures</th>
                <th className="px-8 py-4 text-left text-xs font-medium text-gray-500 uppercase">Montant total</th>
                <th className="px-8 py-4 text-left text-xs font-medium text-gray-500 uppercase">Score de paiement</th>
                <th className="px-8 py-4 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  name: 'AgenceWeb Express',
                  email: 'contact@agencewebexpress.com',
                  phone: '01 23 45 67 89',
                  invoices: 8,
                  total: '12 500 €',
                  score: 'excellent'
                },
                {
                  name: 'DigitalMarketing Pro',
                  email: 'info@digitalmarketing.fr',
                  phone: '01 34 56 78 90',
                  invoices: 5,
                  total: '8 350 €',
                  score: 'good'
                },
                {
                  name: 'Studio Graphique Créatif',
                  email: 'hello@studiographique.fr',
                  phone: '01 45 67 89 01',
                  invoices: 12,
                  total: '15 200 €',
                  score: 'average'
                },
                {
                  name: 'Consulting Digital',
                  email: 'contact@consultingdigital.com',
                  phone: '01 56 78 90 12',
                  invoices: 3,
                  total: '4 800 €',
                  score: 'poor'
                },
                {
                  name: 'Web Solutions',
                  email: 'support@websolutions.fr',
                  phone: '01 67 89 01 23',
                  invoices: 7,
                  total: '9 750 €',
                  score: 'good'
                }
              ].map((client, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150 ease-in-out">
                  <td className="px-8 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-blue-50 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-medium">
                          {client.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{client.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-500">
                    {client.email}
                  </td>
                  <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-500">
                    {client.phone}
                  </td>
                  <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-900">
                    {client.invoices}
                  </td>
                  <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-900">
                    {client.total}
                  </td>
                  <td className="px-8 py-4 whitespace-nowrap">
                    <span 
                      className={`px-3 py-1 inline-block text-xs font-medium rounded-full 
                        ${
                          client.score === 'excellent' ? 'bg-green-50 text-green-700' : 
                          client.score === 'good' ? 'bg-blue-50 text-blue-700' : 
                          client.score === 'average' ? 'bg-yellow-50 text-yellow-700' : 
                          'bg-red-50 text-red-700'
                        }`
                      }
                    >
                      {
                        client.score === 'excellent' ? 'Excellent' : 
                        client.score === 'good' ? 'Bon' : 
                        client.score === 'average' ? 'Moyen' : 
                        'Faible'
                      }
                    </span>
                  </td>
                  <td className="px-8 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-4">
                      <button className="text-gray-400 hover:text-blue-500 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      <button className="text-gray-400 hover:text-blue-500 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button className="text-gray-400 hover:text-red-500 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-8 py-6 border-t border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">
              Affichage de <span className="font-medium">1</span> à <span className="font-medium">5</span> sur <span className="font-medium">12</span> clients
            </p>
          </div>
          <div className="flex space-x-3">
            <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors">
              Précédent
            </button>
            <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors">
              Suivant
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}