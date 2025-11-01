
import React from 'react';
import { Strategy } from '../types';
import { StrategyCard } from './StrategyCard';

interface StrategyGridProps {
  strategies: Strategy[];
  onSelect: (strategy: Strategy) => void;
  selectedStrategy: Strategy | null;
  disabled: boolean;
}

export const StrategyGrid: React.FC<StrategyGridProps> = ({ strategies, onSelect, selectedStrategy, disabled }) => {
  return (
    <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700 shadow-lg flex-grow">
      <h2 className="text-lg font-medium text-cyan-400 mb-4">
        2. اختر استراتيجية التدريس
      </h2>
      <div className={`grid grid-cols-2 sm:grid-cols-3 gap-3 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
        {strategies.map((strategy) => (
          <StrategyCard
            key={strategy.id}
            strategy={strategy}
            onClick={() => onSelect(strategy)}
            isSelected={selectedStrategy?.id === strategy.id}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
};
