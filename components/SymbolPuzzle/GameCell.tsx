import React from 'react';
import { GameCell as GameCellType } from '../../types/symbolPuzzle';
import SunIcon from './icons/SunIcon';
import MoonIcon from './icons/MoonIcon';

interface GameCellProps {
  cell: GameCellType;
  size: number;
  onClick: () => void;
  onRightClick?: (e: React.MouseEvent) => void;
}

export default function GameCell({ cell, size, onClick, onRightClick }: GameCellProps) {
  const cellSize = Math.min(size * 0.9, 60); // Max size of 60px, with 90% of available space
  
  const getCellClasses = () => {
    let classes = 'relative border-2 cursor-pointer transition-all duration-200 flex items-center justify-center text-2xl rounded-lg shadow-sm';
    
    // Base styling
    if (cell.isFixed) {
      classes += ' bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-300';
    } else {
      classes += ' bg-white border-gray-300 hover:border-primary/60 hover:shadow-md';
    }
    
    // Error highlighting
    if (cell.isHighlighted) {
      classes += ' border-red-500 bg-red-50 shadow-red-200 shadow-lg';
    }
    
    // Hover effects for interactive cells
    if (!cell.isFixed) {
      classes += ' hover:bg-gradient-to-br hover:from-gray-50 hover:to-red-50/30';
    }
    
    return classes;
  };

  const renderSymbol = () => {
    const iconSize = Math.min(cellSize * 0.6, 32); // Scale with cell size, max 32px
    
    switch (cell.value) {
      case 'circle':
        return (
          <SunIcon size={iconSize} className="drop-shadow-md" />
        );
      case 'crescent':
        return (
          <MoonIcon size={iconSize} className="drop-shadow-md" />
        );
      case 'empty':
        return null;
      default:
        return null;
    }
  };

  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onRightClick) {
      onRightClick(e);
    }
  };

  return (
    <div
      className={getCellClasses()}
      style={{
        width: cellSize,
        height: cellSize,
        minWidth: cellSize,
        minHeight: cellSize
      }}
      onClick={!cell.isFixed ? onClick : undefined}
      onContextMenu={handleRightClick}
      title={cell.isFixed ? 'Fixed cell (clue)' : 'Click to cycle symbols, right-click to clear'}
    >
      {renderSymbol()}
      
      {/* Fixed cell indicator - strawberry colored */}
      {cell.isFixed && (
        <div className="absolute top-1 left-1 w-2 h-2 bg-primary rounded-full shadow-sm" />
      )}
      
      {/* Error indicator with diagonal stripes */}
      {cell.isHighlighted && (
        <div 
          className="absolute inset-0 pointer-events-none opacity-75 rounded-lg"
          style={{
            background: `repeating-linear-gradient(
              45deg,
              #ef4444 0,
              #ef4444 3px,
              transparent 3px,
              transparent 8px
            )`
          }}
        />
      )}
    </div>
  );
} 