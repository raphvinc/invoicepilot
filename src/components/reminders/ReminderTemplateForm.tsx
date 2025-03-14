// src/components/reminders/ReminderTemplateForm.tsx
"use client";

import React, { useState } from 'react';

interface ReminderTemplateFormProps {
  onClose: () => void;
  onSave: (data: ReminderTemplateData) => void;
  initialData?: ReminderTemplateData;
}

export interface ReminderTemplateData {
  name: string;
  subject: string;
  body: string;
  triggerDays: number;
  isActive: boolean;
}

const ReminderTemplateForm: React.FC<ReminderTemplateFormProps> = ({ 
  onClose, 
  onSave,
  initialData
}) => {
  const [formData, setFormData] = useState<ReminderTemplateData>(
    initialData || {
      name: '',
      subject: '',
      body: '',
      triggerDays: 0,
      isActive: true
    }
  );
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setFormData({
        ...formData,
        [name]: checkbox.checked
      });
    } else if (name === 'triggerDays') {
      setFormData({
        ...formData,
        [name]: parseInt(value, 10)
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };
  
  return (
    <div className="fixed top-0 bottom-0 right-0 left-64 bg-gray-50 flex justify-center items-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-medium text-gray-900">
            {initialData ? 'Modifier le modèle de relance' : 'Nouveau modèle de relance'}
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
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Nom du modèle
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="block w-full rounded-lg border-gray-200 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
              placeholder="Ex: Rappel courtois"
              required
            />
          </div>
          
          <div>
            <label htmlFor="triggerDays" className="block text-sm font-medium text-gray-700 mb-1">
              Délai de déclenchement (en jours)
            </label>
            <div className="flex items-center">
              <select
                id="triggerType"
                name="triggerType"
                className="rounded-l-lg border-gray-200 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
                onChange={(e) => {
                  const value = e.target.value === 'before' 
                    ? -Math.abs(formData.triggerDays)
                    : Math.abs(formData.triggerDays);
                  
                  setFormData({
                    ...formData,
                    triggerDays: value
                  });
                }}
                value={formData.triggerDays < 0 ? 'before' : 'after'}
              >
                <option value="before">Avant</option>
                <option value="after">Après</option>
              </select>
              <input
                type="number"
                id="triggerDays"
                name="triggerDays"
                value={Math.abs(formData.triggerDays)}
                onChange={(e) => {
                  const value = parseInt(e.target.value, 10);
                  const adjustedValue = formData.triggerDays < 0 ? -value : value;
                  
                  setFormData({
                    ...formData,
                    triggerDays: adjustedValue
                  });
                }}
                className="rounded-r-lg border-l-0 border-gray-200 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 flex-1"
                min="0"
                required
              />
              <span className="ml-2 text-sm text-gray-500">jours</span>
            </div>
            <p className="mt-1 text-sm text-gray-500">
              {formData.triggerDays < 0 
                ? `Ce rappel sera envoyé ${Math.abs(formData.triggerDays)} jours avant la date d'échéance.`
                : `Ce rappel sera envoyé ${formData.triggerDays} jours après la date d'échéance.`}
            </p>
          </div>
          
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
              Sujet de l'email
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="block w-full rounded-lg border-gray-200 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
              placeholder="Ex: Rappel concernant votre facture [Numéro_Facture]"
              required
            />
          </div>
          
          <div>
            <label htmlFor="body" className="block text-sm font-medium text-gray-700 mb-1">
              Contenu de l'email
            </label>
            <textarea
              id="body"
              name="body"
              value={formData.body}
              onChange={handleChange}
              rows={8}
              className="block w-full rounded-lg border-gray-200 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
              placeholder="Vous pouvez utiliser des variables comme [Client_Nom], [Facture_Numero], [Facture_Montant], [Facture_Date]..."
              required
            />
            <div className="mt-2">
              <p className="text-xs text-gray-500 font-medium mb-1">Variables disponibles :</p>
              <div className="flex flex-wrap gap-2">
                {['[Client_Nom]', '[Facture_Numero]', '[Facture_Montant]', '[Facture_Date]', '[Date_Echeance]'].map((variable) => (
                  <span 
                    key={variable}
                    className="inline-block bg-gray-100 px-2 py-1 rounded text-xs text-gray-700 cursor-pointer hover:bg-gray-200"
                    onClick={() => setFormData({
                      ...formData,
                      body: formData.body + ' ' + variable
                    })}
                  >
                    {variable}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isActive"
              name="isActive"
              checked={formData.isActive}
              onChange={(e) => handleChange(e)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="isActive" className="ml-2 block text-sm text-gray-700">
              Activer ce modèle de relance
            </label>
          </div>
          
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
              className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
            >
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReminderTemplateForm;