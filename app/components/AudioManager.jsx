import React, { useEffect, useRef, useState } from "react";

const AudioManager = ({ gameState }) => {
  const backgroundMusicRef = useRef(null);
  const soundEffectRef = useRef(null);
  const [canPlayAudio, setCanPlayAudio] = useState(false);
  const [audioError, setAudioError] = useState(null);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const handleUserInteraction = () => {
      setCanPlayAudio(true);
      document.removeEventListener("click", handleUserInteraction);
    };

    document.addEventListener("click", handleUserInteraction);

    return () => {
      document.removeEventListener("click", handleUserInteraction);
    };
  }, []);

  useEffect(() => {
    if (backgroundMusicRef.current) {
      backgroundMusicRef.current.volume = volume;
      backgroundMusicRef.current.muted = isMuted;
    }
  }, [volume, isMuted]);

  useEffect(() => {
    if (canPlayAudio && backgroundMusicRef.current) {
      backgroundMusicRef.current.play().catch((error) => {
        console.error("Error playing background music:", error);
        setAudioError(
          "Background music could not be played. Please check if the file exists."
        );
      });
    }
  }, [canPlayAudio]);

  useEffect(() => {
    if (
      canPlayAudio &&
      gameState.playerProgress.collectedEvidence.length > 0 &&
      soundEffectRef.current
    ) {
      soundEffectRef.current.play().catch((error) => {
        console.error("Error playing sound effect:", error);
        setAudioError(
          "Sound effect could not be played. Please check if the file exists."
        );
      });
    }
  }, [canPlayAudio, gameState.playerProgress.collectedEvidence]);

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  if (audioError) {
    console.warn(audioError);
    return null;
  }

  return (
    <div className="audio-controls flex items-center space-x-4">
      <audio ref={backgroundMusicRef} loop>
        <source src="/audio/background-music.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <audio ref={soundEffectRef}>
        <source src="/audio/evidence-collected.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <button
        onClick={toggleMute}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-sm"
      >
        {isMuted ? "Unmute" : "Mute"}
      </button>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={handleVolumeChange}
        className="w-24"
      />
      <span className="text-sm">Vol: {Math.round(volume * 100)}%</span>
    </div>
  );
};

export default AudioManager;
