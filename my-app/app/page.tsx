"use client";

import { useEffect, useRef, useState } from "react";

// Vogel-Sprites (3 Frames für Flapping)
const birdFrames = [
  "/bird1.png",
  "/bird2.png",
  "/bird3.png",
];

export default function Home() {
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedFrame, setSelectedFrame] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [score, setScore] = useState(0);
  const [highscore, setHighscore] = useState(0);
  const [isPaused, setPaused] = useState(false);

  // Sounds
  const jumpSound = useRef<HTMLAudioElement>(null);
  const pointSound = useRef<HTMLAudioElement>(null);
  const crashSound = useRef<HTMLAudioElement>(null);

  // Load Highscore & Sounds
  useEffect(() => {
    const saved = localStorage.getItem("flappy-highscore");
    if (saved) setHighscore(Number(saved));

    jumpSound.current = new Audio("/jump.wav");
    pointSound.current = new Audio("/point.wav");
    crashSound.current = new Audio("/crash.wav");
  }, []);

  useEffect(() => {
    if (!gameStarted) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    canvas.width = 400;
    canvas.height = 600;

    // Load Bird Image
    const birdImages = birdFrames.map((src) => {
      const img = new Image();
      img.src = src;
      return img;
    });

    // Bird
    let birdX = 80;
    let birdY = 200;
    let velocity = 0;
    const gravity = 0.35;
    const flapPower = -7;
    let flapCounter = 0;

    // Pipes
    let pipes: { x: number; gapY: number }[] = [];
    let frame = 0;
    let pipeSpeed = 2;

    const groundHeight = 50;

    function addPipe() {
      const gapY = Math.random() * 250 + 120;
      pipes.push({ x: canvas.width, gapY });
    }

    function resetGame() {
      birdY = 200;
      velocity = 0;
      pipes = [];
      setScore(0);
      pipeSpeed = 2;
      frame = 0;
    }

    function drawBackground() {
      // Himmel
      ctx.fillStyle = "#70c5ce";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Parallax Wolken
      ctx.fillStyle = "rgba(255,255,255,0.7)";
      ctx.beginPath();
      ctx.ellipse((frame * 0.5) % canvas.width, 100, 40, 20, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse((frame * 0.3 + 200) % canvas.width, 150, 50, 25, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    function drawPipes() {
      pipes.forEach((pipe) => {
        pipe.x -= pipeSpeed;

        // Pseudo-3D: Rohr perspektivisch schmaler hinten
        const depth = 1 - Math.min(1, pipe.x / canvas.width);
        const pipeWidth = 60 * (1 - depth * 0.5);
        ctx.fillStyle = "#2ecc71";
        ctx.fillRect(pipe.x, 0, pipeWidth, pipe.gapY - 90);
        ctx.fillRect(pipe.x, pipe.gapY + 90, pipeWidth, canvas.height - pipe.gapY - 90);

        // Collision
        if (
          birdX < pipe.x + pipeWidth &&
          birdX + 34 > pipe.x &&
          (birdY < pipe.gapY - 90 || birdY + 24 > pipe.gapY + 90)
        ) {
          crashSound.current?.play();
          resetGame();
        }

        // Score
        if (pipe.x + pipeWidth === birdX) {
          setScore((prev) => {
            const newScore = prev + 1;
            pointSound.current?.play();
            if (newScore > highscore) localStorage.setItem("flappy-highscore", String(newScore));
            return newScore;
          });
        }
      });
    }

    function drawBird() {
      // Flap Animation
      flapCounter++;
      if (flapCounter % 5 === 0) setSelectedFrame((prev) => (prev + 1) % birdImages.length);

      const img = birdImages[selectedFrame];
      ctx.drawImage(img, birdX, birdY, 34, 24); // kleine Größe
    }

    function drawGround() {
      ctx.fillStyle = "#ded895";
      ctx.fillRect(0, canvas.height - groundHeight, canvas.width, groundHeight);
    }

    function gameLoop() {
      if (isPaused) {
        requestAnimationFrame(gameLoop);
        return;
      }

      drawBackground();

      // Bird Physics
      velocity += gravity;
      birdY += velocity;

      drawBird();
      if (frame % 120 === 0) addPipe();
      frame++;
      if (frame % 500 === 0) pipeSpeed += 0.2;
      drawPipes();
      drawGround();

      // Ground Collision
      if (birdY + 24 > canvas.height - groundHeight) {
        crashSound.current?.play();
        resetGame();
      }

      requestAnimationFrame(gameLoop);
    }

    gameLoop();

    const handleClick = () => {
      velocity = flapPower;
      jumpSound.current?.play();
    };
    window.addEventListener("mousedown", handleClick);
    window.addEventListener("touchstart", handleClick);

    return () => {
      window.removeEventListener("mousedown", handleClick);
      window.removeEventListener("touchstart", handleClick);
    };
  }, [gameStarted, isPaused, highscore, selectedFrame]);

  return (
    <main className="h-screen flex flex-col items-center justify-center px-6 text-center">
      {!gameStarted ? (
        <>
          <h1 className="text-6xl font-bold mb-6 drop-shadow-lg">Flappy Bird 3D</h1>
          <p className="text-xl mb-10 max-w-lg">
            Fliege durch die Rohre mit smoothen Sprung-Animationen und pseudo-3D Grafik!
          </p>

          <button
            onClick={() => setGameStarted(true)}
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-8 rounded-xl text-2xl shadow-xl transition"
          >
            ▶ Spiel starten
          </button>
        </>
      ) : (
        <>
          <div className="mb-3 text-xl font-bold">
            Score: {score} | 🏆 Highscore: {highscore}
          </div>

          <canvas
            ref={canvasRef}
            className="border-4 border-yellow-300 rounded-lg shadow-2xl"
          />

          <button
            onClick={() => setPaused((p) => !p)}
            className="mt-4 bg-white text-black px-6 py-2 rounded-xl font-bold shadow hover:bg-gray-200"
          >
            {isPaused ? "▶ Weiter" : "⏸ Pause"}
          </button>

          <button
            onClick={() => setGameStarted(false)}
            className="mt-2 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl font-bold shadow"
          >
            🔙 Zur Startseite
          </button>
        </>
      )}
    </main>
  );
}
