
import React from 'react';
import { Strategy } from '../types';

interface StrategyCardProps {
  strategy: Strategy;
  onClick: () => void;
  isSelected: boolean;
  disabled: boolean;
}

export const StrategyCard: React.FC<StrategyCardProps> = ({ strategy, onClick, isSelected, disabled }) => {
  const baseClasses = "flex flex-col items-center justify-center p-3 text-center rounded-lg border-2 transition-all duration-200 ease-in-out cursor-pointer h-28";
  const disabledClasses = "bg-slate-700/30 border-slate-600 text-slate-500";
  const enabledClasses = "bg-slate-700/50 border-slate-600 hover:bg-cyan-500/10 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/10";
  const selectedClasses = "bg-cyan-500/20 border-cyan-400 ring-2 ring-cyan-400 shadow-lg shadow-cyan-500/20 text-cyan-300";

  const getCardClasses = () => {
    if (disabled) return `${baseClasses} ${disabledClasses}`;
    if (isSelected) return `${baseClasses} ${enabledClasses} ${selectedClasses}`;
    return `${baseClasses} ${enabledClasses}`;
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={getCardClasses()}
      title={strategy.description}
    >
      <strategy.icon className="w-8 h-8 mb-2" />
      <span className="text-xs font-semibold">{strategy.name}</span>
    </button>
  );
};
