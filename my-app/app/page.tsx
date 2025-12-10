"use client";

import { useEffect, useRef, useState } from "react";

// Vogel-Skins
const birdSkins = ["yellow", "red", "blue"];

export default function Home() {
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedSkin, setSelectedSkin] = useState(0); // Index für Vogel-Skin
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [score, setScore] = useState(0);
  const [highscore, setHighscore] = useState(0);
  const [isPaused, setPaused] = useState(false);

  // Sound-Elemente
  const jumpSound = useRef<HTMLAudioElement>(null);
  const pointSound = useRef<HTMLAudioElement>(null);
  const powerupSound = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("flappy-highscore");
    if (saved) setHighscore(Number(saved));

    // Sounds vorbereiten
    jumpSound.current = new Audio("/jump.wav"); // eigene Dateien in public/
    pointSound.current = new Audio("/point.wav");
    powerupSound.current = new Audio("/powerup.wav");
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
    const gravity = 0.4;

    // Pipes & PowerUps
    let pipes: { x: number; gapY: number }[] = [];
    let powerUps: { x: number; y: number }[] = [];
    let frame = 0;

    function addPipe() {
      const gapY = Math.random() * 250 + 100;
      pipes.push({ x: canvas.width, gapY });

      // 20% Chance auf Power-Up zwischen Pipes
      if (Math.random() < 0.2) {
        powerUps.push({ x: canvas.width + 30, y: gapY });
      }
    }

    function resetGame() {
      birdY = 200;
      velocity = 0;
      pipes = [];
      powerUps = [];
      setScore(0);
      frame = 0;
    }

    function gameLoop() {
      if (isPaused) {
        requestAnimationFrame(gameLoop);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Bird physics
      velocity += gravity;
      birdY += velocity;

      // Draw bird
      ctx.fillStyle = birdSkins[selectedSkin];
      ctx.fillRect(birdX, birdY, 30, 30);

      // Add pipes
      if (frame % 120 === 0) addPipe();
      frame++;

      // Draw pipes
      pipes.forEach((pipe) => {
        pipe.x -= 2;
        ctx.fillStyle = "green";
        ctx.fillRect(pipe.x, 0, 60, pipe.gapY - 90);
        ctx.fillRect(pipe.x, pipe.gapY + 90, 60, canvas.height);

        // Collision
        if (
          birdX < pipe.x + 60 &&
          birdX + 30 > pipe.x &&
          (birdY < pipe.gapY - 90 || birdY + 30 > pipe.gapY + 90)
        ) {
          resetGame();
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
        pu.x -= 2;
        ctx.fillStyle = "lime";
        ctx.fillRect(pu.x, pu.y - 15, 20, 20);

        // PowerUp collision
        if (
          birdX < pu.x + 20 &&
          birdX + 30 > pu.x &&
          birdY < pu.y + 20 &&
          birdY + 30 > pu.y
        ) {
          setScore((prev) => {
            const newScore = prev + 3;
            if (newScore > highscore) {
              localStorage.setItem("flappy-highscore", String(newScore));
              setHighscore(newScore);
            }
            return newScore;
          });
          powerupSound.current?.play();
          powerUps.splice(index, 1); // Power-Up entfernen
        }
      });

      // Ground / top collision
      if (birdY > canvas.height - 30 || birdY < 0) resetGame();

      requestAnimationFrame(gameLoop);
    }

    gameLoop();

    const handleClick = () => {
      velocity = -7;
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
          <h1 className="text-6xl font-bold mb-6 drop-shadow-lg">Flappy Bird</h1>
          <p className="text-xl mb-10 max-w-lg">
            Spiele jetzt das legendäre Flappy Bird! Schlage deinen Highscore
            und entdecke coole Extras wie Power-Ups und Vogel-Skins.
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
