/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { SnakeGame } from './components/SnakeGame';
import { MusicPlayer } from './components/MusicPlayer';

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-terminal selection:bg-magenta-glitch/50 overflow-hidden relative scanlines">
      <div className="static-noise" />
      
      <header className="w-full p-6 relative z-10 flex justify-center border-b-4 border-cyan-glitch">
        <h1 
          className="text-4xl md:text-5xl font-pixel uppercase text-white glitch screen-tear" 
          data-text="SYSTEM.SNAKE_OS"
        >
          SYSTEM.SNAKE_OS
        </h1>
      </header>

      <main className="flex-1 flex flex-col lg:flex-row items-start justify-center gap-8 lg:gap-16 p-6 relative z-10 w-full max-w-7xl mx-auto mt-8">
        
        {/* Game Section */}
        <section className="w-full lg:w-3/5 flex justify-center order-2 lg:order-1 screen-tear" style={{ animationDelay: '1s' }}>
          <SnakeGame />
        </section>

        {/* Music Player Section */}
        <section className="w-full lg:w-2/5 flex flex-col justify-center order-1 lg:order-2">
          <div className="mb-6 border-l-4 border-magenta-glitch pl-4">
            <h2 className="text-xl font-pixel text-cyan-glitch uppercase mb-2">AUDIO_STREAM</h2>
            <p className="text-gray-400 text-lg font-terminal uppercase">DECRYPTING FREQUENCIES...</p>
          </div>
          <MusicPlayer />
        </section>

      </main>
    </div>
  );
}
