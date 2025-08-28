import React from 'react';
import { TrendingUp, Package, Target } from 'lucide-react';

const KPICards = ({ products }) => {
  const totalStock = products.reduce((sum, p) => sum + p.stock, 0);
  const totalDemand = products.reduce((sum, p) => sum + p.demand, 0);
  const fillRate = totalDemand > 0 
    ? (products.reduce((sum, p) => sum + Math.min(p.stock, p.demand), 0) / totalDemand * 100).toFixed(1)
    : 0;

  const cards = [
    {
      title: 'Total Stock',
      value: totalStock.toLocaleString(),
      icon: Package,
      color: 'bg-blue-50 text-blue-600',
      iconColor: 'text-blue-500'
    },
    {
      title: 'Total Demand',
      value: totalDemand.toLocaleString(),
      icon: Target,
      color: 'bg-purple-50 text-purple-600',
      iconColor: 'text-purple-500'
    },
    {
      title: 'Fill Rate',
      value: `${fillRate}%`,
      icon: TrendingUp,
      color: 'bg-green-50 text-green-600',
      iconColor: 'text-green-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {cards.map((card, index) => (
        <div key={index} className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">{card.title}</p>
              <p className="text-3xl font-bold text-gray-900">{card.value}</p>
            </div>
            <div className={`p-3 rounded-full ${card.color}`}>
              <card.icon className={`w-6 h-6 ${card.iconColor}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default KPICards;