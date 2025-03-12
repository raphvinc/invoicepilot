"use client";

import React, { useState } from 'react';
import ReminderTemplateForm, { ReminderTemplateData } from '@/components/reminders/ReminderTemplateForm';
import ReminderPreview from '@/components/reminders/ReminderPreview';

export default function RemindersPage() {
  const [showTemplateForm, setShowTemplateForm] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<ReminderTemplateData | null>(null);
  const [previewTemplate, setPreviewTemplate] = useState<ReminderTemplateData | null>(null);

  // Modèles de relance
  const [reminderTemplates, setReminderTemplates] = useState<ReminderTemplateData[]>([
    {
      name: 'Rappel courtois',
      subject: 'Rappel concernant votre facture [Facture_Numero]',
      body: 'Bonjour [Client_Nom],\n\nVotre facture [Facture_Numero] arrivera à échéance le [Date_Echeance].\n\nCordialement,\nL\'équipe InvoicePilot',
      triggerDays: -3,
      isActive: true,
    },
    {
      name: 'Premier rappel',
      subject: 'Facture [Facture_Numero] - Paiement en retard',
      body: 'Bonjour [Client_Nom],\n\nVotre facture [Facture_Numero] est arrivée à échéance.\n\nMerci de procéder au règlement.\n\nCordialement,\nL\'équipe InvoicePilot',
      triggerDays: 1,
      isActive: true,
    },
  ]);

  // Historique des relances
  const reminderHistory = [
    {
      id: 1,
      date: new Date(),
      client: 'AgenceWeb Express',
      invoice: 'FAC-2023-005',
      type: 'Rappel courtois',
      status: 'Envoyé',
    },
  ];

  // Sauvegarde du modèle
  const handleSaveTemplate = (templateData: ReminderTemplateData) => {
    setReminderTemplates((prevTemplates) =>
      editingTemplate
        ? prevTemplates.map((template) =>
            template.name === editingTemplate.name ? templateData : template
          )
        : [...prevTemplates, templateData]
    );

    setShowTemplateForm(false);
    setEditingTemplate(null);
  };

  // Suppression du modèle
  const handleDeleteTemplate = (templateName: string) => {
    setReminderTemplates((prevTemplates) =>
      prevTemplates.filter((template) => template.name !== templateName)
    );
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-10 pt-4 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-medium text-gray-900">Relances</h1>
          <p className="text-gray-500 mt-2">
            Gérez vos modèles de relance et suivez l'historique des relances envoyées
          </p>
        </div>
        <button
          className="bg-blue-500 text-white px-5 py-2.5 rounded-full hover:bg-blue-600 transition-colors"
          onClick={() => {
            setEditingTemplate(null);
            setShowTemplateForm(true);
          }}
        >
          + Nouveau modèle
        </button>
      </div>

      {/* Liste des modèles */}
      <div className="bg-white rounded-2xl shadow-md mb-10 overflow-hidden">
        <div className="px-8 py-6 border-b border-gray-100">
          <h2 className="text-xl font-medium text-gray-900">Modèles de relance</h2>
        </div>
        <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          {reminderTemplates.length > 0 ? (
            reminderTemplates.map((template) => (
              <div
                key={template.name}
                className="border border-gray-100 rounded-xl p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-md font-medium">{template.name}</h3>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDeleteTemplate(template.name)}
                  >
                    ✕
                  </button>
                </div>
                <p className="text-sm text-gray-500">
                  {template.triggerDays < 0
                    ? `Envoyé ${Math.abs(template.triggerDays)} jours avant la date d'échéance.`
                    : `Envoyé ${template.triggerDays} jours après la date d'échéance.`}
                </p>
                <div className="flex space-x-3 mt-4">
                  <button className="text-gray-400 hover:text-blue-500" onClick={() => setPreviewTemplate(template)}>👁 Aperçu</button>
                  <button className="text-gray-400 hover:text-blue-500" onClick={() => setEditingTemplate(template)}>✏ Modifier</button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">Aucun modèle disponible.</p>
          )}
        </div>
      </div>

      {/* Historique */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        <div className="px-8 py-6 border-b border-gray-100">
          <h2 className="text-xl font-medium text-gray-900">Historique des relances</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="px-8 py-4 text-left text-xs text-gray-500 uppercase">Date</th>
                <th className="px-8 py-4 text-left text-xs text-gray-500 uppercase">Client</th>
                <th className="px-8 py-4 text-left text-xs text-gray-500 uppercase">Facture</th>
                <th className="px-8 py-4 text-left text-xs text-gray-500 uppercase">Type</th>
              </tr>
            </thead>
            <tbody>
              {reminderHistory.map((reminder) => (
                <tr key={reminder.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-8 py-4 text-sm text-gray-500">{reminder.date.toLocaleDateString('fr-FR')}</td>
                  <td className="px-8 py-4 text-sm">{reminder.client}</td>
                  <td className="px-8 py-4 text-sm">{reminder.invoice}</td>
                  <td className="px-8 py-4 text-sm">{reminder.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      {showTemplateForm && (
        <ReminderTemplateForm onClose={() => setShowTemplateForm(false)} onSave={handleSaveTemplate} initialData={editingTemplate || undefined} />
      )}

      {previewTemplate && (
        <ReminderPreview template={previewTemplate} onClose={() => setPreviewTemplate(null)} />
      )}
    </div>
  );
}
