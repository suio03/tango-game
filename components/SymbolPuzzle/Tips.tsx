import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export default function SymbolPuzzleTips() {
  return (
    <div className="space-y-6">
      {/* Beginner Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🌟 Beginner Tips
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="bg-green-100 text-green-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</div>
              <div>
                <div className="font-semibold text-green-800 mb-1">Start with Constraints</div>
                <div className="text-green-700 text-sm">
                  Begin by looking at <span className="font-medium">= (equals)</span> and <span className="font-medium">× (not equals)</span> constraints. 
                  These give you the strongest clues about what symbols must go where.
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</div>
              <div>
                <div className="font-semibold text-blue-800 mb-1">Look for "Forced" Moves</div>
                <div className="text-blue-700 text-sm">
                  If a row/column already has its maximum of one symbol type (e.g., 3 circles in a 6×6 grid), 
                  the remaining cells must be the other symbol.
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
              <div className="bg-purple-100 text-purple-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">3</div>
              <div>
                <div className="font-semibold text-purple-800 mb-1">Avoid Three in a Row</div>
                <div className="text-purple-700 text-sm">
                  If you have two identical symbols adjacent, the next cell in that line cannot be the same symbol. 
                  Use this to deduce what it must be.
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="bg-yellow-100 text-yellow-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">4</div>
              <div>
                <div className="font-semibold text-yellow-800 mb-1">Count as You Go</div>
                <div className="text-yellow-700 text-sm">
                  Keep track of how many circles and crescents you've placed in each row and column. 
                  Remember: each must have equal amounts!
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Advanced Strategies */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🧠 Advanced Strategies
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-200">
              <div className="font-semibold text-indigo-800 mb-2">🔗 Chain Constraints</div>
              <div className="text-indigo-700 text-sm mb-2">
                Look for chains of connected constraints. If A = B and B × C, then A × C as well.
              </div>
              <div className="text-xs text-indigo-600 bg-indigo-100 p-2 rounded">
                Example: If cell (1,1) = cell (1,2) and cell (1,2) × cell (2,2), then cell (1,1) × cell (2,2)
              </div>
            </div>

            <div className="p-4 bg-gradient-to-r from-pink-50 to-red-50 rounded-lg border border-pink-200">
              <div className="font-semibold text-pink-800 mb-2">🎯 Process of Elimination</div>
              <div className="text-pink-700 text-sm mb-2">
                Sometimes you can't determine what a cell IS, but you can figure out what it ISN'T. 
                Use this to narrow down possibilities.
              </div>
              <div className="text-xs text-pink-600 bg-pink-100 p-2 rounded">
                Example: If placing a circle would violate the balance rule, it must be a crescent.
              </div>
            </div>

            <div className="p-4 bg-gradient-to-r from-green-50 to-teal-50 rounded-lg border border-green-200">
              <div className="font-semibold text-green-800 mb-2">⚖️ Balance Deduction</div>
              <div className="text-green-700 text-sm mb-2">
                In advanced puzzles, use the balance rule creatively. If a row needs 2 more circles 
                and has 3 empty cells, one must be a crescent.
              </div>
              <div className="text-xs text-green-600 bg-green-100 p-2 rounded">
                Example: Row with 2 circles, 1 crescent, 3 empty → needs 1 circle, 2 crescents
              </div>
            </div>

            <div className="p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg border border-orange-200">
              <div className="font-semibold text-orange-800 mb-2">🔄 Pattern Recognition</div>
              <div className="text-orange-700 text-sm mb-2">
                Look for partial patterns that can only be completed in one way while satisfying all rules.
              </div>
              <div className="text-xs text-orange-600 bg-orange-100 p-2 rounded">
                Example: 🟡🟡_🌙 can only be completed as 🟡🟡🌙🌙 to avoid three in a row
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Common Mistakes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            ⚠️ Common Mistakes to Avoid
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
              <div className="text-red-600 text-xl">❌</div>
              <div>
                <div className="font-semibold text-red-800">Ignoring Constraints</div>
                <div className="text-red-700 text-sm">
                  Don't fill cells randomly. Always check nearby constraints first.
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
              <div className="text-red-600 text-xl">❌</div>
              <div>
                <div className="font-semibold text-red-800">Forgetting Balance</div>
                <div className="text-red-700 text-sm">
                  Remember each row and column needs equal circles and crescents - not just "some of each."
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
              <div className="text-red-600 text-xl">❌</div>
              <div>
                <div className="font-semibold text-red-800">Guessing Too Early</div>
                <div className="text-red-700 text-sm">
                  Try logical deduction first. Guessing can lead you down wrong paths and waste time.
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
              <div className="text-red-600 text-xl">❌</div>
              <div>
                <div className="font-semibold text-red-800">Not Using Undo</div>
                <div className="text-red-700 text-sm">
                  Don't be afraid to undo moves and try different approaches. Experimentation is key!
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Solving Techniques */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🛠️ Step-by-Step Solving Approach
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex gap-3 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
              <div className="text-blue-600 font-bold">Step 1:</div>
              <div className="text-blue-800 text-sm">
                <div className="font-medium">Scan for obvious constraints</div>
                <div>Look for = and × symbols that can be immediately resolved</div>
              </div>
            </div>

            <div className="flex gap-3 p-3 bg-purple-50 rounded-lg border-l-4 border-purple-400">
              <div className="text-purple-600 font-bold">Step 2:</div>
              <div className="text-purple-800 text-sm">
                <div className="font-medium">Check for balance limits</div>
                <div>Find rows/columns that are close to their symbol limits</div>
              </div>
            </div>

            <div className="flex gap-3 p-3 bg-green-50 rounded-lg border-l-4 border-green-400">
              <div className="text-green-600 font-bold">Step 3:</div>
              <div className="text-green-800 text-sm">
                <div className="font-medium">Look for adjacent patterns</div>
                <div>Identify where the "no three in a row" rule applies</div>
              </div>
            </div>

            <div className="flex gap-3 p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
              <div className="text-yellow-600 font-bold">Step 4:</div>
              <div className="text-yellow-800 text-sm">
                <div className="font-medium">Use process of elimination</div>
                <div>For cells where one option violates rules, choose the other</div>
              </div>
            </div>

            <div className="flex gap-3 p-3 bg-orange-50 rounded-lg border-l-4 border-orange-400">
              <div className="text-orange-600 font-bold">Step 5:</div>
              <div className="text-orange-800 text-sm">
                <div className="font-medium">Repeat and validate</div>
                <div>Go back to step 1 with new information, check for errors</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pro Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            💎 Pro Tips
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid gap-3 md:grid-cols-2">
            <div className="p-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
              <div className="font-semibold text-blue-800 mb-1">🎯 Focus on Corners</div>
              <div className="text-blue-700 text-xs">
                Corner cells have fewer neighbors, making constraints easier to resolve
              </div>
            </div>

            <div className="p-3 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-200">
              <div className="font-semibold text-purple-800 mb-1">⏰ Take Breaks</div>
              <div className="text-purple-700 text-xs">
                Sometimes stepping away helps you see patterns you missed
              </div>
            </div>

            <div className="p-3 bg-gradient-to-br from-green-50 to-teal-50 rounded-lg border border-green-200">
              <div className="font-semibold text-green-800 mb-1">📝 Mental Notes</div>
              <div className="text-green-700 text-xs">
                Keep track of "if-then" relationships in your head or on paper
              </div>
            </div>

            <div className="p-3 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-lg border border-orange-200">
              <div className="font-semibold text-orange-800 mb-1">🔄 Practice Daily</div>
              <div className="text-orange-700 text-xs">
                Daily challenges help build pattern recognition skills
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 