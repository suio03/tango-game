import {
  SymbolType,
  PuzzleGrid,
  ValidationViolation,
  ValidationResult,
  CellPosition
} from '../../types/symbolPuzzle';

/**
 * Main validation function that checks all rules
 */
export function validatePuzzleGrid(grid: PuzzleGrid): ValidationResult {
  const violations: ValidationViolation[] = [];
  
  // Check adjacent rule violations
  violations.push(...checkAdjacentRuleViolations(grid));
  
  // Check balance rule violations
  violations.push(...checkBalanceRuleViolations(grid));
  
  // Check constraint violations
  violations.push(...checkConstraintViolations(grid));
  
  const isValid = violations.length === 0;
  const isComplete = isGridComplete(grid) && isValid;
  
  return {
    isValid,
    violations,
    isComplete
  };
}

/**
 * Check if no more than 2 consecutive identical symbols exist
 */
export function checkAdjacentRuleViolations(grid: PuzzleGrid): ValidationViolation[] {
  const violations: ValidationViolation[] = [];
  
  // Check horizontal consecutive symbols
  for (let row = 0; row < grid.size; row++) {
    let consecutiveCount = 1;
    let currentSymbol = grid.cells[row][0].value;
    let consecutivePositions: CellPosition[] = [{ row, col: 0 }];
    
    for (let col = 1; col < grid.size; col++) {
      const cellValue = grid.cells[row][col].value;
      
      if (cellValue === currentSymbol && cellValue !== 'empty') {
        consecutiveCount++;
        consecutivePositions.push({ row, col });
        
        // If we have more than 2 consecutive, it's a violation
        if (consecutiveCount > 2) {
          violations.push({
            type: 'adjacent',
            positions: [...consecutivePositions],
            message: `More than 2 consecutive ${currentSymbol}s in row ${row + 1}`
          });
        }
      } else {
        // Reset counting for new symbol
        consecutiveCount = 1;
        currentSymbol = cellValue;
        consecutivePositions = [{ row, col }];
      }
    }
  }
  
  // Check vertical consecutive symbols
  for (let col = 0; col < grid.size; col++) {
    let consecutiveCount = 1;
    let currentSymbol = grid.cells[0][col].value;
    let consecutivePositions: CellPosition[] = [{ row: 0, col }];
    
    for (let row = 1; row < grid.size; row++) {
      const cellValue = grid.cells[row][col].value;
      
      if (cellValue === currentSymbol && cellValue !== 'empty') {
        consecutiveCount++;
        consecutivePositions.push({ row, col });
        
        // If we have more than 2 consecutive, it's a violation
        if (consecutiveCount > 2) {
          violations.push({
            type: 'adjacent',
            positions: [...consecutivePositions],
            message: `More than 2 consecutive ${currentSymbol}s in column ${col + 1}`
          });
        }
      } else {
        // Reset counting for new symbol
        consecutiveCount = 1;
        currentSymbol = cellValue;
        consecutivePositions = [{ row, col }];
      }
    }
  }
  
  return violations;
}

/**
 * Check if each row and column has equal numbers of circles and crescents
 */
export function checkBalanceRuleViolations(grid: PuzzleGrid): ValidationViolation[] {
  const violations: ValidationViolation[] = [];
  const expectedCount = Math.floor(grid.size / 2);
  
  // Check row balance
  for (let row = 0; row < grid.size; row++) {
    const circleCount = grid.cells[row].filter(cell => cell.value === 'circle').length;
    const crescentCount = grid.cells[row].filter(cell => cell.value === 'crescent').length;
    const emptyCount = grid.cells[row].filter(cell => cell.value === 'empty').length;
    
    // Only validate if row is complete (no empty cells)
    if (emptyCount === 0) {
      if (circleCount !== expectedCount || crescentCount !== expectedCount) {
        const positions: CellPosition[] = [];
        for (let col = 0; col < grid.size; col++) {
          positions.push({ row, col });
        }
        
        violations.push({
          type: 'balance',
          positions,
          message: `Row ${row + 1} must have ${expectedCount} circles and ${expectedCount} crescents`
        });
      }
    }
    // Check for impossible situations (too many of one symbol)
    else if (circleCount > expectedCount || crescentCount > expectedCount) {
      const positions: CellPosition[] = [];
      for (let col = 0; col < grid.size; col++) {
        if (grid.cells[row][col].value !== 'empty') {
          positions.push({ row, col });
        }
      }
      
      const excessSymbol = circleCount > expectedCount ? 'circles' : 'crescents';
      violations.push({
        type: 'balance',
        positions,
        message: `Row ${row + 1} has too many ${excessSymbol}`
      });
    }
  }
  
  // Check column balance
  for (let col = 0; col < grid.size; col++) {
    const circleCount = grid.cells.map(row => row[col]).filter(cell => cell.value === 'circle').length;
    const crescentCount = grid.cells.map(row => row[col]).filter(cell => cell.value === 'crescent').length;
    const emptyCount = grid.cells.map(row => row[col]).filter(cell => cell.value === 'empty').length;
    
    // Only validate if column is complete (no empty cells)
    if (emptyCount === 0) {
      if (circleCount !== expectedCount || crescentCount !== expectedCount) {
        const positions: CellPosition[] = [];
        for (let row = 0; row < grid.size; row++) {
          positions.push({ row, col });
        }
        
        violations.push({
          type: 'balance',
          positions,
          message: `Column ${col + 1} must have ${expectedCount} circles and ${expectedCount} crescents`
        });
      }
    }
    // Check for impossible situations
    else if (circleCount > expectedCount || crescentCount > expectedCount) {
      const positions: CellPosition[] = [];
      for (let row = 0; row < grid.size; row++) {
        if (grid.cells[row][col].value !== 'empty') {
          positions.push({ row, col });
        }
      }
      
      const excessSymbol = circleCount > expectedCount ? 'circles' : 'crescents';
      violations.push({
        type: 'balance',
        positions,
        message: `Column ${col + 1} has too many ${excessSymbol}`
      });
    }
  }
  
  return violations;
}

/**
 * Check constraint violations (equals and not-equals)
 */
export function checkConstraintViolations(grid: PuzzleGrid): ValidationViolation[] {
  const violations: ValidationViolation[] = [];
  
  for (const constraint of grid.constraints) {
    const [pos1, pos2] = constraint.connectedCells;
    const cell1 = grid.cells[pos1.row][pos1.col];
    const cell2 = grid.cells[pos2.row][pos2.col];
    
    // Only check constraints if both cells are filled
    if (cell1.value !== 'empty' && cell2.value !== 'empty') {
      const shouldBeEqual = constraint.type === 'equals';
      const areEqual = cell1.value === cell2.value;
      
      if (shouldBeEqual && !areEqual) {
        violations.push({
          type: 'constraint',
          positions: [pos1, pos2],
          message: `Cells at (${pos1.row + 1}, ${pos1.col + 1}) and (${pos2.row + 1}, ${pos2.col + 1}) must contain the same symbol`
        });
      } else if (!shouldBeEqual && areEqual) {
        violations.push({
          type: 'constraint',
          positions: [pos1, pos2],
          message: `Cells at (${pos1.row + 1}, ${pos1.col + 1}) and (${pos2.row + 1}, ${pos2.col + 1}) must contain different symbols`
        });
      }
    }
  }
  
  return violations;
}

/**
 * Check if the grid is completely filled
 */
export function isGridComplete(grid: PuzzleGrid): boolean {
  for (let row = 0; row < grid.size; row++) {
    for (let col = 0; col < grid.size; col++) {
      if (grid.cells[row][col].value === 'empty') {
        return false;
      }
    }
  }
  return true;
}

/**
 * Validate a single cell placement
 */
export function validateCellPlacement(
  grid: PuzzleGrid,
  position: CellPosition,
  value: SymbolType
): ValidationViolation[] {
  // Create a temporary grid with the new value
  const tempGrid: PuzzleGrid = {
    ...grid,
    cells: grid.cells.map(row => row.map(cell => ({ ...cell })))
  };
  
  tempGrid.cells[position.row][position.col].value = value;
  
  // Run validation on the temporary grid
  const result = validatePuzzleGrid(tempGrid);
  
  // Filter violations that involve the changed position
  return result.violations.filter(violation =>
    violation.positions.some(pos => pos.row === position.row && pos.col === position.col)
  );
}

/**
 * Get all cells that are currently in violation
 */
export function getViolatedCells(grid: PuzzleGrid): Set<string> {
  const result = validatePuzzleGrid(grid);
  const violatedCells = new Set<string>();
  
  for (const violation of result.violations) {
    for (const position of violation.positions) {
      violatedCells.add(`${position.row}-${position.col}`);
    }
  }
  
  return violatedCells;
}

/**
 * Check if a specific position would create violations with a given value
 */
export function wouldCreateViolation(
  grid: PuzzleGrid,
  position: CellPosition,
  value: SymbolType
): boolean {
  if (value === 'empty') return false;
  
  const violations = validateCellPlacement(grid, position, value);
  return violations.length > 0;
}

/**
 * Get possible valid values for a cell position
 */
export function getPossibleValues(grid: PuzzleGrid, position: CellPosition): SymbolType[] {
  const possibleValues: SymbolType[] = [];
  
  for (const value of ['circle', 'crescent'] as SymbolType[]) {
    if (!wouldCreateViolation(grid, position, value)) {
      possibleValues.push(value);
    }
  }
  
  return possibleValues;
}

/**
 * Update grid with violations marked
 */
export function updateGridViolations(grid: PuzzleGrid): PuzzleGrid {
  const result = validatePuzzleGrid(grid);
  const violatedCells = getViolatedCells(grid);
  
  // Reset all highlighting
  const updatedGrid: PuzzleGrid = {
    ...grid,
    cells: grid.cells.map(row =>
      row.map(cell => ({ ...cell, isHighlighted: false }))
    ),
    constraints: grid.constraints.map(constraint => ({ ...constraint, isViolated: false })),
    violations: result.violations
  };
  
  // Mark violated cells
  for (let row = 0; row < grid.size; row++) {
    for (let col = 0; col < grid.size; col++) {
      if (violatedCells.has(`${row}-${col}`)) {
        updatedGrid.cells[row][col].isHighlighted = true;
      }
    }
  }
  
  // Mark violated constraints
  for (const violation of result.violations) {
    if (violation.type === 'constraint') {
      for (const constraint of updatedGrid.constraints) {
        const violatesThisConstraint = violation.positions.some(pos =>
          constraint.connectedCells.some(connectedPos =>
            connectedPos.row === pos.row && connectedPos.col === pos.col
          )
        );
        
        if (violatesThisConstraint) {
          constraint.isViolated = true;
        }
      }
    }
  }
  
  return updatedGrid;
} 