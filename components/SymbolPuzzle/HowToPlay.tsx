import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import SunIcon from './icons/SunIcon';
import MoonIcon from './icons/MoonIcon';

export default function SymbolPuzzleHowToPlay() {
  return (
    <div className="space-y-6">
      {/* Game Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🎯 How to Play Tango Game Unlimited
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700 flex items-center gap-1 flex-wrap">
            Master LinkedIn&apos;s addictive logic puzzle with unlimited practice! Fill the entire grid with <span className="flex items-center gap-1 text-yellow-600 font-semibold"><SunIcon size={16} className="inline" /></span> and{' '}
            <span className="flex items-center gap-1 text-yellow-600 font-semibold"><MoonIcon size={16} className="inline" /></span> following the exact same Tango rules.
            Each puzzle has exactly one unique solution - pure logic, no guessing!
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded p-3">
            <p className="text-blue-800 text-sm">
              <strong>🚀 Love LinkedIn&apos;s daily Tango?</strong> This is your unlimited playground! Same brain-teasing rules, same satisfying logic - play as many as you can handle.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Basic Rules */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            📋 The Rules (Identical to LinkedIn&apos;s Tango)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
              <div className="text-blue-600 font-bold text-xl">⚖️</div>
              <div>
                <div className="font-semibold text-blue-800">Balance Rule</div>
                <div className="text-blue-700 text-sm flex items-center gap-1 flex-wrap">
                  Each row and column must contain equal numbers of <SunIcon size={14} className="inline" /> and <MoonIcon size={14} className="inline" />.
                  For a 6×6 grid, that means exactly 3 <SunIcon size={14} className="inline" /> and 3 <MoonIcon size={14} className="inline" /> per row/column.
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
              <div className="text-red-600 font-bold text-xl">🚫</div>
              <div>
                <div className="font-semibold text-red-800">Adjacent Rule</div>
                <div className="text-red-700 text-sm flex items-center gap-1 flex-wrap">
                  No more than 2 consecutive identical symbols in any row or column.
                  You cannot have 3 <SunIcon size={14} className="inline" /> or 3 <MoonIcon size={14} className="inline" /> in a row.
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
              <div className="text-lemon font-bold text-xl">🔗</div>
              <div>
                <div className="font-semibold text-yellow-800">Constraint Rules</div>
                <div className="text-yellow-700 text-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-blue-600 font-bold">=</span>
                    <span>Connected cells must contain the same symbol</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-red-600 font-bold">×</span>
                    <span>Connected cells must contain different symbols</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* How to Play */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🎮 How to Play
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</div>
              <div>
                <div className="font-semibold">Click on empty cells</div>
                <div className="text-sm text-gray-600 flex items-center gap-1 flex-wrap">
                  Click once for <SunIcon size={14} className="inline" />, click again for <MoonIcon size={14} className="inline" />, click again to clear
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</div>
              <div>
                <div className="font-semibold">Right-click to clear</div>
                <div className="text-sm text-gray-600">
                  Right-click any cell to quickly clear it to empty
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</div>
              <div>
                <div className="font-semibold">Use logical deduction</div>
                <div className="text-sm text-gray-600">
                  Start with constraints and balance requirements to deduce cell values
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">4</div>
              <div>
                <div className="font-semibold">Watch for violations</div>
                <div className="text-sm text-gray-600">
                  Cells with red borders indicate rule violations - fix these to proceed
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">5</div>
              <div>
                <div className="font-semibold">Complete the puzzle</div>
                <div className="text-sm text-gray-600">
                  Fill all cells while satisfying all rules to win!
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Visual Examples */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            👁️ Visual Examples
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div className="p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="font-semibold text-green-800 mb-2">✅ Valid Examples</div>
              <div className="text-sm text-green-700 space-y-1">
                <div className="flex items-center gap-1">• <SunIcon size={14} className="inline" /><MoonIcon size={14} className="inline" /><SunIcon size={14} className="inline" /> - Alternating pattern (valid)</div>
                <div className="flex items-center gap-1">• <SunIcon size={14} className="inline" /><SunIcon size={14} className="inline" /><MoonIcon size={14} className="inline" /> - Two consecutive symbols followed by different (valid)</div>
                <div className="flex items-center gap-1">• <SunIcon size={14} className="inline" /> = <SunIcon size={14} className="inline" /> - Equal constraint satisfied (valid)</div>
                <div className="flex items-center gap-1">• <SunIcon size={14} className="inline" /> × <MoonIcon size={14} className="inline" /> - Not-equal constraint satisfied (valid)</div>
              </div>
            </div>

            <div className="p-3 bg-red-50 rounded-lg border border-red-200">
              <div className="font-semibold text-red-800 mb-2">❌ Invalid Examples</div>
              <div className="text-sm text-red-700 space-y-1">
                <div className="flex items-center gap-1">• <SunIcon size={14} className="inline" /><SunIcon size={14} className="inline" /><SunIcon size={14} className="inline" /> - Three consecutive symbols (violates adjacent rule)</div>
                <div className="flex items-center gap-1">• <MoonIcon size={14} className="inline" /><MoonIcon size={14} className="inline" /><MoonIcon size={14} className="inline" /> - Three consecutive symbols (violates adjacent rule)</div>
                <div className="flex items-center gap-1">• <SunIcon size={14} className="inline" /> = <MoonIcon size={14} className="inline" /> - Equal constraint violated</div>
                <div className="flex items-center gap-1">• <SunIcon size={14} className="inline" /> × <SunIcon size={14} className="inline" /> - Not-equal constraint violated</div>
                <div className="flex items-center gap-1">• Row with 4 <SunIcon size={14} className="inline" /> and 2 <MoonIcon size={14} className="inline" /> (violates balance rule)</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Game Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🎛️ Game Controls
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid gap-3">
            <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
              <span className="font-medium">New Game</span>
              <span className="text-sm text-gray-600">Start a fresh puzzle</span>
            </div>
            
            <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
              <span className="font-medium">Clear Puzzle</span>
              <span className="text-sm text-gray-600">Reset all your moves to start fresh</span>
            </div>
            
            <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
              <span className="font-medium">Daily Challenge</span>
              <span className="text-sm text-gray-600">Play today&apos;s featured Tango puzzle</span>
            </div>
            
            <div className="flex justify-between items-center p-2 bg-green-50 rounded">
              <span className="font-medium">🚀 Unlimited Mode</span>
              <span className="text-sm text-green-700">Play endless Tango puzzles - no daily limits!</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 