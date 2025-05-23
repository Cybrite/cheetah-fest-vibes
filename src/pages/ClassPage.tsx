
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Home } from 'lucide-react';
import StudentGrid from '../components/StudentGrid';
import SoundToggle from '../components/SoundToggle';
import { useSound } from '../hooks/useSound';
import ParticleBackground from '../components/ParticleBackground';

const ClassPage = () => {
  const { isMuted, toggleMute, play } = useSound();

  return (
    <div className="relative min-h-screen bg-fest-black overflow-hidden">
      {/* Sound toggle button */}
      <SoundToggle isMuted={isMuted} toggleMute={toggleMute} />
      
      {/* Background Particles */}
      <div className="fixed inset-0 z-0">
        <ParticleBackground count={40} color="rgba(139, 92, 246, 0.5)" />
      </div>

      {/* Navigation buttons */}
      <div className="fixed top-4 left-4 z-50 flex gap-3">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link 
            to="/experience"
            className="flex items-center gap-2 p-2 rounded-full bg-fest-black/80 text-white hover:bg-fest-purple/80 transition-colors neon-box"
            onClick={() => play('click')}
            aria-label="Back to experience"
          >
            <ArrowLeft size={24} />
          </Link>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Link 
            to="/home"
            className="flex items-center gap-2 p-2 rounded-full bg-fest-black/80 text-white hover:bg-fest-purple/80 transition-colors neon-box"
            onClick={() => play('click')}
            aria-label="Go to home page"
          >
            <Home size={24} />
          </Link>
        </motion.div>
      </div>
      
      {/* Student Grid */}
      <StudentGrid />
    </div>
  );
};

export default ClassPage;
