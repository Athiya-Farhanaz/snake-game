import React from 'react';
import { useSnakeGame } from '../hooks/useSnakeGame';

export function SnakeGame() {
  const {
    snake,
    food,
    isGameOver,
    isPaused,
    score,
    gridSize,
    resetGame,
    togglePause
  } = useSnakeGame();

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto">
      <div className="flex justify-between items-center w-full mb-4 px-4 border-b-2 border-magenta-glitch pb-2">
        <div className="text-xl font-pixel text-cyan-glitch">
          SCORE:{score.toString().padStart(4, '0')}
        </div>
        <div className="flex gap-4 font-pixel text-xs">
          <button
            onClick={togglePause}
            className="px-3 py-2 bg-black border-2 border-cyan-glitch text-cyan-glitch hover:bg-cyan-glitch hover:text-black transition-none uppercase"
          >
            {isPaused ? "RESUME" : "PAUSE"}
          </button>
          <button
            onClick={resetGame}
            className="px-3 py-2 bg-black border-2 border-magenta-glitch text-magenta-glitch hover:bg-magenta-glitch hover:text-black transition-none uppercase"
          >
            RESET
          </button>
        </div>
      </div>

      <div 
        className="relative bg-black border-4 border-cyan-glitch overflow-hidden"
        style={{
          width: '100%',
          maxWidth: '500px',
          aspectRatio: '1 / 1',
          boxShadow: '8px 8px 0px #FF00FF'
        }}
      >
        {/* Grid Background */}
        <div 
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(to right, #00FFFF 1px, transparent 1px), linear-gradient(to bottom, #00FFFF 1px, transparent 1px)',
            backgroundSize: `${100 / gridSize}% ${100 / gridSize}%`
          }}
        />

        {/* Food */}
        <div
          className="absolute bg-magenta-glitch"
          style={{
            width: `${100 / gridSize}%`,
            height: `${100 / gridSize}%`,
            left: `${(food.x / gridSize) * 100}%`,
            top: `${(food.y / gridSize) * 100}%`,
          }}
        />

        {/* Snake */}
        {snake.map((segment, index) => {
          const isHead = index === 0;
          return (
            <div
              key={`${segment.x}-${segment.y}-${index}`}
              className={`absolute ${isHead ? 'bg-white' : 'bg-cyan-glitch'}`}
              style={{
                width: `${100 / gridSize}%`,
                height: `${100 / gridSize}%`,
                left: `${(segment.x / gridSize) * 100}%`,
                top: `${(segment.y / gridSize) * 100}%`,
              }}
            >
              {isHead && (
                <div className="w-full h-full relative">
                  <div className="absolute w-1/2 h-1/2 bg-magenta-glitch top-1/4 left-1/4" />
                </div>
              )}
            </div>
          );
        })}

        {/* Overlays */}
        {isGameOver && (
          <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center z-20">
            <h2 className="text-3xl font-pixel text-magenta-glitch mb-4 glitch" data-text="FATAL_ERROR">FATAL_ERROR</h2>
            <p className="text-cyan-glitch mb-8 font-terminal text-2xl">FINAL_SCORE: {score}</p>
            <button
              onClick={resetGame}
              className="px-6 py-3 bg-black border-4 border-cyan-glitch text-cyan-glitch font-pixel text-sm hover:bg-cyan-glitch hover:text-black transition-none uppercase"
            >
              REBOOT_SYSTEM
            </button>
          </div>
        )}

        {isPaused && !isGameOver && (
          <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-20">
            <h2 className="text-2xl font-pixel text-cyan-glitch glitch" data-text="SYSTEM_PAUSED">SYSTEM_PAUSED</h2>
          </div>
        )}
      </div>
      
      <div className="mt-8 text-gray-400 text-lg font-terminal text-center uppercase">
        INPUT_REQUIRED: <span className="text-cyan-glitch">ARROWS</span> / <span className="text-cyan-glitch">WASD</span><br/>
        INTERRUPT: <span className="text-magenta-glitch">SPACE</span>
      </div>
    </div>
  );
}
