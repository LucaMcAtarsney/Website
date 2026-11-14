"use client";

import { useEffect, useRef, useState } from "react";

const CELL_SIZE = 10;
const GRID_WIDTH = 60;
const GRID_HEIGHT = 40;
const STEP_INTERVAL = 120;

type Grid = Uint8Array;

function createEmptyGrid(): Grid {
  return new Uint8Array(GRID_WIDTH * GRID_HEIGHT);
}

function randomGrid(): Grid {
  const grid = createEmptyGrid();
  for (let i = 0; i < grid.length; i++) {
    grid[i] = Math.random() > 0.7 ? 1 : 0;
  }
  return grid;
}

function getIndex(x: number, y: number): number {
  return y * GRID_WIDTH + x;
}

function step(grid: Grid): Grid {
  const newGrid = createEmptyGrid();

  for (let y = 0; y < GRID_HEIGHT; y++) {
    for (let x = 0; x < GRID_WIDTH; x++) {
      const idx = getIndex(x, y);
      const alive = grid[idx] === 1;

      let neighbors = 0;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (dx === 0 && dy === 0) continue;
          const nx = x + dx;
          const ny = y + dy;
          if (nx < 0 || nx >= GRID_WIDTH || ny < 0 || ny >= GRID_HEIGHT) continue;
          if (grid[getIndex(nx, ny)] === 1) neighbors++;
        }
      }

      newGrid[idx] = alive
        ? neighbors === 2 || neighbors === 3
          ? 1
          : 0
        : neighbors === 3
          ? 1
          : 0;
    }
  }

  return newGrid;
}

export function GameOfLife() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [grid, setGrid] = useState<Grid>(randomGrid());
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [generation, setGeneration] = useState<number>(0);
  const lastStepRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = GRID_WIDTH * CELL_SIZE;
    const height = GRID_HEIGHT * CELL_SIZE;
    canvas.width = width;
    canvas.height = height;

    // Match the active theme (monochrome).
    const styles = getComputedStyle(document.documentElement);
    const bg = styles.getPropertyValue("--bg").trim() || "#000";
    const fg = styles.getPropertyValue("--fg").trim() || "#e8e8e8";
    const line = styles.getPropertyValue("--line").trim() || "rgba(255,255,255,0.14)";

    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = fg;
    for (let y = 0; y < GRID_HEIGHT; y++) {
      for (let x = 0; x < GRID_WIDTH; x++) {
        if (grid[getIndex(x, y)] === 1) {
          ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        }
      }
    }

    ctx.strokeStyle = line;
    ctx.lineWidth = 1;
    for (let x = 0; x <= GRID_WIDTH; x++) {
      ctx.beginPath();
      ctx.moveTo(x * CELL_SIZE, 0);
      ctx.lineTo(x * CELL_SIZE, height);
      ctx.stroke();
    }
    for (let y = 0; y <= GRID_HEIGHT; y++) {
      ctx.beginPath();
      ctx.moveTo(0, y * CELL_SIZE);
      ctx.lineTo(width, y * CELL_SIZE);
      ctx.stroke();
    }
  }, [grid]);

  useEffect(() => {
    if (!isRunning) return;

    let animationFrameId: number;
    const tick = (timestamp: number) => {
      if (!lastStepRef.current) lastStepRef.current = timestamp;
      if (timestamp - lastStepRef.current > STEP_INTERVAL) {
        setGrid((prev) => step(prev));
        setGeneration((gen) => gen + 1);
        lastStepRef.current = timestamp;
      }
      animationFrameId = requestAnimationFrame(tick);
    };
    animationFrameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isRunning]);

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = Math.floor(((event.clientX - rect.left) * scaleX) / CELL_SIZE);
    const y = Math.floor(((event.clientY - rect.top) * scaleY) / CELL_SIZE);
    if (x < 0 || x >= GRID_WIDTH || y < 0 || y >= GRID_HEIGHT) return;

    setGrid((prev) => {
      const next = prev.slice() as Grid;
      const idx = getIndex(x, y);
      next[idx] = next[idx] === 1 ? 0 : 1;
      return next;
    });
  };

  const handleRandomize = () => {
    setGrid(randomGrid());
    setGeneration(0);
  };

  const handleClear = () => {
    setGrid(createEmptyGrid());
    setGeneration(0);
  };

  const handleStep = () => {
    setGrid((prev) => step(prev));
    setGeneration((gen) => gen + 1);
  };

  return (
    <div className="frame">
      <div className="frame-bar">
        <span>game of life</span>
        <span>generation {generation}</span>
      </div>

      <div className="gol-main">
        <canvas ref={canvasRef} className="gol-canvas" onClick={handleCanvasClick} />
      </div>

      <div className="gol-controls">
        <button type="button" onClick={() => setIsRunning((r) => !r)} className="gol-button">
          {isRunning ? "pause" : "play"}
        </button>
        <button type="button" onClick={handleStep} className="gol-button" disabled={isRunning}>
          step
        </button>
        <button type="button" onClick={handleRandomize} className="gol-button">
          randomise
        </button>
        <button type="button" onClick={handleClear} className="gol-button">
          clear
        </button>
      </div>
    </div>
  );
}
