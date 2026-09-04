"use client";
import { useEffect, useRef } from "react";

function Box() {
  const boxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;

    let x = 0;
    let y = 0;
    const steps = 25;
    let animationFrameId: number;

    const activeKeys = new Set<string>();

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      activeKeys.add(event.key);
    };

    const handleKeyUp = (event: globalThis.KeyboardEvent) => {
      activeKeys.delete(event.key);
    };

    const handleMovement = () => {
      if (activeKeys.has("ArrowRight") || activeKeys.has("d")) x += steps;
      if (activeKeys.has("ArrowLeft") || activeKeys.has("a")) x -= steps;
      if (activeKeys.has("ArrowUp") || activeKeys.has("w")) y -= steps;
      if (activeKeys.has("ArrowDown") || activeKeys.has("s")) y += steps;

      box.style.transform = `translate(${x}px, ${y}px)`;
      animationFrameId = requestAnimationFrame(handleMovement);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    animationFrameId = requestAnimationFrame(handleMovement);

    return () => {
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("keyup", handleKeyUp);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <div ref={boxRef} className="absolute z-50 w-25 h-25 bg-red-500" />;
}

export default Box;
