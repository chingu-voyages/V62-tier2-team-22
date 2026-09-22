"use client";

import React, { useEffect, useRef } from "react";

interface Point {
  x: number;
  y: number;
}

export const InteractiveGrid: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let mousePos: Point = { x: -1000, y: -1000 };

    const resizeCanvas = () => {
	  if (!canvas.parentElement) return
      canvas.width = canvas.parentElement.clientWidth
      canvas.height = canvas.parentElement.clientHeight
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const handleMouseMove = (e: MouseEvent) => {
	  if(!canvasRef.current) return
	  const rect= canvasRef.current.getBoundingClientRect()
	  mousePos={
		x:e.clientX-rect.left,
		y:e.clientY-rect.top
	  }
    };

    window.addEventListener("mousemove", handleMouseMove);

    const gridSize = 50; 

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

    //   ctx.fillStyle = "#070c18";
    //   ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.lineWidth = 1;

      for (let x = 0; x < canvas.width; x += gridSize) {
        for (let y = 0; y < canvas.height; y += gridSize) {
          const dx = mousePos.x - x;
          const dy = mousePos.y - y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            ctx.strokeStyle = `rgba(56, 189, 248, ${1 - dist / 150})`;
          } else {
            ctx.strokeStyle = "rgba(30, 41, 59, 0.4)";
          }

          ctx.strokeRect(x, y, gridSize, gridSize);
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
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