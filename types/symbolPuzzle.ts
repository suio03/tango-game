// Symbol Puzzle Game Types

export type SymbolType = 'empty' | 'circle' | 'crescent';

export interface CellPosition {
  row: number;
  col: number;
}

export interface GameCell {
  position: CellPosition;
  value: SymbolType;
  isFixed: boolean; // Pre-filled cells that user cannot change
  isHighlighted: boolean; // For error indication
}

export type ConstraintType = 'equals' | 'not-equals';

export interface Constraint {
  id: string;
  type: ConstraintType;
  position: CellPosition; // Position where constraint indicator is displayed
  connectedCells: [CellPosition, CellPosition]; // The two cells this constraint connects
  direction: 'horizontal' | 'vertical';
  isViolated: boolean; // For error highlighting
}

export interface ValidationViolation {
  type: 'adjacent' | 'balance' | 'constraint';
  positions: CellPosition[];
  message: string;
}

export interface PuzzleGrid {
  size: number;
  cells: GameCell[][];
  constraints: Constraint[];
  violations: ValidationViolation[];
}

export interface PuzzleSolution {
  grid: GameCell[][];
  isUnique: boolean;
  solutionPath?: string; // For debugging/analytics
}

export interface Move {
  position: CellPosition;
  oldValue: SymbolType;
  newValue: SymbolType;
  timestamp: number;
}

export type GridSize = 6 | 8;

export interface GameConfig {
  gridSize: GridSize;
  preFilledCount: number; // Fixed number of cells pre-filled
  constraintDensity: number; // Constraints per 10 cells
  name: string;
  description: string;
}

export const GAME_CONFIGS: Record<GridSize, GameConfig> = {
  6: {
    gridSize: 6,
    preFilledCount: 10, // 10 out of 36 cells (~28%)
    constraintDensity: 1.2,
    name: "6×6",
    description: "Compact puzzle"
  },
  8: {
    gridSize: 8,
    preFilledCount: 15, // 15 out of 64 cells (~23%)
    constraintDensity: 1.0,
    name: "8×8", 
    description: "Challenge puzzle"
  }
};

// Legacy difficulty type for backward compatibility
export type Difficulty = 'easy' | 'hard';

export type GameMode = 'daily' | 'unlimited';

export interface SymbolPuzzleGameState {
  grid: PuzzleGrid;
  solution: PuzzleSolution;
  moveHistory: Move[];
  currentMoveIndex: number; // For undo/redo
  isGameComplete: boolean;
  gridSize: GridSize;
  gameMode: GameMode;
  isDailyCompleted: boolean;
  dailyChallengeDate: string;
  startTime: number;
  endTime?: number;
}

export interface PuzzleTemplate {
  solution: GameCell[][];
  initialState: GameCell[][];
  constraints: Constraint[];
  gridSize: GridSize;
  seed?: number; // For reproducible puzzles
  metadata: {
    generatedAt: string;
    solvabilityChecked: boolean;
    estimatedDifficulty: number; // 1-10 scale
  };
}

// User Statistics for Symbol Puzzle (separate from connect-dots)
export interface SymbolPuzzleUserStats {
  // Daily Challenge Stats
  dailyStreak: number;
  bestStreak: number;
  dailyGamesPlayed: number;
  dailyGamesWon: number;
  lastDailyCompletion: string;
  
  // Unlimited Mode Stats by Difficulty
  easyGamesPlayed: number;
  easyGamesWon: number;
  hardGamesPlayed: number;
  hardGamesWon: number;
  
  // Performance Metrics
  totalTimePlayed: number; // milliseconds
  averageCompletionTime: number; // milliseconds
  bestCompletionTime: number; // milliseconds
  totalMoves: number;
  averageMovesPerGame: number;
  
  // Daily Challenge History
  completedDates: string[];
  
  // Preferences
  preferredDifficulty: Difficulty;
  firstPlayDate: string;
  
  // Achievement tracking
  fastestSolves: Record<Difficulty, number>; // Best times per difficulty
}

export interface SymbolPuzzleGamePerformance {
  duration: number;
  moves: number;
  difficulty: Difficulty;
  gameMode: GameMode;
  completed: boolean;
  date: string;
}

export interface SymbolPuzzleStatsUpdate {
  gamePerformance: SymbolPuzzleGamePerformance;
  isNewDailyCompletion?: boolean;
}

// Default stats for new players
export const DEFAULT_SYMBOL_PUZZLE_STATS: SymbolPuzzleUserStats = {
  dailyStreak: 0,
  bestStreak: 0,
  dailyGamesPlayed: 0,
  dailyGamesWon: 0,
  lastDailyCompletion: '',
  
  easyGamesPlayed: 0,
  easyGamesWon: 0,
  hardGamesPlayed: 0,
  hardGamesWon: 0,
  
  totalTimePlayed: 0,
  averageCompletionTime: 0,
  bestCompletionTime: 0,
  totalMoves: 0,
  averageMovesPerGame: 0,
  
  completedDates: [],
  
  preferredDifficulty: 'easy',
  firstPlayDate: new Date().toISOString(),
  
  fastestSolves: {
    easy: 0,
    hard: 0
  }
};

// Validation result types
export interface ValidationResult {
  isValid: boolean;
  violations: ValidationViolation[];
  isComplete: boolean;
}

// Hint system types
 