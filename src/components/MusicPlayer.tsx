import React, { useState, useRef, useEffect } from 'react';

const TRACKS = [
  {
    id: 1,
    title: "ERR_0x01_DRIFT",
    artist: "CYBER_SYNTH",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    color: "cyan"
  },
  {
    id: 2,
    title: "NULL_HORIZON",
    artist: "NEURAL_NET",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    color: "magenta"
  },
  {
    id: 3,
    title: "Q_CORE_DUMP",
    artist: "ALGO_ALPHA",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    color: "white"
  }
];

export function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentTrack = TRACKS[currentTrackIndex];

  const getTextColor = (c: string) => c === 'cyan' ? 'text-cyan-glitch' : c === 'magenta' ? 'text-magenta-glitch' : 'text-white';
  const getBorderColor = (c: string) => c === 'cyan' ? 'border-cyan-glitch' : c === 'magenta' ? 'border-magenta-glitch' : 'border-white';
  const getHoverBg = (c: string) => c === 'cyan' ? 'hover:bg-cyan-glitch' : c === 'magenta' ? 'hover:bg-magenta-glitch' : 'hover:bg-white';
  const getBgColor = (c: string) => c === 'cyan' ? 'bg-cyan-glitch' : c === 'magenta' ? 'bg-magenta-glitch' : 'bg-white';

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.log("Audio play failed:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const playNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
    setProgress(0);
    setIsPlaying(true);
  };

  const playPrev = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
    setProgress(0);
    setIsPlaying(true);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      if (duration) {
        setProgress((current / duration) * 100);
      }
    }
  };

  const handleTrackEnded = () => {
    playNext();
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current) {
      const bounds = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - bounds.left;
      const percentage = x / bounds.width;
      audioRef.current.currentTime = percentage * audioRef.current.duration;
      setProgress(percentage * 100);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-black border-4 border-magenta-glitch p-6 relative overflow-hidden" style={{ boxShadow: '-8px 8px 0px #00FFFF' }}>
      
      <audio
        ref={audioRef}
        src={currentTrack.url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleTrackEnded}
      />

      <div className="relative z-10">
        <div className="flex flex-col gap-2 mb-6 border-b-2 border-dashed border-gray-600 pb-4">
          <div className="flex justify-between items-start">
            <h3 className={`${getTextColor(currentTrack.color)} font-pixel text-sm truncate uppercase`}>
              {isPlaying ? '> PLAYING: ' : '> PAUSED: '}{currentTrack.title}
            </h3>
            <span className="text-gray-500 font-terminal text-xl">[{currentTrackIndex + 1}/{TRACKS.length}]</span>
          </div>
          <p className="text-gray-400 text-lg font-terminal uppercase">SRC: {currentTrack.artist}</p>
        </div>

        {/* Progress Bar */}
        <div 
          className="h-4 w-full bg-gray-900 border-2 border-gray-700 mb-6 cursor-pointer relative"
          onClick={handleProgressClick}
        >
          <div 
            className={`h-full ${getBgColor(currentTrack.color)} transition-all duration-100`}
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between font-pixel text-xs">
          <button 
            onClick={playPrev}
            className="px-2 py-2 bg-black border-2 border-cyan-glitch text-cyan-glitch hover:bg-cyan-glitch hover:text-black uppercase"
          >
            PREV
          </button>
          
          <button 
            onClick={togglePlay}
            className={`px-4 py-2 bg-black border-2 ${getBorderColor(currentTrack.color)} ${getTextColor(currentTrack.color)} ${getHoverBg(currentTrack.color)} hover:text-black uppercase`}
          >
            {isPlaying ? "HALT" : "EXEC"}
          </button>
          
          <button 
            onClick={playNext}
            className="px-2 py-2 bg-black border-2 border-cyan-glitch text-cyan-glitch hover:bg-cyan-glitch hover:text-black uppercase"
          >
            NEXT
          </button>

          <button 
            onClick={() => setIsMuted(!isMuted)}
            className={`px-2 py-2 bg-black border-2 ${isMuted ? 'border-magenta-glitch text-magenta-glitch' : 'border-gray-500 text-gray-500'} hover:bg-white hover:text-black uppercase`}
          >
            {isMuted ? "MUTED" : "MUTE"}
          </button>
        </div>
      </div>
    </div>
  );
}
