import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'InvoicePilot.io - Automatisation des relances de factures pour agences',
  description: 'Automatisez la gestion des relances de factures pour votre agence marketing, web ou design. Gagnez du temps et sécurisez votre trésorerie.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="h-full scroll-smooth">
      <body className={`${inter.className} h-full`}>
        {children}
      </body>
    </html>
  );
}