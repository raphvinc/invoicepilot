// src/components/dashboard/ClientPaymentScoreChart.tsx
"use client";

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,Cell, LabelList } from 'recharts';

interface ClientScore {
  name: string;
  score: number;
  color: string;
}

// Données simulées pour les scores de paiement des clients
const data: ClientScore[] = [
  { name: 'AgenceWeb Express', score: 95, color: '#10B981' },  // Excellent - green
  { name: 'DigitalMarketing Pro', score: 87, color: '#10B981' }, // Bon - green
  { name: 'Studio Graphique', score: 72, color: '#F59E0B' },  // Moyen - amber
  { name: 'Consulting Digital', score: 45, color: '#EF4444' }, // Faible - red
  { name: 'Web Solutions', score: 83, color: '#10B981' },     // Bon - green
];

const getScoreCategory = (score: number): string => {
  if (score >= 90) return 'Excellent';
  if (score >= 80) return 'Bon';
  if (score >= 60) return 'Moyen';
  return 'Faible';
};

const ClientPaymentScoreChart: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-6">Score de paiement des clients</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" domain={[0, 100]} />
            <YAxis type="category" dataKey="name" width={100} />
            <Tooltip 
              formatter={(value: number) => [`${value}/100`, 'Score']}
              labelFormatter={(name) => `${name}`}
            />
            <Bar dataKey="score" radius={[0, 4, 4, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
              <LabelList dataKey="score" position="right" formatter={(value: number) => `${value} - ${getScoreCategory(value)}`} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ClientPaymentScoreChart;