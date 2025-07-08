'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useSymbolPuzzleGameState } from '../../hooks/useSymbolPuzzleGameState'
import GameCell from './GameCell'
import ConstraintIndicator from './ConstraintIndicator'

import {
    SymbolType,
    GridSize,
    GameMode
} from '../../types/symbolPuzzle'
import {
    getSymbolPuzzleDailyStats,
    getSymbolPuzzleUnlimitedStats
} from '../../lib/symbolPuzzle/userStats'
import SunIcon from './icons/SunIcon'
import MoonIcon from './icons/MoonIcon'
import HowToPlay from './HowToPlay'
import GameRulesSummary from './GameRulesSummary'
import GameStructuredData from './GameStructuredData'
import GameFAQ from './GameFAQ'
import Footer from '../footer'


// Timer hook
function useTimer(isRunning: boolean, resetTrigger: number) {
    const [seconds, setSeconds] = useState(0)

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null

        if (isRunning) {
            interval = setInterval(() => {
                setSeconds(prevSeconds => prevSeconds + 1)
            }, 1000)
        }

        return () => {
            if (interval) clearInterval(interval)
        }
    }, [isRunning])

    useEffect(() => {
        setSeconds(0)
    }, [resetTrigger])

    const formatTime = (totalSeconds: number) => {
        const minutes = Math.floor(totalSeconds / 60)
        const secs = totalSeconds % 60
        return `${minutes}:${secs.toString().padStart(2, '0')}`
    }

    return { seconds, formattedTime: formatTime(seconds) }
}

export default function SymbolPuzzleGameBoard() {
    // Related games data
    const relatedGames = [
        {
            name: 'Zip Game',
            url: 'https://zipgame.net/',
            logo: '/other-game/zip-game.svg',
            category: 'Logic Puzzle',
            hoverColor: 'blue'
        },
        {
            name: 'Sprunki Game',
            url: 'https://sprunkiincrediboxes.net/',
            logo: '/other-game/sprunki.svg',
            category: 'Music Creation',
            hoverColor: 'green'
        },
        {
            name: 'Elemendle',
            url: 'https://elemendle.com/',
            logo: '/other-game/elemendle.svg',
            category: 'Chemistry Puzzle',
            hoverColor: 'purple'
        },
        {
            name: 'Bleachdle',
            url: 'https://bleachdle.app/',
            logo: '/other-game/bleachdle.svg',
            category: 'Anime Trivia',
            hoverColor: 'orange'
        }
    ]

    const {
        gameState,
        resetGame,
        makeMove,
        switchGameMode
    } = useSymbolPuzzleGameState()

    const [timerResetTrigger, setTimerResetTrigger] = useState(0)
    const [showControls, setShowControls] = useState(true)
    const [isHydrated, setIsHydrated] = useState(false)
    const [showHowToPlay, setShowHowToPlay] = useState(false) // For collapsible section
    const [showFAQ, setShowFAQ] = useState(false) // For collapsible FAQ section
    const [completionTime, setCompletionTime] = useState<string | null>(null)
    const [hasStarted, setHasStarted] = useState(false)
    const [dailyStats, setDailyStats] = useState<ReturnType<typeof getSymbolPuzzleDailyStats> | null>(null)
    const [unlimitedStats, setUnlimitedStats] = useState<ReturnType<typeof getSymbolPuzzleUnlimitedStats> | null>(null)


    // Handle hydration
    useEffect(() => {
        setIsHydrated(true)

        // Load stats after hydration
        setDailyStats(getSymbolPuzzleDailyStats())
        setUnlimitedStats(getSymbolPuzzleUnlimitedStats())

        // Load control panel preference
        const saved = localStorage.getItem('symbol-puzzle-show-controls')
        if (saved !== null) {
            setShowControls(JSON.parse(saved))
        }
    }, [])

    // Timer - runs when game has started and is not completed
    const isTimerRunning = hasStarted && !gameState.isGameComplete
    const { formattedTime } = useTimer(isTimerRunning, timerResetTrigger)

    // Display time - completion time or current time
    const displayTime = completionTime || formattedTime

    // Calculate cell size based on grid size
    const cellSize = Math.min(400 / gameState.grid.size, 60)

    // Handle cell click - cycle through symbols
    const handleCellClick = (row: number, col: number) => {
        const cell = gameState.grid.cells[row][col]
        if (cell.isFixed) return

        // Start timer on first move
        if (!hasStarted) {
            setHasStarted(true)
        }

        let nextValue: SymbolType
        switch (cell.value) {
            case 'empty':
                nextValue = 'circle'
                break
            case 'circle':
                nextValue = 'crescent'
                break
            case 'crescent':
                nextValue = 'empty'
                break
            default:
                nextValue = 'empty'
        }

        makeMove({ row, col }, nextValue)
    }

    // Handle right click - clear cell
    const handleCellRightClick = (row: number, col: number) => {
        const cell = gameState.grid.cells[row][col]
        if (cell.isFixed) return

        // Start timer on first move
        if (!hasStarted) {
            setHasStarted(true)
        }

        makeMove({ row, col }, 'empty')
    }

    // Handle new game
    const handleNewGame = () => {
        resetGame()
        setTimerResetTrigger(prev => prev + 1)
        setCompletionTime(null)
        setHasStarted(false)
    }

    // Handle clear current game
    const handleClearGame = () => {
        // Clear all user moves by setting all non-fixed cells to empty
        for (let row = 0; row < gameState.grid.size; row++) {
            for (let col = 0; col < gameState.grid.size; col++) {
                const cell = gameState.grid.cells[row][col]
                if (!cell.isFixed && cell.value !== 'empty') {
                    makeMove({ row, col }, 'empty')
                }
            }
        }
    }

    // Handle grid size change
    const handleGridSizeChange = (gridSize: GridSize) => {
        resetGame(gridSize)
        setTimerResetTrigger(prev => prev + 1)
        setCompletionTime(null)
        setHasStarted(false)
    }

    // Handle game mode change
    const handleGameModeChange = (gameMode: GameMode) => {
        switchGameMode(gameMode)
        setTimerResetTrigger(prev => prev + 1)
        setCompletionTime(null)
        setHasStarted(false)
    }

    // Toggle controls panel
    const toggleControls = () => {
        const newValue = !showControls
        setShowControls(newValue)
        localStorage.setItem('symbol-puzzle-show-controls', JSON.stringify(newValue))
    }

    // Track completion
    useEffect(() => {
        if (gameState.isGameComplete && !completionTime) {
            setCompletionTime(formattedTime)

            // Update stats display
            setDailyStats(getSymbolPuzzleDailyStats())
            setUnlimitedStats(getSymbolPuzzleUnlimitedStats())
        }
    }, [gameState.isGameComplete, completionTime, formattedTime])

    const gridContainerStyle = {
        display: 'grid',
        gridTemplateColumns: `repeat(${gameState.grid.size}, ${cellSize}px)`,
        gridTemplateRows: `repeat(${gameState.grid.size}, ${cellSize}px)`,
        gap: '2px',
        position: 'relative' as const,
        margin: 'auto'
    }

    return (
        <>
            <GameStructuredData />
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
                {/* Hero Header */}
                <div className="bg-strawberry-gradient text-white py-8 sm:py-12">
                    <div className="max-w-4xl mx-auto px-4 text-center">
                        <h1 className="text-3xl sm:text-5xl font-bold mb-3">
                            Tango Game Unlimited
                        </h1>
                        <p className="text-lg sm:text-xl opacity-90 max-w-2xl mx-auto flex items-center justify-center gap-1">
                            Love the daily symbol puzzle? Now you can play unlimited grids, for free.
                        </p>
                    </div>
                </div>

                <div className={`w-full mx-auto px-2 sm:px-4 py-4 sm:py-8 ${showControls ? 'max-w-6xl' : 'max-w-2xl'}`}>
                    <div className={`grid gap-4 sm:gap-6 lg:gap-8 transition-all duration-300 ${showControls ? 'lg:grid-cols-3' : 'lg:grid-cols-1'}`}>

                        {/* Main Game Area */}
                        <div className={`w-full min-w-0 transition-all duration-300 ${showControls ? 'lg:col-span-2' : 'lg:col-span-1'}`}>
                            <div className="bg-white rounded-xl shadow-lg p-3 sm:p-4 lg:p-6 mb-4 sm:mb-6">
                                <div className="text-center mb-4 sm:mb-6">
                                    <div className="flex items-center justify-between mb-4">
                                        {/* Timer Display */}
                                        <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-lg px-2 sm:px-3 lg:px-4 py-2">
                                            <div className="flex items-center gap-1 sm:gap-2">
                                                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-strawberry" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <span className="text-red-800 font-mono text-sm sm:text-base lg:text-lg font-semibold">{displayTime}</span>
                                                <span className="text-strawberry text-xs sm:text-sm">| Moves: {gameState.moveHistory.length}</span>
                                            </div>
                                        </div>

                                        {/* Controls Toggle */}
                                        <button
                                            onClick={toggleControls}
                                            className="lg:flex hidden items-center justify-center w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                                            aria-label={showControls ? 'Hide controls' : 'Show controls'}
                                            title={showControls ? 'Hide controls' : 'Show controls'}
                                            suppressHydrationWarning={true}
                                        >
                                            <svg
                                                className={`w-5 h-5 text-gray-600 transition-transform duration-300 ${showControls ? 'rotate-180' : ''}`}
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                {/* Game Grid */}
                                <div className="flex justify-center">
                                    {isHydrated ? (
                                        <div
                                            className="bg-gradient-to-br from-white to-gray-50 p-4 rounded-2xl shadow-xl border border-gray-200/50"
                                            style={{ width: 'fit-content' }}
                                        >
                                            <div style={gridContainerStyle}>
                                                {/* Render cells */}
                                                {gameState.grid.cells.map((row, rowIndex) =>
                                                    row.map((cell, colIndex) => (
                                                        <GameCell
                                                            key={`${rowIndex}-${colIndex}`}
                                                            cell={cell}
                                                            size={cellSize}
                                                            onClick={() => handleCellClick(rowIndex, colIndex)}
                                                            onRightClick={() => handleCellRightClick(rowIndex, colIndex)}
                                                        />
                                                    ))
                                                )}

                                                {/* Render constraint indicators */}
                                                {gameState.grid.constraints.map(constraint => (
                                                    <ConstraintIndicator
                                                        key={constraint.id}
                                                        constraint={constraint}
                                                        cellSize={cellSize}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    ) : (
                                        <div
                                            className="bg-gradient-to-br from-white to-gray-50 p-4 rounded-2xl shadow-xl border border-gray-200/50"
                                            style={{ width: 'fit-content' }}
                                        >
                                            <div style={gridContainerStyle}>
                                                {/* Loading skeleton */}
                                                {Array.from({ length: gameState.grid.size * gameState.grid.size }, (_, i) => (
                                                    <div
                                                        key={i}
                                                        className="bg-gray-200 animate-pulse rounded-lg"
                                                        style={{ width: cellSize, height: cellSize }}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Violation Messages */}
                                {isHydrated && gameState.grid.violations.length > 0 && (
                                    <div className="border-2 border-red-500 rounded-lg p-4 mb-6 bg-red-50 mt-6">
                                        <div className="text-red-800">
                                            {gameState.grid.violations.some(v => v.type === 'adjacent') && (
                                                <div className="mb-2 flex items-center gap-1 flex-wrap">
                                                    <span className="font-medium">Tango rule violation: Only 2 <SunIcon size={16} className="inline" /> or <MoonIcon size={16} className="inline" /> can touch, either vertically or horizontally.</span>
                                                </div>
                                            )}
                                            {gameState.grid.violations.some(v => v.type === 'balance') && (
                                                <div className="mb-2 flex items-center gap-1 flex-wrap">
                                                    <span className="font-medium">Tango rule violation: Each row and column must have equal <SunIcon size={16} className="inline" /> and <MoonIcon size={16} className="inline" />.</span>
                                                </div>
                                            )}
                                            {gameState.grid.violations.some(v => v.type === 'constraint') && (
                                                <div className="mb-2">
                                                    <span className="font-medium">Tango rule violation: Check the = and × constraint indicators.</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Game Rules Summary - SEO Friendly */}
                            </div>
                            <GameRulesSummary />

                            {/* Status Messages */}
                            {isHydrated && gameState.isGameComplete && (
                                <div className="max-w-2xl mx-auto mb-6">
                                    <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-4 rounded-xl shadow-lg">
                                        <div className="text-center">
                                            <div className="text-2xl font-bold mb-2">🎉 Tango Puzzle Complete!</div>
                                            <div className="text-sm mb-3">Time: {displayTime} | Moves: {gameState.moveHistory.length}</div>
                                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm mt-3">
                                                <div className="bg-white bg-opacity-20 rounded-lg p-3">
                                                    <div className="font-semibold flex items-center justify-center gap-1"><SunIcon size={16} className="inline" /> Circles</div>
                                                    <div>{gameState.grid.cells.flat().filter(cell => cell.value === 'circle').length} placed</div>
                                                </div>
                                                <div className="bg-white bg-opacity-20 rounded-lg p-3">
                                                    <div className="font-semibold flex items-center justify-center gap-1"><MoonIcon size={16} className="inline" /> Crescents</div>
                                                    <div>{gameState.grid.cells.flat().filter(cell => cell.value === 'crescent').length} placed</div>
                                                </div>
                                                <div className="bg-white bg-opacity-20 rounded-lg p-3">
                                                    <div className="font-semibold">✅ Progress</div>
                                                    <div>{gameState.grid.cells.flat().filter(cell => cell.value !== 'empty').length}/{gameState.grid.size * gameState.grid.size} cells</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Mobile Quick Controls - Only show when sidebar is hidden */}
                            {!showControls && (
                                <div className="lg:flex hidden justify-center gap-4 mb-6">
                                    <button
                                        onClick={handleClearGame}
                                        className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors font-medium shadow-md"
                                        suppressHydrationWarning={true}
                                    >
                                        🧹 Clear
                                    </button>
                                    <button
                                        onClick={handleNewGame}
                                        className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg transition-colors font-medium shadow-md"
                                        suppressHydrationWarning={true}
                                    >
                                        🎮 New Game
                                    </button>
                                </div>
                            )}

                            {/* Related Games Section */}
                            <div className="max-w-2xl mx-auto mb-6">
                                <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6">
                                    <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">🎮 More Games You&apos;ll Love</h2>
                                    <p className="text-gray-600 text-sm mb-6">
                                        Discovered through Tango Game Unlimited? Check out these other amazing games!
                                    </p>

                                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                        {relatedGames.map((game, index) => {
                                            const getHoverClasses = (color: string) => {
                                                switch (color) {
                                                    case 'blue': return 'hover:border-blue-300 group-hover:text-blue-600'
                                                    case 'green': return 'hover:border-green-300 group-hover:text-green-600'
                                                    case 'purple': return 'hover:border-purple-300 group-hover:text-purple-600'
                                                    case 'orange': return 'hover:border-orange-300 group-hover:text-orange-600'
                                                    default: return 'hover:border-gray-300 group-hover:text-gray-600'
                                                }
                                            }

                                            return (
                                                <a
                                                    key={index}
                                                    href={game.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={`group flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200 ${getHoverClasses(game.hoverColor).split(' ')[0]}`}
                                                >
                                                    <div className="w-16 h-16 mb-3 flex items-center justify-center">
                                                        <Image
                                                            src={game.logo}
                                                            alt={`${game.name} Logo`}
                                                            width={64}
                                                            height={64}
                                                            className="object-contain"
                                                        />
                                                    </div>
                                                    <h3 className={`font-medium text-gray-800 text-center ${getHoverClasses(game.hoverColor).split(' ')[1]}`}>{game.name}</h3>
                                                    <p className="text-xs text-gray-500 text-center mt-1">{game.category}</p>
                                                </a>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Control Panel - Collapsible */}
                        <div className={`w-full min-w-0 transition-all duration-300 overflow-hidden ${showControls ? 'lg:col-span-1 opacity-100 lg:max-w-none lg:block' : 'lg:col-span-0 opacity-0 lg:max-w-0 lg:hidden'
                            }`}>
                            <div className="bg-white rounded-xl shadow-lg p-3 sm:p-4 lg:p-6 mb-4 sm:mb-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-bold text-gray-800">Game Controls</h3>
                                    <button
                                        onClick={toggleControls}
                                        className="lg:flex hidden items-center justify-center w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                                        aria-label="Hide controls"
                                        suppressHydrationWarning={true}
                                    >
                                        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Game Mode Selection */}
                                <div className="mb-6">
                                    <label htmlFor="game-mode" className="block text-sm font-medium text-gray-700 mb-2">
                                        Game Mode:
                                    </label>
                                    <select
                                        id="game-mode"
                                        value={gameState.gameMode}
                                        onChange={(e) => handleGameModeChange(e.target.value as GameMode)}
                                        className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                                        suppressHydrationWarning={true}
                                    >
                                        <option value="unlimited">🎮 Unlimited Play</option>
                                        <option value="daily">
                                            🗓️ Daily Challenge {isHydrated && gameState.isDailyCompleted ? '✅' : ''}
                                        </option>
                                    </select>
                                </div>

                                {/* Grid Size Selection */}
                                {gameState.gameMode === 'unlimited' && (
                                    <div className="mb-6">
                                        <label htmlFor="grid-size" className="block text-sm font-medium text-gray-700 mb-2">
                                            Grid Size:
                                        </label>
                                        <div className="space-y-2">
                                            <button
                                                onClick={() => handleGridSizeChange(6)}
                                                className={`w-full px-3 py-2 rounded-lg text-sm transition-colors ${gameState.gridSize === 6
                                                    ? 'bg-primary text-white'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                    }`}
                                                suppressHydrationWarning={true}
                                            >
                                                6×6 - 10 clues
                                            </button>
                                            <button
                                                onClick={() => handleGridSizeChange(8)}
                                                className={`w-full px-3 py-2 rounded-lg text-sm transition-colors ${gameState.gridSize === 8
                                                    ? 'bg-primary text-white'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                    }`}
                                                suppressHydrationWarning={true}
                                            >
                                                8×8 - 15 clues
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* Action Buttons */}
                                <div className="space-y-3">
                                    <button
                                        onClick={handleNewGame}
                                        className="w-full bg-primary hover:bg-primary/90 text-white px-4 py-3 rounded-lg transition-colors font-medium shadow-md"
                                        suppressHydrationWarning={true}
                                    >
                                        🎮 New Game
                                    </button>

                                    <button
                                        onClick={handleClearGame}
                                        className="w-full bg-orange-500 hover:bg-orange-600 text-white px-4 py-3 rounded-lg transition-colors font-medium shadow-md"
                                        suppressHydrationWarning={true}
                                    >
                                        🧹 Clear Puzzle
                                    </button>

                                </div>
                            </div>

                            {/* Game Stats */}
                            <div className="bg-white rounded-xl shadow-lg p-3 sm:p-4 lg:p-6">
                                <h3 className="text-lg font-bold text-gray-800 mb-4">📊 Statistics</h3>

                                {/* Current Game Stats */}
                                <div className="mb-6">
                                    <h4 className="text-md font-semibold text-strawberry mb-3">🎮 {gameState.gameMode === 'daily' ? 'Daily Challenges' : 'Unlimited Play'}</h4>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600">Grid Size:</span>
                                            <span className="font-medium">{gameState.gridSize}×{gameState.gridSize}</span>
                                        </div>
                                        {dailyStats && gameState.gameMode === 'daily' && (
                                            <>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-gray-600">Current Streak:</span>
                                                    <span className="font-medium text-strawberry">{dailyStats.currentStreak}</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-gray-600">Best Streak:</span>
                                                    <span className="font-medium text-strawberry">{dailyStats.bestStreak}</span>
                                                </div>
                                            </>
                                        )}
                                        {unlimitedStats && gameState.gameMode === 'unlimited' && (
                                            <>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-gray-600">Easy:</span>
                                                    <span className="font-medium text-green-600">{unlimitedStats.easy.gamesWon}/{unlimitedStats.easy.gamesPlayed} ({unlimitedStats.easy.winRate}%)</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-gray-600">Hard:</span>
                                                    <span className="font-medium text-red-600">{unlimitedStats.hard.gamesWon}/{unlimitedStats.hard.gamesPlayed} ({unlimitedStats.hard.winRate}%)</span>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>

                                <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                                    <div className="text-sm text-yellow-800">
                                        <strong>💡 Tango Pro Tip:</strong> Start with rows/columns that are nearly complete, then tackle the constraint relationships! This winning strategy works perfectly for both LinkedIn&apos;s daily puzzle and our unlimited version.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* How to Play & FAQ Sections */}
                    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
                        {/* How to Play Collapsible Section */}
                        <div className="bg-white border border-gray-200 rounded-lg">
                            <button
                                onClick={() => setShowHowToPlay(!showHowToPlay)}
                                className="flex items-center justify-between w-full text-left p-4 sm:p-6 hover:bg-gray-50 transition-colors"
                                suppressHydrationWarning={true}
                            >
                                <h2 className="text-lg sm:text-xl font-semibold text-gray-800">How to Play Tango Game Unlimited</h2>
                                <span className={`transition-transform duration-200 text-gray-500 ${showHowToPlay ? 'rotate-180' : ''}`}>
                                    ▼
                                </span>
                            </button>

                            <div className={`transition-all duration-300 ${showHowToPlay ? 'block' : 'hidden'
                                }`}>
                                <div className="px-4 pb-4 sm:px-6 sm:pb-6 border-t border-gray-200">
                                    <div className="pt-4">
                                        <HowToPlay />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* FAQ Collapsible Section */}
                        <div className="bg-white border border-gray-200 rounded-lg">
                            <button
                                onClick={() => setShowFAQ(!showFAQ)}
                                className="flex items-center justify-between w-full text-left p-4 sm:p-6 hover:bg-gray-50 transition-colors"
                                suppressHydrationWarning={true}
                            >
                                <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Tango Game Unlimited FAQ</h2>
                                <span className={`transition-transform duration-200 text-gray-500 ${showFAQ ? 'rotate-180' : ''}`}>
                                    ▼
                                </span>
                            </button>

                            <div className={`transition-all duration-300 ${showFAQ ? 'block' : 'hidden'
                                }`}>
                                <div className="px-4 pb-4 sm:px-6 sm:pb-6 border-t border-gray-200">
                                    <div className="pt-4">
                                        <GameFAQ />
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
} 