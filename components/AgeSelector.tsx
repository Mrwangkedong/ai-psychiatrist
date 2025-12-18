
import React from 'react';
import { AgeGroup } from '../types';
import { AGE_CARDS } from '../constants';

interface AgeSelectorProps {
  onSelect: (group: AgeGroup) => void;
}

const AgeSelector: React.FC<AgeSelectorProps> = ({ onSelect }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
      {AGE_CARDS.map((card) => (
        <button
          key={card.type}
          onClick={() => onSelect(card.type)}
          className={`group flex flex-col items-center p-8 rounded-2xl border-2 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 ${card.color} border-opacity-50`}
        >
          <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
            <i className={`fas ${card.icon}`}></i>
          </div>
          <h3 className="text-xl font-bold mb-2">{card.title}</h3>
          <p className="text-sm opacity-80 text-center">{card.desc}</p>
        </button>
      ))}
    </div>
  );
};

export default AgeSelector;
