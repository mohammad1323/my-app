"use client";

import { useEffect, useRef, useState } from "react";

// Vogel-Skins + Animation (Flapping)
const birdSkins = ["yellow", "red", "blue"];

export default function Home() {
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedSkin, setSelectedSkin] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [score, setScore] = useState(0);
  const [highscore, setHighscore] = useState(0);
  const [isPaused, setPaused] = useState(false);

  // Sounds
  const jumpSound = useRef<HTMLAudioElement>(null);
  const pointSound = useRef<HTMLAudioElement>(null);
  const powerupSound = useRef<HTMLAudioElement>(null);
  const crashSound = useRef<HTMLAudioElement>(null);

  // Setup Highscore & Sounds
  useEffect(() => {
    const saved = localStorage.getItem("flappy-highscore");
    if (saved) setHighscore(Number(saved));

    jumpSound.current = new Audio("/jump.wav");
    pointSound.current = new Audio("/point.wav");
    powerupSound.current = new Audio("/powerup.wav");
    crashSound.current = new Audio("/crash.wav");
  }, []);

  useEffect(() => {
    if (!gameStarted) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    canvas.width = 400;
    canvas.height = 600;

    // Bird
    let birdX = 60;
    let birdY = 200;
    let velocity = 0;
    const gravity = 0.35;
    const flapPower = -7;
    let flapFrame = 0; // Für Flapping Animation

    // Pipes
    let pipes: { x: number; gapY: number }[] = [];
    let powerUps: { x: number; y: number; type: "points" | "shield" }[] = [];
    let frame = 0;
    let pipeSpeed = 2; // Levelprogression

    // Shield
    let shieldActive = false;
    let shieldTimer = 0;

    // Boden
    const groundHeight = 50;

    function addPipe() {
      const gapY = Math.random() * 250 + 120;
      pipes.push({ x: canvas.width, gapY });

      // 25% Chance für Power-Up
      if (Math.random() < 0.25) {
        const type = Math.random() < 0.5 ? "points" : "shield";
        powerUps.push({ x: canvas.width + 30, y: gapY, type });
      }
    }

    function resetGame() {
      birdY = 200;
      velocity = 0;
      pipes = [];
      powerUps = [];
      setScore(0);
      pipeSpeed = 2;
      shieldActive = false;
      shieldTimer = 0;
      frame = 0;
    }

    function gameLoop() {
      if (isPaused) {
        requestAnimationFrame(gameLoop);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Hintergrund
      ctx.fillStyle = "#70c5ce";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Bird physics
      velocity += gravity;
      birdY += velocity;
      flapFrame = (flapFrame + 1) % 20;

      // Draw bird (flap animation)
      ctx.fillStyle = birdSkins[selectedSkin];
      const birdHeight = 30 + Math.sin((flapFrame / 20) * Math.PI) * 5;
      ctx.fillRect(birdX, birdY, 30, birdHeight);

      // Add pipes
      if (frame % 120 === 0) addPipe();
      frame++;
      if (frame % 500 === 0) pipeSpeed += 0.2; // schwieriger

      // Draw Pipes
      pipes.forEach((pipe) => {
        pipe.x -= pipeSpeed;
        ctx.fillStyle = "green";
        ctx.fillRect(pipe.x, 0, 60, pipe.gapY - 90);
        ctx.fillRect(pipe.x, pipe.gapY + 90, 60, canvas.height - pipe.gapY - 90);

        // Collision
        if (
          birdX < pipe.x + 60 &&
          birdX + 30 > pipe.x &&
          (birdY < pipe.gapY - 90 || birdY + birdHeight > pipe.gapY + 90)
        ) {
          if (!shieldActive) {
            crashSound.current?.play();
            resetGame();
          }
        }

        // Score
        if (pipe.x + 60 === birdX) {
          setScore((prev) => {
            const newScore = prev + 1;
            pointSound.current?.play();
            if (newScore > highscore) {
              localStorage.setItem("flappy-highscore", String(newScore));
              setHighscore(newScore);
            }
            return newScore;
          });
        }
      });

      // Draw Power-Ups
      powerUps.forEach((pu, index) => {
        pu.x -= pipeSpeed;
        ctx.fillStyle = pu.type === "points" ? "lime" : "cyan";
        ctx.fillRect(pu.x, pu.y - 15, 20, 20);

        if (
          birdX < pu.x + 20 &&
          birdX + 30 > pu.x &&
          birdY < pu.y + 20 &&
          birdY + birdHeight > pu.y
        ) {
          if (pu.type === "points") {
            setScore((prev) => {
              const newScore = prev + 3;
              if (newScore > highscore) {
                localStorage.setItem("flappy-highscore", String(newScore));
                setHighscore(newScore);
              }
              return newScore;
            });
          } else if (pu.type === "shield") {
            shieldActive = true;
            shieldTimer = 300; // Frames
          }
          powerupSound.current?.play();
          powerUps.splice(index, 1);
        }
      });

      // Draw Shield
      if (shieldActive) {
        ctx.strokeStyle = "cyan";
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(birdX + 15, birdY + 15, 20, 0, Math.PI * 2);
        ctx.stroke();
        shieldTimer--;
        if (shieldTimer <= 0) shieldActive = false;
      }

      // Ground
      ctx.fillStyle = "#ded895";
      ctx.fillRect(0, canvas.height - groundHeight, canvas.width, groundHeight);

      // Ground collision
      if (birdY + birdHeight > canvas.height - groundHeight && !shieldActive) {
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
  }, [gameStarted, isPaused, highscore, selectedSkin]);

  return (
    <main className="h-screen flex flex-col items-center justify-center px-6 text-center">
      {!gameStarted ? (
        <>
          <h1 className="text-6xl font-bold mb-6 drop-shadow-lg">Flappy Bird Pro</h1>
          <p className="text-xl mb-10 max-w-lg">
            Fliege durch die Rohre, sammle Power-Ups und erreiche neue Highscores!
          </p>

          <div className="mb-6 flex gap-4">
            {birdSkins.map((color, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedSkin(idx)}
                className={`w-10 h-10 rounded-full border-4 ${
                  selectedSkin === idx ? "border-white" : "border-gray-200"
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>

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
