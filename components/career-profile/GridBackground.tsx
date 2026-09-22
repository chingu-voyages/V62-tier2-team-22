"use client";

import React, { useEffect, useRef } from "react";

export const InteractiveGrid: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const gridSize = 50;

    const drawGrid = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // 2. Clear canvas and set base fill/stroke
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#070c18";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.lineWidth = 0.05;
      ctx.strokeStyle = "#eeeeee"; 

      for (let x = 0; x < canvas.width; x += gridSize) {
        for (let y = 0; y < canvas.height; y += gridSize) {
          ctx.strokeRect(x, y, gridSize, gridSize);
        }
      }
    };

    drawGrid();

    window.addEventListener("resize", drawGrid);

    return () => {
      window.removeEventListener("resize", drawGrid);
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-[#070c18] text-white">
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default InteractiveGrid;