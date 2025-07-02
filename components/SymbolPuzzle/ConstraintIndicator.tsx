import React from 'react';
import { Constraint } from '../../types/symbolPuzzle';

interface ConstraintIndicatorProps {
  constraint: Constraint;
  cellSize: number;
}

export default function ConstraintIndicator({ constraint, cellSize }: ConstraintIndicatorProps) {
  const getIndicatorClasses = () => {
    let classes = 'absolute flex items-center justify-center font-bold text-lg transition-all duration-200 rounded-full shadow-md';
    
    if (constraint.isViolated) {
      classes += ' text-red-600 bg-red-100 border-2 border-red-400 animate-pulse shadow-red-200';
    } else {
      classes += ' text-gray-700 bg-white border-2 border-gray-300 shadow-gray-200';
    }
    
    return classes;
  };

  const getIndicatorPosition = () => {
    const { position, direction } = constraint;
    
    if (direction === 'horizontal') {
      // Position between two horizontally adjacent cells
      return {
        left: (position.col + 0.5) * cellSize + position.col * 2 - 12, // Adjust for border gaps
        top: position.row * cellSize + position.row * 2 + cellSize / 2 - 12,
        width: 24,
        height: 24
      };
    } else {
      // Position between two vertically adjacent cells
      return {
        left: position.col * cellSize + position.col * 2 + cellSize / 2 - 12,
        top: (position.row + 0.5) * cellSize + position.row * 2 - 12, // Adjust for border gaps
        width: 24,
        height: 24
      };
    }
  };

  const renderConstraintSymbol = () => {
    if (constraint.type === 'equals') {
      return (
        <div className="text-green-600 font-black text-lg">
          =
        </div>
      );
    } else {
      return (
        <div className="text-red-600 font-black text-lg">
          ×
        </div>
      );
    }
  };

  return (
    <div
      className={getIndicatorClasses()}
      style={getIndicatorPosition()}
      title={
        constraint.type === 'equals'
          ? 'These cells must contain the same symbol'
          : 'These cells must contain different symbols'
      }
    >
      {renderConstraintSymbol()}
    </div>
  );
} 