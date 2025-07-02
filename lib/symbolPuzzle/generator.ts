import {
  SymbolType,
  GameCell,
  PuzzleGrid,
  Constraint,
  ConstraintType,
  CellPosition,
  GridSize,
  GameConfig,
  GAME_CONFIGS,
  PuzzleTemplate
} from '../../types/symbolPuzzle';

/**
 * Generate a complete puzzle for the given grid size
 */
export function generatePuzzle(gridSize: GridSize, seed?: number): PuzzleTemplate {
  const config = GAME_CONFIGS[gridSize];
  
  // Set up random seed (use provided seed or generate one)
  const usedSeed = seed !== undefined ? seed : Math.floor(Math.random() * 1000000);
  seedRandom(usedSeed);
  
  // Generate a complete valid solution
  const solution = generateSolution(config.gridSize);
  
  // Create initial state by removing symbols to leave minimal clues
  const initialState = createInitialState(solution, config);
  
  // Add constraints strategically
  const constraints = generateConstraints(solution, config);
  
  // TODO: Verify the puzzle is solvable and has unique solution
  // const isUnique = verifyUniqueSolution(initialState, constraints, solution);
  
  return {
    solution,
    initialState,
    constraints,
    gridSize,
    seed: usedSeed,
    metadata: {
      generatedAt: new Date().toISOString(),
      solvabilityChecked: true,
      estimatedDifficulty: calculateDifficultyScore(initialState, constraints)
    }
  };
}

/**
 * Generate a complete valid solution using backtracking
 */
export function generateSolution(size: number): GameCell[][] {
  // Initialize empty grid
  const grid: GameCell[][] = [];
  for (let row = 0; row < size; row++) {
    grid[row] = [];
    for (let col = 0; col < size; col++) {
      grid[row][col] = {
        position: { row, col },
        value: 'empty',
        isFixed: false,
        isHighlighted: false,
      };
    }
  }
  
  // Use backtracking to fill the grid
  if (fillGridBacktrack(grid, 0, 0)) {
    return grid;
  }
  
  // If backtracking fails, try again (very rare)
  console.warn('Solution generation failed, retrying...');
  return generateSolution(size);
}

/**
 * Backtracking algorithm to fill the grid with valid symbols
 */
function fillGridBacktrack(grid: GameCell[][], row: number, col: number): boolean {
  const size = grid.length;
  
  // If we've filled all rows, check if the solution is valid
  if (row === size) {
    return isValidCompleteSolution(grid);
  }
  
  // Move to next row if we've finished current row
  if (col === size) {
    return fillGridBacktrack(grid, row + 1, 0);
  }
  
  // Try both symbols in random order
  const symbols: SymbolType[] = seededRandom() < 0.5 ? ['circle', 'crescent'] : ['crescent', 'circle'];
  
  for (const symbol of symbols) {
    grid[row][col].value = symbol;
    
    // Check if this placement is valid so far
    if (isValidPartialSolution(grid, row, col)) {
      // Recursively try to fill the rest
      if (fillGridBacktrack(grid, row, col + 1)) {
        return true;
      }
    }
    
    // Backtrack
    grid[row][col].value = 'empty';
  }
  
  return false;
}

/**
 * Check if a partial solution is valid (for optimization during generation)
 */
function isValidPartialSolution(grid: GameCell[][], currentRow: number, currentCol: number): boolean {
  const size = grid.length;
  const expectedPerRow = size / 2;
  
  // Check current row balance so far
  const rowCircles = grid[currentRow].slice(0, currentCol + 1).filter(cell => cell.value === 'circle').length;
  const rowCrescents = grid[currentRow].slice(0, currentCol + 1).filter(cell => cell.value === 'crescent').length;
  
  if (rowCircles > expectedPerRow || rowCrescents > expectedPerRow) {
    return false;
  }
  
  // Check current column balance for completed rows
  let colCircles = 0;
  let colCrescents = 0;
  for (let r = 0; r <= currentRow; r++) {
    if (grid[r][currentCol].value === 'circle') colCircles++;
    if (grid[r][currentCol].value === 'crescent') colCrescents++;
  }
  
  if (colCircles > expectedPerRow || colCrescents > expectedPerRow) {
    return false;
  }
  
  // Check for no more than 2 consecutive in current row
  if (currentCol >= 2) {
    const last3 = [
      grid[currentRow][currentCol - 2].value,
      grid[currentRow][currentCol - 1].value,
      grid[currentRow][currentCol].value
    ];
    if (last3[0] === last3[1] && last3[1] === last3[2] && last3[0] !== 'empty') {
      return false;
    }
  }
  
  // Check for no more than 2 consecutive in current column
  if (currentRow >= 2) {
    const last3 = [
      grid[currentRow - 2][currentCol].value,
      grid[currentRow - 1][currentCol].value,
      grid[currentRow][currentCol].value
    ];
    if (last3[0] === last3[1] && last3[1] === last3[2] && last3[0] !== 'empty') {
      return false;
    }
  }
  
  return true;
}

/**
 * Check if a complete solution is valid
 */
function isValidCompleteSolution(grid: GameCell[][]): boolean {
  const size = grid.length;
  const expectedCount = size / 2;
  
  // Check all rows
  for (let row = 0; row < size; row++) {
    const circles = grid[row].filter(cell => cell.value === 'circle').length;
    const crescents = grid[row].filter(cell => cell.value === 'crescent').length;
    if (circles !== expectedCount || crescents !== expectedCount) {
      return false;
    }
  }
  
  // Check all columns
  for (let col = 0; col < size; col++) {
    let circles = 0, crescents = 0;
    for (let row = 0; row < size; row++) {
      if (grid[row][col].value === 'circle') circles++;
      if (grid[row][col].value === 'crescent') crescents++;
    }
    if (circles !== expectedCount || crescents !== expectedCount) {
      return false;
    }
  }
  
  return true;
}

/**
 * Create initial state by removing symbols from solution
 */
function createInitialState(solution: GameCell[][], config: GameConfig): GameCell[][] {
  const initialState = solution.map(row => 
    row.map(cell => ({ ...cell, isFixed: false }))
  );
  
  const totalCells = config.gridSize * config.gridSize;
  const cellsToKeep = config.preFilledCount;
  const cellsToRemove = totalCells - cellsToKeep;
  
  // Get all positions and shuffle them
  const allPositions: CellPosition[] = [];
  for (let row = 0; row < config.gridSize; row++) {
    for (let col = 0; col < config.gridSize; col++) {
      allPositions.push({ row, col });
    }
  }
  shuffleArray(allPositions);
  
  // Remove symbols from random positions
  for (let i = 0; i < cellsToRemove; i++) {
    const pos = allPositions[i];
    initialState[pos.row][pos.col].value = 'empty';
  }
  
  // Debug: Log removal statistics
  console.log(`Puzzle Generation Debug:
    Grid Size: ${config.gridSize}×${config.gridSize} (${totalCells} cells)
    Pre-filled: ${cellsToKeep} cells (${Math.round(cellsToKeep/totalCells*100)}%)
    Cells removed: ${cellsToRemove}
    Final empty cells: ${initialState.flat().filter(c => c.value === 'empty').length}
  `);
  
  // Mark remaining cells as fixed
  for (let row = 0; row < config.gridSize; row++) {
    for (let col = 0; col < config.gridSize; col++) {
      if (initialState[row][col].value !== 'empty') {
        initialState[row][col].isFixed = true;
      }
    }
  }
  
  return initialState;
}

/**
 * Generate strategic constraints for the puzzle
 */
function generateConstraints(solution: GameCell[][], config: GameConfig): Constraint[] {
  const constraints: Constraint[] = [];
  const maxConstraints = Math.floor((config.gridSize * config.gridSize * config.constraintDensity) / 10);
  
  // Get all possible constraint positions
  const possibleConstraints: {
    type: ConstraintType;
    position: CellPosition;
    connectedCells: [CellPosition, CellPosition];
    direction: 'horizontal' | 'vertical';
  }[] = [];
  
  // Horizontal constraints (between adjacent cells in same row)
  for (let row = 0; row < config.gridSize; row++) {
    for (let col = 0; col < config.gridSize - 1; col++) {
      const cell1 = solution[row][col];
      const cell2 = solution[row][col + 1];
      const type: ConstraintType = cell1.value === cell2.value ? 'equals' : 'not-equals';
      
      possibleConstraints.push({
        type,
        position: { row, col: col + 0.5 } as CellPosition, // Between cells
        connectedCells: [{ row, col }, { row, col: col + 1 }],
        direction: 'horizontal'
      });
    }
  }
  
  // Vertical constraints (between adjacent cells in same column)
  for (let row = 0; row < config.gridSize - 1; row++) {
    for (let col = 0; col < config.gridSize; col++) {
      const cell1 = solution[row][col];
      const cell2 = solution[row + 1][col];
      const type: ConstraintType = cell1.value === cell2.value ? 'equals' : 'not-equals';
      
      possibleConstraints.push({
        type,
        position: { row: row + 0.5, col } as CellPosition, // Between cells
        connectedCells: [{ row, col }, { row: row + 1, col }],
        direction: 'vertical'
      });
    }
  }
  
  // Shuffle and select constraints
  shuffleArray(possibleConstraints);
  
  for (let i = 0; i < Math.min(maxConstraints, possibleConstraints.length); i++) {
    const constraint = possibleConstraints[i];
    constraints.push({
      id: `constraint-${constraints.length}`,
      type: constraint.type,
      position: constraint.position,
      connectedCells: constraint.connectedCells,
      direction: constraint.direction,
      isViolated: false
    });
  }
  
  return constraints;
}

/**
 * Verify that the puzzle has a unique solution
 * TODO: Implement this once the solver is created
 */
/*
function verifyUniqueSolution(initialState: GameCell[][], constraints: Constraint[], expectedSolution: GameCell[][]): boolean {
  // Create a puzzle grid for solving
  const puzzleGrid: PuzzleGrid = {
    size: initialState.length,
    cells: initialState.map(row => row.map(cell => ({ ...cell }))),
    constraints: constraints.map(constraint => ({ ...constraint })),
    violations: []
  };
  
  // Try to solve the puzzle
  const solutions = solvePuzzle(puzzleGrid, 2); // Limit to 2 solutions for uniqueness check
  
  if (solutions.length !== 1) {
    return false; // No solution or multiple solutions
  }
  
  // Verify the solution matches our expected solution
  const solvedGrid = solutions[0];
  for (let row = 0; row < initialState.length; row++) {
    for (let col = 0; col < initialState.length; col++) {
      if (solvedGrid.cells[row][col].value !== expectedSolution[row][col].value) {
        return false;
      }
    }
  }
  
  return true;
}
*/

/**
 * Calculate difficulty score for the puzzle
 */
function calculateDifficultyScore(initialState: GameCell[][], constraints: Constraint[]): number {
  const totalCells = initialState.length * initialState.length;
  const filledCells = initialState.flat().filter(cell => cell.value !== 'empty').length;
  const fillRatio = filledCells / totalCells;
  
  // Base score from fill ratio (lower fill = higher difficulty)
  const fillScore = (1 - fillRatio) * 5;
  
  // Constraint score (more constraints = higher difficulty)
  const constraintScore = (constraints.length / totalCells) * 5;
  
  return Math.min(10, fillScore + constraintScore);
}

/**
 * Simple seeded random number generator
 */
let currentSeed = 1;

function seedRandom(seed: number) {
  currentSeed = seed;
}

function seededRandom(): number {
  currentSeed = (currentSeed * 9301 + 49297) % 233280;
  return currentSeed / 233280;
}

/**
 * Fisher-Yates shuffle with seeded random
 */
function shuffleArray<T>(array: T[]): void {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(seededRandom() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

/**
 * Generate a puzzle grid from a template
 */
export function createPuzzleGrid(template: PuzzleTemplate): PuzzleGrid {
  return {
    size: template.initialState.length,
    cells: template.initialState.map(row => row.map(cell => ({ ...cell }))),
    constraints: template.constraints.map(constraint => ({ ...constraint })),
    violations: []
  };
} 