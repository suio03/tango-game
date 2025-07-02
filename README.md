# Symbol Puzzle Game

A challenging logic puzzle game built with Next.js 14, TypeScript, and Tailwind CSS.

## 🎮 Game Overview

Fill grids with circles (☀️) and crescents (🌙) following logical constraints:

- **Equal Distribution**: Each row and column must have equal numbers of circles and crescents
- **No Consecutive Rule**: No more than 2 consecutive identical symbols allowed
- **Constraint Solving**: Cells with `=` must match, cells with `×` must differ
- **Unique Solutions**: Each puzzle has exactly one solution that can be found through logical deduction

## ✨ Features

- **Multiple Grid Sizes**: 6×6 and 8×8 puzzles with varying difficulty
- **Daily Challenges**: New puzzles every day with streak tracking
- **Unlimited Mode**: Practice with randomly generated puzzles
- **Smart Hint System**: Get helpful hints when stuck
- **Real-time Validation**: Immediate feedback on rule violations
- **Responsive Design**: Works perfectly on desktop and mobile
- **Statistics Tracking**: Monitor your progress and performance

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/symbol-puzzle-game.git
cd symbol-puzzle-game
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🎯 How to Play

1. **Click cells** to cycle through: Empty → Circle → Crescent → Empty
2. **Follow the rules**:
   - Equal circles and crescents in each row/column
   - Maximum 2 consecutive identical symbols
   - Respect constraint indicators (= and ×)
3. **Use hints** if you get stuck (limited per puzzle)
4. **Complete the grid** to win!

## 🛠 Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Icons**: Custom SVG components
- **Deployment**: Vercel

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
├── components/
│   ├── SymbolPuzzle/      # Game components
│   └── ui/                # Reusable UI components
├── hooks/                 # Custom React hooks
├── lib/
│   └── symbolPuzzle/      # Game logic and utilities
└── types/                 # TypeScript type definitions
```

## 🎨 Game Logic

The game implements sophisticated puzzle generation and validation:

- **Puzzle Generation**: Creates valid grids with unique solutions
- **Constraint System**: Handles equality and inequality relationships
- **Validation Engine**: Real-time checking of all game rules
- **Solver Algorithm**: Ensures puzzles are solvable through logic

## 📱 Responsive Design

The game adapts to all screen sizes:
- **Desktop**: Full sidebar with controls and statistics
- **Mobile**: Collapsible controls for optimal gameplay
- **Touch-friendly**: Large buttons and intuitive interactions

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production  
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript checks

### Code Quality

- ESLint configuration for code quality
- TypeScript for type safety
- Prettier for code formatting
- Strict mode enabled

## 📊 Performance

- **Fast Loading**: Optimized bundle size
- **Smooth Animations**: 60fps transitions
- **Efficient Rendering**: React optimization patterns
- **Local Storage**: Persistent game state

## 🌟 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎉 Acknowledgments

- Inspired by classic logic puzzle games
- Built with modern web technologies
- Designed for puzzle enthusiasts everywhere

---

**Ready to challenge your mind? Start playing Symbol Puzzle today!** 🧩