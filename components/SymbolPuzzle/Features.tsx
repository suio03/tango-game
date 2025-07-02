import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export default function SymbolPuzzleFeatures() {
  return (
    <div className="space-y-6">
      {/* Main Features */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            ⭐ Key Features
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
              <div className="text-blue-600 text-2xl">🧩</div>
              <div>
                <div className="font-semibold text-blue-800">Unique Puzzles</div>
                <div className="text-blue-700 text-sm">
                  Every puzzle has exactly one solution, ensuring a fair and logical solving experience.
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg">
              <div className="text-lemon text-2xl">📅</div>
              <div>
                <div className="font-semibold text-yellow-800">Daily Challenges</div>
                <div className="text-yellow-700 text-sm">
                  Fresh puzzles every day with difficulty progression and streak tracking.
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
              <div className="text-green-600 text-2xl">🎯</div>
              <div>
                <div className="font-semibold text-green-800">Multiple Difficulties</div>
                <div className="text-green-700 text-sm">
                  Easy (4×4), Medium (6×6), and Hard (8×8) grids with varying complexity.
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg">
              <div className="text-yellow-600 text-2xl">💡</div>
              <div>
                <div className="font-semibold text-yellow-800">Smart Hints</div>
                <div className="text-yellow-700 text-sm">
                  Get targeted hints that guide you toward logical deductions without spoiling the fun.
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-red-50 to-red-100 rounded-lg">
              <div className="text-red-600 text-2xl">🔄</div>
              <div>
                <div className="font-semibold text-red-800">Undo/Redo</div>
                <div className="text-red-700 text-sm">
                  Freely experiment with different approaches using unlimited undo and redo.
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg">
              <div className="text-indigo-600 text-2xl">📊</div>
              <div>
                <div className="font-semibold text-indigo-800">Progress Tracking</div>
                <div className="text-indigo-700 text-sm">
                  Monitor your solving times, success rates, and improvement over time.
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Game Modes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🎮 Game Modes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-blue-50 to-red-50 rounded-lg border border-blue-200">
              <div className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center font-bold">📅</div>
              <div className="flex-1">
                <div className="font-semibold text-gray-800 mb-1">Daily Challenge</div>
                <div className="text-gray-600 text-sm mb-2">
                  One special puzzle each day, shared by all players worldwide. Build your streak!
                </div>
                <div className="flex gap-2 text-xs">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">🏆 Streak Tracking</span>
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded">🌍 Global Challenge</span>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-green-50 to-yellow-50 rounded-lg border border-green-200">
              <div className="bg-green-100 text-green-800 rounded-full w-8 h-8 flex items-center justify-center font-bold">∞</div>
              <div className="flex-1">
                <div className="font-semibold text-gray-800 mb-1">Unlimited Play</div>
                <div className="text-gray-600 text-sm mb-2">
                  Generate endless puzzles at your preferred difficulty level. Perfect for practice!
                </div>
                <div className="flex gap-2 text-xs">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded">🎲 Random Generation</span>
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded">📈 Skill Building</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Difficulty Levels */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            📊 Difficulty Levels
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-3">
                <div className="text-green-600 text-xl">🟢</div>
                <div>
                  <div className="font-semibold text-green-800">Easy</div>
                  <div className="text-green-700 text-sm">4×4 grid • 3 hints • Perfect for beginners</div>
                </div>
              </div>
              <div className="text-green-600 text-sm">~5-10 min</div>
            </div>

            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-center gap-3">
                <div className="text-yellow-600 text-xl">🟡</div>
                <div>
                  <div className="font-semibold text-yellow-800">Medium</div>
                  <div className="text-yellow-700 text-sm">6×6 grid • 2 hints • Balanced challenge</div>
                </div>
              </div>
              <div className="text-yellow-600 text-sm">~10-20 min</div>
            </div>

            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
              <div className="flex items-center gap-3">
                <div className="text-red-600 text-xl">🔴</div>
                <div>
                  <div className="font-semibold text-red-800">Hard</div>
                  <div className="text-red-700 text-sm">8×8 grid • 1 hint • Expert level</div>
                </div>
              </div>
              <div className="text-red-600 text-sm">~20-45 min</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Technical Features */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            ⚡ Technical Features
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="text-gray-600 text-lg">⚡</div>
              <div className="text-sm">
                <div className="font-medium">Real-time Validation</div>
                <div className="text-gray-600">Instant feedback on rule violations</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="text-gray-600 text-lg">🎨</div>
              <div className="text-sm">
                <div className="font-medium">Visual Feedback</div>
                <div className="text-gray-600">Clear error highlighting and animations</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="text-gray-600 text-lg">💾</div>
              <div className="text-sm">
                <div className="font-medium">Auto-Save</div>
                <div className="text-gray-600">Never lose your progress</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="text-gray-600 text-lg">🌐</div>
              <div className="text-sm">
                <div className="font-medium">Offline Play</div>
                <div className="text-gray-600">Play anywhere, anytime</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="text-gray-600 text-lg">📱</div>
              <div className="text-sm">
                <div className="font-medium">Mobile Friendly</div>
                <div className="text-gray-600">Optimized for touch devices</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="text-gray-600 text-lg">🎯</div>
              <div className="text-sm">
                <div className="font-medium">Accessibility</div>
                <div className="text-gray-600">Keyboard navigation support</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 