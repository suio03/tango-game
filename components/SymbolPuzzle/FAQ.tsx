import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';

export default function SymbolPuzzleFAQ() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Frequently Asked Questions</h2>
        <p className="text-gray-600">Everything you need to know about Symbol Puzzle</p>
      </div>

      <Accordion type="single" collapsible className="w-full space-y-2">
        <AccordionItem value="rules-basic" className="border border-gray-200 rounded-lg">
          <AccordionTrigger className="px-4 py-3 hover:bg-gray-50">
            <span className="text-left font-medium">🎯 What are the basic rules?</span>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="space-y-3 text-sm text-gray-700">
              <p>Symbol Puzzle has three main rules:</p>
              <ul className="space-y-2 pl-4">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <span><strong>Balance:</strong> Each row and column must have equal numbers of circles (🟡) and crescents (🌙)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <span><strong>Adjacent:</strong> No more than 2 consecutive identical symbols in any direction</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <span><strong>Constraints:</strong> Cells connected by = must be the same, cells connected by × must be different</span>
                </li>
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="how-to-play" className="border border-gray-200 rounded-lg">
          <AccordionTrigger className="px-4 py-3 hover:bg-gray-50">
            <span className="text-left font-medium">🎮 How do I interact with the game?</span>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="space-y-3 text-sm text-gray-700">
              <p>Playing is simple:</p>
              <ul className="space-y-2 pl-4">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <span><strong>Left click:</strong> Cycle through empty → circle → crescent → empty</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <span><strong>Right click:</strong> Directly clear a cell to empty</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <span><strong>Keyboard:</strong> Use arrow keys to navigate, Space to place symbols</span>
                </li>
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="grid-sizes" className="border border-gray-200 rounded-lg">
          <AccordionTrigger className="px-4 py-3 hover:bg-gray-50">
            <span className="text-left font-medium">📏 What are the different grid sizes?</span>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="space-y-3 text-sm text-gray-700">
              <div className="grid gap-3">
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="font-semibold text-blue-800">🟦 6×6 Grid</div>
                  <div className="text-blue-700">Compact puzzle • 10 starting clues • 3 hints • ~5-10 minutes</div>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="font-semibold text-purple-800">🟪 8×8 Grid</div>
                  <div className="text-purple-700">Challenge puzzle • 15 starting clues • 2 hints • ~15-25 minutes</div>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="daily-challenge" className="border border-gray-200 rounded-lg">
          <AccordionTrigger className="px-4 py-3 hover:bg-gray-50">
            <span className="text-left font-medium">📅 How do daily challenges work?</span>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="space-y-3 text-sm text-gray-700">
              <p>Daily challenges are special puzzles that:</p>
              <ul className="space-y-2 pl-4">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <span>Reset every day at midnight UTC</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <span>Are the same for all players worldwide</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <span>Track your solving streaks</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <span>Follow a difficulty progression throughout the week</span>
                </li>
              </ul>
              <p className="text-gray-600 italic">Miss a day? Your streak resets, but you can always start again!</p>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="hints" className="border border-gray-200 rounded-lg">
          <AccordionTrigger className="px-4 py-3 hover:bg-gray-50">
            <span className="text-left font-medium">💡 How do hints work?</span>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="space-y-3 text-sm text-gray-700">
              <p>The hint system provides intelligent assistance:</p>
              <ul className="space-y-2 pl-4">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <span><strong>Strategic hints:</strong> Points to cells where logical deduction is possible</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <span><strong>Limited uses:</strong> 6×6 (3), 8×8 (2) hints per puzzle</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <span><strong>Non-spoiling:</strong> Shows what to consider, not the exact answer</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <span><strong>Learning tool:</strong> Helps you understand solving techniques</span>
                </li>
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="validation" className="border border-gray-200 rounded-lg">
          <AccordionTrigger className="px-4 py-3 hover:bg-gray-50">
            <span className="text-left font-medium">⚠️ What do the red borders mean?</span>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="space-y-3 text-sm text-gray-700">
              <p>Red borders indicate rule violations:</p>
              <ul className="space-y-2 pl-4">
                <li className="flex items-start gap-2">
                  <span className="text-red-600">•</span>
                  <span><strong>Adjacent violations:</strong> Three or more consecutive identical symbols</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600">•</span>
                  <span><strong>Balance violations:</strong> Too many of one symbol in a row/column</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600">•</span>
                  <span><strong>Constraint violations:</strong> = cells with different symbols, × cells with same symbols</span>
                </li>
              </ul>
              <p className="text-gray-600 italic">Fix violations to complete the puzzle successfully!</p>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="unique-solution" className="border border-gray-200 rounded-lg">
          <AccordionTrigger className="px-4 py-3 hover:bg-gray-50">
            <span className="text-left font-medium">🧩 Are puzzles guaranteed to have unique solutions?</span>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="space-y-3 text-sm text-gray-700">
              <p>Yes! Every puzzle is carefully generated to ensure:</p>
              <ul className="space-y-2 pl-4">
                <li className="flex items-start gap-2">
                  <span className="text-green-600">•</span>
                  <span><strong>Exactly one solution:</strong> No ambiguity or multiple valid completions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">•</span>
                  <span><strong>Logical solvability:</strong> Can be completed using deduction alone</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">•</span>
                  <span><strong>No guessing required:</strong> Every step can be logically determined</span>
                </li>
              </ul>
              <p className="text-gray-600 italic">If you are stuck, there is always a logical next move to find!</p>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="stats" className="border border-gray-200 rounded-lg">
          <AccordionTrigger className="px-4 py-3 hover:bg-gray-50">
            <span className="text-left font-medium">📊 What statistics are tracked?</span>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="space-y-3 text-sm text-gray-700">
              <p>We track comprehensive statistics:</p>
              <div className="grid gap-3 md:grid-cols-2">
                <div>
                  <div className="font-semibold text-blue-800 mb-2">📅 Daily Challenges</div>
                  <ul className="space-y-1 text-xs">
                    <li>• Current streak</li>
                    <li>• Longest streak</li>
                    <li>• Total completed</li>
                    <li>• Average completion time</li>
                  </ul>
                </div>
                <div>
                  <div className="font-semibold text-green-800 mb-2">🎮 Unlimited Play</div>
                  <ul className="space-y-1 text-xs">
                    <li>• Puzzles completed by difficulty</li>
                    <li>• Success rate</li>
                    <li>• Best times</li>
                    <li>• Hints used</li>
                  </ul>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="keyboard" className="border border-gray-200 rounded-lg">
          <AccordionTrigger className="px-4 py-3 hover:bg-gray-50">
            <span className="text-left font-medium">⌨️ Can I play with just the keyboard?</span>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="space-y-3 text-sm text-gray-700">
              <p>Yes! Full keyboard navigation is supported:</p>
              <ul className="space-y-2 pl-4">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <span><strong>Arrow keys:</strong> Navigate between cells</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <span><strong>Space/Enter:</strong> Cycle through symbol values</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <span><strong>Delete/Backspace:</strong> Clear current cell</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <span><strong>Tab:</strong> Access game controls</span>
                </li>
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="mobile" className="border border-gray-200 rounded-lg">
          <AccordionTrigger className="px-4 py-3 hover:bg-gray-50">
            <span className="text-left font-medium">📱 Is the game mobile-friendly?</span>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="space-y-3 text-sm text-gray-700">
              <p>Absolutely! The game is optimized for mobile devices:</p>
              <ul className="space-y-2 pl-4">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <span><strong>Touch-friendly:</strong> Large tap targets and intuitive gestures</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <span><strong>Responsive design:</strong> Adapts to all screen sizes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <span><strong>Offline capable:</strong> Play even without internet connection</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <span><strong>Auto-save:</strong> Progress is preserved when switching apps</span>
                </li>
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="stuck" className="border border-gray-200 rounded-lg">
          <AccordionTrigger className="px-4 py-3 hover:bg-gray-50">
            <span className="text-left font-medium">🤔 What should I do if I am stuck?</span>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="space-y-3 text-sm text-gray-700">
              <p>Try these strategies when you are stuck:</p>
              <ol className="space-y-2 pl-4 list-decimal">
                <li><strong>Use a hint:</strong> If available, hints point you toward logical next moves</li>
                <li><strong>Check constraints:</strong> Look for = and × symbols you might have missed</li>
                <li><strong>Count symbols:</strong> Verify row/column balance requirements</li>
                <li><strong>Look for patterns:</strong> Find cells where one choice violates rules</li>
                <li><strong>Take a break:</strong> Sometimes stepping away helps you see new patterns</li>
                <li><strong>Use undo/redo:</strong> Experiment with different approaches</li>
              </ol>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
} 