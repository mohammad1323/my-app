'use client';

import { useState, useEffect, useRef } from 'react';

interface Pipe {
  id: number;
  x: number;
  topHeight: number;
  bottomHeight: number;
  gap: number;
  passed: boolean;
  moving: boolean;
  moveDirection: number;
  moveSpeed: number;
}

interface Portal {
  id: number;
  x: number;
  y: number;
  type: 'entry' | 'exit';
  pairId: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
}

interface Statistics {
  gamesPlayed: number;
  bestScore: number;
  totalCoins: number;
  totalJumps: number;
  totalPortals: number;
}

export default function Home() {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'gameOver'>('menu');
  const [score, setScore] = useState(0);
  const [showInstructions, setShowInstructions] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameLoopRef = useRef<number | undefined>(undefined);
  
  const [statistics, setStatistics] = useState<Statistics>({
    gamesPlayed: 0,
    bestScore: 0,
    totalCoins: 0,
    totalJumps: 0,
    totalPortals: 0,
  });
  
  // Game state
  const playerRef = useRef({
    x: 100,
    y: 300,
    velocity: 0,
    rotation: 0,
    doubleJumpAvailable: true,
    doubleJumpUsed: false,
  });
  
  const gameStateRef = useRef({
    pipes: [] as Pipe[],
    portals: [] as Portal[],
    particles: [] as Particle[],
    nextPipeId: 0,
    nextPortalId: 0,
    lastPipeSpawn: 0,
    scrollSpeed: 3,
    gravity: 0.5,
    jumpPower: -8,
    doubleJumpPower: -7,
    pipeSpawnInterval: 2000,
    backgroundOffset: 0,
  });
  
  const CANVAS_WIDTH = 400;
  const CANVAS_HEIGHT = 600;
  const PLAYER_SIZE = 30;
  const PIPE_WIDTH = 60;
  const MIN_GAP = 200; // Größere Lücken für leichteres Durchkommen
  const MAX_GAP = 250;
  const COLLISION_MARGIN = 8; // Verkleinerter Kollisionsbereich
  
  useEffect(() => {
    // Load statistics
    const savedStats = localStorage.getItem('flappyCloneStats');
    if (savedStats) {
      setStatistics(JSON.parse(savedStats));
    }
  }, []);
  
  useEffect(() => {
    // Save statistics
    localStorage.setItem('flappyCloneStats', JSON.stringify(statistics));
  }, [statistics]);
  
  useEffect(() => {
    if (gameState !== 'playing') return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
    
    // Reset game state
    playerRef.current = {
      x: 100,
      y: CANVAS_HEIGHT / 2,
      velocity: 0,
      rotation: 0,
      doubleJumpAvailable: true,
      doubleJumpUsed: false,
    };
    
    gameStateRef.current = {
      pipes: [],
      portals: [] as Portal[],
      particles: [] as Particle[],
      nextPipeId: 0,
      nextPortalId: 0,
      lastPipeSpawn: 0,
      scrollSpeed: 3,
      gravity: 0.5,
      jumpPower: -8,
      doubleJumpPower: -7,
      pipeSpawnInterval: 2000,
      backgroundOffset: 0,
    };
    
    setScore(0);
    
    // Input handlers
    let jumpPressed = false;
    let doubleJumpPressed = false;
    
    const handleClick = () => {
      if (!jumpPressed) {
        jumpPressed = true;
        playerRef.current.velocity = gameStateRef.current.jumpPower;
        playerRef.current.doubleJumpAvailable = true;
        playerRef.current.doubleJumpUsed = false;
        setStatistics(prev => ({ ...prev, totalJumps: prev.totalJumps + 1 }));
      } else if (!doubleJumpPressed && playerRef.current.doubleJumpAvailable && !playerRef.current.doubleJumpUsed) {
        doubleJumpPressed = true;
        playerRef.current.velocity = gameStateRef.current.doubleJumpPower;
        playerRef.current.doubleJumpUsed = true;
        playerRef.current.doubleJumpAvailable = false;
        
        // Create double jump particles
        for (let i = 0; i < 10; i++) {
          gameStateRef.current.particles.push({
            x: playerRef.current.x,
            y: playerRef.current.y,
            vx: (Math.random() - 0.5) * 4,
            vy: (Math.random() - 0.5) * 4,
            life: 30,
            color: '#FFD700',
          });
        }
      }
    };
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        e.preventDefault();
        handleClick();
      }
    };
    
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        jumpPressed = false;
        doubleJumpPressed = false;
      }
    };
    
    canvas.addEventListener('click', handleClick);
    canvas.addEventListener('touchstart', (e) => {
      e.preventDefault();
      handleClick();
    });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    let lastTime = Date.now();
    let gameStartTime = Date.now();
    
    const gameLoop = () => {
      if (gameState !== 'playing') return;
      
      const now = Date.now();
      const deltaTime = (now - lastTime) / 16;
      lastTime = now;
      
      const elapsed = (now - gameStartTime) / 1000;
      const player = playerRef.current;
      const state = gameStateRef.current;
      
      // Increase difficulty over time
      state.scrollSpeed = 3 + elapsed * 0.1;
      state.pipeSpawnInterval = Math.max(1500, 2000 - elapsed * 10);
      
      // Update background scroll
      state.backgroundOffset += state.scrollSpeed;
      if (state.backgroundOffset > 100) state.backgroundOffset = 0;
      
      // Apply gravity
      player.velocity += state.gravity;
      player.y += player.velocity;
      
      // Update rotation based on velocity
      player.rotation = Math.min(Math.max(player.velocity * 3, -30), 30);
      
      // Reset double jump when on ground or after some time
      if (player.y > CANVAS_HEIGHT - 50 || player.y < 50) {
        player.doubleJumpAvailable = true;
        player.doubleJumpUsed = false;
      }
      
      // Spawn pipes
      if (now - state.lastPipeSpawn > state.pipeSpawnInterval) {
        const gap = MIN_GAP + Math.random() * (MAX_GAP - MIN_GAP);
        const topHeight = 50 + Math.random() * (CANVAS_HEIGHT - gap - 200);
        const bottomHeight = CANVAS_HEIGHT - topHeight - gap;
        
        // Random chance for moving pipe
        const isMoving = Math.random() > 0.7;
        const moveDirection = Math.random() > 0.5 ? 1 : -1;
        const moveSpeed = 0.5 + Math.random() * 1;
        
        state.pipes.push({
          id: state.nextPipeId++,
          x: CANVAS_WIDTH,
          topHeight,
          bottomHeight,
          gap,
          passed: false,
          moving: isMoving,
          moveDirection,
          moveSpeed,
        });
        
        // Random chance for portal pair
        if (Math.random() > 0.85) {
          const portalY1 = topHeight + gap / 2;
          const portalY2 = CANVAS_HEIGHT / 2 + (Math.random() - 0.5) * 200;
          const pairId = state.nextPortalId;
          
          state.portals.push({
            id: state.nextPortalId++,
            x: CANVAS_WIDTH + 100,
            y: portalY1,
            type: 'entry',
            pairId,
          });
          
          state.portals.push({
            id: state.nextPortalId++,
            x: CANVAS_WIDTH + 300,
            y: portalY2,
            type: 'exit',
            pairId,
          });
        }
        
        state.lastPipeSpawn = now;
      }
      
      // Update pipes
      state.pipes.forEach((pipe, index) => {
        pipe.x -= state.scrollSpeed;
        
        // Move pipe if it's a moving pipe
        if (pipe.moving) {
          const centerY = pipe.topHeight + pipe.gap / 2;
          const newCenterY = centerY + pipe.moveDirection * pipe.moveSpeed;
          const minY = 100;
          const maxY = CANVAS_HEIGHT - 100;
          
          if (newCenterY < minY || newCenterY > maxY) {
            pipe.moveDirection *= -1;
          }
          
          const newTopHeight = newCenterY - pipe.gap / 2;
          if (newTopHeight > 50 && newTopHeight + pipe.gap < CANVAS_HEIGHT - 50) {
            pipe.topHeight = newTopHeight;
            pipe.bottomHeight = CANVAS_HEIGHT - pipe.topHeight - pipe.gap;
          } else {
            pipe.moveDirection *= -1;
          }
        }
        
        // Check collision
        if (!pipe.passed && pipe.x + PIPE_WIDTH < player.x - PLAYER_SIZE / 2) {
          pipe.passed = true;
          setScore(prev => prev + 1);
        }
        
        // Präzise Kollisionserkennung - nur wenn Spieler tatsächlich die Röhre berührt
        const playerLeft = player.x - PLAYER_SIZE / 2 + COLLISION_MARGIN;
        const playerRight = player.x + PLAYER_SIZE / 2 - COLLISION_MARGIN;
        const playerTop = player.y - PLAYER_SIZE / 2 + COLLISION_MARGIN;
        const playerBottom = player.y + PLAYER_SIZE / 2 - COLLISION_MARGIN;
        
        const pipeLeft = pipe.x;
        const pipeRight = pipe.x + PIPE_WIDTH;
        const pipeTopEnd = pipe.topHeight;
        const pipeBottomStart = CANVAS_HEIGHT - pipe.bottomHeight;
        
        // Prüfe ob Spieler horizontal innerhalb der Röhre ist
        const horizontalCollision = playerRight > pipeLeft && playerLeft < pipeRight;
        
        if (horizontalCollision) {
          // Prüfe ob Spieler mit oberer oder unterer Röhre kollidiert
          const hitTopPipe = playerBottom > 0 && playerTop < pipeTopEnd;
          const hitBottomPipe = playerTop < CANVAS_HEIGHT && playerBottom > pipeBottomStart;
          
          if (hitTopPipe || hitBottomPipe) {
            // Game over - nur wenn tatsächlich Kollision mit Röhre
            setStatistics(prev => ({
              ...prev,
              gamesPlayed: prev.gamesPlayed + 1,
              bestScore: Math.max(prev.bestScore, score + 1),
            }));
            setGameState('gameOver');
            return;
          }
        }
        
        // Remove off-screen pipes
        if (pipe.x + PIPE_WIDTH < 0) {
          state.pipes.splice(index, 1);
        }
      });
      
      // Update portals
      state.portals.forEach((portal, index) => {
        portal.x -= state.scrollSpeed;
        
        // Check portal collision
        const dist = Math.sqrt(
          Math.pow(portal.x - player.x, 2) + Math.pow(portal.y - player.y, 2)
        );
        
        if (dist < 25 && portal.type === 'entry') {
          // Teleport to exit portal
          const exitPortal = state.portals.find(p => p.pairId === portal.pairId && p.type === 'exit');
          if (exitPortal) {
            player.x = exitPortal.x;
            player.y = exitPortal.y;
            player.velocity = 0;
            
            // Create teleport particles
            for (let i = 0; i < 20; i++) {
              gameStateRef.current.particles.push({
                x: portal.x,
                y: portal.y,
                vx: (Math.random() - 0.5) * 6,
                vy: (Math.random() - 0.5) * 6,
                life: 40,
                color: '#9D4EDD',
              });
              gameStateRef.current.particles.push({
                x: exitPortal.x,
                y: exitPortal.y,
                vx: (Math.random() - 0.5) * 6,
                vy: (Math.random() - 0.5) * 6,
                life: 40,
                color: '#9D4EDD',
              });
            }
            
            setStatistics(prev => ({ ...prev, totalPortals: prev.totalPortals + 1 }));
          }
        }
        
        // Remove off-screen portals
        if (portal.x + 50 < 0) {
          state.portals.splice(index, 1);
        }
      });
      
      // Update particles
      state.particles = state.particles.filter(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life--;
        return particle.life > 0;
      });
      
      // Check boundaries
      if (player.y - PLAYER_SIZE / 2 < 0 || player.y + PLAYER_SIZE / 2 > CANVAS_HEIGHT) {
        setStatistics(prev => ({
          ...prev,
          gamesPlayed: prev.gamesPlayed + 1,
          bestScore: Math.max(prev.bestScore, score),
        }));
        setGameState('gameOver');
        return;
      }
      
      // Draw sky gradient
      const skyGradient = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT);
      skyGradient.addColorStop(0, '#87CEEB');
      skyGradient.addColorStop(0.7, '#E0F6FF');
      skyGradient.addColorStop(1, '#98D8C8');
      ctx.fillStyle = skyGradient;
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      
      // Draw clouds
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      for (let i = 0; i < 5; i++) {
        const cloudX = (i * 150 - state.backgroundOffset * 0.3) % (CANVAS_WIDTH + 100) - 50;
        const cloudY = 50 + i * 100;
        ctx.beginPath();
        ctx.arc(cloudX, cloudY, 20, 0, Math.PI * 2);
        ctx.arc(cloudX + 25, cloudY, 25, 0, Math.PI * 2);
        ctx.arc(cloudX + 50, cloudY, 20, 0, Math.PI * 2);
        ctx.fill();
      }
      
      // Draw pipes
      state.pipes.forEach(pipe => {
        // Top pipe
        ctx.fillStyle = '#4CAF50';
        ctx.fillRect(pipe.x, 0, PIPE_WIDTH, pipe.topHeight);
        ctx.fillStyle = '#2E7D32';
        ctx.fillRect(pipe.x, pipe.topHeight - 20, PIPE_WIDTH, 20);
        
        // Bottom pipe
        ctx.fillStyle = '#4CAF50';
        ctx.fillRect(pipe.x, CANVAS_HEIGHT - pipe.bottomHeight, PIPE_WIDTH, pipe.bottomHeight);
        ctx.fillStyle = '#2E7D32';
        ctx.fillRect(pipe.x, CANVAS_HEIGHT - pipe.bottomHeight, PIPE_WIDTH, 20);
        
        // Pipe highlight
        ctx.strokeStyle = '#66BB6A';
        ctx.lineWidth = 2;
        ctx.strokeRect(pipe.x, 0, PIPE_WIDTH, pipe.topHeight);
        ctx.strokeRect(pipe.x, CANVAS_HEIGHT - pipe.bottomHeight, PIPE_WIDTH, pipe.bottomHeight);
      });
      
      // Draw portals
      state.portals.forEach(portal => {
        const pulse = Math.sin(Date.now() / 200) * 0.3 + 0.7;
        const color = portal.type === 'entry' ? '#9D4EDD' : '#FF6B9D';
        
        // Outer glow
        ctx.shadowBlur = 20;
        ctx.shadowColor = color;
        ctx.fillStyle = `${color}${Math.floor(pulse * 100).toString(16)}`;
        ctx.beginPath();
        ctx.arc(portal.x, portal.y, 30, 0, Math.PI * 2);
        ctx.fill();
        
        // Inner ring
        ctx.shadowBlur = 0;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(portal.x, portal.y, 20, 0, Math.PI * 2);
        ctx.fill();
        
        // Center
        ctx.fillStyle = '#FFF';
        ctx.beginPath();
        ctx.arc(portal.x, portal.y, 10, 0, Math.PI * 2);
        ctx.fill();
        
        // Portal type indicator
        ctx.fillStyle = '#000';
        ctx.font = 'bold 12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(portal.type === 'entry' ? 'IN' : 'OUT', portal.x, portal.y + 4);
      });
      
      // Draw particles
      state.particles.forEach(particle => {
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.life / 40;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 3, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      
      // Draw player
      ctx.save();
      ctx.translate(player.x, player.y);
      ctx.rotate(player.rotation * Math.PI / 180);
      
      // Player shadow
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.beginPath();
      ctx.ellipse(0, PLAYER_SIZE / 2 + 5, PLAYER_SIZE * 0.6, PLAYER_SIZE * 0.3, 0, 0, Math.PI * 2);
      ctx.fill();
      
      // Player body (bird)
      ctx.fillStyle = '#FFD700';
      ctx.beginPath();
      ctx.ellipse(0, 0, PLAYER_SIZE / 2, PLAYER_SIZE / 2, 0, 0, Math.PI * 2);
      ctx.fill();
      
      // Wing
      ctx.fillStyle = '#FFA500';
      ctx.beginPath();
      ctx.ellipse(-5, 0, 8, 12, -0.3, 0, Math.PI * 2);
      ctx.fill();
      
      // Eye
      ctx.fillStyle = '#FFF';
      ctx.beginPath();
      ctx.arc(8, -5, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#000';
      ctx.beginPath();
      ctx.arc(10, -5, 3, 0, Math.PI * 2);
      ctx.fill();
      
      // Beak
      ctx.fillStyle = '#FF6B35';
      ctx.beginPath();
      ctx.moveTo(PLAYER_SIZE / 2, 0);
      ctx.lineTo(PLAYER_SIZE / 2 + 8, -3);
      ctx.lineTo(PLAYER_SIZE / 2 + 8, 3);
      ctx.closePath();
      ctx.fill();
      
      // Double jump indicator
      if (player.doubleJumpAvailable && !player.doubleJumpUsed) {
        ctx.strokeStyle = '#FFD700';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.arc(0, 0, PLAYER_SIZE + 5, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
      }
      
      ctx.restore();
      
      // Draw UI
      ctx.fillStyle = '#000';
      ctx.font = 'bold 32px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(`${score}`, CANVAS_WIDTH / 2, 50);
      
      // Double jump indicator text
      if (player.doubleJumpAvailable && !player.doubleJumpUsed) {
        ctx.fillStyle = '#FFD700';
        ctx.font = 'bold 14px Arial';
        ctx.fillText('DOUBLE JUMP READY', CANVAS_WIDTH / 2, CANVAS_HEIGHT - 20);
      }
      
      gameLoopRef.current = requestAnimationFrame(gameLoop);
    };
    
    gameLoopRef.current = requestAnimationFrame(gameLoop);
    
    return () => {
      canvas.removeEventListener('click', handleClick);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [gameState, score]);
  
  const startGame = () => {
    setGameState('playing');
  };
  
  const resetGame = () => {
    setGameState('menu');
    setScore(0);
  };
  
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating clouds */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white/30 rounded-full blur-xl animate-float"
            style={{
              width: `${100 + i * 30}px`,
              height: `${60 + i * 20}px`,
              left: `${(i * 15) % 100}%`,
              top: `${(i * 20) % 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${8 + i * 2}s`,
            }}
          />
        ))}
        
        {/* Animated birds */}
        {[...Array(3)].map((_, i) => (
          <div
            key={`bird-${i}`}
            className="absolute text-4xl animate-fly"
            style={{
              left: `${-50 + i * 200}px`,
              top: `${100 + i * 150}px`,
              animationDelay: `${i * 2}s`,
              animationDuration: '15s',
            }}
          >
            🐦
          </div>
        ))}
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute w-2 h-2 bg-yellow-300 rounded-full animate-twinkle opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
      
      {gameState === 'menu' && (
        <div className="w-full max-w-md space-y-6 relative z-10">
          {/* Animated Title */}
          <div className="text-center relative">
            <div className="absolute inset-0 blur-2xl opacity-50">
              <h1 className="text-6xl md:text-8xl font-black text-white mb-2 animate-pulse">
                FLAPPY
              </h1>
              <h2 className="text-4xl md:text-6xl font-black text-yellow-300 animate-pulse" style={{ animationDelay: '0.3s' }}>
                CLONE
              </h2>
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-white drop-shadow-2xl mb-2 relative animate-bounce" style={{ animationDuration: '2s' }}>
              FLAPPY
            </h1>
            <h2 className="text-4xl md:text-6xl font-black text-yellow-300 drop-shadow-2xl relative animate-bounce" style={{ animationDuration: '2s', animationDelay: '0.1s' }}>
              CLONE
            </h2>
            <div className="mt-4 flex justify-center gap-2">
              <span className="text-3xl animate-bounce" style={{ animationDelay: '0s', animationDuration: '1.5s' }}>🐦</span>
              <span className="text-3xl animate-bounce" style={{ animationDelay: '0.2s', animationDuration: '1.5s' }}>🚀</span>
              <span className="text-3xl animate-bounce" style={{ animationDelay: '0.4s', animationDuration: '1.5s' }}>⭐</span>
            </div>
          </div>
          
          {/* Main Card */}
          <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 border-4 border-white/50 shadow-2xl relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-300/20 rounded-full blur-3xl -mr-16 -mt-16 animate-pulse" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-pink-300/20 rounded-full blur-3xl -ml-16 -mb-16 animate-pulse" style={{ animationDelay: '1s' }} />
            
            {/* High Score Display */}
            <div className="text-center mb-8 relative">
              <div className="inline-block bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-2xl p-6 shadow-xl transform hover:scale-105 transition-all">
                <p className="text-white text-xl font-bold mb-2 flex items-center justify-center gap-2">
                  <span className="text-2xl">🏆</span>
                  High Score
                </p>
                <p className="text-yellow-100 text-5xl font-black drop-shadow-lg">
                  {statistics.bestScore}
                </p>
              </div>
            </div>
            
            {/* Play Button */}
            <button
              onClick={startGame}
              className="w-full py-5 bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 hover:from-green-600 hover:via-emerald-600 hover:to-green-700 text-white font-black text-2xl rounded-2xl shadow-2xl transform hover:scale-105 hover:shadow-green-500/50 transition-all duration-300 mb-6 relative overflow-hidden group"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></span>
              <span className="relative flex items-center justify-center gap-3">
                <span className="text-3xl animate-bounce" style={{ animationDuration: '1s' }}>🎮</span>
                <span>SPIEL STARTEN</span>
                <span className="text-3xl animate-bounce" style={{ animationDuration: '1s', animationDelay: '0.5s' }}>🚀</span>
              </span>
            </button>
            
            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setShowInstructions(true)}
                className="py-4 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600 hover:from-blue-600 hover:via-cyan-600 hover:to-blue-700 text-white font-bold text-lg rounded-xl shadow-lg transform hover:scale-105 hover:shadow-blue-500/50 transition-all duration-300 relative overflow-hidden group"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
                <span className="relative flex flex-col items-center gap-1">
                  <span className="text-2xl">📖</span>
                  <span>Anleitung</span>
                </span>
              </button>
              <button
                onClick={() => setShowStats(true)}
                className="py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 hover:from-purple-600 hover:via-pink-600 hover:to-purple-700 text-white font-bold text-lg rounded-xl shadow-lg transform hover:scale-105 hover:shadow-pink-500/50 transition-all duration-300 relative overflow-hidden group"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
                <span className="relative flex flex-col items-center gap-1">
                  <span className="text-2xl">📊</span>
                  <span>Statistiken</span>
                </span>
              </button>
            </div>
            
            {/* Quick Stats */}
            <div className="mt-6 pt-6 border-t-2 border-white/30">
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                  <div className="text-2xl mb-1">🎯</div>
                  <div className="text-white text-sm font-bold">{statistics.gamesPlayed}</div>
                  <div className="text-white/80 text-xs">Spiele</div>
                </div>
                <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                  <div className="text-2xl mb-1">🔄</div>
                  <div className="text-white text-sm font-bold">{statistics.totalJumps}</div>
                  <div className="text-white/80 text-xs">Sprünge</div>
                </div>
                <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                  <div className="text-2xl mb-1">🌀</div>
                  <div className="text-white text-sm font-bold">{statistics.totalPortals}</div>
                  <div className="text-white/80 text-xs">Portale</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Feature Highlights */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border-2 border-white/30">
            <div className="flex items-center justify-around text-white text-sm">
              <div className="flex flex-col items-center gap-1">
                <span className="text-xl">🔄</span>
                <span className="font-bold">Doppelsprung</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-xl">🌀</span>
                <span className="font-bold">Portale</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-xl">🌊</span>
                <span className="font-bold">Beweglich</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-xl">🎲</span>
                <span className="font-bold">Zufällig</span>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {gameState === 'playing' && (
        <div className="relative">
          <canvas
            ref={canvasRef}
            className="border-4 border-white rounded-xl shadow-2xl bg-blue-200"
            style={{ display: 'block' }}
          />
        </div>
      )}
      
      {gameState === 'gameOver' && (
        <div className="w-full max-w-md bg-white/20 backdrop-blur-lg rounded-3xl p-8 border-4 border-white/50 shadow-2xl text-center space-y-6">
          <h2 className="text-5xl font-black text-white drop-shadow-2xl">GAME OVER</h2>
          <div className="space-y-4 text-white text-xl">
            <p className="text-3xl font-bold">Score: {score}</p>
            {score === statistics.bestScore && score > 0 && (
              <p className="text-yellow-300 font-bold text-2xl">🎉 NEUER HIGH SCORE! 🎉</p>
            )}
          </div>
          <div className="flex gap-4 justify-center">
            <button
              onClick={startGame}
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold text-xl rounded-xl shadow-lg transform hover:scale-105 transition-all"
            >
              Nochmal
            </button>
            <button
              onClick={resetGame}
              className="px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-bold text-xl rounded-xl shadow-lg transform hover:scale-105 transition-all"
            >
              Menü
            </button>
          </div>
        </div>
      )}
      
      {/* Instructions Modal */}
      {showInstructions && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-3xl border-4 border-white shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowInstructions(false)}
              className="absolute top-4 right-4 w-10 h-10 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center text-white font-bold text-xl transition-all duration-300 transform hover:scale-110 z-10"
            >
              ×
            </button>
            
            <div className="p-8 text-white">
              <h2 className="text-4xl font-black text-center mb-6 text-yellow-300 drop-shadow-lg">
                📖 ANLEITUNG
              </h2>
              
              <div className="space-y-6">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border-2 border-white/30">
                  <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                    <span>🔄</span> Doppelsprung
                  </h3>
                  <p className="text-lg">
                    Klicke oder drücke Leertaste/W für den ersten Sprung. 
                    Klicke erneut für einen zweiten Sprung in der Luft!
                  </p>
                </div>
                
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border-2 border-white/30">
                  <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                    <span>🌀</span> Portale
                  </h3>
                  <p className="text-lg">
                    Fliege durch lila Portale (IN) um zu den rosa Portalen (OUT) zu teleportieren. 
                    Nutze sie geschickt, um Hindernissen auszuweichen!
                  </p>
                </div>
                
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border-2 border-white/30">
                  <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                    <span>🌊</span> Bewegliche Röhren
                  </h3>
                  <p className="text-lg">
                    Manche Röhren bewegen sich auf und ab. Passe deine Flugbahn entsprechend an!
                  </p>
                </div>
                
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border-2 border-white/30">
                  <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                    <span>🎲</span> Zufällige Maps
                  </h3>
                  <p className="text-lg">
                    Jedes Spiel hat eine einzigartige Anordnung von Röhren, Portalen und Hindernissen!
                  </p>
                </div>
                
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border-2 border-white/30">
                  <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                    <span>🎯</span> Ziel
                  </h3>
                  <p className="text-lg">
                    Fliege so weit wie möglich und sammle Punkte, indem du Röhren passierst. 
                    Vermeide Kollisionen mit Röhren und Wänden!
                  </p>
                </div>
              </div>
              
              <button
                onClick={() => setShowInstructions(false)}
                className="w-full mt-6 py-3 bg-white/30 hover:bg-white/40 text-white font-bold text-lg rounded-xl transition-all"
              >
                Schließen
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Statistics Modal */}
      {showStats && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-3xl border-4 border-white shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowStats(false)}
              className="absolute top-4 right-4 w-10 h-10 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center text-white font-bold text-xl transition-all duration-300 transform hover:scale-110 z-10"
            >
              ×
            </button>
            
            <div className="p-8 text-white">
              <h2 className="text-4xl font-black text-center mb-6 text-yellow-300 drop-shadow-lg">
                📊 STATISTIKEN
              </h2>
              
              <div className="space-y-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border-2 border-white/30">
                  <div className="text-xl font-bold mb-1">Spiele gespielt</div>
                  <div className="text-3xl font-black text-yellow-300">{statistics.gamesPlayed}</div>
                </div>
                
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border-2 border-white/30">
                  <div className="text-xl font-bold mb-1">Bester Score</div>
                  <div className="text-3xl font-black text-yellow-300">{statistics.bestScore}</div>
                </div>
                
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border-2 border-white/30">
                  <div className="text-xl font-bold mb-1">Gesamte Sprünge</div>
                  <div className="text-3xl font-black text-yellow-300">{statistics.totalJumps}</div>
                </div>
                
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border-2 border-white/30">
                  <div className="text-xl font-bold mb-1">Portale genutzt</div>
                  <div className="text-3xl font-black text-yellow-300">{statistics.totalPortals}</div>
                </div>
              </div>
              
              <button
                onClick={() => setShowStats(false)}
                className="w-full mt-6 py-3 bg-white/30 hover:bg-white/40 text-white font-bold text-lg rounded-xl transition-all"
              >
                Schließen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
