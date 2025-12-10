'use client';

import { useState, useEffect, useRef } from 'react';

interface Coin {
  id: number;
  lane: number;
  y: number;
  collected: boolean;
}

interface Obstacle {
  id: number;
  lane: number;
  y: number;
  type: 'train' | 'barrier';
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
}

export default function Home() {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'gameOver'>('menu');
  const [score, setScore] = useState(0);
  const [coins, setCoins] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameLoopRef = useRef<number | undefined>(undefined);
  
  // Game state
  const playerRef = useRef({
    lane: 1, // 0 = left, 1 = middle, 2 = right
    y: 0,
    isJumping: false,
    isRolling: false,
    jumpVelocity: 0,
    jumpHeight: 0,
  });
  
  const gameStateRef = useRef({
    speed: 5,
    coins: [] as Coin[],
    obstacles: [] as Obstacle[],
    particles: [] as Particle[],
    nextCoinId: 0,
    nextObstacleId: 0,
    lastCoinSpawn: 0,
    lastObstacleSpawn: 0,
  });
  
  const keysRef = useRef<{ [key: string]: boolean }>({});
  
  const LANE_WIDTH = 120;
  const CANVAS_WIDTH = 400;
  const CANVAS_HEIGHT = 600;
  const PLAYER_SIZE = 40;
  const JUMP_HEIGHT = 120;
  const ROLL_HEIGHT = 20;
  
  useEffect(() => {
    // Load high score
    const savedHighScore = localStorage.getItem('subwaySurfersHighScore');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore, 10));
    }
  }, []);
  
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
      lane: 1,
      y: CANVAS_HEIGHT - 150,
      isJumping: false,
      isRolling: false,
      jumpVelocity: 0,
      jumpHeight: 0,
    };
    
    gameStateRef.current = {
      speed: 5,
      coins: [],
      obstacles: [],
      particles: [],
      nextCoinId: 0,
      nextObstacleId: 0,
      lastCoinSpawn: 0,
      lastObstacleSpawn: 0,
    };
    
    setScore(0);
    setCoins(0);
    
    // Keyboard handlers
    const handleKeyDown = (e: KeyboardEvent) => {
      keysRef.current[e.key.toLowerCase()] = true;
      
      // Prevent default for arrow keys
      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', ' '].includes(e.key)) {
        e.preventDefault();
      }
    };
    
    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current[e.key.toLowerCase()] = false;
    };
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    // Touch handlers for mobile
    let touchStartX = 0;
    let touchStartY = 0;
    
    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };
    
    const handleTouchEnd = (e: TouchEvent) => {
      e.preventDefault();
      if (!touchStartX || !touchStartY) return;
      
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      
      const diffX = touchStartX - touchEndX;
      const diffY = touchStartY - touchEndY;
      
      if (Math.abs(diffX) > Math.abs(diffY)) {
        // Horizontal swipe
        if (diffX > 30) {
          // Swipe left
          if (playerRef.current.lane > 0) {
            playerRef.current.lane--;
          }
        } else if (diffX < -30) {
          // Swipe right
          if (playerRef.current.lane < 2) {
            playerRef.current.lane++;
          }
        }
      } else {
        // Vertical swipe
        if (diffY > 30) {
          // Swipe down - roll
          if (!playerRef.current.isJumping && !playerRef.current.isRolling) {
            playerRef.current.isRolling = true;
            setTimeout(() => {
              playerRef.current.isRolling = false;
            }, 500);
          }
        } else if (diffY < -30) {
          // Swipe up - jump
          if (!playerRef.current.isJumping && !playerRef.current.isRolling) {
            playerRef.current.isJumping = true;
            playerRef.current.jumpVelocity = -15;
          }
        }
      }
      
      touchStartX = 0;
      touchStartY = 0;
    };
    
    canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
    canvas.addEventListener('touchend', handleTouchEnd, { passive: false });
    
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
      
      // Increase speed over time
      state.speed = 5 + elapsed * 0.5;
      
      // Update score
      setScore(Math.floor(elapsed * 10));
      
      // Handle player movement
      if (keysRef.current['arrowleft'] || keysRef.current['a']) {
        if (player.lane > 0) {
          player.lane--;
        }
      }
      if (keysRef.current['arrowright'] || keysRef.current['d']) {
        if (player.lane < 2) {
          player.lane++;
        }
      }
      
      // Handle jump
      if ((keysRef.current['arrowup'] || keysRef.current['w'] || keysRef.current[' ']) && !player.isJumping && !player.isRolling) {
        player.isJumping = true;
        player.jumpVelocity = -15;
      }
      
      // Handle roll
      if ((keysRef.current['arrowdown'] || keysRef.current['s']) && !player.isJumping && !player.isRolling) {
        player.isRolling = true;
        setTimeout(() => {
          player.isRolling = false;
        }, 500);
      }
      
      // Update jump physics
      if (player.isJumping) {
        player.jumpVelocity += 0.8; // Gravity
        player.jumpHeight += player.jumpVelocity;
        
        if (player.jumpHeight <= 0) {
          player.jumpHeight = 0;
          player.jumpVelocity = 0;
          player.isJumping = false;
        }
      }
      
      // Spawn coins
      if (now - state.lastCoinSpawn > 1000) {
        const lane = Math.floor(Math.random() * 3);
        state.coins.push({
          id: state.nextCoinId++,
          lane,
          y: -50,
          collected: false,
        });
        state.lastCoinSpawn = now;
      }
      
      // Spawn obstacles
      if (now - state.lastObstacleSpawn > 2000 - Math.min(elapsed * 50, 1500)) {
        const lane = Math.floor(Math.random() * 3);
        const type = Math.random() > 0.5 ? 'train' : 'barrier';
        state.obstacles.push({
          id: state.nextObstacleId++,
          lane,
          y: -100,
          type,
        });
        state.lastObstacleSpawn = now;
      }
      
      // Update coins
      state.coins.forEach((coin, index) => {
        coin.y += state.speed;
        
        // Check collection
        if (!coin.collected) {
          const playerX = CANVAS_WIDTH / 2 + (player.lane - 1) * LANE_WIDTH;
          const playerY = player.y - player.jumpHeight;
          const coinX = CANVAS_WIDTH / 2 + (coin.lane - 1) * LANE_WIDTH;
          const coinY = coin.y;
          
          const distance = Math.sqrt(
            Math.pow(playerX - coinX, 2) + Math.pow(playerY - coinY, 2)
          );
          
          if (distance < 30) {
            coin.collected = true;
            setCoins(prev => prev + 1);
            
            // Create particle effect
            for (let i = 0; i < 8; i++) {
              state.particles.push({
                x: coinX,
                y: coinY,
                vx: (Math.random() - 0.5) * 4,
                vy: (Math.random() - 0.5) * 4,
                life: 30,
                color: '#FFD700',
              });
            }
          }
        }
        
        // Remove off-screen coins
        if (coin.y > CANVAS_HEIGHT + 50) {
          state.coins.splice(index, 1);
        }
      });
      
      // Update obstacles
      state.obstacles.forEach((obstacle, index) => {
        obstacle.y += state.speed;
        
        // Check collision
        if (!player.isRolling || obstacle.type === 'train') {
          const playerX = CANVAS_WIDTH / 2 + (player.lane - 1) * LANE_WIDTH;
          const playerY = player.y - player.jumpHeight;
          const obstacleX = CANVAS_WIDTH / 2 + (obstacle.lane - 1) * LANE_WIDTH;
          const obstacleY = obstacle.y;
          
          // Trains can be jumped over, barriers can be rolled under
          if (obstacle.type === 'train' && player.isJumping && player.jumpHeight > 60) {
            // Can jump over train
          } else if (obstacle.type === 'barrier' && player.isRolling) {
            // Can roll under barrier
          } else {
            const distance = Math.sqrt(
              Math.pow(playerX - obstacleX, 2) + Math.pow(playerY - obstacleY, 2)
            );
            
            if (distance < 35) {
              // Game over
              if (score > highScore) {
                setHighScore(score);
                localStorage.setItem('subwaySurfersHighScore', score.toString());
              }
              setGameState('gameOver');
              return;
            }
          }
        }
        
        // Remove off-screen obstacles
        if (obstacle.y > CANVAS_HEIGHT + 100) {
          state.obstacles.splice(index, 1);
        }
      });
      
      // Update particles
      state.particles = state.particles.filter(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life--;
        return particle.life > 0;
      });
      
      // Draw background
      const gradient = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT);
      gradient.addColorStop(0, '#87CEEB'); // Sky blue
      gradient.addColorStop(0.7, '#E0E0E0'); // Light gray
      gradient.addColorStop(1, '#8B7355'); // Brown
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      
      // Draw tracks (3 lanes)
      ctx.fillStyle = '#2C2C2C';
      for (let i = 0; i < 3; i++) {
        const x = CANVAS_WIDTH / 2 + (i - 1) * LANE_WIDTH - LANE_WIDTH / 2;
        ctx.fillRect(x, 0, LANE_WIDTH, CANVAS_HEIGHT);
      }
      
      // Draw lane dividers
      ctx.strokeStyle = '#FFFF00';
      ctx.lineWidth = 3;
      ctx.setLineDash([20, 20]);
      for (let i = 0; i < 2; i++) {
        const x = CANVAS_WIDTH / 2 + (i - 0.5) * LANE_WIDTH;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, CANVAS_HEIGHT);
        ctx.stroke();
      }
      ctx.setLineDash([]);
      
      // Draw moving background (parallax effect)
      const bgOffset = (elapsed * state.speed * 0.3) % 100;
      ctx.fillStyle = '#555';
      for (let i = -1; i < CANVAS_HEIGHT / 100 + 1; i++) {
        ctx.fillRect(50, i * 100 - bgOffset, 20, 40);
        ctx.fillRect(CANVAS_WIDTH - 70, i * 100 - bgOffset + 50, 20, 40);
      }
      
      // Draw coins
      state.coins.forEach(coin => {
        if (!coin.collected) {
          const x = CANVAS_WIDTH / 2 + (coin.lane - 1) * LANE_WIDTH;
          const y = coin.y;
          
          // Rotating coin
          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(elapsed * 3);
          ctx.fillStyle = '#FFD700';
          ctx.beginPath();
          ctx.arc(0, 0, 15, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = '#FFA500';
          ctx.lineWidth = 2;
          ctx.stroke();
          ctx.restore();
        }
      });
      
      // Draw obstacles
      state.obstacles.forEach(obstacle => {
        const x = CANVAS_WIDTH / 2 + (obstacle.lane - 1) * LANE_WIDTH;
        const y = obstacle.y;
        
        if (obstacle.type === 'train') {
          // Draw train
          ctx.fillStyle = '#8B0000';
          ctx.fillRect(x - 30, y - 40, 60, 50);
          ctx.fillStyle = '#000';
          ctx.fillRect(x - 25, y - 35, 50, 30);
          ctx.fillStyle = '#FFD700';
          ctx.fillRect(x - 20, y - 30, 40, 20);
          
          // Windows
          ctx.fillStyle = '#87CEEB';
          ctx.fillRect(x - 15, y - 25, 10, 10);
          ctx.fillRect(x + 5, y - 25, 10, 10);
        } else {
          // Draw barrier
          ctx.fillStyle = '#FF4500';
          ctx.fillRect(x - 25, y - 30, 50, 30);
          ctx.fillStyle = '#FFFF00';
          ctx.fillRect(x - 20, y - 25, 40, 5);
          ctx.fillRect(x - 20, y - 15, 40, 5);
        }
      });
      
      // Draw particles
      state.particles.forEach(particle => {
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.life / 30;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 3, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      
      // Draw player
      const playerX = CANVAS_WIDTH / 2 + (player.lane - 1) * LANE_WIDTH;
      const playerY = player.y - player.jumpHeight;
      const playerHeight = player.isRolling ? ROLL_HEIGHT : PLAYER_SIZE;
      
      ctx.save();
      ctx.translate(playerX, playerY);
      
      // Player shadow
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.beginPath();
      ctx.ellipse(0, playerHeight / 2 + 5, PLAYER_SIZE * 0.6, PLAYER_SIZE * 0.3, 0, 0, Math.PI * 2);
      ctx.fill();
      
      // Player body
      ctx.fillStyle = '#FF6B6B';
      ctx.fillRect(-PLAYER_SIZE / 2, -playerHeight / 2, PLAYER_SIZE, playerHeight);
      
      // Player details
      ctx.fillStyle = '#4ECDC4';
      ctx.fillRect(-PLAYER_SIZE / 2 + 5, -playerHeight / 2 + 5, PLAYER_SIZE - 10, playerHeight - 10);
      
      // Eyes
      ctx.fillStyle = '#FFF';
      ctx.beginPath();
      ctx.arc(-8, -10, 4, 0, Math.PI * 2);
      ctx.arc(8, -10, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#000';
      ctx.beginPath();
      ctx.arc(-8, -10, 2, 0, Math.PI * 2);
      ctx.arc(8, -10, 2, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.restore();
      
      // Draw UI
      ctx.fillStyle = '#FFF';
      ctx.font = 'bold 24px Arial';
      ctx.fillText(`Score: ${score}`, 10, 30);
      ctx.fillText(`Coins: ${coins}`, 10, 60);
      
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
  }, [gameState, score, coins, highScore]);
  
  const startGame = () => {
    setGameState('playing');
  };
  
  const resetGame = () => {
    setGameState('menu');
    setScore(0);
    setCoins(0);
  };
  
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 p-4">
      {gameState === 'menu' && (
        <div className="text-center space-y-8">
          <h1 className="text-6xl md:text-8xl font-black text-white drop-shadow-2xl">
            SUBWAY SURFERS
          </h1>
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border-4 border-white/50">
            <p className="text-white text-xl mb-4">High Score: {highScore}</p>
            <button
              onClick={startGame}
              className="px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-bold text-2xl rounded-xl shadow-lg transform hover:scale-105 transition-all"
            >
              SPIEL STARTEN
            </button>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border-4 border-white/50 text-white">
            <h2 className="text-2xl font-bold mb-4">Steuerung:</h2>
            <ul className="text-left space-y-2">
              <li>← → / A D - Lanes wechseln</li>
              <li>↑ / W / Leertaste - Springen</li>
              <li>↓ / S - Rollen</li>
              <li>Touch: Wischen für Bewegung</li>
            </ul>
          </div>
        </div>
      )}
      
      {gameState === 'playing' && (
        <div className="relative">
          <canvas
            ref={canvasRef}
            className="border-4 border-white rounded-xl shadow-2xl bg-gray-200"
            style={{ display: 'block' }}
          />
          <div className="absolute top-4 left-4 text-white font-bold text-xl drop-shadow-lg">
            Score: {score} | Coins: {coins}
          </div>
        </div>
      )}
      
      {gameState === 'gameOver' && (
        <div className="text-center space-y-8 bg-white/20 backdrop-blur-sm rounded-2xl p-8 border-4 border-white/50">
          <h2 className="text-5xl font-black text-white drop-shadow-2xl">GAME OVER</h2>
          <div className="space-y-4 text-white text-xl">
            <p>Score: {score}</p>
            <p>Coins: {coins}</p>
            {score === highScore && score > 0 && (
              <p className="text-yellow-300 font-bold">🎉 NEUER HIGH SCORE! 🎉</p>
            )}
          </div>
          <div className="flex gap-4 justify-center">
            <button
              onClick={startGame}
              className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-bold text-xl rounded-xl shadow-lg transform hover:scale-105 transition-all"
            >
              Nochmal spielen
            </button>
            <button
              onClick={resetGame}
              className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-bold text-xl rounded-xl shadow-lg transform hover:scale-105 transition-all"
            >
              Menü
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
