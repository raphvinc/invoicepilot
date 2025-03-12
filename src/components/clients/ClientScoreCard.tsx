// src/components/clients/ClientScoreCard.tsx
"use client";

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface ClientScoreCardProps {
  clientName: string;
  score: number;
  invoiceCount: number;
  totalAmount: string;
  averagePayDays: number;
}

const ClientScoreCard: React.FC<ClientScoreCardProps> = ({
  clientName,
  score,
  invoiceCount,
  totalAmount,
  averagePayDays,
}) => {
  // Détermine la couleur et la catégorie en fonction du score
  const getScoreColor = (score: number): string => {
    if (score >= 90) return '#10B981'; // green-500
    if (score >= 80) return '#3B82F6'; // blue-500
    if (score >= 60) return '#F59E0B'; // amber-500
    return '#EF4444'; // red-500
  };

  const getScoreCategory = (score: number): string => {
    if (score >= 90) return 'Excellent';
    if (score >= 80) return 'Bon';
    if (score >= 60) return 'Moyen';
    return 'Faible';
  };

  // Données pour le graphique
  const scoreColor = getScoreColor(score);
  const remainingScore = 100 - score;
  const data = [
    { name: 'Score', value: score, color: scoreColor },
    { name: 'Restant', value: remainingScore, color: '#E5E7EB' }, // gray-200
  ];

  // Si le paiement moyen est dans les temps, en avance ou en retard
  const getPaymentStatus = (): { text: string; color: string } => {
    if (averagePayDays < 0) {
      return { text: `En avance (${Math.abs(averagePayDays)} jours)`, color: 'text-green-500' };
    }
    if (averagePayDays === 0) {
      return { text: 'À temps', color: 'text-blue-500' };
    }
    return { text: `En retard (${averagePayDays} jours)`, color: 'text-amber-500' };
  };

  const paymentStatus = getPaymentStatus();

  return (
    <div className="bg-white rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] p-6">
      <div className="flex justify-between mb-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900">{clientName}</h3>
          <p className="text-sm text-gray-500">Score de paiement</p>
        </div>
        <div className="bg-gray-50 px-3 py-1 rounded-lg flex items-center">
          <span className="text-sm text-gray-500">Total facturé :</span>
          <span className="ml-1 text-sm font-medium text-gray-900">{totalAmount}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex flex-col justify-center">
          <div className="h-28 w-28 mx-auto relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={28}
                  outerRadius={40}
                  paddingAngle={0}
                  dataKey="value"
                  startAngle={90}
                  endAngle={-270}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <span className="text-2xl font-semibold">{score}</span>
              <span className="text-xs text-gray-500">/100</span>
            </div>
          </div>
          <div className="text-center mt-3">
            <span 
              className={`inline-block px-3 py-1 rounded-full text-xs font-medium
                ${score >= 90 ? 'bg-green-50 text-green-700' : 
                  score >= 80 ? 'bg-blue-50 text-blue-700' : 
                  score >= 60 ? 'bg-amber-50 text-amber-700' : 
                  'bg-red-50 text-red-700'}`
              }
            >
              {getScoreCategory(score)}
            </span>
          </div>
        </div>

        <div className="col-span-2">
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Nombre de factures</p>
              <p className="text-lg font-medium text-gray-900">{invoiceCount}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Paiement moyen</p>
              <p className={`text-lg font-medium ${paymentStatus.color}`}>{paymentStatus.text}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Recommandation</p>
              <p className="text-sm text-gray-700">
                {score >= 80 ? 
                  "Client fiable, possibilité d'offrir des facilités de paiement." : 
                  score >= 60 ? 
                  "Surveillance recommandée et vérification avant chaque projet important." : 
                  "Paiement à l'avance recommandé. Limiter l'exposition financière."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientScoreCard;