# 🎮 Tango Game Unlimited

**The unlimited version of LinkedIn's hugely popular daily Tango puzzle!**

Love LinkedIn's daily Tango challenge but wish you could play more? Tango Game Unlimited gives you the exact same addictive logic gameplay with unlimited puzzles, multiple difficulty levels, and no daily limits.

🔗 **[Play Now →](https://tangogameunlimited.app)**

![Tango Game Screenshot](public/screenshot.png)

## 🌟 Features

### 🚀 **Unlimited Play**
- Play as many Tango puzzles as you want
- No 24-hour waiting periods like LinkedIn
- Generate new puzzles instantly

### 🎯 **Multiple Game Modes**
- **Daily Challenge** - Featured puzzle of the day
- **Unlimited Mode** - Endless puzzle generation
- **Multiple Difficulties** - 6×6 (Easy) and 8×8 (Hard) grids

### 🎮 **Same Rules as LinkedIn Tango**
- Fill grids with circles (☀️) and crescents (🌙)
- Equal numbers in each row/column
- No more than 2 consecutive identical symbols
- Follow constraint indicators (= and ×)

### ✨ **Enhanced Experience**
- **No Account Required** - Start playing immediately
- **Mobile Responsive** - Perfect on phones, tablets, and desktop
- **Timer & Move Tracking** - Track your solving progress
- **Statistics** - Monitor your win rates and streaks
- **Clear Function** - Reset puzzle without starting over

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/tango-game.git
   cd tango-game
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 How to Play

### Basic Rules
1. **Fill the grid** with circles (☀️) and crescents (🌙)
2. **Balance requirement** - Each row and column must have equal numbers of both symbols
3. **Adjacent rule** - No more than 2 consecutive identical symbols
4. **Constraints** - Follow = (same) and × (different) indicators

### Controls
- **Click** to cycle through symbols: Empty → Circle → Crescent
- **Right-click** to clear a cell
- **Clear button** to reset all your moves
- **New Game** to generate a fresh puzzle

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **State Management**: React hooks with custom game logic
- **Deployment**: Ready for [Vercel](https://vercel.com/), [Netlify](https://netlify.com/), or any static host

## 📁 Project Structure

```
tango-game/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with SEO metadata
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── SymbolPuzzle/     # Game-specific components
│   │   ├── GameBoard.tsx # Main game interface
│   │   ├── GameCell.tsx  # Individual puzzle cells
│   │   ├── HowToPlay.tsx # Game instructions
│   │   └── ...           # Other game components
│   └── ui/               # Reusable UI components
├── hooks/                # Custom React hooks
│   └── useSymbolPuzzleGameState.ts
├── lib/                  # Utility libraries
│   ├── symbolPuzzle/    # Game logic
│   │   ├── generator.ts # Puzzle generation
│   │   ├── solver.ts    # Puzzle solving logic
│   │   └── validation.ts # Rule validation
│   └── utils.ts         # General utilities
├── types/               # TypeScript type definitions
└── public/             # Static assets
```

## 🎮 Game Logic

### Puzzle Generation
- Uses constraint satisfaction algorithms
- Generates puzzles with unique solutions
- Adjustable difficulty based on grid size and constraint density

### Validation System
- Real-time rule checking
- Visual feedback for violations
- Ensures puzzle solvability

### Statistics Tracking
- Local storage for game statistics
- Separate tracking for daily and unlimited modes
- Win rates, streaks, and completion times

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Import project in [Vercel Dashboard](https://vercel.com/dashboard)
3. Deploy automatically with zero configuration

### Manual Deployment
```bash
# Build the project
npm run build

# The 'out' directory contains static files ready for deployment
```

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Commit with clear messages**
   ```bash
   git commit -m "Add amazing feature"
   ```
5. **Push and create a Pull Request**

### Development Guidelines
- Follow TypeScript best practices
- Use existing component patterns
- Add tests for new game logic
- Update documentation for new features

## 📊 SEO & Marketing

This project is optimized for users searching:
- "LinkedIn Tango game unlimited"
- "Tango puzzle free"
- "Unlimited Tango game"
- "LinkedIn puzzle unlimited"

### Key SEO Features
- Optimized meta tags and descriptions
- Structured data for search engines
- FAQ schema markup
- Mobile-first responsive design

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by LinkedIn's daily Tango puzzle
- Built with modern web technologies
- Community feedback and contributions

---

**Love the game?** ⭐ Star this repository and share it with puzzle enthusiasts!

**Want unlimited Tango puzzles?** 🎮 [Play now](https://tangogameunlimited.app) - no sign-up required!