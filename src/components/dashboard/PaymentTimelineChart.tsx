// src/components/dashboard/PaymentTimelineChart.tsx
"use client";

import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// Données simulées pour les derniers 6 mois
const data = [
  { month: 'Janv.', factures: 18, payments: 15, pending: 3 },
  { month: 'Févr.', factures: 22, payments: 17, pending: 5 },
  { month: 'Mars', factures: 25, payments: 20, pending: 5 },
  { month: 'Avr.', factures: 20, payments: 16, pending: 4 },
  { month: 'Mai', factures: 24, payments: 19, pending: 5 },
  { month: 'Juin', factures: 28, payments: 22, pending: 6 },
];

const PaymentTimelineChart: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-6">Évolution des paiements</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area 
              type="monotone" 
              dataKey="factures" 
              stackId="1" 
              stroke="#6366F1" 
              fill="#818CF8" 
              name="Factures émises" 
            />
            <Area 
              type="monotone" 
              dataKey="payments" 
              stackId="2" 
              stroke="#10B981" 
              fill="#A7F3D0" 
              name="Paiements reçus" 
            />
            <Area 
              type="monotone" 
              dataKey="pending" 
              stackId="3" 
              stroke="#F59E0B" 
              fill="#FDE68A" 
              name="En attente" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PaymentTimelineChart;