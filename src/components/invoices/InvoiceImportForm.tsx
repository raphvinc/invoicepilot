"use client";

import React, { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { createWorker } from "tesseract.js";
import * as pdfjs from "pdfjs-dist";
import Papa from "papaparse";

interface InvoiceImportFormProps {
  onClose: () => void;
  onImport: (data: any) => void;
}

interface ExtractedItem {
  fileName: string;
  invoiceNumber?: string;
  amount?: string;
  date?: string;
  client?: string;
  type?: string;
  error?: string;
  rawText?: string; // Pour stocker le texte brut extrait pour le débogage
  showRawText?: boolean; // Add this property for UI toggle
  warning?: string; // Add this for warning messages
  notes?: string; // Add this for additional notes
  [key: string]: any;
}

// Define the interface for Papaparse results
interface PapaparseResults {
  data: any[];
  errors: any[];
  meta: {
    delimiter: string;
    linebreak: string;
    aborted: boolean;
    truncated: boolean;
    cursor: number;
    fields: string[];
  };
}

// Define the interface for extracted data
interface PartialExtractedItem {
  invoiceNumber?: string;
  amount?: string;
  date?: string;
  client?: string;
  rawText?: string;
  [key: string]: any;
}

// Initialiser PDF.js worker (recommandé de le localiser dans public/pdf.worker.min.js)
pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.js`; // Remplacez par le chemin local

const InvoiceImportForm: React.FC<InvoiceImportFormProps> = ({ onClose, onImport }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedData, setExtractedData] = useState<ExtractedItem[]>([]);
  const [currentStep, setCurrentStep] = useState<"upload" | "verify" | "processing">("upload");
  const [progress, setProgress] = useState(0);
  const [overallProgress, setOverallProgress] = useState(0);
  const [currentFile, setCurrentFile] = useState<string>("");
  const [ocrWorker, setOcrWorker] = useState<any>(null);
  const [isOcrReady, setIsOcrReady] = useState(false);
  const [ocrError, setOcrError] = useState<string | null>(null);

// Ajoutez cette interface pour le typage
interface TesseractProgress {
  status: string;
  progress: number;
  jobId?: string;
  [key: string]: any;
}

// Puis modifiez votre useEffect comme ceci
useEffect(() => {
  const initWorker = async () => {
    try {
      // Créez simplement le worker avec juste la langue
      // Sans aucune option supplémentaire qui pourrait causer des problèmes
      const worker = await createWorker("fra");
      
      // Pas besoin d'appeler loadLanguage ou initialize
      // car createWorker avec un paramètre de langue fait déjà ça
      
      setOcrWorker(worker);
      setIsOcrReady(true);
    } catch (error) {
      setOcrError(
        "Erreur lors de l'initialisation de Tesseract : " +
          (error as Error).message
      );
      console.error("Tesseract initialization failed:", error);
    }
  };

  initWorker();

  return () => {
    if (ocrWorker) {
      ocrWorker.terminate();
    }
  };
}, []);

// Ensuite, la fonction extractTextFromImage reste simple
const extractTextFromImage = async (file: File): Promise<string> => {
  if (!ocrWorker) {
    throw new Error("OCR worker not initialized");
  }

  try {
    // Mise à jour manuelle de la progression
    setProgress(10);
    
    const imageBase64 = await fileToBase64(file);
    setProgress(40);
    
    // Reconnaître le texte
    const result = await ocrWorker.recognize(imageBase64);
    setProgress(100);
    
    // Extraction du texte 
    let text = "";
    if (result.data && result.data.text) {
      text = result.data.text;
    } else if (result.text) {
      text = result.text;
    } else {
      console.log("Structure de résultat inattendue:", result);
      text = JSON.stringify(result).substring(0, 100); // Limiter la taille
    }
    
    console.log('Texte brut extrait de l\'image :', text);
    return text;
  } catch (error) {
    console.error("Erreur lors de l'extraction du texte de l'image:", error);
    throw error;
  }
};



  // Configuration de react-dropzone
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "text/csv": [".csv"],
    },
    multiple: true,
    maxSize: 10 * 1024 * 1024, // Limite de 10 Mo par fichier
  });

  // Convertir un Blob/File en base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  

  

  // Extraire le texte d'un PDF avec limite de pages
  const extractTextFromPdf = async (file: File): Promise<string> => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
      let fullText = "";

      // Limiter à 10 pages pour éviter les performances lentes
      for (let i = 1; i <= Math.min(pdf.numPages, 10); i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map((item: any) => item.str).join(" ");
        fullText += pageText + "\n";
        setProgress(Math.round((i / Math.min(pdf.numPages, 10)) * 100));
      }

      return fullText;
    } catch (error) {
      console.error("Erreur lors de l'extraction du texte du PDF:", error);
      throw error;
    }
  };

  // Extraire les données d'un CSV
  const extractDataFromCsv = async (file: File): Promise<any[]> => {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results: PapaparseResults) => {
          resolve(results.data);
        },
        error: (error: Error) => {
          console.error("Erreur lors de l'analyse du CSV:", error);
          reject(error);
        },
      });
    });
  };

  // Analyser le texte extrait pour trouver les informations pertinentes
  const parseExtractedText = (text: string): PartialExtractedItem => {
    const extractedData: PartialExtractedItem = {
      rawText: text,
    };

    // Expressions régulières améliorées pour plus de cas
    const invoiceNumberPatterns = [
      /facture\s+n[o°]?\s*[.:]\s*([A-Z0-9-_]+)/i,
      /invoice\s+no\.\s*([A-Z0-9-_]+)/i,
      /n[o°]?\s*facture\s*[.:]\s*([A-Z0-9-_]+)/i,
      /invoice\s+number\s*[.:]\s*([A-Z0-9-_]+)/i,
      /facture\s+([A-Z]{3,4}[0-9]{4,})/i,
      /f\s?a\s?c\s?t\s?\s*[.:]\s*([A-Z0-9-_]+)/i,
      /n°\s*:?\s*([A-Z0-9-_]+)/i,
    ];

    const amountPatterns = [
      /total\s+ttc\s*:?\s*([0-9\s,.]+)[€\s$]/i,
      /montant\s*(\(?ttc\)?)?\s*:?\s*([0-9\s,.]+)[€\s$]/i,
      /total\s+amount\s*:?\s*([0-9\s,.]+)[€\$\s]/i,
      /montant\s+total\s*:?\s*([0-9\s,.]+)[€\s$]/i,
      /total\s*:?\s*([0-9\s,.]+)[€\$\s]/i,
      /à\s+payer\s*:?\s*([0-9\s,.]+)[€\s$]/i,
    ];

    const datePatterns = [
      /date\s+d[e']\s*émission\s*:?\s*(\d{1,2}[\/-]\d{1,2}[\/-]\d{2,4}|\d{1,2}\s+[a-zéû]+\s+\d{2,4})/i,
      /date\s+de\s+facture\s*:?\s*(\d{1,2}[\/-]\d{1,2}[\/-]\d{2,4}|\d{1,2}\s+[a-zéû]+\s+\d{2,4})/i,
      /date\s*:?\s*(\d{1,2}[\/-]\d{1,2}[\/-]\d{2,4}|\d{1,2}\s+[a-zéû]+\s+\d{2,4})/i,
      /émise\s+le\s*:?\s*(\d{1,2}[\/-]\d{1,2}[\/-]\d{2,4}|\d{1,2}\s+[a-zéû]+\s+\d{2,4})/i,
    ];

    const clientPatterns = [
      /client\s*:?\s*([A-Za-z0-9\s.&]+(?:\r|\n|$))/i,
      /facturer\s+à\s*:?\s*([A-Za-z0-9\s.&]+(?:\r|\n|$))/i,
      /bill\s+to\s*:?\s*([A-Za-z0-9\s.&]+(?:\r|\n|$))/i,
    ];

    // Rechercher le numéro de facture
    for (const pattern of invoiceNumberPatterns) {
      const match = text.match(pattern);
      if (match && match[1]) {
        extractedData.invoiceNumber = match[1].trim();
        break;
      }
    }

    // Rechercher le montant
    for (const pattern of amountPatterns) {
      const match = text.match(pattern);
      if (match) {
        const amountMatch = match[1]?.includes("€") || match[1]?.includes("$")
          ? match[1]
          : match[2] || match[1];
        if (amountMatch) {
          let amount = amountMatch.replace(/\s/g, "").replace(",", ".");
          amount = amount.replace(/[^\d.,$€]/g, "");
          extractedData.amount = amount + (amountMatch.includes("$") ? " $" : " €");
          break;
        }
      }
    }

    // Rechercher la date
    for (const pattern of datePatterns) {
      const match = text.match(pattern);
      if (match && match[1]) {
        extractedData.date = match[1].trim();
        break;
      }
    }

    // Rechercher le client
    for (const pattern of clientPatterns) {
      const match = text.match(pattern);
      if (match && match[1]) {
        extractedData.client = match[1].trim().substring(0, 30).replace(/\s+/g, " ");
        break;
      }
    }

    return extractedData;
  };

  // Convertir les données d'un CSV en format standard
  const convertCsvRowToExtractedItem = (
    row: any,
    fileName: string
  ): ExtractedItem => {
    const getFieldByPossibleNames = (names: string[]): string | undefined => {
      for (const name of names) {
        if (row[name] !== undefined) {
          return row[name];
        }
      }
      return undefined;
    };

    const invoiceNumber = getFieldByPossibleNames([
      "invoice_number",
      "invoiceNumber",
      "numero_facture",
      "facture_numero",
      "numero",
      "facture",
      "no",
      "n°",
    ]);

    const amount = getFieldByPossibleNames([
      "amount",
      "montant",
      "total_ttc",
      "totalTTC",
      "total",
      "price",
      "prix",
    ]);

    const date = getFieldByPossibleNames([
      "date",
      "invoice_date",
      "date_facture",
      "factureDate",
      "émission",
      "emission",
    ]);

    const client = getFieldByPossibleNames([
      "client",
      "customer",
      "client_name",
      "clientName",
      "nom_client",
      "société",
      "company",
    ]);

    return {
      fileName,
      invoiceNumber: invoiceNumber || "Non détecté",
      amount: amount
        ? amount.toString().includes("€") || amount.toString().includes("$")
          ? amount.toString()
          : `${amount} €`
        : "Non détecté",
      date: date || "Non détecté",
      client: client || "Non détecté",
      type: "csv",
    };
  };

  // Traiter tous les fichiers
  const extractData = async () => {
    if (!files.length || !isOcrReady) {
      if (ocrError) {
        alert(ocrError);
      } else {
        alert("L'OCR n'est pas encore prêt. Veuillez attendre.");
      }
      return;
    }

    setCurrentStep("processing");
    setIsProcessing(true);
    setProgress(0);
    setOverallProgress(0);

    const totalFiles = files.length;
    const extractedItems: ExtractedItem[] = [];

    for (let i = 0; i < totalFiles; i++) {
      try {
        const file = files[i];
        setCurrentFile(file.name);

        if (file.size > 10 * 1024 * 1024) {
          extractedItems.push({
            fileName: file.name,
            error: "Fichier trop volumineux (limite : 10 Mo).",
          });
          setOverallProgress(Math.round(((i + 1) / totalFiles) * 100));
          continue;
        }

        const fileExtension = file.name.split(".").pop()?.toLowerCase() || "";
        let extractedItem: ExtractedItem = { fileName: file.name };

        if (fileExtension === "pdf") {
          const extractedText = await extractTextFromPdf(file);
          const parsedData = parseExtractedText(extractedText);
          extractedItem = {
            ...extractedItem,
            ...parsedData,
            type: "pdf",
          };
        } else if (["jpg", "jpeg", "png"].includes(fileExtension)) {
          const extractedText = await extractTextFromImage(file);
          const parsedData = parseExtractedText(extractedText);
          extractedItem = {
            ...extractedItem,
            ...parsedData,
            type: "image",
          };
        } else if (fileExtension === "csv") {
          const csvData = await extractDataFromCsv(file);

          if (csvData && csvData.length > 0) {
            extractedItem = convertCsvRowToExtractedItem(csvData[0], file.name);

            if (csvData.length > 1) {
              extractedItem.notes = `Ce fichier contient ${csvData.length} factures. Seule la première est affichée ici. Toutes seront importées.`;
            }
          } else {
            extractedItem.error = "Format CSV non reconnu ou vide";
          }
        } else {
          extractedItem.error = "Type de fichier non supporté";
        }

        if (
          !extractedItem.error &&
          (!extractedItem.invoiceNumber ||
            extractedItem.invoiceNumber === "Non détecté") &&
          (!extractedItem.amount || extractedItem.amount === "Non détecté")
        ) {
          extractedItem.warning =
            "Les informations essentielles n'ont pas pu être détectées automatiquement. Veuillez les compléter manuellement.";
        }

        extractedItems.push(extractedItem);
        setOverallProgress(Math.round(((i + 1) / totalFiles) * 100));
      } catch (error) {
        console.error(`Erreur lors du traitement du fichier ${files[i].name}:`, error);
        extractedItems.push({
          fileName: files[i].name,
          error: `Erreur lors du traitement: ${(error as Error).message}`,
        });
        setOverallProgress(Math.round(((i + 1) / totalFiles) * 100));
      }
    }

    setExtractedData(extractedItems);
    setIsProcessing(false);
    if (extractedItems.every((item) => item.error)) {
      alert(
        "Aucun fichier n'a pu être traité correctement. Vérifiez les formats et réessayez."
      );
      setCurrentStep("upload");
    } else {
      setCurrentStep("verify");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (currentStep === "upload") {
      extractData();
    } else if (currentStep === "verify") {
      const validData = extractedData.filter((item) => !item.error);
      onImport(validData);
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
    <div className="fixed top-0 bottom-0 right-0 left-64 bg-gray-50 flex justify-center items-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-medium text-gray-900">
            {currentStep === "upload"
              ? "Importer des factures"
              : currentStep === "processing"
              ? "Traitement en cours..."
              : "Vérifier les données extraites"}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {currentStep === "upload" && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div
              {...getRootProps()}
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <input {...getInputProps()} />
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <p className="mt-2 text-sm text-gray-600">
                Glissez-déposez vos factures ici, ou cliquez pour sélectionner des
                fichiers
              </p>
              <p className="text-xs text-gray-500 mt-1">
                PDF, images, et fichiers CSV acceptés
              </p>
            </div>

            {files.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Fichiers à importer ({files.length})
                </h3>
                <ul className="space-y-2 max-h-40 overflow-y-auto">
                  {files.map((file, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center p-2 bg-gray-50 rounded-lg"
                    >
                      <span className="text-sm truncate">{file.name}</span>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M6 18L18 6M6 6l12 12"
                          />
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
                disabled={files.length === 0 || !isOcrReady}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  files.length === 0 || !isOcrReady
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                }`}
              >
                Analyser les fichiers
              </button>
            </div>
          </form>
        )}

        {currentStep === "processing" && (
          <div className="text-center py-8">
            <div className="mb-4">
              <svg
                className="animate-spin h-10 w-10 text-blue-500 mx-auto"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </div>
            <p className="text-gray-700">Traitement en cours de: {currentFile}</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
              <div
                className="bg-blue-300 h-2.5 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-500 mt-2">Analyse du document: {progress}%</p>

            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
              <div
                className="bg-blue-500 h-2.5 rounded-full"
                style={{ width: `${overallProgress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Progression globale: {overallProgress}% (
              {files.indexOf(files.find((f) => f.name === currentFile) || files[0]) +
                1}
              /{files.length})
            </p>
          </div>
        )}

        {currentStep === "verify" && (
          <div>
            <p className="text-sm text-gray-600 mb-4">
              Vérifiez et corrigez les données extraites avant de finaliser
              l'importation.
            </p>

            <div className="overflow-y-auto max-h-96">
              {extractedData.map((item, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg mb-4 ${
                    item.error ? "bg-red-50" : item.warning ? "bg-yellow-50" : "bg-gray-50"
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">{item.fileName}</h4>
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        item.error
                          ? "bg-red-100 text-red-800"
                          : item.warning
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {item.error
                        ? "Erreur"
                        : item.warning
                        ? "Attention"
                        : item.type === "pdf"
                        ? "PDF"
                        : item.type === "image"
                        ? "Image"
                        : "CSV"}
                    </span>
                  </div>

                  {item.error ? (
                    <p className="text-red-500">{item.error}</p>
                  ) : (
                    <>
                      {item.warning && (
                        <p className="text-yellow-700 text-sm mb-3">
                          {item.warning}
                        </p>
                      )}
                      {item.notes && (
                        <p className="text-blue-700 text-sm mb-3">{item.notes}</p>
                      )}

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">
                            Numéro de facture
                          </label>
                          <input
                            type="text"
                            value={item.invoiceNumber || ""}
                            onChange={(e) =>
                              updateExtractedItem(index, "invoiceNumber", e.target.value)
                            }
                            className={`w-full p-2 border rounded-md text-sm ${
                              !item.invoiceNumber ||
                              item.invoiceNumber === "Non détecté"
                                ? "border-yellow-300 bg-yellow-50"
                                : "border-gray-300"
                            }`}
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">
                            Montant
                          </label>
                          <input
                            type="text"
                            value={item.amount || ""}
                            onChange={(e) =>
                              updateExtractedItem(index, "amount", e.target.value)
                            }
                            className={`w-full p-2 border rounded-md text-sm ${
                              !item.amount || item.amount === "Non détecté"
                                ? "border-yellow-300 bg-yellow-50"
                                : "border-gray-300"
                            }`}
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">
                            Date
                          </label>
                          <input
                            type="text"
                            value={item.date || ""}
                            onChange={(e) =>
                              updateExtractedItem(index, "date", e.target.value)
                            }
                            className={`w-full p-2 border rounded-md text-sm ${
                              !item.date || item.date === "Non détecté"
                                ? "border-yellow-300 bg-yellow-50"
                                : "border-gray-300"
                            }`}
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">
                            Client
                          </label>
                          <input
                            type="text"
                            value={item.client || ""}
                            onChange={(e) =>
                              updateExtractedItem(index, "client", e.target.value)
                            }
                            className={`w-full p-2 border rounded-md text-sm ${
                              !item.client || item.client === "Non détecté"
                                ? "border-yellow-300 bg-yellow-50"
                                : "border-gray-300"
                            }`}
                          />
                        </div>
                      </div>

                      {/* Afficher un extrait du texte brut pour le débogage */}
                      {item.rawText && (
                        <div className="mt-3">
                          <button
                            type="button"
                            onClick={() => {
                              const updatedData = [...extractedData];
                              updatedData[index] = {
                                ...updatedData[index],
                                showRawText: !updatedData[index].showRawText,
                              };
                              setExtractedData(updatedData);
                            }}
                            className="text-xs text-blue-600 hover:text-blue-800"
                          >
                            {item.showRawText
                              ? "Masquer le texte brut"
                              : "Afficher le texte brut détecté"}
                          </button>

                          {item.showRawText && (
                            <div className="mt-2 p-2 bg-gray-100 rounded-md max-h-32 overflow-y-auto">
                              <pre className="text-xs whitespace-pre-wrap">
                                {item.rawText.substring(0, 500)}...
                              </pre>
                            </div>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <button
                type="button"
                onClick={() => setCurrentStep("upload")}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Retour
              </button>
              <button
                type="button"
                onClick={() => {
                  const validData = extractedData.filter((item) => !item.error);
                  if (validData.length === 0) {
                    alert("Aucune donnée valide à importer.");
                    return;
                  }
                  onImport(validData);
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