'use client';

import { useState } from 'react';

export default function Home() {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 font-sans relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <main className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Game Title */}
          <div className="mb-12 space-y-4">
            <h1 className="text-7xl md:text-9xl font-black tracking-tight text-white drop-shadow-2xl animate-fade-in">
              <span className="bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
                SPIEL
              </span>
            </h1>
            <div className="h-2 w-32 bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 mx-auto rounded-full"></div>
            <p className="text-xl md:text-2xl text-purple-200 mt-8 font-light">
              Bereit für das Abenteuer?
            </p>
          </div>

          {/* Main Start Button */}
          <div className="mb-12">
            <button
              onMouseEnter={() => setHoveredButton('start')}
              onMouseLeave={() => setHoveredButton(null)}
              className="group relative inline-flex items-center justify-center px-12 py-6 text-2xl font-bold text-white bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-2xl shadow-2xl transform transition-all duration-300 hover:scale-110 hover:shadow-purple-500/50 active:scale-95 overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative flex items-center gap-3">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                SPIEL STARTEN
                <svg className="w-6 h-6 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
          </div>

          {/* Game Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <button
              onMouseEnter={() => setHoveredButton('easy')}
              onMouseLeave={() => setHoveredButton(null)}
              className={`group relative overflow-hidden rounded-xl bg-white/10 backdrop-blur-md p-6 border-2 transition-all duration-300 ${
                hoveredButton === 'easy' ? 'border-yellow-400 scale-105 bg-white/20' : 'border-white/30 hover:border-white/50'
              }`}
            >
              <div className="text-4xl mb-3">😊</div>
              <h3 className="text-xl font-bold text-white mb-2">Leicht</h3>
              <p className="text-purple-200 text-sm">Für Anfänger</p>
            </button>

            <button
              onMouseEnter={() => setHoveredButton('medium')}
              onMouseLeave={() => setHoveredButton(null)}
              className={`group relative overflow-hidden rounded-xl bg-white/10 backdrop-blur-md p-6 border-2 transition-all duration-300 ${
                hoveredButton === 'medium' ? 'border-pink-400 scale-105 bg-white/20' : 'border-white/30 hover:border-white/50'
              }`}
            >
              <div className="text-4xl mb-3">😎</div>
              <h3 className="text-xl font-bold text-white mb-2">Mittel</h3>
              <p className="text-purple-200 text-sm">Standard Schwierigkeit</p>
            </button>

            <button
              onMouseEnter={() => setHoveredButton('hard')}
              onMouseLeave={() => setHoveredButton(null)}
              className={`group relative overflow-hidden rounded-xl bg-white/10 backdrop-blur-md p-6 border-2 transition-all duration-300 ${
                hoveredButton === 'hard' ? 'border-red-400 scale-105 bg-white/20' : 'border-white/30 hover:border-white/50'
              }`}
            >
              <div className="text-4xl mb-3">🔥</div>
              <h3 className="text-xl font-bold text-white mb-2">Schwer</h3>
              <p className="text-purple-200 text-sm">Für Profis</p>
            </button>
          </div>

          {/* Additional Options */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <button className="px-6 py-3 rounded-lg bg-white/10 backdrop-blur-md text-white border border-white/30 hover:bg-white/20 hover:border-white/50 transition-all duration-300">
              ⚙️ Einstellungen
            </button>
            <button className="px-6 py-3 rounded-lg bg-white/10 backdrop-blur-md text-white border border-white/30 hover:bg-white/20 hover:border-white/50 transition-all duration-300">
              📊 Bestenliste
            </button>
            <button className="px-6 py-3 rounded-lg bg-white/10 backdrop-blur-md text-white border border-white/30 hover:bg-white/20 hover:border-white/50 transition-all duration-300">
              ❓ Hilfe
            </button>
          </div>
        </div>
      </main>

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
        .delay-1000 {
          animation-delay: 1s;
        }
        .delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}
