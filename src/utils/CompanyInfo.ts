// src/utils/CompanyInfo.ts
import { CompanyInfo } from './InvoicePdfGenerator';

// Informations par défaut de l'entreprise (à remplacer par les données réelles dans une application de production)
export const defaultCompanyInfo: CompanyInfo = {
  name: "InvoicePilot Agency",
  address: "123 Rue de la Facturation",
  zipCode: "75001",
  city: "Paris",
  country: "France",
  vatNumber: "FR12345678901",
  email: "contact@invoicepilot.io",
  phone: "01 23 45 67 89",
  website: "www.invoicepilot.io",
  bankAccount: "IBAN: FR76 3000 6000 0123 4567 8901 234 - BIC: AGFBFRCC"
};