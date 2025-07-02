import {
  SymbolType,
  PuzzleGrid,
  CellPosition
} from '../../types/symbolPuzzle';
import { validatePuzzleGrid, getPossibleValues, isGridComplete } from './validation';

/**
 * Solve a symbol puzzle using constraint satisfaction
 */
export function solvePuzzle(grid: PuzzleGrid, maxSolutions: number = 1): PuzzleGrid[] {
  const solutions: PuzzleGrid[] = [];
  const workingGrid = deepCopyGrid(grid);
  
  // Try to solve using logical deduction first
  if (solveWithLogic(workingGrid)) {
    solutions.push(deepCopyGrid(workingGrid));
    if (solutions.length >= maxSolutions) {
      return solutions;
    }
  }
  
  // If logical deduction isn't enough, use backtracking
  solveWithBacktracking(workingGrid, solutions, maxSolutions);
  
  return solutions;
}

/**
 * Attempt to solve using logical deduction only
 */
function solveWithLogic(grid: PuzzleGrid): boolean {
  let madeProgress = true;
  
  while (madeProgress) {
    madeProgress = false;
    
    // Try to fill cells with only one possible value
    for (let row = 0; row < grid.size; row++) {
      for (let col = 0; col < grid.size; col++) {
        const cell = grid.cells[row][col];
        
        if (cell.value === 'empty' && !cell.isFixed) {
          const possibleValues = getPossibleValues(grid, { row, col });
          
          if (possibleValues.length === 1) {
            cell.value = possibleValues[0];
            madeProgress = true;
          } else if (possibleValues.length === 0) {
            // No valid values - puzzle is unsolvable
            return false;
          }
        }
      }
    }
    
    // Apply constraint-based deductions
    madeProgress = madeProgress || applyConstraintDeductions(grid);
    
    // Apply balance-based deductions
    madeProgress = madeProgress || applyBalanceDeductions(grid);
  }
  
  return isGridComplete(grid);
}

/**
 * Apply logical deductions based on constraints
 */
function applyConstraintDeductions(grid: PuzzleGrid): boolean {
  let madeProgress = false;
  
  for (const constraint of grid.constraints) {
    const [pos1, pos2] = constraint.connectedCells;
    const cell1 = grid.cells[pos1.row][pos1.col];
    const cell2 = grid.cells[pos2.row][pos2.col];
    
    // If one cell is filled, we can deduce the other based on constraint
    if (cell1.value !== 'empty' && cell2.value === 'empty' && !cell2.isFixed) {
      let requiredValue: SymbolType;
      
      if (constraint.type === 'equals') {
        requiredValue = cell1.value;
      } else {
        // not-equals constraint
        requiredValue = cell1.value === 'circle' ? 'crescent' : 'circle';
      }
      
      // Check if this value is valid for cell2
      const possibleValues = getPossibleValues(grid, pos2);
      if (possibleValues.includes(requiredValue)) {
        cell2.value = requiredValue;
        madeProgress = true;
      }
    } else if (cell2.value !== 'empty' && cell1.value === 'empty' && !cell1.isFixed) {
      let requiredValue: SymbolType;
      
      if (constraint.type === 'equals') {
        requiredValue = cell2.value;
      } else {
        // not-equals constraint
        requiredValue = cell2.value === 'circle' ? 'crescent' : 'circle';
      }
      
      // Check if this value is valid for cell1
      const possibleValues = getPossibleValues(grid, pos1);
      if (possibleValues.includes(requiredValue)) {
        cell1.value = requiredValue;
        madeProgress = true;
      }
    }
  }
  
  return madeProgress;
}

/**
 * Apply logical deductions based on balance rules
 */
function applyBalanceDeductions(grid: PuzzleGrid): boolean {
  let madeProgress = false;
  const expectedCount = Math.floor(grid.size / 2);
  
  // Check rows for balance deductions
  for (let row = 0; row < grid.size; row++) {
    const rowCells = grid.cells[row];
    const circles = rowCells.filter(cell => cell.value === 'circle').length;
    const crescents = rowCells.filter(cell => cell.value === 'crescent').length;
    const empty = rowCells.filter(cell => cell.value === 'empty').length;
    
    // If we have enough circles, fill remaining empty cells with crescents
    if (circles === expectedCount && empty > 0) {
      for (let col = 0; col < grid.size; col++) {
        const cell = grid.cells[row][col];
        if (cell.value === 'empty' && !cell.isFixed) {
          const possibleValues = getPossibleValues(grid, { row, col });
          if (possibleValues.includes('crescent')) {
            cell.value = 'crescent';
            madeProgress = true;
          }
        }
      }
    }
    
    // If we have enough crescents, fill remaining empty cells with circles
    if (crescents === expectedCount && empty > 0) {
      for (let col = 0; col < grid.size; col++) {
        const cell = grid.cells[row][col];
        if (cell.value === 'empty' && !cell.isFixed) {
          const possibleValues = getPossibleValues(grid, { row, col });
          if (possibleValues.includes('circle')) {
            cell.value = 'circle';
            madeProgress = true;
          }
        }
      }
    }
  }
  
  // Check columns for balance deductions
  for (let col = 0; col < grid.size; col++) {
    const colCells = grid.cells.map(row => row[col]);
    const circles = colCells.filter(cell => cell.value === 'circle').length;
    const crescents = colCells.filter(cell => cell.value === 'crescent').length;
    const empty = colCells.filter(cell => cell.value === 'empty').length;
    
    // If we have enough circles, fill remaining empty cells with crescents
    if (circles === expectedCount && empty > 0) {
      for (let row = 0; row < grid.size; row++) {
        const cell = grid.cells[row][col];
        if (cell.value === 'empty' && !cell.isFixed) {
          const possibleValues = getPossibleValues(grid, { row, col });
          if (possibleValues.includes('crescent')) {
            cell.value = 'crescent';
            madeProgress = true;
          }
        }
      }
    }
    
    // If we have enough crescents, fill remaining empty cells with circles
    if (crescents === expectedCount && empty > 0) {
      for (let row = 0; row < grid.size; row++) {
        const cell = grid.cells[row][col];
        if (cell.value === 'empty' && !cell.isFixed) {
          const possibleValues = getPossibleValues(grid, { row, col });
          if (possibleValues.includes('circle')) {
            cell.value = 'circle';
            madeProgress = true;
          }
        }
      }
    }
  }
  
  return madeProgress;
}

/**
 * Solve using backtracking when logical deduction isn't enough
 */
function solveWithBacktracking(
  grid: PuzzleGrid,
  solutions: PuzzleGrid[],
  maxSolutions: number
): boolean {
  if (solutions.length >= maxSolutions) {
    return true;
  }
  
  // Validate current state
  const validation = validatePuzzleGrid(grid);
  if (!validation.isValid) {
    return false; // Invalid state, backtrack
  }
  
  if (validation.isComplete) {
    // Found a solution
    solutions.push(deepCopyGrid(grid));
    return solutions.length >= maxSolutions;
  }
  
  // Find the first empty cell
  const emptyCell = findNextEmptyCell(grid);
  if (!emptyCell) {
    return false; // No empty cells but not complete (shouldn't happen)
  }
  
  const possibleValues = getPossibleValues(grid, emptyCell);
  
  // Try each possible value
  for (const value of possibleValues) {
    // Make the move
    const originalValue = grid.cells[emptyCell.row][emptyCell.col].value;
    grid.cells[emptyCell.row][emptyCell.col].value = value;
    
    // Recursively solve
    if (solveWithBacktracking(grid, solutions, maxSolutions)) {
      if (solutions.length >= maxSolutions) {
        return true;
      }
    }
    
    // Backtrack
    grid.cells[emptyCell.row][emptyCell.col].value = originalValue;
  }
  
  return false;
}

/**
 * Find the next empty cell, preferring cells with fewer possible values
 */
function findNextEmptyCell(grid: PuzzleGrid): CellPosition | null {
  let bestCell: CellPosition | null = null;
  let minPossibilities = Infinity;
  
  for (let row = 0; row < grid.size; row++) {
    for (let col = 0; col < grid.size; col++) {
      const cell = grid.cells[row][col];
      
      if (cell.value === 'empty' && !cell.isFixed) {
        const possibleValues = getPossibleValues(grid, { row, col });
        
        if (possibleValues.length < minPossibilities) {
          minPossibilities = possibleValues.length;
          bestCell = { row, col };
          
          // If we found a cell with only one possibility, use it immediately
          if (minPossibilities === 1) {
            return bestCell;
          }
        }
      }
    }
  }
  
  return bestCell;
}

/**
 * Create a deep copy of a puzzle grid
 */
function deepCopyGrid(grid: PuzzleGrid): PuzzleGrid {
  return {
    size: grid.size,
    cells: grid.cells.map(row =>
      row.map(cell => ({ ...cell }))
    ),
    constraints: grid.constraints.map(constraint => ({ ...constraint })),
    violations: [...grid.violations]
  };
}

/**
 * Check if a puzzle is solvable (has at least one solution)
 */
export function isPuzzleSolvable(grid: PuzzleGrid): boolean {
  const solutions = solvePuzzle(grid, 1);
  return solutions.length > 0;
}

/**
 * Check if a puzzle has a unique solution
 */
export function hasUniqueSolution(grid: PuzzleGrid): boolean {
  const solutions = solvePuzzle(grid, 2);
  return solutions.length === 1;
}

/**
 * Get the solution for a puzzle (returns null if unsolvable)
 */
export function getSolution(grid: PuzzleGrid): PuzzleGrid | null {
  const solutions = solvePuzzle(grid, 1);
  return solutions.length > 0 ? solutions[0] : null;
} 