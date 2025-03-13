// src/utils/InvoicePdfGenerator.ts
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable';

// Interface de la structure d'une facture
export interface InvoiceData {
  number: string;
  date: string;
  dueDate: string;
  client: {
    id: string;
    name: string;
    email: string;
    address: string;
    zipCode: string;
    city: string;
    country: string;
    vatNumber: string;
  };
  items: {
    description: string;
    quantity: number;
    unitPrice: number;
    vatRate: number;
    total: number;
  }[];
  notes: string;
  paymentTerms: string;
  paymentMethod: string;
  totalHT: number;
  totalTVA: number;
  totalTTC: number;
}

// Interface pour les informations de l'entreprise
export interface CompanyInfo {
  name: string;
  address: string;
  zipCode: string;
  city: string;
  country: string;
  vatNumber: string;
  email: string;
  phone: string;
  website?: string;
  bankAccount?: string;
}

/**
 * Génère un PDF de facture à partir des données fournies et le télécharge
 * @param invoice Données de la facture
 * @param companyInfo Informations de l'entreprise émettrice de la facture
 */
export const generateInvoicePDF = (invoice: InvoiceData, companyInfo: CompanyInfo): void => {
  // Initialisation du document PDF
  const doc = new jsPDF();
  
  // Formatage des montants en euros
  const formatCurrency = (amount: number): string => {
    return amount.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';
  };
  
  // Date de création du PDF
  const creationDate = new Date().toLocaleDateString('fr-FR');
  
  // Ajouter l'en-tête avec les informations de l'entreprise
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text(companyInfo.name, 15, 20);
  doc.text(companyInfo.address, 15, 25);
  doc.text(`${companyInfo.zipCode} ${companyInfo.city}, ${companyInfo.country}`, 15, 30);
  doc.text(`TVA: ${companyInfo.vatNumber}`, 15, 35);
  doc.text(`Email: ${companyInfo.email}`, 15, 40);
  doc.text(`Tél: ${companyInfo.phone}`, 15, 45);
  if (companyInfo.website) {
    doc.text(`Web: ${companyInfo.website}`, 15, 50);
  }
  
  // Titre de la facture
  doc.setFontSize(18);
  doc.setTextColor(40);
  doc.text('FACTURE', 195, 20, { align: 'right' });
  
  // Numéro et dates de la facture
  doc.setFontSize(10);
  doc.text(`N° ${invoice.number}`, 195, 30, { align: 'right' });
  doc.text(`Date d'émission: ${invoice.date}`, 195, 35, { align: 'right' });
  doc.text(`Date d'échéance: ${invoice.dueDate}`, 195, 40, { align: 'right' });
  doc.text(`Édité le: ${creationDate}`, 195, 45, { align: 'right' });
  
  // Informations client
  doc.setFontSize(12);
  doc.setTextColor(40);
  doc.text('FACTURER À', 15, 65);
  
  doc.setFontSize(10);
  doc.text(invoice.client.name, 15, 72);
  doc.text(invoice.client.address, 15, 77);
  doc.text(`${invoice.client.zipCode} ${invoice.client.city}`, 15, 82);
  doc.text(invoice.client.country, 15, 87);
  if (invoice.client.vatNumber) {
    doc.text(`TVA: ${invoice.client.vatNumber}`, 15, 92);
  }
  
  // Conditions de paiement
  doc.setFontSize(10);
  doc.text('CONDITIONS DE PAIEMENT', 130, 65);
  doc.text(`Méthode: ${invoice.paymentMethod}`, 130, 72);
  doc.text(`Échéance: ${invoice.paymentTerms}`, 130, 77);
  
  // Tableau des articles
  const tableColumn = ["Description", "Quantité", "Prix unitaire", "TVA", "Total HT"];
  const tableRows: any[][] = [];
  
  invoice.items.forEach(item => {
    const itemData = [
      item.description,
      item.quantity.toString(),
      formatCurrency(item.unitPrice),
      `${item.vatRate}%`,
      formatCurrency(item.total)
    ];
    tableRows.push(itemData);
  });
  
  // Ajout du tableau au document
  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 100,
    theme: 'grid',
    styles: { fontSize: 9, cellPadding: 5 },
    headStyles: { fillColor: [60, 60, 233], textColor: 255 },
    columnStyles: {
      0: { cellWidth: 'auto' },
      1: { cellWidth: 20, halign: 'center' },
      2: { cellWidth: 30, halign: 'right' },
      3: { cellWidth: 20, halign: 'center' },
      4: { cellWidth: 30, halign: 'right' }
    }
  });
  
  // Position finale après le tableau pour ajouter d'autres éléments
  const finalY = (doc as any).lastAutoTable.finalY + 10;
  
  // Ajout des totaux
  doc.setFontSize(10);
  
  // Totaux à droite
  doc.text('Total HT:', 150, finalY);
  doc.text(formatCurrency(invoice.totalHT), 195, finalY, { align: 'right' });
  
  doc.text('Total TVA:', 150, finalY + 7);
  doc.text(formatCurrency(invoice.totalTVA), 195, finalY + 7, { align: 'right' });
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Total TTC:', 150, finalY + 15);
  doc.text(formatCurrency(invoice.totalTTC), 195, finalY + 15, { align: 'right' });
  doc.setFont('helvetica', 'normal');
  
  // Notes
  if (invoice.notes) {
    doc.setFontSize(10);
    doc.text('Notes:', 15, finalY);
    // Wrap text pour les notes longues
    const splitNotes = doc.splitTextToSize(invoice.notes, 130);
    doc.text(splitNotes, 15, finalY + 7);
  }
  
  // Informations bancaires en bas de page si disponibles
  if (companyInfo.bankAccount) {
    const pageHeight = doc.internal.pageSize.height;
    doc.setFontSize(9);
    doc.text('Coordonnées bancaires:', 15, pageHeight - 30);
    doc.text(companyInfo.bankAccount, 15, pageHeight - 25);
  }
  
  // Pied de page
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;
  
  doc.setFontSize(8);
  doc.setTextColor(100);
  doc.text(`${companyInfo.name} - ${companyInfo.address}, ${companyInfo.zipCode} ${companyInfo.city}`, pageWidth / 2, pageHeight - 15, { align: 'center' });
  doc.text(`TVA: ${companyInfo.vatNumber} - Email: ${companyInfo.email} - Tél: ${companyInfo.phone}`, pageWidth / 2, pageHeight - 10, { align: 'center' });
  
  // Téléchargement du PDF
  doc.save(`Facture_${invoice.number}.pdf`);
};