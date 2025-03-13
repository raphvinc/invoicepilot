"use client";

import React, { useState } from 'react';
import { generateInvoicePDF } from '../../utils/InvoicePdfGenerator';
import { defaultCompanyInfo } from '../../utils/CompanyInfo';

interface InvoiceGeneratorProps {
  onClose: () => void;
  onGenerate: (data: any) => void;
}

interface InvoiceGeneratorProps {
  onClose: () => void;
  onGenerate: (data: any) => void;
}

function generateInvoiceNumber() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `FACT-${year}${month}-${random}`;
}

function formatDate(date: Date) {
  return date.toISOString().split('T')[0];
}

const InvoiceGenerator: React.FC<InvoiceGeneratorProps> = ({ onClose, onGenerate }) => {
  const today = new Date();
  const dueDate = new Date();
  dueDate.setDate(today.getDate() + 30);

  const [currentStep, setCurrentStep] = useState(1);
  const [invoice, setInvoice] = useState({
    number: generateInvoiceNumber(),
    date: formatDate(today),
    dueDate: formatDate(dueDate),
    client: {
      id: '',
      name: '',
      email: '',
      address: '',
      zipCode: '',
      city: '',
      country: 'France',
      vatNumber: ''
    },
    items: [
      { description: '', quantity: 1, unitPrice: 0, vatRate: 20, total: 0 }
    ],
    notes: '',
    paymentTerms: '30 jours',
    paymentMethod: 'Virement bancaire',
    totalHT: 0,
    totalTVA: 0,
    totalTTC: 0
  });

  // Liste fictive de clients pour le démonstrateur
  const clients = [
    { id: '1', name: 'AgenceWeb Express', email: 'contact@agencewebexpress.com', address: '123 Rue du Web', zipCode: '75001', city: 'Paris', country: 'France', vatNumber: 'FR12345678901' },
    { id: '2', name: 'DigitalMarketing Pro', email: 'info@digitalmarketing.fr', address: '45 Avenue Digitale', zipCode: '69002', city: 'Lyon', country: 'France', vatNumber: 'FR23456789012' },
    { id: '3', name: 'Studio Graphique Créatif', email: 'hello@studiographique.fr', address: '8 Boulevard des Arts', zipCode: '33000', city: 'Bordeaux', country: 'France', vatNumber: 'FR34567890123' },
    { id: '4', name: 'Consulting Digital', email: 'contact@consultingdigital.com', address: '56 Rue de la Consultation', zipCode: '44000', city: 'Nantes', country: 'France', vatNumber: 'FR45678901234' },
    { id: '5', name: 'Web Solutions', email: 'support@websolutions.fr', address: '12 Place de l\'Innovation', zipCode: '67000', city: 'Strasbourg', country: 'France', vatNumber: 'FR56789012345' }
  ];

  // Mise à jour d'un champ client
  const handleClientChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'id' && value) {
      const selectedClient = clients.find(client => client.id === value);
      if (selectedClient) {
        setInvoice(prev => ({
          ...prev,
          client: { ...selectedClient }
        }));
      }
    } else {
      setInvoice(prev => ({
        ...prev,
        client: {
          ...prev.client,
          [name]: value
        }
      }));
    }
  };

  // Mise à jour d'un champ facture
  const handleInvoiceChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInvoice(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Ajouter un article
  const addItem = () => {
    setInvoice(prev => ({
      ...prev,
      items: [...prev.items, { description: '', quantity: 1, unitPrice: 0, vatRate: 20, total: 0 }]
    }));
  };

  // Supprimer un article
  const removeItem = (index: number) => {
    const newItems = [...invoice.items];
    newItems.splice(index, 1);
    
    // Recalcul des totaux
    const calculatedTotals = calculateTotals(newItems);
    
    setInvoice(prev => ({
      ...prev,
      items: newItems,
      ...calculatedTotals
    }));
  };

  // Mise à jour d'un article
  const updateItem = (index: number, field: string, value: string | number) => {
    const newItems = [...invoice.items];
    
    // Convertit les valeurs numériques si nécessaire
    if (field === 'quantity' || field === 'unitPrice' || field === 'vatRate') {
      value = parseFloat(value.toString()) || 0;
    }
    
    newItems[index] = { 
      ...newItems[index],
      [field]: value
    };
    
    // Mise à jour du total de la ligne
    if (field === 'quantity' || field === 'unitPrice') {
      newItems[index].total = newItems[index].quantity * newItems[index].unitPrice;
    }
    
    // Recalcul des totaux
    const calculatedTotals = calculateTotals(newItems);
    
    setInvoice(prev => ({
      ...prev,
      items: newItems,
      ...calculatedTotals
    }));
  };

  // Calcul des totaux de la facture
  const calculateTotals = (items: any[]) => {
    const totalHT = items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
    const totalTVA = items.reduce((sum, item) => {
      const lineTotal = item.quantity * item.unitPrice;
      return sum + (lineTotal * item.vatRate / 100);
    }, 0);
    const totalTTC = totalHT + totalTVA;
    
    return { totalHT, totalTVA, totalTTC };
  };

  // Gestion du passage à l'étape suivante
  const nextStep = () => {
    setCurrentStep(prev => prev + 1);
  };

  // Gestion du retour à l'étape précédente
  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  // Soumission du formulaire
  const handleSubmit = () => {
    console.log("Démarrage de la génération de facture");
    console.log("Données de la facture:", invoice);
    
    try {
      // Génération et téléchargement du PDF
      console.log("Tentative de génération du PDF");
      generateInvoicePDF(invoice, defaultCompanyInfo);
      console.log("PDF généré avec succès");
      
      // Envoi des données au composant parent
      console.log("Envoi des données au composant parent");
      onGenerate(invoice);
    } catch (error) {
      console.error("Erreur lors de la génération du PDF:", error);
      alert("Une erreur s'est produite lors de la génération du PDF. Vérifiez la console pour plus de détails.");
      // Quand même envoyer les données au composant parent en cas d'erreur
      onGenerate(invoice);
    }
  };

  // Formatage des montants
  const formatAmount = (amount: number) => {
    return amount.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white p-6 border-b flex justify-between items-center z-10 rounded-t-2xl">
          <h2 className="text-xl font-medium text-gray-900">Nouvelle facture</h2>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-gray-500 transition-colors"
            aria-label="Fermer"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6">
          {/* Étapes du formulaire */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'}`}>1</div>
                <div className={`ml-2 text-sm font-medium ${currentStep >= 1 ? 'text-blue-500' : 'text-gray-500'}`}>Informations</div>
              </div>
              <div className={`flex-1 h-1 mx-4 ${currentStep >= 2 ? 'bg-blue-500' : 'bg-gray-200'}`}></div>
              <div className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 2 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'}`}>2</div>
                <div className={`ml-2 text-sm font-medium ${currentStep >= 2 ? 'text-blue-500' : 'text-gray-500'}`}>Articles</div>
              </div>
              <div className={`flex-1 h-1 mx-4 ${currentStep >= 3 ? 'bg-blue-500' : 'bg-gray-200'}`}></div>
              <div className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 3 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'}`}>3</div>
                <div className={`ml-2 text-sm font-medium ${currentStep >= 3 ? 'text-blue-500' : 'text-gray-500'}`}>Récapitulatif</div>
              </div>
            </div>
          </div>

          {/* Étape 1: Informations */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="number" className="block text-sm font-medium text-gray-700 mb-1">Numéro de facture</label>
                  <input
                    type="text"
                    id="number"
                    name="number"
                    value={invoice.number}
                    onChange={handleInvoiceChange}
                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="clientSelect" className="block text-sm font-medium text-gray-700 mb-1">Client existant</label>
                  <select
                    id="clientSelect"
                    name="id"
                    value={invoice.client.id}
                    onChange={handleClientChange}
                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                  >
                    <option value="">Sélectionner un client ou créer un nouveau</option>
                    {clients.map(client => (
                      <option key={client.id} value={client.id}>{client.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Date d'émission</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={invoice.date}
                    onChange={handleInvoiceChange}
                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">Date d'échéance</label>
                  <input
                    type="date"
                    id="dueDate"
                    name="dueDate"
                    value={invoice.dueDate}
                    onChange={handleInvoiceChange}
                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                    required
                  />
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-md font-medium text-gray-700 mb-3">Informations client</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="clientName" className="block text-sm font-medium text-gray-700 mb-1">Nom / Société</label>
                    <input
                      type="text"
                      id="clientName"
                      name="name"
                      value={invoice.client.name}
                      onChange={handleClientChange}
                      className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="clientEmail" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      id="clientEmail"
                      name="email"
                      value={invoice.client.email}
                      onChange={handleClientChange}
                      className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="clientAddress" className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
                    <input
                      type="text"
                      id="clientAddress"
                      name="address"
                      value={invoice.client.address}
                      onChange={handleClientChange}
                      className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                    />
                  </div>
                  <div>
                    <label htmlFor="clientZipCode" className="block text-sm font-medium text-gray-700 mb-1">Code postal</label>
                    <input
                      type="text"
                      id="clientZipCode"
                      name="zipCode"
                      value={invoice.client.zipCode}
                      onChange={handleClientChange}
                      className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                    />
                  </div>
                  <div>
                    <label htmlFor="clientCity" className="block text-sm font-medium text-gray-700 mb-1">Ville</label>
                    <input
                      type="text"
                      id="clientCity"
                      name="city"
                      value={invoice.client.city}
                      onChange={handleClientChange}
                      className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                    />
                  </div>
                  <div>
                    <label htmlFor="clientCountry" className="block text-sm font-medium text-gray-700 mb-1">Pays</label>
                    <input
                      type="text"
                      id="clientCountry"
                      name="country"
                      value={invoice.client.country}
                      onChange={handleClientChange}
                      className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                    />
                  </div>
                  <div>
                    <label htmlFor="clientVatNumber" className="block text-sm font-medium text-gray-700 mb-1">Numéro de TVA</label>
                    <input
                      type="text"
                      id="clientVatNumber"
                      name="vatNumber"
                      value={invoice.client.vatNumber}
                      onChange={handleClientChange}
                      className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700 mb-1">Méthode de paiement</label>
                  <select
                    id="paymentMethod"
                    name="paymentMethod"
                    value={invoice.paymentMethod}
                    onChange={handleInvoiceChange}
                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                  >
                    <option value="Virement bancaire">Virement bancaire</option>
                    <option value="Carte bancaire">Carte bancaire</option>
                    <option value="Chèque">Chèque</option>
                    <option value="Espèces">Espèces</option>
                    <option value="PayPal">PayPal</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="paymentTerms" className="block text-sm font-medium text-gray-700 mb-1">Conditions de paiement</label>
                  <select
                    id="paymentTerms"
                    name="paymentTerms"
                    value={invoice.paymentTerms}
                    onChange={handleInvoiceChange}
                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                  >
                    <option value="À réception">À réception</option>
                    <option value="7 jours">7 jours</option>
                    <option value="15 jours">15 jours</option>
                    <option value="30 jours">30 jours</option>
                    <option value="45 jours">45 jours</option>
                    <option value="60 jours">60 jours</option>
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end mt-6">
                <button
                  type="button"
                  onClick={nextStep}
                  className="bg-blue-500 text-white px-5 py-2.5 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Suivant
                </button>
              </div>
            </div>
          )}

          {/* Étape 2: Articles */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/2">Description</th>
                      <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantité</th>
                      <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prix unitaire</th>
                      <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">TVA %</th>
                      <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total HT</th>
                      <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-10"></th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {invoice.items.map((item, index) => (
                      <tr key={index}>
                        <td className="px-3 py-2">
                          <input
                            type="text"
                            value={item.description}
                            onChange={(e) => updateItem(index, 'description', e.target.value)}
                            className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                            placeholder="Description de l'article ou service"
                            required
                          />
                        </td>
                        <td className="px-3 py-2">
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => updateItem(index, 'quantity', e.target.value)}
                            className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                            min="1"
                            step="1"
                            required
                          />
                        </td>
                        <td className="px-3 py-2">
                          <div className="relative">
                            <input
                              type="number"
                              value={item.unitPrice}
                              onChange={(e) => updateItem(index, 'unitPrice', e.target.value)}
                              className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 pl-2 pr-8 border"
                              min="0"
                              step="0.01"
                              required
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                              <span className="text-gray-500 sm:text-sm">€</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-3 py-2">
                          <div className="relative">
                            <input
                              type="number"
                              value={item.vatRate}
                              onChange={(e) => updateItem(index, 'vatRate', e.target.value)}
                              className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 pl-2 pr-8 border"
                              min="0"
                              max="100"
                              step="0.5"
                              required
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                              <span className="text-gray-500 sm:text-sm">%</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-3 py-2">
                          <div className="text-sm font-medium text-gray-900">
                            {formatAmount(item.quantity * item.unitPrice)}
                          </div>
                        </td>
                        <td className="px-3 py-2 text-right">
                          <button
                            type="button"
                            onClick={() => removeItem(index)}
                            className="text-red-500 hover:text-red-700 transition-colors"
                            disabled={invoice.items.length === 1}
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <button
                type="button"
                onClick={addItem}
                className="flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Ajouter un article
              </button>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-md font-medium text-gray-700 mb-3">Notes et conditions</h3>
                <div>
                  <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">Notes (visible sur la facture)</label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={3}
                    value={invoice.notes}
                    onChange={handleInvoiceChange}
                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                    placeholder="Ex: Merci pour votre confiance. Le paiement est dû sous 30 jours."
                  ></textarea>
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <div className="w-1/2 md:w-1/3 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-gray-500">Total HT:</span>
                    <span className="font-medium text-gray-900">{formatAmount(invoice.totalHT)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-gray-500">Total TVA:</span>
                    <span className="font-medium text-gray-900">{formatAmount(invoice.totalTVA)}</span>
                  </div>
                  <div className="flex justify-between text-sm pt-2 border-t">
                    <span className="font-medium text-gray-700">Total TTC:</span>
                    <span className="font-bold text-gray-900">{formatAmount(invoice.totalTTC)}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-5 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Précédent
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="bg-blue-500 text-white px-5 py-2.5 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Suivant
                </button>
              </div>
            </div>
          )}

          {/* Étape 3: Récapitulatif */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-md font-medium text-gray-700 mb-3">Informations facture</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Numéro:</span>
                        <span className="text-sm font-medium">{invoice.number}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Date d'émission:</span>
                        <span className="text-sm font-medium">{invoice.date}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Date d'échéance:</span>
                        <span className="text-sm font-medium">{invoice.dueDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Conditions:</span>
                        <span className="text-sm font-medium">{invoice.paymentTerms}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Méthode:</span>
                        <span className="text-sm font-medium">{invoice.paymentMethod}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-md font-medium text-gray-700 mb-3">Client</h3>
                    <div className="space-y-2">
                      <div className="text-sm font-medium">{invoice.client.name}</div>
                      <div className="text-sm text-gray-600">{invoice.client.email}</div>
                      <div className="text-sm text-gray-600">{invoice.client.address}</div>
                      <div className="text-sm text-gray-600">
                        {invoice.client.zipCode} {invoice.client.city}
                      </div>
                      <div className="text-sm text-gray-600">{invoice.client.country}</div>
                      {invoice.client.vatNumber && (
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">N° TVA:</span>
                          <span className="text-sm font-medium">{invoice.client.vatNumber}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-md font-medium text-gray-700 mb-3">Articles</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Qté</th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Prix unitaire</th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">TVA</th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Total HT</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {invoice.items.map((item, index) => (
                          <tr key={index}>
                            <td className="px-3 py-2 text-sm text-gray-600">{item.description}</td>
                            <td className="px-3 py-2 text-sm text-gray-600">{item.quantity}</td>
                            <td className="px-3 py-2 text-sm text-gray-600">{formatAmount(item.unitPrice)}</td>
                            <td className="px-3 py-2 text-sm text-gray-600">{item.vatRate}%</td>
                            <td className="px-3 py-2 text-sm text-gray-600">{formatAmount(item.total)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="flex justify-end">
                    <div className="w-full md:w-1/3 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium text-gray-500">Total HT:</span>
                        <span className="font-medium text-gray-900">{formatAmount(invoice.totalHT)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="font-medium text-gray-500">Total TVA:</span>
                        <span className="font-medium text-gray-900">{formatAmount(invoice.totalTVA)}</span>
                      </div>
                      <div className="flex justify-between text-sm pt-2 border-t">
                        <span className="font-medium text-gray-700">Total TTC:</span>
                        <span className="font-bold text-gray-900">{formatAmount(invoice.totalTTC)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {invoice.notes && (
                  <div className="mt-6">
                    <h3 className="text-md font-medium text-gray-700 mb-3">Notes</h3>
                    <p className="text-sm text-gray-600 whitespace-pre-wrap">{invoice.notes}</p>
                  </div>
                )}
              </div>

              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-5 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Précédent
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="bg-blue-500 text-white px-5 py-2.5 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Générer la facture
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InvoiceGenerator;