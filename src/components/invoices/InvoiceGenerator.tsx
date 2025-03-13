"use client";

import React, { useState } from 'react';

interface InvoiceGeneratorProps {
  onClose: () => void;
  onGenerate: (data: any) => void;
}

interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  vatRate: number;
}

interface InvoiceData {
  number: string;
  date: string;
  dueDate: string;
  client: {
    name: string;
    address: string;
    zipCode: string;
    city: string;
    country: string;
    vatNumber: string;
  };
  company: {
    name: string;
    address: string;
    zipCode: string;
    city: string;
    country: string;
    vatNumber: string;
    siret: string;
    phone: string;
    email: string;
    vatExempt: boolean;
  };
  items: InvoiceItem[];
  paymentTerms: string;
  paymentMethod: string;
  notes: string;
}

const InvoiceGenerator: React.FC<InvoiceGeneratorProps> = ({ onClose, onGenerate }) => {
  const [currentStep, setCurrentStep] = useState<'details' | 'items' | 'preview'>('details');
  
  const [invoice, setInvoice] = useState<InvoiceData>({
    number: generateInvoiceNumber(),
    date: formatDate(new Date()),
    dueDate: formatDate(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)),
    client: {
      name: '',
      address: '',
      zipCode: '',
      city: '',
      country: 'France',
      vatNumber: ''
    },
    company: {
      name: 'Votre Entreprise',
      address: '123 Rue Exemple',
      zipCode: '75000',
      city: 'Paris',
      country: 'France',
      vatNumber: 'FR123456789',
      siret: '123 456 789 00012',
      phone: '01 23 45 67 89',
      email: 'contact@entreprise.com',
      vatExempt: false
    },
    items: [],
    paymentTerms: '30 jours',
    paymentMethod: 'Virement bancaire',
    notes: ''
  });

  const addItem = () => {
    setInvoice((prev) => ({
      ...prev,
      items: [...prev.items, { description: '', quantity: 1, unitPrice: 0, vatRate: 20 }]
    }));
  };

  const updateItem = (index: number, field: keyof InvoiceItem, value: string | number) => {
    const updatedItems = [...invoice.items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    setInvoice({ ...invoice, items: updatedItems });
  };

  const removeItem = (index: number) => {
    setInvoice((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = () => {
    onGenerate(invoice);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-medium text-gray-900">Générer une facture</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            &times;
          </button>
        </div>

        {currentStep === 'details' && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Informations du client</h3>
            <input type="text" placeholder="Nom du client" className="input" value={invoice.client.name} onChange={(e) => setInvoice({...invoice, client: { ...invoice.client, name: e.target.value }})} />
            <button onClick={() => setCurrentStep('items')} className="btn mt-4">Suivant</button>
          </div>
        )}

        {currentStep === 'items' && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Articles</h3>
            {invoice.items.map((item, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input type="text" placeholder="Description" value={item.description} onChange={(e) => updateItem(index, 'description', e.target.value)} className="input" />
                <input type="number" placeholder="Quantité" value={item.quantity} onChange={(e) => updateItem(index, 'quantity', Number(e.target.value))} className="input" />
                <button onClick={() => removeItem(index)} className="btn-red">&times;</button>
              </div>
            ))}
            <button onClick={addItem} className="btn">Ajouter un article</button>
            <button onClick={() => setCurrentStep('preview')} className="btn mt-4">Prévisualiser</button>
          </div>
        )}

        {currentStep === 'preview' && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Aperçu de la facture</h3>
            <p>Client: {invoice.client.name}</p>
            <p>Date: {invoice.date}</p>
            <p>Échéance: {invoice.dueDate}</p>
            <button onClick={handleSubmit} className="btn mt-4">Valider</button>
          </div>
        )}
      </div>
    </div>
  );
};

const generateInvoiceNumber = () => `FAC-${Math.floor(Math.random() * 10000)}`;
const formatDate = (date: Date) => date.toISOString().split('T')[0];

export default InvoiceGenerator;