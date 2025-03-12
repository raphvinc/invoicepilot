// src/components/reminders/ReminderPreview.tsx
"use client";

import React from 'react';
import { ReminderTemplateData } from './ReminderTemplateForm';

interface ReminderPreviewProps {
  template: ReminderTemplateData;
  onClose: () => void;
}

interface SampleData {
  clientName: string;
  invoiceNumber: string;
  invoiceAmount: string;
  invoiceDate: string;
  dueDate: string;
}

const sampleData: SampleData = {
  clientName: 'AgenceWeb Express',
  invoiceNumber: 'FAC-2023-042',
  invoiceAmount: '3 500,00 €',
  invoiceDate: '15/06/2023',
  dueDate: '15/07/2023',
};

const ReminderPreview: React.FC<ReminderPreviewProps> = ({ template, onClose }) => {
  const replaceVariables = (text: string): string => {
    return text
      .replace(/\[Client_Nom\]/g, sampleData.clientName)
      .replace(/\[Facture_Numero\]/g, sampleData.invoiceNumber)
      .replace(/\[Facture_Montant\]/g, sampleData.invoiceAmount)
      .replace(/\[Facture_Date\]/g, sampleData.invoiceDate)
      .replace(/\[Date_Echeance\]/g, sampleData.dueDate);
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-medium text-gray-900">
            Prévisualisation de l&apos;email
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
        
        <div className="border rounded-lg overflow-hidden mb-6">
          <div className="bg-gray-50 border-b p-4">
            <div className="mb-2">
              <span className="text-sm font-medium text-gray-500">De:</span>
              <span className="text-sm text-gray-900 ml-2">contact@invoicepilot.io</span>
            </div>
            <div className="mb-2">
              <span className="text-sm font-medium text-gray-500">À:</span>
              <span className="text-sm text-gray-900 ml-2">client@agencewebexpress.com</span>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">Objet:</span>
              <span className="text-sm text-gray-900 ml-2">{replaceVariables(template.subject)}</span>
            </div>
          </div>
          <div className="p-4 bg-white">
            <div className="text-sm text-gray-900 whitespace-pre-wrap">
              {replaceVariables(template.body)}
            </div>
          </div>
        </div>
        
        <div className="flex justify-between">
          <div className="text-sm text-gray-500">
            Ceci est une prévisualisation avec des données d&apos;exemple
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReminderPreview;