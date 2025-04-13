
import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface SoundToggleProps {
  isMuted: boolean;
  toggleMute: () => void;
}

const SoundToggle: React.FC<SoundToggleProps> = ({ isMuted, toggleMute }) => {
  return (
    <button 
      onClick={toggleMute}
      className="fixed top-4 right-4 z-50 p-2 rounded-full bg-fest-black/80 text-white hover:bg-fest-purple/80 transition-colors neon-box"
      aria-label={isMuted ? "Unmute sounds" : "Mute sounds"}
    >
      {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
    </button>
  );
};

export default SoundToggle;
