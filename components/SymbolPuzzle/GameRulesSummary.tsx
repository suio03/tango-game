import React from 'react';
import SunIcon from './icons/SunIcon';
import MoonIcon from './icons/MoonIcon';

export default function GameRulesSummary() {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6 mt-6">
      <div className="mb-3">
        <h2 className="text-lg font-semibold text-gray-800">Tango Game Rules:</h2>
        <p className="text-xs text-gray-600 mt-1">Identical rules to LinkedIn&apos;s daily Tango puzzle - master them here with unlimited practice!</p>
      </div>
      
      <div className="space-y-3 text-sm text-gray-700">
        <div className="flex items-start gap-2">
          <span className="text-gray-600">•</span>
          <span className="flex items-center gap-1 flex-wrap">Fill the grid so that each cell contains either a <SunIcon size={16} className="inline" /> or a <MoonIcon size={16} className="inline" />.</span>
        </div>
        
        <div className="flex items-start gap-2">
          <span className="text-gray-600">•</span>
          <span className="flex items-center gap-1 flex-wrap">No more than 2 <SunIcon size={16} className="inline" /> or <MoonIcon size={16} className="inline" /> may be next to each other, either vertically or horizontally.</span>
        </div>
        
        <div className="flex items-start gap-2">
          <span className="text-gray-600">•</span>
          <div>
            <div className="mb-1 flex items-center gap-2">
              <span className="flex items-center gap-1"><SunIcon size={16} className="inline" /><SunIcon size={16} className="inline" /></span>
              <span className="text-green-600 text-lg">✓</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1"><SunIcon size={16} className="inline" /><SunIcon size={16} className="inline" /><SunIcon size={16} className="inline" /></span>
              <span className="text-red-600 text-lg">✗</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-start gap-2">
          <span className="text-gray-600">•</span>
          <span className="flex items-center gap-1 flex-wrap">Each row (and column) must contain the same number of <SunIcon size={16} className="inline" /> and <MoonIcon size={16} className="inline" />.</span>
        </div>
        
        <div className="flex items-start gap-2">
          <span className="text-gray-600">•</span>
          <span>Cells separated by an <strong>=</strong> sign must be of the same type.</span>
        </div>
        
        <div className="flex items-start gap-2">
          <span className="text-gray-600">•</span>
          <span>Cells separated by a <strong>×</strong> sign must be of the opposite type.</span>
        </div>
        
        <div className="flex items-start gap-2">
          <span className="text-gray-600">•</span>
          <span>Each Tango puzzle has one right answer and can be solved via deduction (you should never have to make a guess).</span>
        </div>
      </div>
    </div>
  );
}