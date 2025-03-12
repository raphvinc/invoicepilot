// src/components/invoices/InvoiceImportForm.tsx
"use client";

import React, { useState } from 'react';

interface InvoiceImportFormProps {
  onClose: () => void;
  onImport: (data: any) => void;
}

const InvoiceImportForm: React.FC<InvoiceImportFormProps> = ({ onClose, onImport }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [importMethod, setImportMethod] = useState<'csv' | 'pdf' | 'api'>('csv');
  const [isProcessing, setIsProcessing] = useState(false);
  const [preview, setPreview] = useState<any[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
      
      // Simuler une prévisualisation pour un fichier CSV
      if (importMethod === 'csv' && e.target.files[0].name.endsWith('.csv')) {
        // Dans une application réelle, nous analyserions réellement le fichier ici
        setPreview([
          { client: 'DigitalMarketing Pro', number: 'FAC-2023-042', date: '15/06/2023', dueDate: '15/07/2023', amount: '3 500,00 €' },
          { client: 'Studio Graphique', number: 'FAC-2023-043', date: '18/06/2023', dueDate: '18/07/2023', amount: '2 800,00 €' },
          { client: 'AgenceWeb Express', number: 'FAC-2023-044', date: '20/06/2023', dueDate: '20/07/2023', amount: '4 200,00 €' },
        ]);
      } else {
        setPreview([]);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simuler un traitement d'importation
    setTimeout(() => {
      onImport(preview);
      setIsProcessing(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-medium text-gray-900">
            Importer des factures
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Méthode d'importation
            </label>
            <div className="grid grid-cols-3 gap-4">
              <button
                type="button"
                className={`flex flex-col items-center justify-center p-4 border rounded-lg transition-colors ${
                  importMethod === 'csv' 
                    ? 'bg-blue-50 border-blue-200' 
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
                onClick={() => setImportMethod('csv')}
              >
                <svg className="w-8 h-8 text-gray-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="text-sm font-medium">Fichier CSV</span>
              </button>
              
              <button
                type="button"
                className={`flex flex-col items-center justify-center p-4 border rounded-lg transition-colors ${
                  importMethod === 'pdf' 
                    ? 'bg-blue-50 border-blue-200' 
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
                onClick={() => setImportMethod('pdf')}
              >
                <svg className="w-8 h-8 text-gray-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <span className="text-sm font-medium">Fichier PDF</span>
              </button>
              
              <button
                type="button"
                className={`flex flex-col items-center justify-center p-4 border rounded-lg transition-colors ${
                  importMethod === 'api' 
                    ? 'bg-blue-50 border-blue-200' 
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
                onClick={() => setImportMethod('api')}
              >
                <svg className="w-8 h-8 text-gray-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className="text-sm font-medium">Connexion API</span>
              </button>
            </div>
          </div>
          
          {importMethod === 'csv' && (
            <div>
              <label htmlFor="csvFile" className="block text-sm font-medium text-gray-700 mb-2">
                Sélectionner un fichier CSV
              </label>
              <input
                type="file"
                id="csvFile"
                accept=".csv"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-lg file:border-0
                  file:text-sm file:font-medium
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100
                  transition-colors duration-200"
              />
              <p className="mt-2 text-xs text-gray-500">
                Format attendu: client, numéro, date, montant, date_échéance
              </p>
            </div>
          )}
          
          {importMethod === 'pdf' && (
            <div>
              <label htmlFor="pdfFile" className="block text-sm font-medium text-gray-700 mb-2">
                Sélectionner un fichier PDF
              </label>
              <input
                type="file"
                id="pdfFile"
                accept=".pdf"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-lg file:border-0
                  file:text-sm file:font-medium
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100
                  transition-colors duration-200"
              />
              <p className="mt-2 text-xs text-gray-500">
                Nous analyserons le contenu du PDF pour extraire les informations de facturation
              </p>
            </div>
          )}
          
          {importMethod === 'api' && (
            <div>
              <label htmlFor="apiProvider" className="block text-sm font-medium text-gray-700 mb-2">
                Fournisseur API
              </label>
              <select
                id="apiProvider"
                className="block w-full rounded-lg border-gray-200 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
              >
                <option value="">Sélectionner un fournisseur</option>
                <option value="quickbooks">QuickBooks</option>
                <option value="xero">Xero</option>
                <option value="facturenet">Facture.net</option>
                <option value="zervant">Zervant</option>
              </select>
              <p className="mt-2 text-xs text-gray-500">
                Vous devrez autoriser l'accès à votre compte pour importer vos factures
              </p>
            </div>
          )}
          
          {preview.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Aperçu des données</h3>
              <div className="border rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Numéro</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Échéance</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Montant</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {preview.map((item, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.client}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.number}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.dueDate}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={!selectedFile || isProcessing}
              className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center ${
                !selectedFile || isProcessing
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-600 transition-colors'
              }`}
            >
              {isProcessing && (
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              {isProcessing ? 'Importation en cours...' : 'Importer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InvoiceImportForm;