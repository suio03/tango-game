import { useState, useCallback, useRef } from 'react';
import {
  SymbolPuzzleGameState,
  SymbolType,
  CellPosition,
  GridSize,
  GameMode,
  Move
} from '../types/symbolPuzzle';
import { generatePuzzle, createPuzzleGrid } from '../lib/symbolPuzzle/generator';
import { validatePuzzleGrid, updateGridViolations } from '../lib/symbolPuzzle/validation';
import {
  getSymbolPuzzleTodaysSeed,
  isSymbolPuzzleDailyCompletedToday,
  markSymbolPuzzleDailyCompleted,
  updateSymbolPuzzleUserStats
} from '../lib/symbolPuzzle/userStats';

export function useSymbolPuzzleGameState(
  initialGridSize: GridSize = 6,
  initialGameMode: GameMode = 'unlimited'
) {
  const startTimeRef = useRef<number>(Date.now());
  
  const [gameState, setGameState] = useState<SymbolPuzzleGameState>(() => {
    const isDailyMode = initialGameMode === 'daily';
    const seed = isDailyMode ? getSymbolPuzzleTodaysSeed() : undefined;
    const template = generatePuzzle(initialGridSize, seed);
    const grid = createPuzzleGrid(template);
    
    // Check if daily challenge is already completed
    const isDailyCompleted = isDailyCompletedToday();
    
    return {
      grid: updateGridViolations(grid),
      solution: {
        grid: template.solution,
        isUnique: true
      },
      moveHistory: [],
      currentMoveIndex: -1,
      isGameComplete: false, // Only mark complete when puzzle is actually solved
      gridSize: initialGridSize,
      gameMode: initialGameMode,
      isDailyCompleted,
      dailyChallengeDate: getTodaysDateString(),
      startTime: startTimeRef.current
    };
  });

  // Helper function to get current date string
  function getTodaysDateString(): string {
    const now = new Date();
    const utc = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
    return utc.toISOString().split('T')[0];
  }



  // Helper function to check if daily challenge is completed today
  function isDailyCompletedToday(): boolean {
    return isSymbolPuzzleDailyCompletedToday();
  }

  // Reset game with new grid size/mode
  const resetGame = useCallback((
    gridSize: GridSize = gameState.gridSize,
    gameMode: GameMode = gameState.gameMode
  ) => {
    const isDailyMode = gameMode === 'daily';
    const seed = isDailyMode ? getSymbolPuzzleTodaysSeed() : undefined;
    const template = generatePuzzle(gridSize, seed);
    const grid = createPuzzleGrid(template);
    
    startTimeRef.current = Date.now();
    
    setGameState({
      grid: updateGridViolations(grid),
      solution: {
        grid: template.solution,
        isUnique: true
      },
      moveHistory: [],
      currentMoveIndex: -1,
      isGameComplete: false, // Only mark complete when puzzle is actually solved
      gridSize,
      gameMode,
      isDailyCompleted: isDailyCompletedToday(),
      dailyChallengeDate: getTodaysDateString(),
      startTime: startTimeRef.current
    });
  }, [gameState.gridSize, gameState.gameMode]);

  // Make a move (place or clear a symbol)
  const makeMove = useCallback((position: CellPosition, value: SymbolType) => {
    setGameState(prev => {
      const cell = prev.grid.cells[position.row][position.col];
      
      // Can't modify fixed cells
      if (cell.isFixed) {
        return prev;
      }
      
      // Don't make move if value is the same
      if (cell.value === value) {
        return prev;
      }
      
      // Create the move
      const move: Move = {
        position,
        oldValue: cell.value,
        newValue: value,
        timestamp: Date.now()
      };
      
      // Update grid
      const newGrid = {
        ...prev.grid,
        cells: prev.grid.cells.map(row =>
          row.map(cell => ({ ...cell }))
        )
      };
      
      newGrid.cells[position.row][position.col].value = value;
      

      
      // Update violations
      const updatedGrid = updateGridViolations(newGrid);
      
      // Check if game is complete
      const validation = validatePuzzleGrid(updatedGrid);
      const isComplete = validation.isComplete && validation.isValid;
      
      // Create new move history (remove any moves after current index)
      const newMoveHistory = prev.moveHistory.slice(0, prev.currentMoveIndex + 1);
      newMoveHistory.push(move);
      
      const newState = {
        ...prev,
        grid: updatedGrid,
        moveHistory: newMoveHistory,
        currentMoveIndex: newMoveHistory.length - 1,
        isGameComplete: isComplete
      };
      
      // Handle game completion
      if (isComplete && !prev.isGameComplete) {
        const duration = Date.now() - prev.startTime;
        const isNewDailyCompletion = prev.gameMode === 'daily' && !prev.isDailyCompleted;
        
        // Update user stats
        updateSymbolPuzzleUserStats({
          gamePerformance: {
            duration,
            moves: newMoveHistory.length,
            difficulty: 'easy', // Use easy as default for stats compatibility
            gameMode: prev.gameMode,
            completed: true,
            date: new Date().toISOString()
          },
          isNewDailyCompletion
        });
        
        // Mark daily as completed if needed
        if (isNewDailyCompletion) {
          markSymbolPuzzleDailyCompleted();
          newState.isDailyCompleted = true;
          newState.endTime = Date.now();
        }
      }
      
      return newState;
    });
  }, []);

  // Undo last move
  const undoMove = useCallback(() => {
    setGameState(prev => {
      if (prev.currentMoveIndex < 0) {
        return prev; // Nothing to undo
      }
      
      const currentMove = prev.moveHistory[prev.currentMoveIndex];
      
      // Revert the move
      const newGrid = {
        ...prev.grid,
        cells: prev.grid.cells.map(row =>
          row.map(cell => ({ ...cell }))
        )
      };
      
      newGrid.cells[currentMove.position.row][currentMove.position.col].value = currentMove.oldValue;
      
      return {
        ...prev,
        grid: updateGridViolations(newGrid),
        currentMoveIndex: prev.currentMoveIndex - 1,
        isGameComplete: false
      };
    });
  }, []);

  // Redo move
  const redoMove = useCallback(() => {
    setGameState(prev => {
      if (prev.currentMoveIndex >= prev.moveHistory.length - 1) {
        return prev; // Nothing to redo
      }
      
      const nextMove = prev.moveHistory[prev.currentMoveIndex + 1];
      
      // Apply the move
      const newGrid = {
        ...prev.grid,
        cells: prev.grid.cells.map(row =>
          row.map(cell => ({ ...cell }))
        )
      };
      
      newGrid.cells[nextMove.position.row][nextMove.position.col].value = nextMove.newValue;
      
      // Check completion
      const updatedGrid = updateGridViolations(newGrid);
      const validation = validatePuzzleGrid(updatedGrid);
      const isComplete = validation.isComplete && validation.isValid;
      
      return {
        ...prev,
        grid: updatedGrid,
        currentMoveIndex: prev.currentMoveIndex + 1,
        isGameComplete: isComplete
      };
    });
  }, []);



  // Switch game mode
  const switchGameMode = useCallback((newGameMode: GameMode) => {
    resetGame(gameState.gridSize, newGameMode);
  }, [resetGame, gameState.gridSize]);

  // Check if can undo/redo
  const canUndo = gameState.currentMoveIndex >= 0;
  const canRedo = gameState.currentMoveIndex < gameState.moveHistory.length - 1;

  return {
    gameState,
    resetGame,
    makeMove,
    undoMove,
    redoMove,
    canUndo,
    canRedo,
    switchGameMode
  };
} 