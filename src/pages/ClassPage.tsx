
import React from 'react';
import StudentGrid from '../components/StudentGrid';
import SoundToggle from '../components/SoundToggle';
import { useSound } from '../hooks/useSound';
import ParticleBackground from '../components/ParticleBackground';

const ClassPage = () => {
  const { isMuted, toggleMute } = useSound();

  return (
    <div className="relative min-h-screen bg-fest-black overflow-hidden">
      {/* Sound toggle button */}
      <SoundToggle isMuted={isMuted} toggleMute={toggleMute} />
      
      {/* Background Particles */}
      <div className="fixed inset-0 z-0">
        <ParticleBackground count={40} color="rgba(139, 92, 246, 0.5)" />
      </div>
      
      {/* Student Grid */}
      <StudentGrid />
    </div>
  );
};

export default ClassPage;
