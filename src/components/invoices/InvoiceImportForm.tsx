"use client";

import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface InvoiceImportFormProps {
  onClose: () => void;
  onImport: (data: any) => void;
}

const InvoiceImportForm: React.FC<InvoiceImportFormProps> = ({ onClose, onImport }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [importMethod, setImportMethod] = useState<'csv' | 'pdf' | 'api'>('pdf');
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedData, setExtractedData] = useState<any[]>([]);
  const [currentStep, setCurrentStep] = useState<'upload' | 'verify' | 'processing'>('upload');
  const [progress, setProgress] = useState(0);

  // Configuration de react-dropzone
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles([...files, ...acceptedFiles]);
  }, [files]);
  
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'text/csv': ['.csv'],
    },
    multiple: true
  });

  // Fonction simulée pour extraire les données des fichiers
  const extractData = async () => {
    setCurrentStep('processing');
    setIsProcessing(true);
    
    // Simuler un traitement avec un délai
    const totalFiles = files.length;
    const extractedItems = [];
    
    for (let i = 0; i < totalFiles; i++) {
      // Simulation d'extraction
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const file = files[i];
      const fileExtension = file.name.split('.').pop()?.toLowerCase() || '';
      
      let extractedItem: any = { 
        fileName: file.name
      };
      
      // Simuler l'extraction en fonction du type de fichier
      if (fileExtension === 'pdf') {
        extractedItem = {
          ...extractedItem,
          invoiceNumber: `FAC-${Math.floor(Math.random() * 10000)}`,
          amount: `${Math.floor(Math.random() * 5000) + 500}.00 €`,
          date: `${Math.floor(Math.random() * 28) + 1}/03/2023`,
          client: ['AgenceWeb Express', 'DigitalMarketing Pro', 'Studio Graphique Créatif'][Math.floor(Math.random() * 3)],
          type: 'pdf'
        };
      } else if (['jpg', 'jpeg', 'png'].includes(fileExtension)) {
        extractedItem = {
          ...extractedItem,
          invoiceNumber: `FAC-${Math.floor(Math.random() * 10000)}`,
          amount: `${Math.floor(Math.random() * 5000) + 500}.00 €`,
          date: `${Math.floor(Math.random() * 28) + 1}/03/2023`,
          client: ['AgenceWeb Express', 'DigitalMarketing Pro', 'Studio Graphique Créatif'][Math.floor(Math.random() * 3)],
          type: 'image'
        };
      } else if (fileExtension === 'csv') {
        extractedItem = {
          ...extractedItem,
          type: 'csv',
          // Pour un CSV, on pourrait simuler plusieurs lignes, mais ici on garde simple
          invoiceNumber: `FAC-${Math.floor(Math.random() * 10000)}`,
          amount: `${Math.floor(Math.random() * 5000) + 500}.00 €`,
          date: `${Math.floor(Math.random() * 28) + 1}/03/2023`,
          client: ['AgenceWeb Express', 'DigitalMarketing Pro', 'Studio Graphique Créatif'][Math.floor(Math.random() * 3)]
        };
      } else {
        extractedItem.error = "Type de fichier non supporté";
      }
      
      extractedItems.push(extractedItem);
      setProgress(Math.round(((i + 1) / totalFiles) * 100));
    }
    
    setExtractedData(extractedItems);
    setIsProcessing(false);
    setCurrentStep('verify');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentStep === 'upload') {
      extractData();
    } else if (currentStep === 'verify') {
      onImport(extractedData);
      onClose();
    }
  };

  const updateExtractedItem = (index: number, field: string, value: string) => {
    const updatedData = [...extractedData];
    updatedData[index] = { ...updatedData[index], [field]: value };
    setExtractedData(updatedData);
  };

  const removeFile = (index: number) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-medium text-gray-900">
            {currentStep === 'upload' ? 'Importer des factures' : 
             currentStep === 'processing' ? 'Traitement en cours...' : 
             'Vérifier les données extraites'}
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
        
        {currentStep === 'upload' && (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Interface de glisser-déposer */}
            <div {...getRootProps()} className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer">
              <input {...getInputProps()} />
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p className="mt-2 text-sm text-gray-600">Glissez-déposez vos factures ici, ou cliquez pour sélectionner des fichiers</p>
              <p className="text-xs text-gray-500 mt-1">PDF, images, et fichiers CSV acceptés</p>
            </div>
            
            {/* Liste des fichiers ajoutés */}
            {files.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Fichiers à importer ({files.length})</h3>
                <ul className="space-y-2 max-h-40 overflow-y-auto">
                  {files.map((file, index) => (
                    <li key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                      <span className="text-sm truncate">{file.name}</span>
                      <button 
                        type="button" 
                        onClick={() => removeFile(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </li>
                  ))}
                </ul>
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
                disabled={files.length === 0}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  files.length === 0
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-500 text-white hover:bg-blue-600 transition-colors'
                }`}
              >
                Analyser les fichiers
              </button>
            </div>
          </form>
        )}
        
        {currentStep === 'processing' && (
          <div className="text-center py-8">
            <div className="mb-4">
              <svg className="animate-spin h-10 w-10 text-blue-500 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
            <p className="text-gray-700">Extraction des données en cours...</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
              <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
            </div>
            <p className="text-sm text-gray-500 mt-2">{progress}% terminé</p>
          </div>
        )}
        
        {currentStep === 'verify' && (
          <div>
            <p className="text-sm text-gray-600 mb-4">
              Vérifiez et corrigez les données extraites avant de finaliser l'importation.
            </p>
            
            <div className="overflow-y-auto max-h-96">
              {extractedData.map((item, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg mb-4">
                  <h4 className="font-medium mb-2">{item.fileName}</h4>
                  
                  {item.error ? (
                    <p className="text-red-500">{item.error}</p>
                  ) : (
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Numéro de facture</label>
                        <input
                          type="text"
                          value={item.invoiceNumber || ''}
                          onChange={(e) => updateExtractedItem(index, 'invoiceNumber', e.target.value)}
                          className="w-full p-2 border rounded-md text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Montant</label>
                        <input
                          type="text"
                          value={item.amount || ''}
                          onChange={(e) => updateExtractedItem(index, 'amount', e.target.value)}
                          className="w-full p-2 border rounded-md text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Date</label>
                        <input
                          type="text"
                          value={item.date || ''}
                          onChange={(e) => updateExtractedItem(index, 'date', e.target.value)}
                          className="w-full p-2 border rounded-md text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Client</label>
                        <input
                          type="text"
                          value={item.client || ''}
                          onChange={(e) => updateExtractedItem(index, 'client', e.target.value)}
                          className="w-full p-2 border rounded-md text-sm"
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="flex justify-end gap-4 pt-4">
              <button
                type="button"
                onClick={() => setCurrentStep('upload')}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Retour
              </button>
              <button
                type="button"
                onClick={() => {
                  onImport(extractedData);
                  onClose();
                }}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
              >
                Importer les factures
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvoiceImportForm;