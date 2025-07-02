import {
  SymbolPuzzleUserStats,
  SymbolPuzzleStatsUpdate,
  DEFAULT_SYMBOL_PUZZLE_STATS,
  Difficulty
} from '../../types/symbolPuzzle';

const STORAGE_KEY = 'symbol-puzzle-user-stats';
const STATS_VERSION = '1.0';

// Check if we're in a browser environment
const isBrowser = typeof window !== 'undefined' && typeof localStorage !== 'undefined';

/**
 * Get today's date string in YYYY-MM-DD format (UTC)
 */
function getTodaysDateString(): string {
  const now = new Date();
  const utc = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  return utc.toISOString().split('T')[0];
}

/**
 * Get symbol puzzle user stats from localStorage or return defaults
 */
export function getSymbolPuzzleUserStats(): SymbolPuzzleUserStats {
  if (!isBrowser) {
    return { ...DEFAULT_SYMBOL_PUZZLE_STATS };
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      // First time user - initialize with defaults
      const newStats = { ...DEFAULT_SYMBOL_PUZZLE_STATS };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newStats));
      return newStats;
    }

    const parsed = JSON.parse(stored);
    
    // Migrate data if needed
    const migrated = migrateStatsIfNeeded(parsed);
    
    // Ensure all required fields exist
    return { ...DEFAULT_SYMBOL_PUZZLE_STATS, ...migrated };
  } catch (error) {
    console.warn('Error loading symbol puzzle user stats, using defaults:', error);
    return { ...DEFAULT_SYMBOL_PUZZLE_STATS };
  }
}

/**
 * Save symbol puzzle user stats to localStorage
 */
function saveSymbolPuzzleUserStats(stats: SymbolPuzzleUserStats): void {
  if (!isBrowser) return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  } catch (error) {
    console.error('Error saving symbol puzzle user stats:', error);
  }
}

/**
 * Update symbol puzzle user stats with new game performance data
 */
export function updateSymbolPuzzleUserStats(update: SymbolPuzzleStatsUpdate): SymbolPuzzleUserStats {
  const currentStats = getSymbolPuzzleUserStats();
  const { gamePerformance, isNewDailyCompletion } = update;
  
  // Create updated stats
  const updatedStats: SymbolPuzzleUserStats = { ...currentStats };
  
  // Update game counters based on mode and difficulty
  if (gamePerformance.gameMode === 'daily') {
    updatedStats.dailyGamesPlayed++;
    if (gamePerformance.completed) {
      updatedStats.dailyGamesWon++;
    }
  } else {
    // Unlimited mode - update by difficulty
    const difficulty = gamePerformance.difficulty;
    if (difficulty === 'easy') {
      updatedStats.easyGamesPlayed++;
      if (gamePerformance.completed) {
        updatedStats.easyGamesWon++;
      }
    } else if (difficulty === 'hard') {
      updatedStats.hardGamesPlayed++;
      if (gamePerformance.completed) {
        updatedStats.hardGamesWon++;
      }
    }
  }
  
  // Update performance metrics (only for completed games)
  if (gamePerformance.completed) {
    // Time tracking
    updatedStats.totalTimePlayed += gamePerformance.duration;
    
    if (updatedStats.bestCompletionTime === 0 || gamePerformance.duration < updatedStats.bestCompletionTime) {
      updatedStats.bestCompletionTime = gamePerformance.duration;
    }
    
    // Update fastest solve for this difficulty
    const currentFastest = updatedStats.fastestSolves[gamePerformance.difficulty];
    if (currentFastest === 0 || gamePerformance.duration < currentFastest) {
      updatedStats.fastestSolves[gamePerformance.difficulty] = gamePerformance.duration;
    }
    
    // Move tracking
    updatedStats.totalMoves += gamePerformance.moves;
    

    
    // Calculate averages
    const totalCompletedGames = updatedStats.dailyGamesWon + 
      updatedStats.easyGamesWon + updatedStats.hardGamesWon;
    
    if (totalCompletedGames > 0) {
      updatedStats.averageCompletionTime = updatedStats.totalTimePlayed / totalCompletedGames;
      updatedStats.averageMovesPerGame = updatedStats.totalMoves / totalCompletedGames;
    }
    
    // Update daily challenge specific stats
    if (gamePerformance.gameMode === 'daily' && isNewDailyCompletion) {
      const today = getTodaysDateString();
      
      // Add today to completed dates
      if (!updatedStats.completedDates.includes(today)) {
        updatedStats.completedDates.push(today);
        updatedStats.completedDates.sort(); // Keep sorted
      }
      
      // Update last completion
      updatedStats.lastDailyCompletion = today;
      
      // Calculate streak
      updatedStats.dailyStreak = calculateCurrentStreak(updatedStats.completedDates);
      
      // Update best streak
      if (updatedStats.dailyStreak > updatedStats.bestStreak) {
        updatedStats.bestStreak = updatedStats.dailyStreak;
      }
    }
  }
  
  // Save updated stats
  saveSymbolPuzzleUserStats(updatedStats);
  return updatedStats;
}

/**
 * Calculate current daily streak
 */
function calculateCurrentStreak(completedDates: string[]): number {
  if (completedDates.length === 0) return 0;
  
  const today = getTodaysDateString();
  const sortedDates = [...completedDates].sort().reverse(); // Most recent first
  
  let streak = 0;
  const checkDate = new Date(today);
  
  for (const dateStr of sortedDates) {
    const checkDateStr = checkDate.toISOString().split('T')[0];
    
    if (dateStr === checkDateStr) {
      streak++;
      // Move to previous day
      checkDate.setUTCDate(checkDate.getUTCDate() - 1);
    } else if (dateStr < checkDateStr) {
      // There's a gap in the streak
      break;
    }
  }
  
  return streak;
}

/**
 * Migrate stats from older versions if needed
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function migrateStatsIfNeeded(stats: any): SymbolPuzzleUserStats {
  // Version 1.0 migration (initial version)
  const migrated: SymbolPuzzleUserStats = {
    // Preserve existing values or use defaults
    dailyStreak: stats.dailyStreak ?? 0,
    bestStreak: stats.bestStreak ?? 0,
    dailyGamesPlayed: stats.dailyGamesPlayed ?? 0,
    dailyGamesWon: stats.dailyGamesWon ?? 0,
    lastDailyCompletion: stats.lastDailyCompletion ?? '',
    
    easyGamesPlayed: stats.easyGamesPlayed ?? 0,
    easyGamesWon: stats.easyGamesWon ?? 0,
    hardGamesPlayed: stats.hardGamesPlayed ?? 0,
    hardGamesWon: stats.hardGamesWon ?? 0,
    
    totalTimePlayed: stats.totalTimePlayed ?? 0,
    averageCompletionTime: stats.averageCompletionTime ?? 0,
    bestCompletionTime: stats.bestCompletionTime ?? 0,
    totalMoves: stats.totalMoves ?? 0,
    averageMovesPerGame: stats.averageMovesPerGame ?? 0,
    
    completedDates: stats.completedDates ?? [],
    
    preferredDifficulty: stats.preferredDifficulty ?? 'easy',
    firstPlayDate: stats.firstPlayDate ?? new Date().toISOString(),
    
    fastestSolves: stats.fastestSolves ? {
      easy: stats.fastestSolves.easy ?? 0,
      hard: stats.fastestSolves.hard ?? 0
    } : { easy: 0, hard: 0 }
  };
  
  console.log('Migrated symbol puzzle user stats to version', STATS_VERSION);
  return migrated;
}

/**
 * Reset all symbol puzzle user stats
 */
export function resetSymbolPuzzleUserStats(): SymbolPuzzleUserStats {
  const newStats = { ...DEFAULT_SYMBOL_PUZZLE_STATS };
  saveSymbolPuzzleUserStats(newStats);
  return newStats;
}

/**
 * Check if daily challenge is completed today
 */
export function isSymbolPuzzleDailyCompletedToday(): boolean {
  const stats = getSymbolPuzzleUserStats();
  const today = getTodaysDateString();
  return stats.completedDates.includes(today);
}

/**
 * Mark today's daily challenge as completed
 */
export function markSymbolPuzzleDailyCompleted(): void {
  const stats = getSymbolPuzzleUserStats();
  const today = getTodaysDateString();
  
  if (!stats.completedDates.includes(today)) {
    stats.completedDates.push(today);
    stats.completedDates.sort();
    stats.lastDailyCompletion = today;
    
    // Recalculate streak
    stats.dailyStreak = calculateCurrentStreak(stats.completedDates);
    if (stats.dailyStreak > stats.bestStreak) {
      stats.bestStreak = stats.dailyStreak;
    }
    
    saveSymbolPuzzleUserStats(stats);
  }
}

/**
 * Get daily challenge statistics
 */
export function getSymbolPuzzleDailyStats(): {
  gamesPlayed: number;
  gamesWon: number;
  winRate: number;
  currentStreak: number;
  bestStreak: number;
} {
  const stats = getSymbolPuzzleUserStats();
  
  const winRate = stats.dailyGamesPlayed > 0 ? (stats.dailyGamesWon / stats.dailyGamesPlayed) * 100 : 0;
  
  return {
    gamesPlayed: stats.dailyGamesPlayed,
    gamesWon: stats.dailyGamesWon,
    winRate: Math.round(winRate),
    currentStreak: stats.dailyStreak,
    bestStreak: stats.bestStreak,
  };
}

/**
 * Get unlimited mode statistics by difficulty
 */
export function getSymbolPuzzleUnlimitedStats(): {
  easy: { gamesPlayed: number; gamesWon: number; winRate: number };
  hard: { gamesPlayed: number; gamesWon: number; winRate: number };
} {
  const stats = getSymbolPuzzleUserStats();
  
  const calculateWinRate = (won: number, played: number) => 
    played > 0 ? Math.round((won / played) * 100) : 0;
  
  return {
    easy: {
      gamesPlayed: stats.easyGamesPlayed,
      gamesWon: stats.easyGamesWon,
      winRate: calculateWinRate(stats.easyGamesWon, stats.easyGamesPlayed)
    },
    hard: {
      gamesPlayed: stats.hardGamesPlayed,
      gamesWon: stats.hardGamesWon,
      winRate: calculateWinRate(stats.hardGamesWon, stats.hardGamesPlayed)
    }
  };
}

/**
 * Get overall performance statistics
 */
export function getSymbolPuzzlePerformanceStats(): {
  averageTime: string;
  bestTime: string;
  totalGames: number;
  totalWins: number;
  fastestSolves: Record<Difficulty, string>;
} {
  const stats = getSymbolPuzzleUserStats();
  
  const totalGames = stats.dailyGamesPlayed + stats.easyGamesPlayed + stats.hardGamesPlayed;
  const totalWins = stats.dailyGamesWon + stats.easyGamesWon + stats.hardGamesWon;
  
  // Format time in MM:SS
  const formatTime = (ms: number): string => {
    if (ms === 0) return '--:--';
    const seconds = Math.round(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  return {
    averageTime: formatTime(stats.averageCompletionTime),
    bestTime: formatTime(stats.bestCompletionTime),
    totalGames,
    totalWins,
    fastestSolves: {
      easy: formatTime(stats.fastestSolves.easy),
      hard: formatTime(stats.fastestSolves.hard)
    }
  };
}

/**
 * Get comprehensive stats summary
 */
export function getSymbolPuzzleStatsSummary(): {
  dailyStats: ReturnType<typeof getSymbolPuzzleDailyStats>;
  unlimitedStats: ReturnType<typeof getSymbolPuzzleUnlimitedStats>;
  performanceStats: ReturnType<typeof getSymbolPuzzlePerformanceStats>;
} {
  return {
    dailyStats: getSymbolPuzzleDailyStats(),
    unlimitedStats: getSymbolPuzzleUnlimitedStats(),
    performanceStats: getSymbolPuzzlePerformanceStats()
  };
}

/**
 * Get today's seed for daily challenge (deterministic based on date)
 */
export function getSymbolPuzzleTodaysSeed(): number {
  const today = getTodaysDateString();
  let hash = 0;
  for (let i = 0; i < today.length; i++) {
    const char = today.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
} 