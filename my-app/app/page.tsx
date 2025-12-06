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
  const [showInstructions, setShowInstructions] = useState(false);
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
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black font-sans relative overflow-hidden">
      {/* City background pattern - road grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 100px, rgba(255,255,255,0.1) 100px, rgba(255,255,255,0.1) 102px),
            repeating-linear-gradient(90deg, transparent, transparent 100px, rgba(255,255,255,0.1) 100px, rgba(255,255,255,0.1) 102px)
          `
        }}></div>
      </div>

      {/* Police lights effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-red-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Animated police cars in background */}
      <div className="absolute top-20 left-10 text-6xl animate-bounce" style={{ animationDelay: '0s' }}>🚓</div>
      <div className="absolute top-40 right-20 text-6xl animate-bounce" style={{ animationDelay: '1s' }}>🚓</div>
      <div className="absolute bottom-32 left-20 text-6xl animate-bounce" style={{ animationDelay: '2s' }}>🚓</div>
      <div className="absolute top-60 right-40 text-5xl animate-bounce" style={{ animationDelay: '1.5s' }}>🚗</div>

      <main className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Game Title */}
          <div className="mb-12 space-y-4">
            <h1 className="text-6xl md:text-8xl font-black tracking-wider text-white drop-shadow-2xl animate-fade-in">
              <span className="bg-gradient-to-r from-red-500 via-red-400 to-red-600 bg-clip-text text-transparent">
                VERFOLGUNGS
              </span>
              <span className="text-blue-400 ml-4">JAGD</span>
            </h1>
            <div className="flex items-center justify-center gap-2">
              <div className="h-1 w-16 bg-gradient-to-r from-transparent via-red-500 to-red-500"></div>
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              <div className="h-1 w-32 bg-gradient-to-r from-blue-500 via-blue-500 to-transparent"></div>
            </div>
            <p className="text-xl md:text-2xl text-gray-300 mt-8 font-light tracking-wide">
              Entkomme der Polizei so lange wie möglich!
            </p>
          </div>

          {/* High Score Display */}
          <div className="mb-12 flex justify-center">
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl px-8 py-4 border-2 border-red-500 shadow-2xl">
              <div className="text-red-400 text-sm uppercase tracking-wider mb-1">Bester Score</div>
              <div className="text-4xl font-bold text-white flex items-center gap-2">
                <span className="text-yellow-400">⭐</span>
                <span>{statistics.totalWinnings > 0 ? Math.floor(statistics.totalWinnings / 100) : 0}</span>
              </div>
            </div>
          </div>

          {/* Main Play Button */}
          <div className="mb-12">
            <button
              onClick={() => setShowGame(true)}
              onMouseEnter={() => setHoveredGame('play')}
              onMouseLeave={() => setHoveredGame(null)}
              className="group relative inline-flex items-center justify-center px-16 py-8 text-3xl font-bold text-white bg-gradient-to-r from-red-600 via-red-500 to-red-600 rounded-2xl shadow-2xl transform transition-all duration-300 hover:scale-110 hover:shadow-red-500/50 active:scale-95 overflow-hidden border-4 border-red-400"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-blue-500 via-red-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative flex items-center gap-4">
                <span className="text-4xl">🚗</span>
                SPIEL STARTEN
                <span className="text-4xl">🚓</span>
              </span>
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <button 
              onClick={() => setShowStats(true)}
              className="px-8 py-4 rounded-lg bg-gradient-to-r from-gray-800 to-gray-700 text-white font-bold border-2 border-gray-500 hover:border-gray-400 transition-all duration-300 shadow-lg hover:shadow-gray-500/30 transform hover:scale-105"
            >
              📊 Statistiken
            </button>
            <button 
              onClick={() => setShowInstructions(true)}
              className="px-8 py-4 rounded-lg bg-gradient-to-r from-gray-800 to-gray-700 text-white font-bold border-2 border-gray-500 hover:border-gray-400 transition-all duration-300 shadow-lg hover:shadow-gray-500/30 transform hover:scale-105"
            >
              🎯 Anleitung
            </button>
          </div>
        </div>
      </main>

      {/* Instructions Modal */}
      {showInstructions && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl border-4 border-red-500 shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setShowInstructions(false)}
              className="absolute top-4 right-4 w-10 h-10 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center text-white font-bold text-xl transition-all duration-300 transform hover:scale-110"
            >
              ×
            </button>

            {/* Modal Content */}
            <div className="p-8">
              <h2 className="text-4xl md:text-5xl font-black text-center mb-8 bg-gradient-to-r from-red-500 via-red-400 to-blue-500 bg-clip-text text-transparent">
                🎯 ANLEITUNG
              </h2>

              {/* Instructions Cards */}
              <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-6">
                <div className="bg-gradient-to-br from-yellow-900/50 to-yellow-800/50 rounded-xl p-6 border-2 border-yellow-500/50 backdrop-blur-sm">
                  <div className="flex items-start gap-4">
                    <div className="text-5xl">⭐</div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">Sterne sammeln</h3>
                      <p className="text-yellow-200 text-base">
                        Je länger du der Polizei entkommst, desto mehr Sterne sammelst du. 
                        Alle 5 Sekunden erhältst du einen Stern. Dein Ziel ist es, so viele Sterne wie möglich zu sammeln!
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-900/50 to-blue-800/50 rounded-xl p-6 border-2 border-blue-500/50 backdrop-blur-sm">
                  <div className="flex items-start gap-4">
                    <div className="text-5xl">🚓</div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">Polizei entkommen</h3>
                      <p className="text-blue-200 text-base">
                        Die Polizei verfolgt dich! Je länger du überlebst, desto mehr Polizeiautos erscheinen. 
                        Alle 10 Sekunden kommt ein neues Polizeiauto hinzu (maximal 8). 
                        Vermeide Kollisionen mit den Polizeiautos, sonst wirst du gefangen!
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-gray-800/50 to-gray-700/50 rounded-xl p-6 border-2 border-gray-500/50 backdrop-blur-sm">
                  <div className="flex items-start gap-4">
                    <div className="text-5xl">🎮</div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">Steuerung</h3>
                      <div className="text-gray-300 text-base space-y-2">
                        <p className="font-semibold mb-2">Verwende die Pfeiltasten oder WASD:</p>
                        <ul className="list-disc list-inside space-y-1 ml-2">
                          <li><span className="font-bold">↑ / W</span> - Beschleunigen</li>
                          <li><span className="font-bold">↓ / S</span> - Bremsen / Rückwärts</li>
                          <li><span className="font-bold">← / A</span> - Nach links lenken</li>
                          <li><span className="font-bold">→ / D</span> - Nach rechts lenken</li>
                        </ul>
                        <p className="mt-3 text-sm text-gray-400">
                          Tipp: Nutze die Gebäude als Deckung und bewege dich schnell, um der Polizei zu entkommen!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Close Button */}
              <div className="flex justify-center">
                <button
                  onClick={() => setShowInstructions(false)}
                  className="px-8 py-3 rounded-lg bg-gradient-to-r from-gray-700 to-gray-800 text-white font-bold border-2 border-gray-500 hover:border-gray-400 transition-all duration-300 shadow-lg hover:shadow-gray-500/30 transform hover:scale-105"
                >
                  Schließen
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
              <h2 className="text-4xl md:text-5xl font-black text-center mb-8 bg-gradient-to-r from-red-500 via-red-400 to-blue-500 bg-clip-text text-transparent">
                📊 STATISTIKEN
              </h2>

              {/* Statistics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Total Rounds */}
                <div className="bg-gradient-to-br from-blue-900/50 to-blue-800/50 rounded-xl p-6 border-2 border-blue-500/50">
                  <div className="text-blue-300 text-sm uppercase tracking-wider mb-2">Gesamt Spiele</div>
                  <div className="text-4xl font-bold text-white">{statistics.totalRounds}</div>
                </div>

                {/* Win Rate */}
                <div className="bg-gradient-to-br from-green-900/50 to-green-800/50 rounded-xl p-6 border-2 border-green-500/50">
                  <div className="text-green-300 text-sm uppercase tracking-wider mb-2">Erfolgsrate</div>
                  <div className="text-4xl font-bold text-white">
                    {statistics.totalRounds > 0 
                      ? `${Math.round((statistics.wonRounds / statistics.totalRounds) * 100)}%`
                      : '0%'}
                  </div>
                </div>

                {/* Won Rounds */}
                <div className="bg-gradient-to-br from-green-900/50 to-green-800/50 rounded-xl p-6 border-2 border-green-500/50">
                  <div className="text-green-300 text-sm uppercase tracking-wider mb-2">Erfolgreiche Fluchten</div>
                  <div className="text-4xl font-bold text-green-400">{statistics.wonRounds}</div>
                </div>

                {/* Lost Rounds */}
                <div className="bg-gradient-to-br from-red-900/50 to-red-800/50 rounded-xl p-6 border-2 border-red-500/50">
                  <div className="text-red-300 text-sm uppercase tracking-wider mb-2">Gefangen genommen</div>
                  <div className="text-4xl font-bold text-red-400">{statistics.lostRounds}</div>
                </div>
              </div>

              {/* Star Statistics */}
              <div className="space-y-4 mb-6">
                {/* Total Stars */}
                <div className="bg-gradient-to-r from-yellow-900/70 to-yellow-800/70 rounded-xl p-6 border-2 border-yellow-500/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-yellow-300 text-sm uppercase tracking-wider mb-1">Gesamt Sterne</div>
                      <div className="text-3xl font-bold text-yellow-400 flex items-center gap-2">
                        <span>⭐</span>
                        <span>{Math.floor(statistics.totalWinnings / 100)}</span>
                      </div>
                    </div>
                    <div className="text-5xl">⭐</div>
                  </div>
                </div>

                {/* Best Score */}
                <div className="bg-gradient-to-r from-red-900/70 to-red-800/70 rounded-xl p-6 border-2 border-red-500/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-red-300 text-sm uppercase tracking-wider mb-1">Bester Score</div>
                      <div className="text-3xl font-bold text-red-400 flex items-center gap-2">
                        <span>⭐</span>
                        <span>{statistics.wonRounds > 0 ? Math.floor(statistics.totalWinnings / 100 / Math.max(statistics.wonRounds, 1)) : 0}</span>
                      </div>
                    </div>
                    <div className="text-5xl">🏆</div>
                  </div>
                </div>

                {/* Total Play Time Estimate */}
                <div className={`bg-gradient-to-r rounded-xl p-6 border-2 from-blue-900/70 to-blue-800/70 border-blue-500/50`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-blue-300 text-sm uppercase tracking-wider mb-1">
                        Geschätzte Spielzeit
                      </div>
                      <div className="text-4xl font-bold flex items-center gap-2 text-blue-400">
                        <span>⏱️</span>
                        <span>{Math.floor(statistics.totalWinnings / 100) * 5}s</span>
                      </div>
                    </div>
                    <div className="text-5xl">⏱️</div>
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
                  className="px-6 py-3 rounded-lg bg-gradient-to-r from-gray-700 to-gray-800 text-white font-bold border-2 border-gray-500 hover:border-gray-400 transition-all duration-300 shadow-lg hover:shadow-gray-500/30 transform hover:scale-105"
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

      // Helper function to draw rounded rectangle
      const drawRoundedRect = (x: number, y: number, width: number, height: number, radius: number) => {
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
      };

      // Draw police cars
      policeRef.current.forEach(police => {
        ctx.save();
        ctx.translate(police.x, police.y);
        ctx.rotate(police.angle);
        
        // Shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.fillRect(-14, 10, 28, 8);
        
        // Police car body (main)
        ctx.fillStyle = '#1a4d8c';
        drawRoundedRect(-18, -10, 36, 20, 4);
        ctx.fill();
        
        // White stripe
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(-16, -8, 32, 4);
        ctx.fillRect(-16, 4, 32, 4);
        
        // Windows
        ctx.fillStyle = '#87ceeb';
        ctx.fillRect(-12, -6, 24, 8);
        ctx.strokeStyle = '#2c3e50';
        ctx.lineWidth = 1;
        ctx.strokeRect(-12, -6, 24, 8);
        
        // Police lights bar (animated)
        const lightTime = Date.now() % 1000;
        if (lightTime < 500) {
          ctx.fillStyle = '#ff0000';
          ctx.fillRect(-14, -14, 7, 4);
        } else {
          ctx.fillStyle = '#0000ff';
          ctx.fillRect(7, -14, 7, 4);
        }
        
        // Wheels
        ctx.fillStyle = '#1a1a1a';
        ctx.fillRect(-16, -12, 6, 4);
        ctx.fillRect(10, -12, 6, 4);
        ctx.fillRect(-16, 8, 6, 4);
        ctx.fillRect(10, 8, 6, 4);
        
        // Wheel rims
        ctx.fillStyle = '#666';
        ctx.fillRect(-15, -11, 4, 2);
        ctx.fillRect(11, -11, 4, 2);
        ctx.fillRect(-15, 9, 4, 2);
        ctx.fillRect(11, 9, 4, 2);
        
        ctx.restore();
      });

      // Draw player car
      ctx.save();
      ctx.translate(player.x, player.y);
      ctx.rotate(player.angle);
      
      // Shadow
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.fillRect(-14, 10, 28, 8);
      
      // Player car body (main)
      ctx.fillStyle = '#c0392b';
      drawRoundedRect(-18, -10, 36, 20, 4);
      ctx.fill();
      
      // Car details - hood
      ctx.fillStyle = '#a93226';
      ctx.fillRect(-18, -10, 36, 6);
      
      // Windows
      ctx.fillStyle = '#3498db';
      ctx.fillRect(-12, -6, 24, 8);
      ctx.strokeStyle = '#2c3e50';
      ctx.lineWidth = 1;
      ctx.strokeRect(-12, -6, 24, 8);
      
      // Window divider
      ctx.strokeStyle = '#2c3e50';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, -6);
      ctx.lineTo(0, 2);
      ctx.stroke();
      
      // Wheels
      ctx.fillStyle = '#1a1a1a';
      ctx.fillRect(-16, -12, 6, 4);
      ctx.fillRect(10, -12, 6, 4);
      ctx.fillRect(-16, 8, 6, 4);
      ctx.fillRect(10, 8, 6, 4);
      
      // Wheel rims
      ctx.fillStyle = '#e74c3c';
      ctx.fillRect(-15, -11, 4, 2);
      ctx.fillRect(11, -11, 4, 2);
      ctx.fillRect(-15, 9, 4, 2);
      ctx.fillRect(11, 9, 4, 2);
      
      // Headlights
      ctx.fillStyle = '#fffacd';
      ctx.fillRect(-18, -4, 3, 3);
      ctx.fillRect(15, -4, 3, 3);
      
      // Taillights
      ctx.fillStyle = '#ff0000';
      ctx.fillRect(-18, 1, 3, 3);
      ctx.fillRect(15, 1, 3, 3);
      
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

