// src/app/(app)/reminders/page.tsx
"use client";

import Link from 'next/link';

export default function RemindersPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-10 pt-4 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-medium text-gray-900">Relances</h1>
          <p className="text-gray-500 mt-2">
            Gérez vos modèles de relance et suivez l'historique des relances envoyées
          </p>
        </div>
        <button className="bg-blue-500 text-white px-5 py-2.5 rounded-full hover:bg-blue-600 transition-colors shadow-[0_2px_10px_rgba(0,0,0,0.03)] flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Nouveau modèle
        </button>
      </div>

      {/* Modèles de relance */}
      <div className="bg-white rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] mb-10 overflow-hidden">
        <div className="px-8 py-6 border-b border-gray-100">
          <h2 className="text-xl font-medium text-gray-900">Modèles de relance</h2>
          <p className="mt-1 text-sm text-gray-500">
            Configurez vos modèles de relance pour automatiser le processus
          </p>
        </div>
        <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Modèle 1 */}
          <div className="border border-gray-100 rounded-xl p-6 hover:shadow-[0_2px_15px_rgba(0,0,0,0.05)] transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-md font-medium text-gray-900">Rappel courtois</h3>
              <span className="bg-green-50 text-green-700 text-xs px-3 py-1 rounded-full font-medium">Actif</span>
            </div>
            <p className="text-sm text-gray-500 mb-4">
              Envoyé 3 jours avant la date d'échéance pour rappeler au client le paiement à venir.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">Délai: -3 jours</span>
              <div className="flex space-x-3">
                <button className="text-gray-400 hover:text-blue-500 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Modèle 2 */}
          <div className="border border-gray-100 rounded-xl p-6 hover:shadow-[0_2px_15px_rgba(0,0,0,0.05)] transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-md font-medium text-gray-900">Premier rappel</h3>
              <span className="bg-green-50 text-green-700 text-xs px-3 py-1 rounded-full font-medium">Actif</span>
            </div>
            <p className="text-sm text-gray-500 mb-4">
              Envoyé 1 jour après la date d'échéance pour un premier rappel de paiement en retard.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">Délai: +1 jour</span>
              <div className="flex space-x-3">
                <button className="text-gray-400 hover:text-blue-500 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Modèle 3 */}
          <div className="border border-gray-100 rounded-xl p-6 hover:shadow-[0_2px_15px_rgba(0,0,0,0.05)] transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-md font-medium text-gray-900">Relance ferme</h3>
              <span className="bg-green-50 text-green-700 text-xs px-3 py-1 rounded-full font-medium">Actif</span>
            </div>
            <p className="text-sm text-gray-500 mb-4">
              Envoyé 7 jours après la date d'échéance pour une relance plus ferme sur le paiement en retard.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">Délai: +7 jours</span>
              <div className="flex space-x-3">
                <button className="text-gray-400 hover:text-blue-500 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Historique des relances */}
      <div className="bg-white rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] overflow-hidden">
        <div className="px-8 py-6 border-b border-gray-100">
          <h2 className="text-xl font-medium text-gray-900">Historique des relances</h2>
          <p className="mt-1 text-sm text-gray-500">
            Suivez toutes les relances envoyées à vos clients
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="px-8 py-4 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-8 py-4 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
                <th className="px-8 py-4 text-left text-xs font-medium text-gray-500 uppercase">Facture</th>
                <th className="px-8 py-4 text-left text-xs font-medium text-gray-500 uppercase">Type de relance</th>
                <th className="px-8 py-4 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
                <th className="px-8 py-4 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(5)].map((_, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150 ease-in-out">
                  <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-500">
                    {`${new Date(Date.now() - index * 86400000).toLocaleDateString('fr-FR')}`}
                  </td>
                  <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-900">
                    {
                      ['AgenceWeb Express', 'DigitalMarketing Pro', 'Studio Graphique Créatif', 'Consulting Digital', 'Web Solutions'][index % 5]
                    }
                  </td>
                  <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-900">FAC-2023-00{5 - index}</td>
                  <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-500">
                    {
                      index % 3 === 0 ? 'Rappel courtois' : index % 3 === 1 ? 'Premier rappel' : 'Relance ferme'
                    }
                  </td>
                  <td className="px-8 py-4 whitespace-nowrap">
                    <span 
                      className={`px-3 py-1 inline-block text-xs font-medium rounded-full 
                        ${index % 2 === 0 ? 'bg-green-50 text-green-700' : 'bg-blue-50 text-blue-700'}`
                      }
                    >
                      {index % 2 === 0 ? 'Envoyé' : 'Ouvert'}
                    </span>
                  </td>
                  <td className="px-8 py-4 whitespace-nowrap">
                    <div className="flex space-x-4">
                      <button className="text-gray-400 hover:text-blue-500 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      <button className="text-gray-400 hover:text-blue-500 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
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
              Affichage de <span className="font-medium">1</span> à <span className="font-medium">5</span> sur <span className="font-medium">12</span> relances
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