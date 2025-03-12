// src/components/dashboard/InvoiceStatusChart.tsx
"use client";

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface InvoiceStatusData {
  name: string;
  value: number;
  color: string;
}

const data: InvoiceStatusData[] = [
  { name: 'Payées', value: 12, color: '#10B981' },  // green-500
  { name: 'En attente', value: 8, color: '#F59E0B' },  // amber-500
  { name: 'En retard', value: 3, color: '#EF4444' },  // red-500
];

const InvoiceStatusChart: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-6">Statut des factures</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value: number) => [`${value} factures`, 'Quantité']} 
              labelFormatter={(name) => `Status: ${name}`}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default InvoiceStatusChart;