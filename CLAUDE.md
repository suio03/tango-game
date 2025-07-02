# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Symbol Puzzle Game - A logic-based constraint satisfaction puzzle where players fill grids with circles (☀️) and crescents (🌙) following specific rules:

- Equal numbers of each symbol in every row and column
- No more than 2 consecutive identical symbols
- Constraint cells with `=` must contain matching symbols
- Constraint cells with `×` must contain different symbols
- Each puzzle has exactly one valid solution

## Commands

### Development
- `npm run dev` - Start development server at http://localhost:3000
- `npm run build` - Build production version
- `npm start` - Start production server
- `npm run lint` - Run ESLint for code quality

### Testing
No test framework is currently configured. Check with user before adding tests.

## Architecture Overview

### Tech Stack
- **Next.js 15** with App Router and TypeScript
- **React 19** with hooks-based state management
- **Tailwind CSS** for styling with shadcn/ui components
- **Zustand** available but currently using React hooks for state
- **next-intl** for internationalization support

### Core Game Logic

#### Game State Management
- `hooks/useSymbolPuzzleGameState.ts` - Primary game state hook with real-time validation
- Manages puzzle generation, move history, undo/redo functionality
- Handles daily challenge completion tracking and user statistics

#### Game Logic Libraries (`lib/symbolPuzzle/`)
- `generator.ts` - Puzzle generation using backtracking algorithm with seeded randomization
- `solver.ts` - Constraint satisfaction solver with logical deduction and backtracking
- `validation.ts` - Real-time rule checking (adjacent, balance, constraint violations)
- `userStats.ts` - localStorage-based statistics with SSR safety

#### Game Modes
- **Daily Challenge**: Date-based seeded puzzles for global consistency
- **Unlimited Play**: Random puzzle generation with configurable grid sizes (6×6, 8×8)

### Component Structure

#### Game Components (`components/SymbolPuzzle/`)
- `GameBoard.tsx` - Main game interface with controls and statistics
- `GameCell.tsx` - Individual cell rendering with symbol display and interaction
- `ConstraintIndicator.tsx` - Visual indicators for constraint relationships
- `icons/` - Custom SVG components for symbols (SunIcon, MoonIcon)

#### UI Components
- `components/ui/` - Complete shadcn/ui component library
- Custom game-specific components (HowToPlay, Features, Tips, FAQ)

### Game Algorithm

The puzzle generation uses sophisticated constraint satisfaction:
1. Generates complete valid solutions using backtracking
2. Strategically removes symbols to create minimal clue sets
3. Adds equality/inequality constraints between adjacent cells
4. Ensures puzzles are solvable through logical deduction
5. Implements difficulty scoring based on fill ratio and constraint density

### Type System (`types/symbolPuzzle.ts`)

Core types include:
- `SymbolType` - 'empty' | 'circle' | 'crescent'
- `PuzzleGrid` - Main game grid with cells, constraints, and violations
- `SymbolPuzzleGameState` - Complete game state including history and completion status
- `Constraint` - Equality/inequality relationships between cells
- `GameConfig` - Configuration for different grid sizes and difficulty

### Data Storage

All user data stored client-side in localStorage:
- Daily challenge completion status with UTC date consistency
- User statistics (streaks, completion times, move counts)
- Game preferences and settings
- SSR-safe implementation throughout

## Important Implementation Details

### Game Rules Engine
The validation system enforces three core rules:
1. **Balance Rule**: Equal circles and crescents in each row/column
2. **Adjacent Rule**: Maximum 2 consecutive identical symbols
3. **Constraint Rule**: Respect = (equal) and × (not-equal) indicators

### Seeded Random Generation
- Uses deterministic seeding for daily challenges
- Ensures same puzzle worldwide for same date
- Custom seeded random implementation for reproducibility

### Performance Considerations
- Real-time validation with efficient rule checking
- SSR-safe localStorage access with hydration guards
- Optimized backtracking algorithms for puzzle generation
- Responsive design with touch-friendly mobile controls

### Daily Challenge System
- UTC-based date consistency for global challenges
- One completion per day limit with streak tracking
- Completion time and move count analytics

When working on this codebase:
- Maintain SSR safety for localStorage operations
- Follow existing TypeScript patterns and comprehensive type definitions
- Use the established game state flow through useSymbolPuzzleGameState hook
- Preserve constraint satisfaction logic integrity
- Follow existing UI/UX patterns from shadcn/ui components