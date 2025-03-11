import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="bg-white shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-xl font-bold text-indigo-600">InvoicePilot.io</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/login" className="text-gray-600 hover:text-gray-900">
              Se connecter
            </Link>
            <Link
              href="/register"
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
            >
              S'inscrire
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex-grow">
        <section className="bg-gradient-to-r from-indigo-50 to-indigo-100 py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6">
                  L'outil de relance client spécialement conçu pour les agences créatives
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                  Automatisez vos relances de factures, améliorez votre trésorerie et concentrez-vous sur votre métier créatif. InvoicePilot.io s'occupe du reste.
                </p>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <Link
                    href="/register"
                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Essayer gratuitement
                  </Link>
                  <Link
                    href="#features"
                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
                  >
                    En savoir plus
                  </Link>
                </div>
              </div>
              <div className="mt-10 lg:mt-0 flex justify-center">
                <div className="relative w-full max-w-lg">
                  <div className="absolute top-0 left-0 w-40 h-40 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-30"></div>
                  <div className="absolute top-0 right-0 w-40 h-40 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30"></div>
                  <div className="absolute bottom-0 left-0 w-40 h-40 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-30"></div>
                  <div className="relative">
                    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                      <div className="bg-indigo-50 p-4 rounded-lg mb-4">
                        <div className="h-6 bg-indigo-200 rounded w-2/3 mb-2"></div>
                        <div className="h-4 bg-indigo-100 rounded w-1/2"></div>
                      </div>
                      <div className="space-y-3">
                        <div className="h-4 bg-gray-100 rounded"></div>
                        <div className="h-4 bg-gray-100 rounded w-5/6"></div>
                        <div className="h-4 bg-gray-100 rounded w-4/6"></div>
                      </div>
                      <div className="mt-6 flex justify-end">
                        <div className="h-8 bg-indigo-500 rounded w-24"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Fonctionnalités principales
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Tout ce dont vous avez besoin pour gérer efficacement vos relances de factures.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Feature 1 */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Automatisation des relances</h3>
                <p className="text-gray-600">
                  Programmez des e-mails automatiques en fonction des statuts de paiement avec des templates personnalisables.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Dashboard de suivi</h3>
                <p className="text-gray-600">
                  Visualisez vos factures en attente, en retard et payées avec un historique complet des relances.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Gestion simplifiée</h3>
                <p className="text-gray-600">
                  Importez facilement vos factures depuis différents formats et suivez leur statut en temps réel.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Scoring des clients</h3>
                <p className="text-gray-600">
                  Identifiez les clients à risque grâce à un système de scoring basé sur l'historique de paiement.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-indigo-700 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Prêt à améliorer votre trésorerie ?
            </h2>
            <p className="mt-4 text-lg text-indigo-100 max-w-3xl mx-auto">
              Rejoignez les agences qui gagnent du temps et sécurisent leurs paiements avec InvoicePilot.io.
            </p>
            <div className="mt-8">
              <Link
                href="/register"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50"
              >
                Commencer gratuitement
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase mb-4">Produit</h3>
              <ul className="space-y-3">
                <li><Link href="#features" className="text-base text-gray-600 hover:text-gray-900">Fonctionnalités</Link></li>
                <li><Link href="#" className="text-base text-gray-600 hover:text-gray-900">Tarifs</Link></li>
                <li><Link href="#" className="text-base text-gray-600 hover:text-gray-900">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase mb-4">Entreprise</h3>
              <ul className="space-y-3">
                <li><Link href="#" className="text-base text-gray-600 hover:text-gray-900">À propos</Link></li>
                <li><Link href="#" className="text-base text-gray-600 hover:text-gray-900">Blog</Link></li>
                <li><Link href="#" className="text-base text-gray-600 hover:text-gray-900">Carrières</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase mb-4">Support</h3>
              <ul className="space-y-3">
                <li><Link href="#" className="text-base text-gray-600 hover:text-gray-900">Centre d'aide</Link></li>
                <li><Link href="#" className="text-base text-gray-600 hover:text-gray-900">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase mb-4">Légal</h3>
              <ul className="space-y-3">
                <li><Link href="#" className="text-base text-gray-600 hover:text-gray-900">Confidentialité</Link></li>
                <li><Link href="#" className="text-base text-gray-600 hover:text-gray-900">Conditions</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-200 pt-8">
            <p className="text-base text-gray-500 text-center">
              &copy; {new Date().getFullYear()} InvoicePilot.io. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
