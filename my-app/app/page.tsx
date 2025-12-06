'use client';

import { useState, useEffect, useRef } from 'react';

interface Statistics {
  totalRounds: number;
  wonRounds: number;
  lostRounds: number;
  totalWinnings: number;
  totalLosses: number;
}

export default function Home() {
  const [hoveredGame, setHoveredGame] = useState<string | null>(null);
  const [showStats, setShowStats] = useState(false);
  const [showGame, setShowGame] = useState(false);
  const [statistics, setStatistics] = useState<Statistics>({
    totalRounds: 0,
    wonRounds: 0,
    lostRounds: 0,
    totalWinnings: 0,
    totalLosses: 0,
  });

  // Load statistics from localStorage on mount
  useEffect(() => {
    const savedStats = localStorage.getItem('casinoStatistics');
    if (savedStats) {
      setStatistics(JSON.parse(savedStats));
    }
  }, []);

  // Save statistics to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('casinoStatistics', JSON.stringify(statistics));
  }, [statistics]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-red-950 to-black font-sans relative overflow-hidden">
      {/* Casino background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,215,0,0.1) 10px, rgba(255,215,0,0.1) 20px)`
        }}></div>
      </div>

      {/* Animated casino lights */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-red-600/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-yellow-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-green-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Floating casino chips */}
      <div className="absolute top-20 left-10 w-16 h-16 bg-red-600 rounded-full border-4 border-white shadow-lg animate-bounce" style={{ animationDelay: '0s' }}>
        <div className="w-full h-full flex items-center justify-center text-white font-bold text-xl">$</div>
      </div>
      <div className="absolute top-40 right-20 w-16 h-16 bg-blue-600 rounded-full border-4 border-white shadow-lg animate-bounce" style={{ animationDelay: '1s' }}>
        <div className="w-full h-full flex items-center justify-center text-white font-bold text-xl">$</div>
      </div>
      <div className="absolute bottom-32 left-20 w-16 h-16 bg-green-600 rounded-full border-4 border-white shadow-lg animate-bounce" style={{ animationDelay: '2s' }}>
        <div className="w-full h-full flex items-center justify-center text-white font-bold text-xl">$</div>
      </div>

      <main className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Casino Title */}
          <div className="mb-12 space-y-4">
            <h1 className="text-6xl md:text-8xl font-black tracking-wider text-white drop-shadow-2xl animate-fade-in">
              <span className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent">
                CASINO
              </span>
              <span className="text-red-600 ml-4">HALAL</span>
            </h1>
            <div className="flex items-center justify-center gap-2">
              <div className="h-1 w-16 bg-gradient-to-r from-transparent via-yellow-400 to-yellow-400"></div>
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              <div className="h-1 w-32 bg-gradient-to-r from-yellow-400 via-yellow-400 to-transparent"></div>
            </div>
            <p className="text-xl md:text-2xl text-yellow-200 mt-8 font-light tracking-wide">
              Willkommen im exklusiven Casino
            </p>
          </div>

          {/* Balance Display */}
          <div className="mb-12 flex justify-center">
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl px-8 py-4 border-2 border-yellow-500 shadow-2xl">
              <div className="text-yellow-400 text-sm uppercase tracking-wider mb-1">Guthaben</div>
              <div className="text-4xl font-bold text-white flex items-center gap-2">
                <span className="text-yellow-400">€</span>
                <span>10,000</span>
              </div>
            </div>
          </div>

          {/* Casino Games Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Roulette */}
            <button
              onMouseEnter={() => setHoveredGame('roulette')}
              onMouseLeave={() => setHoveredGame(null)}
              className={`group relative overflow-hidden rounded-xl bg-gradient-to-br from-red-900 to-red-800 p-8 border-4 transition-all duration-300 transform ${
                hoveredGame === 'roulette' ? 'border-yellow-400 scale-110 shadow-2xl shadow-yellow-500/50' : 'border-yellow-600/50 hover:border-yellow-500'
              }`}
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
              <div className="relative z-10">
                <div className="text-6xl mb-4">🎰</div>
                <h3 className="text-2xl font-bold text-white mb-2 uppercase tracking-wide">Roulette</h3>
                <p className="text-red-200 text-sm">Glücksrad drehen</p>
                <div className="mt-4 w-12 h-12 mx-auto bg-white rounded-full flex items-center justify-center">
                  <div className="w-8 h-8 bg-red-600 rounded-full"></div>
                </div>
              </div>
            </button>

            {/* Blackjack */}
            <button
              onMouseEnter={() => setHoveredGame('blackjack')}
              onMouseLeave={() => setHoveredGame(null)}
              className={`group relative overflow-hidden rounded-xl bg-gradient-to-br from-green-900 to-green-800 p-8 border-4 transition-all duration-300 transform ${
                hoveredGame === 'blackjack' ? 'border-yellow-400 scale-110 shadow-2xl shadow-yellow-500/50' : 'border-yellow-600/50 hover:border-yellow-500'
              }`}
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
              <div className="relative z-10">
                <div className="text-6xl mb-4">🃏</div>
                <h3 className="text-2xl font-bold text-white mb-2 uppercase tracking-wide">Blackjack</h3>
                <p className="text-green-200 text-sm">21 erreichen</p>
                <div className="mt-4 flex justify-center gap-2">
                  <div className="w-10 h-14 bg-white rounded border-2 border-black flex items-center justify-center text-black font-bold text-lg">A</div>
                  <div className="w-10 h-14 bg-white rounded border-2 border-black flex items-center justify-center text-red-600 font-bold text-lg">K</div>
                </div>
              </div>
            </button>

            {/* Slots */}
            <button
              onMouseEnter={() => setHoveredGame('slots')}
              onMouseLeave={() => setHoveredGame(null)}
              className={`group relative overflow-hidden rounded-xl bg-gradient-to-br from-purple-900 to-purple-800 p-8 border-4 transition-all duration-300 transform ${
                hoveredGame === 'slots' ? 'border-yellow-400 scale-110 shadow-2xl shadow-yellow-500/50' : 'border-yellow-600/50 hover:border-yellow-500'
              }`}
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
              <div className="relative z-10">
                <div className="text-6xl mb-4">🎲</div>
                <h3 className="text-2xl font-bold text-white mb-2 uppercase tracking-wide">Slots</h3>
                <p className="text-purple-200 text-sm">Drehen & Gewinnen</p>
                <div className="mt-4 flex justify-center gap-1">
                  <div className="w-8 h-12 bg-yellow-400 rounded border-2 border-yellow-600 flex items-center justify-center text-2xl">🍒</div>
                  <div className="w-8 h-12 bg-yellow-400 rounded border-2 border-yellow-600 flex items-center justify-center text-2xl">🍋</div>
                  <div className="w-8 h-12 bg-yellow-400 rounded border-2 border-yellow-600 flex items-center justify-center text-2xl">⭐</div>
                </div>
              </div>
            </button>

            {/* Chase Game */}
            <button
              onClick={() => setShowGame(true)}
              onMouseEnter={() => setHoveredGame('chase')}
              onMouseLeave={() => setHoveredGame(null)}
              className={`group relative overflow-hidden rounded-xl bg-gradient-to-br from-orange-900 to-orange-800 p-8 border-4 transition-all duration-300 transform ${
                hoveredGame === 'chase' ? 'border-yellow-400 scale-110 shadow-2xl shadow-yellow-500/50' : 'border-yellow-600/50 hover:border-yellow-500'
              }`}
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
              <div className="relative z-10">
                <div className="text-6xl mb-4">🚗</div>
                <h3 className="text-2xl font-bold text-white mb-2 uppercase tracking-wide">Verfolgungsjagd</h3>
                <p className="text-orange-200 text-sm">Entkomme der Polizei</p>
                <div className="mt-4 flex justify-center gap-1">
                  <div className="w-8 h-8 bg-blue-600 rounded border-2 border-white flex items-center justify-center text-white text-xs">🚓</div>
                  <div className="w-8 h-8 bg-red-600 rounded border-2 border-white flex items-center justify-center text-white text-xs">🚗</div>
                </div>
              </div>
            </button>
          </div>

          {/* Casino Actions */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <button className="px-8 py-4 rounded-lg bg-gradient-to-r from-yellow-600 to-yellow-500 text-black font-bold border-2 border-yellow-400 hover:from-yellow-500 hover:to-yellow-400 transition-all duration-300 shadow-lg hover:shadow-yellow-500/50 transform hover:scale-105">
              💰 Einzahlen
            </button>
            <button 
              onClick={() => setShowStats(true)}
              className="px-8 py-4 rounded-lg bg-gradient-to-r from-gray-800 to-gray-700 text-yellow-400 font-bold border-2 border-yellow-600/50 hover:border-yellow-500 transition-all duration-300 shadow-lg hover:shadow-yellow-500/30 transform hover:scale-105"
            >
              📊 Statistiken
            </button>
            <button className="px-8 py-4 rounded-lg bg-gradient-to-r from-gray-800 to-gray-700 text-yellow-400 font-bold border-2 border-yellow-600/50 hover:border-yellow-500 transition-all duration-300 shadow-lg hover:shadow-yellow-500/30 transform hover:scale-105">
              🎯 Regeln
            </button>
          </div>
        </div>
      </main>

      {/* Chase Game */}
      {showGame && (
        <ChaseGame 
          onClose={() => setShowGame(false)}
          onGameEnd={(stars: number, time: number) => {
            // Update statistics when game ends
            setStatistics(prev => ({
              ...prev,
              totalRounds: prev.totalRounds + 1,
              wonRounds: stars > 0 ? prev.wonRounds + 1 : prev.wonRounds,
              lostRounds: stars === 0 ? prev.lostRounds + 1 : prev.lostRounds,
              totalWinnings: prev.totalWinnings + stars * 100,
              totalLosses: prev.totalLosses + (stars === 0 ? 50 : 0),
            }));
          }}
        />
      )}

      {/* Statistics Modal */}
      {showStats && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl border-4 border-yellow-500 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setShowStats(false)}
              className="absolute top-4 right-4 w-10 h-10 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center text-white font-bold text-xl transition-all duration-300 transform hover:scale-110"
            >
              ×
            </button>

            {/* Modal Content */}
            <div className="p-8">
              <h2 className="text-4xl md:text-5xl font-black text-center mb-8 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent">
                📊 STATISTIKEN
              </h2>

              {/* Statistics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Total Rounds */}
                <div className="bg-gradient-to-br from-blue-900/50 to-blue-800/50 rounded-xl p-6 border-2 border-blue-500/50">
                  <div className="text-blue-300 text-sm uppercase tracking-wider mb-2">Gesamt Runden</div>
                  <div className="text-4xl font-bold text-white">{statistics.totalRounds}</div>
                </div>

                {/* Win Rate */}
                <div className="bg-gradient-to-br from-green-900/50 to-green-800/50 rounded-xl p-6 border-2 border-green-500/50">
                  <div className="text-green-300 text-sm uppercase tracking-wider mb-2">Gewinnrate</div>
                  <div className="text-4xl font-bold text-white">
                    {statistics.totalRounds > 0 
                      ? `${Math.round((statistics.wonRounds / statistics.totalRounds) * 100)}%`
                      : '0%'}
                  </div>
                </div>

                {/* Won Rounds */}
                <div className="bg-gradient-to-br from-green-900/50 to-green-800/50 rounded-xl p-6 border-2 border-green-500/50">
                  <div className="text-green-300 text-sm uppercase tracking-wider mb-2">Gewonnene Runden</div>
                  <div className="text-4xl font-bold text-green-400">{statistics.wonRounds}</div>
                </div>

                {/* Lost Rounds */}
                <div className="bg-gradient-to-br from-red-900/50 to-red-800/50 rounded-xl p-6 border-2 border-red-500/50">
                  <div className="text-red-300 text-sm uppercase tracking-wider mb-2">Verlorene Runden</div>
                  <div className="text-4xl font-bold text-red-400">{statistics.lostRounds}</div>
                </div>
              </div>

              {/* Financial Statistics */}
              <div className="space-y-4 mb-6">
                {/* Total Winnings */}
                <div className="bg-gradient-to-r from-green-900/70 to-green-800/70 rounded-xl p-6 border-2 border-green-500/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-green-300 text-sm uppercase tracking-wider mb-1">Gesamtgewinne</div>
                      <div className="text-3xl font-bold text-green-400 flex items-center gap-2">
                        <span>+€</span>
                        <span>{statistics.totalWinnings.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                      </div>
                    </div>
                    <div className="text-5xl">💰</div>
                  </div>
                </div>

                {/* Total Losses */}
                <div className="bg-gradient-to-r from-red-900/70 to-red-800/70 rounded-xl p-6 border-2 border-red-500/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-red-300 text-sm uppercase tracking-wider mb-1">Gesamtverluste</div>
                      <div className="text-3xl font-bold text-red-400 flex items-center gap-2">
                        <span>-€</span>
                        <span>{statistics.totalLosses.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                      </div>
                    </div>
                    <div className="text-5xl">💸</div>
                  </div>
                </div>

                {/* Net Result */}
                <div className={`bg-gradient-to-r rounded-xl p-6 border-2 ${
                  (statistics.totalWinnings - statistics.totalLosses) >= 0
                    ? 'from-yellow-900/70 to-yellow-800/70 border-yellow-500/50'
                    : 'from-red-900/70 to-red-800/70 border-red-500/50'
                }`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className={`text-sm uppercase tracking-wider mb-1 ${
                        (statistics.totalWinnings - statistics.totalLosses) >= 0 ? 'text-yellow-300' : 'text-red-300'
                      }`}>
                        Netto Ergebnis
                      </div>
                      <div className={`text-4xl font-bold flex items-center gap-2 ${
                        (statistics.totalWinnings - statistics.totalLosses) >= 0 ? 'text-yellow-400' : 'text-red-400'
                      }`}>
                        <span>{(statistics.totalWinnings - statistics.totalLosses) >= 0 ? '+' : ''}€</span>
                        <span>{(statistics.totalWinnings - statistics.totalLosses).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                      </div>
                    </div>
                    <div className="text-5xl">
                      {(statistics.totalWinnings - statistics.totalLosses) >= 0 ? '🎉' : '📉'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Reset Button */}
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => {
                    if (confirm('Möchten Sie wirklich alle Statistiken zurücksetzen?')) {
                      setStatistics({
                        totalRounds: 0,
                        wonRounds: 0,
                        lostRounds: 0,
                        totalWinnings: 0,
                        totalLosses: 0,
                      });
                    }
                  }}
                  className="px-6 py-3 rounded-lg bg-gradient-to-r from-red-600 to-red-700 text-white font-bold border-2 border-red-500 hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-lg hover:shadow-red-500/50 transform hover:scale-105"
                >
                  🔄 Zurücksetzen
                </button>
                <button
                  onClick={() => setShowStats(false)}
                  className="px-6 py-3 rounded-lg bg-gradient-to-r from-gray-700 to-gray-800 text-yellow-400 font-bold border-2 border-yellow-600/50 hover:border-yellow-500 transition-all duration-300 shadow-lg hover:shadow-yellow-500/30 transform hover:scale-105"
                >
                  Schließen
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
    </div>
  );
}

// Chase Game Component
interface ChaseGameProps {
  onClose: () => void;
  onGameEnd: (stars: number, time: number) => void;
}

function ChaseGame({ onClose, onGameEnd }: ChaseGameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameLoopRef = useRef<number | undefined>(undefined);
  const keysRef = useRef<{ [key: string]: boolean }>({});
  const [gameState, setGameState] = useState<'playing' | 'gameOver'>('playing');
  const [stars, setStars] = useState(0);
  const [time, setTime] = useState(0);
  const [policeCount, setPoliceCount] = useState(1);

  // Game state
  const playerRef = useRef({ x: 400, y: 300, angle: 0, speed: 0 });
  const policeRef = useRef<Array<{ x: number; y: number; angle: number; speed: number }>>([]);
  const buildingsRef = useRef<Array<{ x: number; y: number; width: number; height: number }>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 800;
    canvas.height = 600;

    // Initialize player
    playerRef.current = { x: 400, y: 300, angle: 0, speed: 0 };

    // Initialize buildings (city blocks)
    buildingsRef.current = [];
    for (let i = 0; i < 15; i++) {
      buildingsRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        width: 60 + Math.random() * 80,
        height: 60 + Math.random() * 100,
      });
    }

    // Initialize police cars
    policeRef.current = [];
    for (let i = 0; i < policeCount; i++) {
      policeRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        angle: Math.random() * Math.PI * 2,
        speed: 2 + Math.random() * 1,
      });
    }

    // Keyboard handlers
    const handleKeyDown = (e: KeyboardEvent) => {
      keysRef.current[e.key] = true;
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current[e.key] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    let lastTime = Date.now();
    let gameStartTime = Date.now();

    // Game loop
    const gameLoop = () => {
      if (gameState === 'gameOver') return;

      const now = Date.now();
      const deltaTime = (now - lastTime) / 16; // Normalize to ~60fps
      lastTime = now;

      // Update time and stars
      const elapsed = (now - gameStartTime) / 1000;
      setTime(Math.floor(elapsed));
      const newStars = Math.floor(elapsed / 5); // 1 star every 5 seconds
      setStars(newStars);

      // Spawn more police cars over time
      const targetPoliceCount = 1 + Math.floor(elapsed / 10);
      if (targetPoliceCount > policeRef.current.length && policeRef.current.length < 8) {
        policeRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          angle: Math.random() * Math.PI * 2,
          speed: 2 + Math.random() * 1.5,
        });
        setPoliceCount(policeRef.current.length);
      }

      // Update player
      const player = playerRef.current;
      let acceleration = 0;
      let rotation = 0;

      if (keysRef.current['ArrowUp'] || keysRef.current['w'] || keysRef.current['W']) {
        acceleration = 0.2;
      }
      if (keysRef.current['ArrowDown'] || keysRef.current['s'] || keysRef.current['S']) {
        acceleration = -0.15;
      }
      if (keysRef.current['ArrowLeft'] || keysRef.current['a'] || keysRef.current['A']) {
        rotation = -0.1;
      }
      if (keysRef.current['ArrowRight'] || keysRef.current['d'] || keysRef.current['D']) {
        rotation = 0.1;
      }

      player.angle += rotation;
      player.speed += acceleration;
      player.speed *= 0.95; // Friction
      player.speed = Math.max(-4, Math.min(5, player.speed)); // Max speed

      player.x += Math.cos(player.angle) * player.speed;
      player.y += Math.sin(player.angle) * player.speed;

      // Wrap around screen
      if (player.x < 0) player.x = canvas.width;
      if (player.x > canvas.width) player.x = 0;
      if (player.y < 0) player.y = canvas.height;
      if (player.y > canvas.height) player.y = 0;

      // Update police cars
      policeRef.current.forEach((police, index) => {
        // Move towards player
        const dx = player.x - police.x;
        const dy = player.y - police.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance > 0) {
          police.angle = Math.atan2(dy, dx);
          police.x += Math.cos(police.angle) * police.speed;
          police.y += Math.sin(police.angle) * police.speed;
        }

        // Check collision with player
        const collisionDist = Math.sqrt(
          Math.pow(player.x - police.x, 2) + Math.pow(player.y - police.y, 2)
        );
        if (collisionDist < 25) {
          setGameState('gameOver');
          onGameEnd(newStars, Math.floor(elapsed));
        }
      });

      // Draw
      ctx.fillStyle = '#1a1a2e';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw road grid
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 2;
      for (let i = 0; i < canvas.width; i += 100) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
      }
      for (let i = 0; i < canvas.height; i += 100) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
      }

      // Draw buildings
      ctx.fillStyle = '#2c3e50';
      buildingsRef.current.forEach(building => {
        ctx.fillRect(building.x, building.y, building.width, building.height);
        ctx.strokeStyle = '#34495e';
        ctx.lineWidth = 2;
        ctx.strokeRect(building.x, building.y, building.width, building.height);
      });

      // Draw police cars
      policeRef.current.forEach(police => {
        ctx.save();
        ctx.translate(police.x, police.y);
        ctx.rotate(police.angle);
        
        // Police car body
        ctx.fillStyle = '#0066cc';
        ctx.fillRect(-15, -8, 30, 16);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(-10, -6, 20, 12);
        
        // Police lights
        ctx.fillStyle = '#ff0000';
        ctx.fillRect(-12, -10, 6, 4);
        ctx.fillStyle = '#0000ff';
        ctx.fillRect(6, -10, 6, 4);
        
        ctx.restore();
      });

      // Draw player car
      ctx.save();
      ctx.translate(player.x, player.y);
      ctx.rotate(player.angle);
      
      // Player car body
      ctx.fillStyle = '#e74c3c';
      ctx.fillRect(-15, -8, 30, 16);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(-10, -6, 20, 12);
      
      // Windows
      ctx.fillStyle = '#3498db';
      ctx.fillRect(-8, -4, 16, 8);
      
      ctx.restore();

      gameLoopRef.current = requestAnimationFrame(gameLoop);
    };

    gameLoopRef.current = requestAnimationFrame(gameLoop);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [gameState, onGameEnd]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
      <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl border-4 border-yellow-500 shadow-2xl p-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center text-white font-bold text-xl transition-all duration-300 transform hover:scale-110 z-10"
        >
          ×
        </button>

        {/* Game UI */}
        <div className="mb-4 flex justify-between items-center text-white">
          <div className="flex items-center gap-4">
            <div className="bg-gray-800 px-4 py-2 rounded-lg border-2 border-yellow-500">
              <span className="text-yellow-400 text-sm">⭐ Sterne: </span>
              <span className="text-white font-bold text-xl">{stars}</span>
            </div>
            <div className="bg-gray-800 px-4 py-2 rounded-lg border-2 border-blue-500">
              <span className="text-blue-400 text-sm">⏱️ Zeit: </span>
              <span className="text-white font-bold text-xl">{time}s</span>
            </div>
            <div className="bg-gray-800 px-4 py-2 rounded-lg border-2 border-red-500">
              <span className="text-red-400 text-sm">🚓 Polizei: </span>
              <span className="text-white font-bold text-xl">{policeCount}</span>
            </div>
          </div>
        </div>

        {/* Canvas */}
        <canvas
          ref={canvasRef}
          className="border-2 border-gray-700 rounded-lg bg-gray-900"
          style={{ display: 'block' }}
        />

        {/* Instructions */}
        <div className="mt-4 text-white text-center">
          <p className="text-sm text-gray-300">
            <span className="font-bold">Steuerung:</span> Pfeiltasten oder WASD zum Fahren
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Entkomme der Polizei so lange wie möglich! Je länger du überlebst, desto mehr Sterne bekommst du.
          </p>
        </div>

        {/* Game Over Overlay */}
        {gameState === 'gameOver' && (
          <div className="absolute inset-0 bg-black/80 flex items-center justify-center rounded-2xl">
            <div className="text-center text-white">
              <h2 className="text-4xl font-bold mb-4 text-red-500">GEFANGEN!</h2>
              <p className="text-2xl mb-2">Du hast {stars} ⭐ erhalten</p>
              <p className="text-xl mb-6 text-gray-300">Überlebenszeit: {time} Sekunden</p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => {
                    setGameState('playing');
                    setStars(0);
                    setTime(0);
                    setPoliceCount(1);
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-bold rounded-lg hover:from-green-700 hover:to-green-800 transition-all"
                >
                  Nochmal spielen
                </button>
                <button
                  onClick={onClose}
                  className="px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-800 text-white font-bold rounded-lg hover:from-gray-800 hover:to-gray-900 transition-all"
                >
                  Schließen
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
