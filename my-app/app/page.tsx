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
      {/* Enhanced animated city skyline background */}
      <div className="absolute inset-0 opacity-25">
        <div className="absolute bottom-0 left-0 right-0 h-2/5 bg-gradient-to-t from-gray-800/60 via-gray-700/40 to-transparent">
          {/* City buildings silhouette with windows */}
          <svg className="w-full h-full" viewBox="0 0 1200 400" preserveAspectRatio="none" style={{
            animation: 'cityGlow 8s ease-in-out infinite'
          }}>
            {/* Buildings with varying heights and windows */}
            <g opacity="0.9">
              <rect x="0" y="200" width="80" height="200" fill="#1a1a2e"/>
              <rect x="5" y="220" width="12" height="15" fill="#ffd700" opacity="0.6"/>
              <rect x="25" y="240" width="12" height="15" fill="#ffd700" opacity="0.4"/>
              <rect x="45" y="220" width="12" height="15" fill="#ffd700" opacity="0.5"/>
              <rect x="65" y="260" width="12" height="15" fill="#ffd700" opacity="0.3"/>
              
              <rect x="100" y="150" width="100" height="250" fill="#1a1a2e"/>
              <rect x="110" y="170" width="15" height="18" fill="#ffd700" opacity="0.7"/>
              <rect x="135" y="190" width="15" height="18" fill="#ffd700" opacity="0.5"/>
              <rect x="160" y="170" width="15" height="18" fill="#ffd700" opacity="0.6"/>
              <rect x="110" y="220" width="15" height="18" fill="#ffd700" opacity="0.4"/>
              <rect x="135" y="240" width="15" height="18" fill="#ffd700" opacity="0.5"/>
              
              <rect x="220" y="180" width="70" height="220" fill="#1a1a2e"/>
              <rect x="230" y="200" width="12" height="15" fill="#ffd700" opacity="0.5"/>
              <rect x="250" y="220" width="12" height="15" fill="#ffd700" opacity="0.4"/>
              <rect x="270" y="200" width="12" height="15" fill="#ffd700" opacity="0.6"/>
              
              <rect x="310" y="120" width="90" height="280" fill="#1a1a2e"/>
              <rect x="325" y="140" width="15" height="18" fill="#ffd700" opacity="0.7"/>
              <rect x="350" y="160" width="15" height="18" fill="#ffd700" opacity="0.6"/>
              <rect x="375" y="140" width="15" height="18" fill="#ffd700" opacity="0.5"/>
              <rect x="325" y="190" width="15" height="18" fill="#ffd700" opacity="0.4"/>
              
              <rect x="420" y="160" width="80" height="240" fill="#1a1a2e"/>
              <rect x="435" y="180" width="12" height="15" fill="#ffd700" opacity="0.6"/>
              <rect x="455" y="200" width="12" height="15" fill="#ffd700" opacity="0.5"/>
              <rect x="475" y="180" width="12" height="15" fill="#ffd700" opacity="0.4"/>
              
              <rect x="520" y="140" width="110" height="260" fill="#1a1a2e"/>
              <rect x="540" y="160" width="15" height="18" fill="#ffd700" opacity="0.7"/>
              <rect x="570" y="180" width="15" height="18" fill="#ffd700" opacity="0.6"/>
              <rect x="600" y="160" width="15" height="18" fill="#ffd700" opacity="0.5"/>
              <rect x="540" y="210" width="15" height="18" fill="#ffd700" opacity="0.4"/>
              
              <rect x="650" y="170" width="75" height="230" fill="#1a1a2e"/>
              <rect x="665" y="190" width="12" height="15" fill="#ffd700" opacity="0.5"/>
              <rect x="685" y="210" width="12" height="15" fill="#ffd700" opacity="0.4"/>
              <rect x="705" y="190" width="12" height="15" fill="#ffd700" opacity="0.6"/>
              
              <rect x="745" y="100" width="95" height="300" fill="#1a1a2e"/>
              <rect x="760" y="120" width="15" height="18" fill="#ffd700" opacity="0.8"/>
              <rect x="785" y="140" width="15" height="18" fill="#ffd700" opacity="0.7"/>
              <rect x="810" y="120" width="15" height="18" fill="#ffd700" opacity="0.6"/>
              <rect x="760" y="170" width="15" height="18" fill="#ffd700" opacity="0.5"/>
              <rect x="785" y="190" width="15" height="18" fill="#ffd700" opacity="0.4"/>
              
              <rect x="860" y="180" width="85" height="220" fill="#1a1a2e"/>
              <rect x="875" y="200" width="12" height="15" fill="#ffd700" opacity="0.6"/>
              <rect x="895" y="220" width="12" height="15" fill="#ffd700" opacity="0.5"/>
              <rect x="915" y="200" width="12" height="15" fill="#ffd700" opacity="0.4"/>
              
              <rect x="965" y="150" width="100" height="250" fill="#1a1a2e"/>
              <rect x="980" y="170" width="15" height="18" fill="#ffd700" opacity="0.7"/>
              <rect x="1005" y="190" width="15" height="18" fill="#ffd700" opacity="0.6"/>
              <rect x="1030" y="170" width="15" height="18" fill="#ffd700" opacity="0.5"/>
              
              <rect x="1085" y="190" width="70" height="210" fill="#1a1a2e"/>
              <rect x="1095" y="210" width="12" height="15" fill="#ffd700" opacity="0.5"/>
              <rect x="1115" y="230" width="12" height="15" fill="#ffd700" opacity="0.4"/>
              <rect x="1135" y="210" width="12" height="15" fill="#ffd700" opacity="0.6"/>
            </g>
          </svg>
        </div>
      </div>
      
      {/* Moving traffic lights in background */}
      <div className="absolute bottom-0 left-0 right-0 h-1/4 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-8 bg-red-500 rounded-full opacity-60"
            style={{
              left: `${20 + i * 20}%`,
              bottom: '10%',
              animation: `trafficLight ${3 + i}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`
            }}
          ></div>
        ))}
      </div>

      {/* Blurred background game */}
      <div className="absolute inset-0 opacity-25 blur-2xl scale-110 pointer-events-none overflow-hidden">
        <BackgroundGame />
      </div>

      {/* Enhanced gradient overlay with animated colors */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/95 via-gray-800/90 to-black/95"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/10 via-transparent to-blue-900/10 animate-pulse"></div>

      {/* Animated road grid with perspective */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 120px, rgba(255,255,255,0.15) 120px, rgba(255,255,255,0.15) 122px),
            repeating-linear-gradient(90deg, transparent, transparent 120px, rgba(255,255,255,0.15) 120px, rgba(255,255,255,0.15) 122px)
          `,
          transform: 'perspective(1000px) rotateX(60deg) scale(1.2)',
          transformOrigin: 'center center'
        }}></div>
      </div>

      {/* Enhanced police lights effect with movement */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/30 rounded-full blur-3xl animate-pulse" style={{
          animation: 'float 6s ease-in-out infinite'
        }}></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-600/30 rounded-full blur-3xl animate-pulse" style={{ 
          animationDelay: '0.5s',
          animation: 'float 8s ease-in-out infinite'
        }}></div>
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-blue-500/25 rounded-full blur-3xl animate-pulse" style={{ 
          animationDelay: '1s',
          animation: 'float 7s ease-in-out infinite'
        }}></div>
        <div className="absolute bottom-1/3 right-0 w-80 h-80 bg-red-500/25 rounded-full blur-3xl animate-pulse" style={{ 
          animationDelay: '1.5s',
          animation: 'float 9s ease-in-out infinite'
        }}></div>
        {/* Additional moving lights */}
        <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-yellow-500/20 rounded-full blur-2xl animate-pulse" style={{
          animation: 'float 10s ease-in-out infinite',
          animationDelay: '2s'
        }}></div>
      </div>

      {/* Animated particles/stars */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `twinkle ${2 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>

      <main className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Game Title - Enhanced */}
          <div className="mb-16 space-y-6">
            <div className="relative">
              <h1 className="text-7xl md:text-9xl font-black tracking-wider text-white drop-shadow-2xl animate-fade-in relative z-10">
                <span className="bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 bg-clip-text text-transparent animate-pulse">
                  DODGE
                </span>
                <span className="text-yellow-400 ml-4 animate-pulse" style={{ animationDelay: '0.3s' }}>CAR</span>
              </h1>
              {/* Glow effect behind title */}
              <div className="absolute inset-0 blur-2xl opacity-50">
                <h1 className="text-7xl md:text-9xl font-black tracking-wider">
                  <span className="text-orange-500/50">DODGE</span>
                  <span className="text-yellow-400/50 ml-4">CAR</span>
                </h1>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <div className="h-1.5 w-24 bg-gradient-to-r from-transparent via-red-500 to-red-500 animate-pulse"></div>
              <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse shadow-lg shadow-red-500/50"></div>
              <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse shadow-lg shadow-blue-500/50" style={{ animationDelay: '0.5s' }}></div>
              <div className="h-1.5 w-40 bg-gradient-to-r from-blue-500 via-blue-500 to-transparent animate-pulse"></div>
            </div>
            <p className="text-2xl md:text-3xl text-gray-200 mt-10 font-light tracking-wide drop-shadow-lg">
              Entkomme der Polizei in der Stadt!
            </p>
            <p className="text-lg md:text-xl text-gray-400 mt-4 font-light">
              Nutze Drift-Effekte und Boost-Items für maximale Geschwindigkeit
            </p>
          </div>

          {/* High Score Display - Enhanced */}
          <div className="mb-16 flex justify-center">
            <div className="bg-gradient-to-r from-gray-800/90 via-gray-900/90 to-gray-800/90 backdrop-blur-sm rounded-3xl px-10 py-6 border-2 border-red-500/80 shadow-2xl shadow-red-500/20 transform hover:scale-105 transition-all duration-300">
              <div className="text-red-400 text-sm uppercase tracking-wider mb-2 font-bold">Bester Score</div>
              <div className="text-5xl font-black text-white flex items-center justify-center gap-3">
                <span className="text-yellow-400 text-6xl animate-pulse">⭐</span>
                <span className="bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent">
                  {statistics.totalWinnings > 0 ? Math.floor(statistics.totalWinnings / 100) : 0}
                </span>
              </div>
            </div>
          </div>

          {/* Main Play Button - Enhanced */}
          <div className="mb-16">
            <button
              onClick={() => setShowGame(true)}
              onMouseEnter={() => setHoveredGame('play')}
              onMouseLeave={() => setHoveredGame(null)}
              className="group relative inline-flex items-center justify-center px-20 py-10 text-4xl font-black text-white bg-gradient-to-r from-red-600 via-red-500 to-red-600 rounded-3xl shadow-2xl shadow-red-500/30 transform transition-all duration-300 hover:scale-110 hover:shadow-red-500/60 active:scale-95 overflow-hidden border-4 border-red-400/80"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-blue-500 via-red-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></span>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></span>
              <span className="relative flex items-center gap-6 z-10">
                <span className="text-5xl transform group-hover:rotate-12 transition-transform duration-300">🚗</span>
                <span className="drop-shadow-lg">SPIEL STARTEN</span>
                <span className="text-5xl transform group-hover:-rotate-12 transition-transform duration-300">🚓</span>
              </span>
            </button>
          </div>

          {/* Action Buttons - Enhanced */}
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            <button 
              onClick={() => setShowStats(true)}
              className="px-10 py-5 rounded-xl bg-gradient-to-r from-gray-800/90 to-gray-700/90 backdrop-blur-sm text-white font-bold text-lg border-2 border-gray-500/80 hover:border-yellow-400/80 transition-all duration-300 shadow-lg hover:shadow-yellow-500/30 transform hover:scale-110 hover:-translate-y-1"
            >
              <span className="flex items-center gap-2">
                <span className="text-2xl">📊</span>
                <span>Statistiken</span>
              </span>
            </button>
            <button 
              onClick={() => setShowInstructions(true)}
              className="px-10 py-5 rounded-xl bg-gradient-to-r from-gray-800/90 to-gray-700/90 backdrop-blur-sm text-white font-bold text-lg border-2 border-gray-500/80 hover:border-blue-400/80 transition-all duration-300 shadow-lg hover:shadow-blue-500/30 transform hover:scale-110 hover:-translate-y-1"
            >
              <span className="flex items-center gap-2">
                <span className="text-2xl">🎯</span>
                <span>Anleitung</span>
              </span>
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
                          💨 <span className="font-bold">Drift-Tipp:</span> Lenke schnell bei hoher Geschwindigkeit, um Drift-Effekte zu aktivieren! 
                          Nutze die Straßen und Gebäude als Deckung!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-green-900/50 to-green-800/50 rounded-xl p-6 border-2 border-green-500/50 backdrop-blur-sm">
                  <div className="flex items-start gap-4">
                    <div className="text-5xl">⚡</div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">Boost-Items</h3>
                      <p className="text-green-200 text-base">
                        Sammle die ⚡ Boost-Items auf der Straße! Sie geben dir für 5 Sekunden eine 
                        <span className="font-bold text-green-100"> massive Geschwindigkeitssteigerung</span> - perfekt zum Entkommen!
                      </p>
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
        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(30px, -30px) scale(1.1);
          }
        }
        @keyframes twinkle {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.5);
          }
        }
        @keyframes cityGlow {
          0%, 100% {
            filter: brightness(1);
          }
          50% {
            filter: brightness(1.2);
          }
        }
        @keyframes trafficLight {
          0%, 40% {
            background-color: #ff0000;
            opacity: 0.8;
          }
          50%, 90% {
            background-color: #00ff00;
            opacity: 0.6;
          }
          100% {
            background-color: #ff0000;
            opacity: 0.8;
          }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
    </div>
  );
}

// Background Game Component (blurred preview)
function BackgroundGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameLoopRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 800;
    canvas.height = 600;

    // Game state for background
    const player = { x: 400, y: 300, angle: 0, speed: 2 };
    const police: Array<{ x: number; y: number; angle: number; speed: number }> = [];
    const buildings: Array<{ x: number; y: number; width: number; height: number }> = [];

    // Initialize buildings
    for (let i = 0; i < 15; i++) {
      buildings.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        width: 60 + Math.random() * 80,
        height: 60 + Math.random() * 100,
      });
    }

    // Initialize police cars
    for (let i = 0; i < 3; i++) {
      police.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        angle: Math.random() * Math.PI * 2,
        speed: 2.5 + Math.random() * 1,
      });
    }

    let lastTime = Date.now();
    let gameStartTime = Date.now();

    const gameLoop = () => {
      const now = Date.now();
      const elapsed = (now - gameStartTime) / 1000;

      // Update player (auto-movement for demo)
      player.angle += 0.02;
      player.x += Math.cos(player.angle) * player.speed;
      player.y += Math.sin(player.angle) * player.speed;

      // Wrap around
      if (player.x < 0) player.x = canvas.width;
      if (player.x > canvas.width) player.x = 0;
      if (player.y < 0) player.y = canvas.height;
      if (player.y > canvas.height) player.y = 0;

      // Update police (chase player)
      police.forEach((p) => {
        const dx = player.x - p.x;
        const dy = player.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance > 0) {
          p.angle = Math.atan2(dy, dx);
          p.x += Math.cos(p.angle) * p.speed;
          p.y += Math.sin(p.angle) * p.speed;
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
      buildings.forEach(building => {
        ctx.fillRect(building.x, building.y, building.width, building.height);
      });

      // Draw police cars
      police.forEach(p => {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.fillStyle = '#1a4d8c';
        ctx.fillRect(-18, -10, 36, 20);
        ctx.restore();
      });

      // Draw player car
      ctx.save();
      ctx.translate(player.x, player.y);
      ctx.rotate(player.angle);
      ctx.fillStyle = '#c0392b';
      ctx.fillRect(-18, -10, 36, 20);
      ctx.restore();

      gameLoopRef.current = requestAnimationFrame(gameLoop);
    };

    gameLoopRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ display: 'block' }}
    />
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
  const playerRef = useRef({ x: 400, y: 300, angle: 0, speed: 0, vx: 0, vy: 0, boostActive: false, boostTimeLeft: 0 });
  const policeRef = useRef<Array<{ 
    x: number; 
    y: number; 
    angle: number; 
    speed: number;
    targetAngle: number;
    acceleration: number;
    maxSpeed: number;
  }>>([]);
  const buildingsRef = useRef<Array<{ x: number; y: number; width: number; height: number; buildingHeight: number; color: string }>>([]);
  const playerHistoryRef = useRef<Array<{ x: number; y: number; time: number }>>([]);
  const boostsRef = useRef<Array<{ x: number; y: number; id: number; collected: boolean }>>([]);
  const cameraRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef<Array<{ x: number; y: number; vx: number; vy: number; life: number; color: string }>>([]);
  const driftMarksRef = useRef<Array<{ x: number; y: number; angle: number; life: number; width: number }>>([]);
  const [boostActive, setBoostActive] = useState(false);
  const [boostTimeLeft, setBoostTimeLeft] = useState(0);
  
  // Game constants
  const GAME_CONSTANTS = {
    WORLD_WIDTH: 2400,
    WORLD_HEIGHT: 2400,
    CANVAS_WIDTH: 600, // Smaller canvas = more zoom
    CANVAS_HEIGHT: 450, // Smaller canvas = more zoom
    PLAYER_MAX_SPEED: 8,
    PLAYER_BOOST_MAX_SPEED: 16, // Much faster boost
    PLAYER_ACCELERATION: 0.3,
    PLAYER_ROTATION_SPEED: 0.12,
    POLICE_BASE_SPEED: 4,
    POLICE_MAX_COUNT: 8,
    BOOST_DURATION: 5,
    BOOST_SPAWN_RATE: 0.003,
    BOOST_MAX_COUNT: 3,
    COLLISION_DISTANCE: 25,
    CAMERA_SMOOTHING: 0.1,
    DRIFT_THRESHOLD: 0.15, // Speed difference for drift detection
    ROAD_WIDTH: 250, // Bigger streets
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size (viewport)
    canvas.width = GAME_CONSTANTS.CANVAS_WIDTH;
    canvas.height = GAME_CONSTANTS.CANVAS_HEIGHT;

    // Initialize camera
    cameraRef.current = { x: 0, y: 0 };

    // Initialize player in center of world
    playerRef.current = { 
      x: GAME_CONSTANTS.WORLD_WIDTH / 2, 
      y: GAME_CONSTANTS.WORLD_HEIGHT / 2, 
      angle: 0, 
      speed: 0, 
      vx: 0, 
      vy: 0, 
      boostActive: false, 
      boostTimeLeft: 0 
    };
    playerHistoryRef.current = [];
    boostsRef.current = [];
    particlesRef.current = [];
    driftMarksRef.current = [];

    // Initialize buildings (city blocks) - organized city layout with streets
    // Buildings are placed at the edges of streets as obstacles
    buildingsRef.current = [];
    const blockSize = 200;
    const streetWidth = GAME_CONSTANTS.ROAD_WIDTH;
    const buildingDepth = 50; // How far buildings extend from street edge
    
    // Color palette for buildings
    const buildingColors = [
      '#8B4513', // Brown
      '#4682B4', // Steel Blue
      '#2F4F4F', // Dark Slate Gray
      '#556B2F', // Dark Olive Green
      '#8B0000', // Dark Red
      '#483D8B', // Dark Slate Blue
      '#CD853F', // Peru
      '#708090', // Slate Gray
      '#B22222', // Fire Brick
      '#2E8B57', // Sea Green
    ];
    
    // Create organized city grid with streets - buildings at edges
    for (let blockX = 0; blockX < GAME_CONSTANTS.WORLD_WIDTH; blockX += blockSize + streetWidth) {
      for (let blockY = 0; blockY < GAME_CONSTANTS.WORLD_HEIGHT; blockY += blockSize + streetWidth) {
        // Place buildings along the edges of streets
        // Buildings on the left side of vertical streets (facing the street)
        if (Math.random() > 0.15 && blockX > 0) {
          const buildingHeight = 80 + Math.random() * 150; // 3D height
          buildingsRef.current.push({
            x: blockX - buildingDepth, // Left of the street
            y: blockY + streetWidth / 2 + Math.random() * 20,
            width: buildingDepth,
            height: 60 + Math.random() * 80,
            buildingHeight: buildingHeight,
            color: buildingColors[Math.floor(Math.random() * buildingColors.length)],
          });
        }
        // Buildings on the right side of vertical streets
        if (Math.random() > 0.15 && blockX + blockSize + streetWidth < GAME_CONSTANTS.WORLD_WIDTH) {
          const buildingHeight = 80 + Math.random() * 150;
          buildingsRef.current.push({
            x: blockX + blockSize + streetWidth, // Right of the street
            y: blockY + streetWidth / 2 + Math.random() * 20,
            width: buildingDepth,
            height: 60 + Math.random() * 80,
            buildingHeight: buildingHeight,
            color: buildingColors[Math.floor(Math.random() * buildingColors.length)],
          });
        }
        // Buildings on the top side of horizontal streets
        if (Math.random() > 0.15 && blockY > 0) {
          const buildingHeight = 80 + Math.random() * 150;
          buildingsRef.current.push({
            x: blockX + streetWidth / 2 + Math.random() * 20,
            y: blockY - buildingDepth, // Top of the street
            width: 60 + Math.random() * 80,
            height: buildingDepth,
            buildingHeight: buildingHeight,
            color: buildingColors[Math.floor(Math.random() * buildingColors.length)],
          });
        }
        // Buildings on the bottom side of horizontal streets
        if (Math.random() > 0.15 && blockY + blockSize + streetWidth < GAME_CONSTANTS.WORLD_HEIGHT) {
          const buildingHeight = 80 + Math.random() * 150;
          buildingsRef.current.push({
            x: blockX + streetWidth / 2 + Math.random() * 20,
            y: blockY + blockSize + streetWidth, // Bottom of the street
            width: 60 + Math.random() * 80,
            height: buildingDepth,
            buildingHeight: buildingHeight,
            color: buildingColors[Math.floor(Math.random() * buildingColors.length)],
          });
        }
      }
    }

    // Initialize police cars with smarter AI
    policeRef.current = [];
    for (let i = 0; i < policeCount; i++) {
      policeRef.current.push({
        x: Math.random() * GAME_CONSTANTS.WORLD_WIDTH,
        y: Math.random() * GAME_CONSTANTS.WORLD_HEIGHT,
        angle: Math.random() * Math.PI * 2,
        speed: 0,
        targetAngle: 0,
        acceleration: 0.2 + Math.random() * 0.15,
        maxSpeed: GAME_CONSTANTS.POLICE_BASE_SPEED + Math.random() * 2,
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

      // Get player reference early
      const player = playerRef.current;

      // Spawn boost items
      if (Math.random() < GAME_CONSTANTS.BOOST_SPAWN_RATE && 
          boostsRef.current.filter(b => !b.collected).length < GAME_CONSTANTS.BOOST_MAX_COUNT) {
        // Make sure boost doesn't spawn on buildings - spawn in world coordinates
        let validPosition = false;
        let boostX = 0;
        let boostY = 0;
        let attempts = 0;
        
        while (!validPosition && attempts < 20) {
          // Spawn near player but not too close
          const spawnDistance = 150 + Math.random() * 200;
          const spawnAngle = Math.random() * Math.PI * 2;
          boostX = player.x + Math.cos(spawnAngle) * spawnDistance;
          boostY = player.y + Math.sin(spawnAngle) * spawnDistance;
          
          // Keep within world bounds
          boostX = Math.max(50, Math.min(GAME_CONSTANTS.WORLD_WIDTH - 50, boostX));
          boostY = Math.max(50, Math.min(GAME_CONSTANTS.WORLD_HEIGHT - 50, boostY));
          
          validPosition = true;
          
          // Check if position is clear of buildings
          for (const building of buildingsRef.current) {
            if (boostX >= building.x - 30 && boostX <= building.x + building.width + 30 &&
                boostY >= building.y - 30 && boostY <= building.y + building.height + 30) {
              validPosition = false;
              break;
            }
          }
          attempts++;
        }
        
        if (validPosition) {
          boostsRef.current.push({
            x: boostX,
            y: boostY,
            id: Date.now() + Math.random(),
            collected: false
          });
        }
      }

      // Update boost timer
      if (player.boostActive) {
        player.boostTimeLeft -= deltaTime / 16;
        setBoostTimeLeft(Math.max(0, Math.floor(player.boostTimeLeft)));
        
        if (player.boostTimeLeft <= 0) {
          player.boostActive = false;
          setBoostActive(false);
        }
      }
      
      // Update particles
      particlesRef.current = particlesRef.current.filter(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 1;
        return p.life > 0;
      });

      // Spawn more police cars over time
      const targetPoliceCount = 1 + Math.floor(elapsed / 10);
      if (targetPoliceCount > policeRef.current.length && policeRef.current.length < GAME_CONSTANTS.POLICE_MAX_COUNT) {
        // Spawn near player but not too close
        const spawnDistance = 200 + Math.random() * 300;
        const spawnAngle = Math.random() * Math.PI * 2;
        policeRef.current.push({
          x: player.x + Math.cos(spawnAngle) * spawnDistance,
          y: player.y + Math.sin(spawnAngle) * spawnDistance,
          angle: Math.random() * Math.PI * 2,
          speed: 0,
          targetAngle: 0,
          acceleration: 0.2 + Math.random() * 0.15,
          maxSpeed: GAME_CONSTANTS.POLICE_BASE_SPEED + Math.random() * 2 + (elapsed * 0.15),
        });
        setPoliceCount(policeRef.current.length);
      }

      // Update player
      let acceleration = 0;
      let rotation = 0;

      if (keysRef.current['ArrowUp'] || keysRef.current['w'] || keysRef.current['W']) {
        acceleration = GAME_CONSTANTS.PLAYER_ACCELERATION;
      }
      if (keysRef.current['ArrowDown'] || keysRef.current['s'] || keysRef.current['S']) {
        acceleration = -GAME_CONSTANTS.PLAYER_ACCELERATION * 0.67;
      }
      if (keysRef.current['ArrowLeft'] || keysRef.current['a'] || keysRef.current['A']) {
        rotation = -GAME_CONSTANTS.PLAYER_ROTATION_SPEED;
      }
      if (keysRef.current['ArrowRight'] || keysRef.current['d'] || keysRef.current['D']) {
        rotation = GAME_CONSTANTS.PLAYER_ROTATION_SPEED;
      }

      // Calculate drift (difference between movement direction and car angle)
      const oldAngle = player.angle;
      player.angle += rotation;
      player.speed += acceleration;
      player.speed *= 0.96; // Friction
      
      // Apply boost speed multiplier - much faster
      const maxSpeed = player.boostActive ? GAME_CONSTANTS.PLAYER_BOOST_MAX_SPEED : GAME_CONSTANTS.PLAYER_MAX_SPEED;
      const minSpeed = player.boostActive ? -GAME_CONSTANTS.PLAYER_BOOST_MAX_SPEED * 0.67 : -GAME_CONSTANTS.PLAYER_MAX_SPEED * 0.75;
      player.speed = Math.max(minSpeed, Math.min(maxSpeed, player.speed));

      // Calculate movement direction
      const moveX = Math.cos(player.angle) * player.speed;
      const moveY = Math.sin(player.angle) * player.speed;
      
      // Detect drift (when turning while moving fast)
      const isDrifting = Math.abs(player.speed) > 3 && Math.abs(rotation) > 0.05;
      const driftIntensity = Math.min(Math.abs(player.speed) * Math.abs(rotation) / 2, 1);
      
      // Add drift physics (sideways movement)
      if (isDrifting && player.speed > 0) {
        const driftAngle = player.angle + Math.PI / 2;
        const driftForce = driftIntensity * 0.3;
        player.x += moveX + Math.cos(driftAngle) * driftForce;
        player.y += moveY + Math.sin(driftAngle) * driftForce;
        
        // Create drift marks (tire tracks)
        if (Math.random() < 0.4) {
          driftMarksRef.current.push({
            x: player.x - Math.cos(player.angle) * 15,
            y: player.y - Math.sin(player.angle) * 15,
            angle: player.angle + Math.PI / 2,
            life: 120,
            width: 3 + driftIntensity * 2
          });
          
          // Create drift particles
          for (let i = 0; i < 3; i++) {
            particlesRef.current.push({
              x: player.x - Math.cos(player.angle) * 15 + (Math.random() - 0.5) * 10,
              y: player.y - Math.sin(player.angle) * 15 + (Math.random() - 0.5) * 10,
              vx: (Math.random() - 0.5) * 2,
              vy: (Math.random() - 0.5) * 2,
              life: 20 + Math.random() * 15,
              color: '#888888'
            });
          }
        }
      } else {
        player.x += moveX;
        player.y += moveY;
      }
      
      // Update drift marks
      driftMarksRef.current = driftMarksRef.current.filter(mark => {
        mark.life -= 1;
        return mark.life > 0;
      });

      // Track player history for prediction (last 10 positions)
      playerHistoryRef.current.push({ x: player.x, y: player.y, time: now });
      if (playerHistoryRef.current.length > 10) {
        playerHistoryRef.current.shift();
      }

      // Check boost collection
      boostsRef.current.forEach(boost => {
        if (!boost.collected) {
          const dist = Math.sqrt(
            Math.pow(player.x - boost.x, 2) + Math.pow(player.y - boost.y, 2)
          );
          if (dist < 30) {
            boost.collected = true;
            player.boostActive = true;
            player.boostTimeLeft = GAME_CONSTANTS.BOOST_DURATION;
            setBoostActive(true);
            setBoostTimeLeft(GAME_CONSTANTS.BOOST_DURATION);
            
            // Create particle effect
            for (let i = 0; i < 15; i++) {
              particlesRef.current.push({
                x: boost.x,
                y: boost.y,
                vx: (Math.random() - 0.5) * 4,
                vy: (Math.random() - 0.5) * 4,
                life: 30 + Math.random() * 20,
                color: Math.random() > 0.5 ? '#00ff00' : '#ffff00'
              });
            }
          }
        }
      });

      // Remove old collected boosts
      boostsRef.current = boostsRef.current.filter(b => !b.collected || Date.now() - b.id < 1000);

      // Check collision with buildings (obstacles)
      const playerRadius = 18; // Approximate car radius
      buildingsRef.current.forEach(building => {
        // Check if player collides with building
        const playerCenterX = player.x;
        const playerCenterY = player.y;
        
        // Find closest point on building rectangle to player
        const closestX = Math.max(building.x, Math.min(playerCenterX, building.x + building.width));
        const closestY = Math.max(building.y, Math.min(playerCenterY, building.y + building.height));
        
        // Calculate distance from player to closest point
        const dx = playerCenterX - closestX;
        const dy = playerCenterY - closestY;
        const distanceSq = dx * dx + dy * dy;
        
        // If collision detected, push player back
        if (distanceSq < playerRadius * playerRadius) {
          const distance = Math.sqrt(distanceSq);
          if (distance > 0) {
            // Push player away from building
            const pushX = (dx / distance) * (playerRadius - distance + 1);
            const pushY = (dy / distance) * (playerRadius - distance + 1);
            player.x += pushX;
            player.y += pushY;
            // Slow down when hitting building
            player.speed *= 0.7;
          }
        }
      });

      // Keep player within world bounds (no wrap around - open city)
      const margin = 50;
      if (player.x < margin) {
        player.x = margin;
        player.speed *= 0.5; // Bounce effect
      }
      if (player.x > GAME_CONSTANTS.WORLD_WIDTH - margin) {
        player.x = GAME_CONSTANTS.WORLD_WIDTH - margin;
        player.speed *= 0.5;
      }
      if (player.y < margin) {
        player.y = margin;
        player.speed *= 0.5;
      }
      if (player.y > GAME_CONSTANTS.WORLD_HEIGHT - margin) {
        player.y = GAME_CONSTANTS.WORLD_HEIGHT - margin;
        player.speed *= 0.5;
      }

      // Update camera to follow player smoothly
      const targetCameraX = player.x - GAME_CONSTANTS.CANVAS_WIDTH / 2;
      const targetCameraY = player.y - GAME_CONSTANTS.CANVAS_HEIGHT / 2;
      
      // Smooth camera movement
      cameraRef.current.x += (targetCameraX - cameraRef.current.x) * GAME_CONSTANTS.CAMERA_SMOOTHING;
      cameraRef.current.y += (targetCameraY - cameraRef.current.y) * GAME_CONSTANTS.CAMERA_SMOOTHING;
      
      // Keep camera within world bounds
      cameraRef.current.x = Math.max(0, Math.min(GAME_CONSTANTS.WORLD_WIDTH - GAME_CONSTANTS.CANVAS_WIDTH, cameraRef.current.x));
      cameraRef.current.y = Math.max(0, Math.min(GAME_CONSTANTS.WORLD_HEIGHT - GAME_CONSTANTS.CANVAS_HEIGHT, cameraRef.current.y));

      // Update police cars with smarter AI
      policeRef.current.forEach((police, index) => {
        // Update max speed based on elapsed time (gets faster over time)
        police.maxSpeed = 4 + Math.random() * 2 + (elapsed * 0.2); // Faster police
        
        // Calculate direct distance to player
        const dx = player.x - police.x;
        const dy = player.y - police.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Predict player position based on movement history
        let predictedX = player.x;
        let predictedY = player.y;
        
        if (playerHistoryRef.current.length >= 3) {
          const recent = playerHistoryRef.current.slice(-3);
          const vx = (recent[2].x - recent[0].x) / (recent[2].time - recent[0].time) * 16;
          const vy = (recent[2].y - recent[0].y) / (recent[2].time - recent[0].time) * 16;
          // Predict where player will be in 0.5 seconds
          predictedX = player.x + vx * 0.5;
          predictedY = player.y + vy * 0.5;
        }
        
        // Calculate angle to predicted position
        const predDx = predictedX - police.x;
        const predDy = predictedY - police.y;
        const predDistance = Math.sqrt(predDx * predDx + predDy * predDy);
        
        // Smart targeting: mix of direct and predicted position
        const predictionWeight = Math.min(distance / 200, 0.7); // More prediction when far away
        const targetX = player.x * (1 - predictionWeight) + predictedX * predictionWeight;
        const targetY = player.y * (1 - predictionWeight) + predictedY * predictionWeight;
        
        // Calculate target angle
        const targetDx = targetX - police.x;
        const targetDy = targetY - police.y;
        police.targetAngle = Math.atan2(targetDy, targetDx);
        
        // Smooth rotation towards target (smarter turning)
        let angleDiff = police.targetAngle - police.angle;
        // Normalize angle difference to [-PI, PI]
        while (angleDiff > Math.PI) angleDiff -= 2 * Math.PI;
        while (angleDiff < -Math.PI) angleDiff += 2 * Math.PI;
        
        // Turn faster when far from target, slower when close (for better control)
        const turnSpeed = 0.08 + Math.min(distance / 300, 0.05);
        police.angle += Math.sign(angleDiff) * Math.min(Math.abs(angleDiff), turnSpeed);
        
        // Acceleration and speed management
        if (distance > 50) {
          // Accelerate towards player
          police.speed = Math.min(police.speed + police.acceleration, police.maxSpeed);
        } else {
          // Slow down when close for better control
          police.speed = Math.max(police.speed - police.acceleration * 0.5, police.maxSpeed * 0.7);
        }
        
        // Apply friction
        police.speed *= 0.98;
        
        // Move police car
        police.x += Math.cos(police.angle) * police.speed;
        police.y += Math.sin(police.angle) * police.speed;
        
        // Avoid buildings (simple collision avoidance)
        buildingsRef.current.forEach(building => {
          const buildingCenterX = building.x + building.width / 2;
          const buildingCenterY = building.y + building.height / 2;
          const distToBuilding = Math.sqrt(
            Math.pow(police.x - buildingCenterX, 2) + 
            Math.pow(police.y - buildingCenterY, 2)
          );
          
          if (distToBuilding < 80) {
            // Steer away from building
            const avoidAngle = Math.atan2(police.y - buildingCenterY, police.x - buildingCenterX);
            const avoidWeight = (80 - distToBuilding) / 80;
            police.angle += (avoidAngle - police.angle) * avoidWeight * 0.1;
          }
        });
        
        // Coordinate with other police cars (flanking behavior)
        policeRef.current.forEach((otherPolice, otherIndex) => {
          if (index !== otherIndex) {
            const distToOther = Math.sqrt(
              Math.pow(police.x - otherPolice.x, 2) + 
              Math.pow(police.y - otherPolice.y, 2)
            );
            
            if (distToOther < 100 && distToOther > 30) {
              // Try to spread out around player
              const angleToOther = Math.atan2(otherPolice.y - police.y, otherPolice.x - police.x);
              const angleToPlayer = Math.atan2(player.y - police.y, player.x - police.x);
              const angleDiff = angleToOther - angleToPlayer;
              
              // Steer to create better coverage
              if (Math.abs(angleDiff) < Math.PI / 2) {
                police.angle += Math.sign(angleDiff) * 0.05;
              }
            }
          }
        });

        // Check collision with player (optimized distance check)
        const collisionDx = player.x - police.x;
        const collisionDy = player.y - police.y;
        const collisionDistSq = collisionDx * collisionDx + collisionDy * collisionDy;
        if (collisionDistSq < GAME_CONSTANTS.COLLISION_DISTANCE * GAME_CONSTANTS.COLLISION_DISTANCE) {
          // Create explosion particles
          for (let i = 0; i < 20; i++) {
            particlesRef.current.push({
              x: player.x,
              y: player.y,
              vx: (Math.random() - 0.5) * 6,
              vy: (Math.random() - 0.5) * 6,
              life: 40 + Math.random() * 20,
              color: Math.random() > 0.5 ? '#ff0000' : '#ff6600'
            });
          }
          setGameState('gameOver');
          onGameEnd(newStars, Math.floor(elapsed));
        }
      });

      // Apply camera transform
      ctx.save();
      ctx.translate(-cameraRef.current.x, -cameraRef.current.y);

      // Draw world background with gradient (grass/ground)
      const bgGradient = ctx.createLinearGradient(0, 0, GAME_CONSTANTS.WORLD_WIDTH, GAME_CONSTANTS.WORLD_HEIGHT);
      bgGradient.addColorStop(0, '#2d5016'); // Dark green
      bgGradient.addColorStop(0.5, '#3a6b1f'); // Medium green
      bgGradient.addColorStop(1, '#2d5016'); // Dark green
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, GAME_CONSTANTS.WORLD_WIDTH, GAME_CONSTANTS.WORLD_HEIGHT);

      // Draw streets (organized grid) with 3D effect
      const blockSize = 200;
      const streetWidth = GAME_CONSTANTS.ROAD_WIDTH;
      
      // Draw horizontal streets with gradient
      for (let y = 0; y < GAME_CONSTANTS.WORLD_HEIGHT; y += blockSize + streetWidth) {
        if (y + streetWidth >= cameraRef.current.y - 50 && y <= cameraRef.current.y + GAME_CONSTANTS.CANVAS_HEIGHT + 50) {
          const streetGradient = ctx.createLinearGradient(0, y, 0, y + streetWidth);
          streetGradient.addColorStop(0, '#404040'); // Dark gray
          streetGradient.addColorStop(0.5, '#2a2a2a'); // Very dark gray
          streetGradient.addColorStop(1, '#404040'); // Dark gray
          ctx.fillStyle = streetGradient;
          ctx.fillRect(0, y, GAME_CONSTANTS.WORLD_WIDTH, streetWidth);
          
          // Add texture (small dots for asphalt)
          ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
          for (let tx = 0; tx < GAME_CONSTANTS.WORLD_WIDTH; tx += 15) {
            for (let ty = y; ty < y + streetWidth; ty += 15) {
              if ((tx + ty) % 30 < 15) {
                ctx.fillRect(tx, ty, 2, 2);
              }
            }
          }
        }
      }
      
      // Draw vertical streets with gradient
      for (let x = 0; x < GAME_CONSTANTS.WORLD_WIDTH; x += blockSize + streetWidth) {
        if (x + streetWidth >= cameraRef.current.x - 50 && x <= cameraRef.current.x + GAME_CONSTANTS.CANVAS_WIDTH + 50) {
          const streetGradient = ctx.createLinearGradient(x, 0, x + streetWidth, 0);
          streetGradient.addColorStop(0, '#404040');
          streetGradient.addColorStop(0.5, '#2a2a2a');
          streetGradient.addColorStop(1, '#404040');
          ctx.fillStyle = streetGradient;
          ctx.fillRect(x, 0, streetWidth, GAME_CONSTANTS.WORLD_HEIGHT);
          
          // Add texture
          ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
          for (let tx = x; tx < x + streetWidth; tx += 15) {
            for (let ty = 0; ty < GAME_CONSTANTS.WORLD_HEIGHT; ty += 15) {
              if ((tx + ty) % 30 < 15) {
                ctx.fillRect(tx, ty, 2, 2);
              }
            }
          }
        }
      }
      
      // Draw street markings (center lines) with glow effect
      ctx.strokeStyle = '#ffff00';
      ctx.lineWidth = 3;
      ctx.shadowBlur = 5;
      ctx.shadowColor = '#ffff00';
      ctx.setLineDash([25, 15]);
      
      // Horizontal center lines
      for (let y = 0; y < GAME_CONSTANTS.WORLD_HEIGHT; y += blockSize + streetWidth) {
        const centerY = y + streetWidth / 2;
        if (centerY >= cameraRef.current.y - 50 && centerY <= cameraRef.current.y + GAME_CONSTANTS.CANVAS_HEIGHT + 50) {
          ctx.beginPath();
          ctx.moveTo(0, centerY);
          ctx.lineTo(GAME_CONSTANTS.WORLD_WIDTH, centerY);
          ctx.stroke();
        }
      }
      
      // Vertical center lines
      for (let x = 0; x < GAME_CONSTANTS.WORLD_WIDTH; x += blockSize + streetWidth) {
        const centerX = x + streetWidth / 2;
        if (centerX >= cameraRef.current.x - 50 && centerX <= cameraRef.current.x + GAME_CONSTANTS.CANVAS_WIDTH + 50) {
          ctx.beginPath();
          ctx.moveTo(centerX, 0);
          ctx.lineTo(centerX, GAME_CONSTANTS.WORLD_HEIGHT);
          ctx.stroke();
        }
      }
      
      ctx.shadowBlur = 0;
      ctx.setLineDash([]);
      
      // Draw sidewalk edges
      ctx.strokeStyle = '#555555';
      ctx.lineWidth = 2;
      for (let y = 0; y < GAME_CONSTANTS.WORLD_HEIGHT; y += blockSize + streetWidth) {
        const topY = y;
        const bottomY = y + streetWidth;
        if (topY >= cameraRef.current.y - 50 && topY <= cameraRef.current.y + GAME_CONSTANTS.CANVAS_HEIGHT + 50) {
          ctx.beginPath();
          ctx.moveTo(0, topY);
          ctx.lineTo(GAME_CONSTANTS.WORLD_WIDTH, topY);
          ctx.stroke();
        }
        if (bottomY >= cameraRef.current.y - 50 && bottomY <= cameraRef.current.y + GAME_CONSTANTS.CANVAS_HEIGHT + 50) {
          ctx.beginPath();
          ctx.moveTo(0, bottomY);
          ctx.lineTo(GAME_CONSTANTS.WORLD_WIDTH, bottomY);
          ctx.stroke();
        }
      }
      for (let x = 0; x < GAME_CONSTANTS.WORLD_WIDTH; x += blockSize + streetWidth) {
        const leftX = x;
        const rightX = x + streetWidth;
        if (leftX >= cameraRef.current.x - 50 && leftX <= cameraRef.current.x + GAME_CONSTANTS.CANVAS_WIDTH + 50) {
          ctx.beginPath();
          ctx.moveTo(leftX, 0);
          ctx.lineTo(leftX, GAME_CONSTANTS.WORLD_HEIGHT);
          ctx.stroke();
        }
        if (rightX >= cameraRef.current.x - 50 && rightX <= cameraRef.current.x + GAME_CONSTANTS.CANVAS_WIDTH + 50) {
          ctx.beginPath();
          ctx.moveTo(rightX, 0);
          ctx.lineTo(rightX, GAME_CONSTANTS.WORLD_HEIGHT);
          ctx.stroke();
        }
      }
      
      // Draw drift marks (tire tracks)
      driftMarksRef.current.forEach(mark => {
        const alpha = mark.life / 120;
        ctx.strokeStyle = `rgba(100, 100, 100, ${alpha * 0.6})`;
        ctx.lineWidth = mark.width * alpha;
        ctx.beginPath();
        ctx.moveTo(
          mark.x - Math.cos(mark.angle) * 8,
          mark.y - Math.sin(mark.angle) * 8
        );
        ctx.lineTo(
          mark.x + Math.cos(mark.angle) * 8,
          mark.y + Math.sin(mark.angle) * 8
        );
        ctx.stroke();
      });
      
      // Draw particles
      particlesRef.current.forEach(particle => {
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.life / 50;
        ctx.fillRect(particle.x - 2, particle.y - 2, 4, 4);
      });
      ctx.globalAlpha = 1;

      // Helper function for isometric projection (3D to 2D)
      // Creates a 3D perspective view from above/side
      const isoProject = (x: number, y: number, z: number) => {
        // Isometric projection with perspective
        // Looking from above at an angle
        const angle = Math.PI / 4; // 45 degree viewing angle
        const isoX = x + (y * 0.5); // Shift for perspective
        const isoY = y * 0.5 - z; // Height affects Y position
        return { x: isoX, y: isoY };
      };

      // Draw buildings in 3D (only those in view)
      buildingsRef.current.forEach(building => {
        // Only draw if building is in camera view (with margin) - optimized check
        if (building.x + building.width >= cameraRef.current.x - 200 &&
            building.x <= cameraRef.current.x + GAME_CONSTANTS.CANVAS_WIDTH + 200 &&
            building.y + building.height >= cameraRef.current.y - 200 &&
            building.y <= cameraRef.current.y + GAME_CONSTANTS.CANVAS_HEIGHT + 200) {
          
          const b = building;
          const isoScale = 0.7; // Scale for isometric view
          const baseX = b.x;
          const baseY = b.y;
          const baseZ = 0;
          const height = b.buildingHeight * isoScale;
          
          // Isometric projection points
          const p1 = isoProject(baseX, baseY, baseZ);
          const p2 = isoProject(baseX + b.width, baseY, baseZ);
          const p3 = isoProject(baseX + b.width, baseY + b.height, baseZ);
          const p4 = isoProject(baseX, baseY + b.height, baseZ);
          const p5 = isoProject(baseX, baseY, height);
          const p6 = isoProject(baseX + b.width, baseY, height);
          const p7 = isoProject(baseX + b.width, baseY + b.height, height);
          const p8 = isoProject(baseX, baseY + b.height, height);
          
          // Draw building faces (back faces first, then front)
          // Top face (roof)
          ctx.fillStyle = b.color;
          ctx.beginPath();
          ctx.moveTo(p5.x, p5.y);
          ctx.lineTo(p6.x, p6.y);
          ctx.lineTo(p7.x, p7.y);
          ctx.lineTo(p8.x, p8.y);
          ctx.closePath();
          ctx.fill();
          
          // Lighter roof color
          const roofColor = ctx.createLinearGradient(p5.x, p5.y, p7.x, p7.y);
          roofColor.addColorStop(0, b.color);
          roofColor.addColorStop(1, adjustBrightness(b.color, 30));
          ctx.fillStyle = roofColor;
          ctx.fill();
          
          // Right face (side)
          ctx.fillStyle = adjustBrightness(b.color, -20);
          ctx.beginPath();
          ctx.moveTo(p2.x, p2.y);
          ctx.lineTo(p3.x, p3.y);
          ctx.lineTo(p7.x, p7.y);
          ctx.lineTo(p6.x, p6.y);
          ctx.closePath();
          ctx.fill();
          
          // Left face (side)
          ctx.fillStyle = adjustBrightness(b.color, -30);
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p4.x, p4.y);
          ctx.lineTo(p8.x, p8.y);
          ctx.lineTo(p5.x, p5.y);
          ctx.closePath();
          ctx.fill();
          
          // Front face (main)
          ctx.fillStyle = b.color;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.lineTo(p6.x, p6.y);
          ctx.lineTo(p5.x, p5.y);
          ctx.closePath();
          ctx.fill();
          
          // Add windows to front face
          const windowSpacing = 12;
          const windowSize = 6;
          const windowColor = Math.random() > 0.5 ? '#FFD700' : '#87CEEB'; // Gold or Sky Blue
          ctx.fillStyle = windowColor;
          
          for (let wx = 5; wx < b.width - 5; wx += windowSpacing) {
            for (let wy = 5; wy < height / isoScale - 5; wy += windowSpacing) {
              const windowHash = ((b.x * 7 + b.y * 11 + wx * 13 + wy * 17) % 100) / 100;
              if (windowHash > 0.25) {
                const winX = baseX + wx;
                const winY = baseY;
                const winZ = wy;
                const winP1 = isoProject(winX, winY, winZ);
                const winP2 = isoProject(winX + windowSize, winY, winZ);
                const winP3 = isoProject(winX + windowSize, winY, winZ + windowSize);
                const winP4 = isoProject(winX, winY, winZ + windowSize);
                
                ctx.beginPath();
                ctx.moveTo(winP1.x, winP1.y);
                ctx.lineTo(winP2.x, winP2.y);
                ctx.lineTo(winP3.x, winP3.y);
                ctx.lineTo(winP4.x, winP4.y);
                ctx.closePath();
                ctx.fill();
              }
            }
          }
          
          // Draw building outline
          ctx.strokeStyle = adjustBrightness(b.color, -40);
          ctx.lineWidth = 1;
          ctx.beginPath();
          // Base
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.lineTo(p3.x, p3.y);
          ctx.lineTo(p4.x, p4.y);
          ctx.closePath();
          // Top
          ctx.moveTo(p5.x, p5.y);
          ctx.lineTo(p6.x, p6.y);
          ctx.lineTo(p7.x, p7.y);
          ctx.lineTo(p8.x, p8.y);
          ctx.closePath();
          // Vertical edges
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p5.x, p5.y);
          ctx.moveTo(p2.x, p2.y);
          ctx.lineTo(p6.x, p6.y);
          ctx.moveTo(p3.x, p3.y);
          ctx.lineTo(p7.x, p7.y);
          ctx.moveTo(p4.x, p4.y);
          ctx.lineTo(p8.x, p8.y);
          ctx.stroke();
        }
      });
      
      // Helper function to adjust color brightness
      function adjustBrightness(color: string, percent: number): string {
        const num = parseInt(color.replace("#", ""), 16);
        const amt = Math.round(2.55 * percent);
        const R = Math.min(255, Math.max(0, (num >> 16) + amt));
        const G = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + amt));
        const B = Math.min(255, Math.max(0, (num & 0x0000FF) + amt));
        return "#" + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
      }

      // Draw boost items (only those in view)
      boostsRef.current.forEach(boost => {
        if (!boost.collected) {
          // Only draw if boost is in camera view
          if (boost.x >= cameraRef.current.x - 50 &&
              boost.x <= cameraRef.current.x + GAME_CONSTANTS.CANVAS_WIDTH + 50 &&
              boost.y >= cameraRef.current.y - 50 &&
              boost.y <= cameraRef.current.y + GAME_CONSTANTS.CANVAS_HEIGHT + 50) {
            const pulse = Math.sin(Date.now() / 200) * 0.3 + 0.7;
            
            // Glow effect
            ctx.shadowBlur = 20;
            ctx.shadowColor = '#00ff00';
            
            // Outer glow
            ctx.fillStyle = `rgba(0, 255, 0, ${0.3 * pulse})`;
            ctx.beginPath();
            ctx.arc(boost.x, boost.y, 20, 0, Math.PI * 2);
            ctx.fill();
            
            // Boost icon (lightning bolt)
            ctx.save();
            ctx.translate(boost.x, boost.y);
            ctx.rotate(Date.now() / 1000);
            ctx.shadowBlur = 0;
            ctx.fillStyle = '#ffff00';
            ctx.strokeStyle = '#00ff00';
            ctx.lineWidth = 3;
            
            // Draw lightning bolt
            ctx.beginPath();
            ctx.moveTo(-8, -15);
            ctx.lineTo(2, -5);
            ctx.lineTo(-2, -5);
            ctx.lineTo(8, 15);
            ctx.lineTo(-2, 5);
            ctx.lineTo(2, 5);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            
            ctx.restore();
            
            ctx.shadowBlur = 0;
          }
        }
      });

      // Helper function to draw 3D car (isometric style)
      const draw3DCar = (x: number, y: number, angle: number, color: string, isPolice: boolean = false) => {
        ctx.save();
        
        // Car dimensions
        const carLength = 36;
        const carWidth = 20;
        const carHeight = 12;
        
        // Calculate car corners in world space
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        const halfLength = carLength / 2;
        const halfWidth = carWidth / 2;
        
        // Car corners (top-down view)
        const corners = [
          { x: x - halfLength * cos + halfWidth * sin, y: y - halfLength * sin - halfWidth * cos },
          { x: x + halfLength * cos + halfWidth * sin, y: y + halfLength * sin - halfWidth * cos },
          { x: x + halfLength * cos - halfWidth * sin, y: y + halfLength * sin + halfWidth * cos },
          { x: x - halfLength * cos - halfWidth * sin, y: y - halfLength * sin + halfWidth * cos },
        ];
        
        // Project to isometric
        const projCorners = corners.map(c => isoProject(c.x, c.y, 0));
        const projTopCorners = corners.map(c => isoProject(c.x, c.y, carHeight));
        
        // Draw shadow (ellipse on ground)
        ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
        ctx.beginPath();
        ctx.ellipse(x, y, carLength * 0.6, carWidth * 0.4, angle, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw car body (top face)
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(projTopCorners[0].x, projTopCorners[0].y);
        ctx.lineTo(projTopCorners[1].x, projTopCorners[1].y);
        ctx.lineTo(projTopCorners[2].x, projTopCorners[2].y);
        ctx.lineTo(projTopCorners[3].x, projTopCorners[3].y);
        ctx.closePath();
        ctx.fill();
        
        // Draw side faces
        const sideColor = adjustBrightness(color, -25);
        ctx.fillStyle = sideColor;
        
        // Left side
        ctx.beginPath();
        ctx.moveTo(projCorners[0].x, projCorners[0].y);
        ctx.lineTo(projCorners[3].x, projCorners[3].y);
        ctx.lineTo(projTopCorners[3].x, projTopCorners[3].y);
        ctx.lineTo(projTopCorners[0].x, projTopCorners[0].y);
        ctx.closePath();
        ctx.fill();
        
        // Right side
        ctx.beginPath();
        ctx.moveTo(projCorners[1].x, projCorners[1].y);
        ctx.lineTo(projCorners[2].x, projCorners[2].y);
        ctx.lineTo(projTopCorners[2].x, projTopCorners[2].y);
        ctx.lineTo(projTopCorners[1].x, projTopCorners[1].y);
        ctx.closePath();
        ctx.fill();
        
        // Draw front/back faces
        const frontColor = adjustBrightness(color, -15);
        ctx.fillStyle = frontColor;
        
        // Front
        ctx.beginPath();
        ctx.moveTo(projCorners[0].x, projCorners[0].y);
        ctx.lineTo(projCorners[1].x, projCorners[1].y);
        ctx.lineTo(projTopCorners[1].x, projTopCorners[1].y);
        ctx.lineTo(projTopCorners[0].x, projTopCorners[0].y);
        ctx.closePath();
        ctx.fill();
        
        // Back
        ctx.beginPath();
        ctx.moveTo(projCorners[2].x, projCorners[2].y);
        ctx.lineTo(projCorners[3].x, projCorners[3].y);
        ctx.lineTo(projTopCorners[3].x, projTopCorners[3].y);
        ctx.lineTo(projTopCorners[2].x, projTopCorners[2].y);
        ctx.closePath();
        ctx.fill();
        
        // Draw windows (on top face)
        ctx.fillStyle = 'rgba(135, 206, 235, 0.6)';
        const windowOffset = 4;
        const windowLength = carLength * 0.5;
        const windowWidth = carWidth * 0.4;
        
        const windowCorners = [
          { x: x - windowLength * cos * 0.3 + windowWidth * sin * 0.5, y: y - windowLength * sin * 0.3 - windowWidth * cos * 0.5 },
          { x: x + windowLength * cos * 0.3 + windowWidth * sin * 0.5, y: y + windowLength * sin * 0.3 - windowWidth * cos * 0.5 },
          { x: x + windowLength * cos * 0.3 - windowWidth * sin * 0.5, y: y + windowLength * sin * 0.3 + windowWidth * cos * 0.5 },
          { x: x - windowLength * cos * 0.3 - windowWidth * sin * 0.5, y: y - windowLength * sin * 0.3 + windowWidth * cos * 0.5 },
        ];
        
        const projWindowCorners = windowCorners.map(c => isoProject(c.x, c.y, carHeight + 1));
        ctx.beginPath();
        ctx.moveTo(projWindowCorners[0].x, projWindowCorners[0].y);
        ctx.lineTo(projWindowCorners[1].x, projWindowCorners[1].y);
        ctx.lineTo(projWindowCorners[2].x, projWindowCorners[2].y);
        ctx.lineTo(projWindowCorners[3].x, projWindowCorners[3].y);
        ctx.closePath();
        ctx.fill();
        
        // Draw wheels (4 wheels)
        const wheelRadius = 4;
        const wheelPositions = [
          { x: x - halfLength * 0.6 * cos + halfWidth * sin, y: y - halfLength * 0.6 * sin - halfWidth * cos },
          { x: x + halfLength * 0.6 * cos + halfWidth * sin, y: y + halfLength * 0.6 * sin - halfWidth * cos },
          { x: x - halfLength * 0.6 * cos - halfWidth * sin, y: y - halfLength * 0.6 * sin + halfWidth * cos },
          { x: x + halfLength * 0.6 * cos - halfWidth * sin, y: y + halfLength * 0.6 * sin + halfWidth * cos },
        ];
        
        wheelPositions.forEach(wheel => {
          const wheelProj = isoProject(wheel.x, wheel.y, 0);
          ctx.fillStyle = '#1a1a1a';
          ctx.beginPath();
          ctx.arc(wheelProj.x, wheelProj.y, wheelRadius, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#444';
          ctx.beginPath();
          ctx.arc(wheelProj.x, wheelProj.y, wheelRadius * 0.6, 0, Math.PI * 2);
          ctx.fill();
        });
        
        // Police lights
        if (isPolice) {
          const lightTime = Date.now() % 1000;
          const lightColor1 = lightTime < 500 ? '#ff0000' : '#0000ff';
          const lightColor2 = lightTime < 500 ? '#0000ff' : '#ff0000';
          
          const lightPos1 = { x: x - halfLength * 0.4 * cos, y: y - halfLength * 0.4 * sin };
          const lightPos2 = { x: x + halfLength * 0.4 * cos, y: y + halfLength * 0.4 * sin };
          
          ctx.shadowBlur = 10;
          ctx.shadowColor = lightColor1;
          ctx.fillStyle = lightColor1;
          const lightProj1 = isoProject(lightPos1.x, lightPos1.y, carHeight + 2);
          ctx.beginPath();
          ctx.arc(lightProj1.x, lightProj1.y, 3, 0, Math.PI * 2);
          ctx.fill();
          
          ctx.shadowColor = lightColor2;
          ctx.fillStyle = lightColor2;
          const lightProj2 = isoProject(lightPos2.x, lightPos2.y, carHeight + 2);
          ctx.beginPath();
          ctx.arc(lightProj2.x, lightProj2.y, 3, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }
        
        // Car outline
        ctx.strokeStyle = adjustBrightness(color, -40);
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(projTopCorners[0].x, projTopCorners[0].y);
        ctx.lineTo(projTopCorners[1].x, projTopCorners[1].y);
        ctx.lineTo(projTopCorners[2].x, projTopCorners[2].y);
        ctx.lineTo(projTopCorners[3].x, projTopCorners[3].y);
        ctx.closePath();
        ctx.stroke();
        
        ctx.restore();
      };

      // Draw police cars in 3D (only those in view)
      policeRef.current.forEach(police => {
        // Only draw if police is in camera view
        if (police.x >= cameraRef.current.x - 50 &&
            police.x <= cameraRef.current.x + GAME_CONSTANTS.CANVAS_WIDTH + 50 &&
            police.y >= cameraRef.current.y - 50 &&
            police.y <= cameraRef.current.y + GAME_CONSTANTS.CANVAS_HEIGHT + 50) {
          draw3DCar(police.x, police.y, police.angle, '#1a4d8c', true);
        }
      });

      // Draw player car in 3D with boost effect
      // Boost glow effect
      if (player.boostActive) {
        const boostPulse = Math.sin(Date.now() / 100) * 0.3 + 0.7;
        ctx.shadowBlur = 30;
        ctx.shadowColor = '#00ff00';
        
        // Outer glow rings
        for (let i = 0; i < 3; i++) {
          ctx.strokeStyle = `rgba(0, 255, 0, ${0.3 * boostPulse / (i + 1)})`;
          ctx.lineWidth = 2;
          ctx.beginPath();
          const glowProj = isoProject(player.x, player.y, 0);
          ctx.arc(glowProj.x, glowProj.y, 25 + i * 5, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.shadowBlur = 0;
      }
      
      // Draw player car in 3D
      const playerColor = player.boostActive ? '#ff4444' : '#c0392b';
      draw3DCar(player.x, player.y, player.angle, playerColor, false);
      
      // Add boost stripe effect on top
      if (player.boostActive) {
        ctx.save();
        const cos = Math.cos(player.angle);
        const sin = Math.sin(player.angle);
        const stripePos = { x: player.x, y: player.y };
        const stripeProj = isoProject(stripePos.x, stripePos.y, 14);
        ctx.fillStyle = '#ffff00';
        ctx.beginPath();
        ctx.ellipse(stripeProj.x, stripeProj.y, 18, 2, player.angle, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      
      // Exhaust effect when boosting
      if (player.boostActive && player.speed > 0) {
        if (Math.random() < 0.3) {
          particlesRef.current.push({
            x: player.x - Math.cos(player.angle) * 20,
            y: player.y - Math.sin(player.angle) * 20,
            vx: -Math.cos(player.angle) * 2 + (Math.random() - 0.5) * 1,
            vy: -Math.sin(player.angle) * 2 + (Math.random() - 0.5) * 1,
            life: 15 + Math.random() * 10,
            color: Math.random() > 0.5 ? '#ff6600' : '#ffaa00'
          });
        }
      }

      // Restore camera transform
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
            {boostActive && (
              <div className="bg-gray-800 px-4 py-2 rounded-lg border-2 border-green-500 animate-pulse">
                <span className="text-green-400 text-sm">⚡ Boost: </span>
                <span className="text-white font-bold text-xl">{boostTimeLeft}s</span>
              </div>
            )}
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
            Nutze Drift-Effekte beim schnellen Lenken! Sammle ⚡ Boost-Items für maximale Geschwindigkeit!
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

