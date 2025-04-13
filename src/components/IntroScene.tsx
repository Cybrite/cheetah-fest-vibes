
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ParticleBackground from './ParticleBackground';
import { useSound } from '../hooks/useSound';

interface IntroSceneProps {
  onComplete: () => void;
}

const IntroScene: React.FC<IntroSceneProps> = ({ onComplete }) => {
  const [showText, setShowText] = useState(false);
  const { play } = useSound();

  useEffect(() => {
    // Show the text after a short delay
    const timer = setTimeout(() => {
      setShowText(true);
      play('intro');
    }, 1000);

    // When the intro is done, call the onComplete callback
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearTimeout(completeTimer);
    };
  }, [onComplete, play]);

  // Animation variants for the title
  const titleVariants = {
    hidden: { opacity: 0, scale: 0.3 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        ease: [0.43, 0.13, 0.23, 0.96],
      }
    }
  };

  // Animation variants for the letters
  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      }
    })
  };

  const title = "VIBRANCE 2025";

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-fest-black overflow-hidden">
      <ParticleBackground count={150} color="rgba(139, 92, 246, 0.7)" />
      
      {showText && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={titleVariants}
          className="z-10 relative"
        >
          <div className="flex flex-wrap justify-center">
            {title.split('').map((letter, index) => (
              <motion.span
                key={index}
                custom={index}
                variants={letterVariants}
                className="font-display text-6xl sm:text-8xl md:text-9xl font-bold text-white tracking-wider animate-glow"
                style={{ textShadow: '0 0 10px rgba(139, 92, 246, 0.8), 0 0 20px rgba(139, 92, 246, 0.6)' }}
              >
                {letter === ' ' ? '\u00A0' : letter}
              </motion.span>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default IntroScene;
