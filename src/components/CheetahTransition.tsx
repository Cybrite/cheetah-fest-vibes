
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSound } from '../hooks/useSound';

interface CheetahTransitionProps {
  currentSection: number;
  onSectionChange: (section: number) => void;
}

const CheetahTransition: React.FC<CheetahTransitionProps> = ({ 
  currentSection, 
  onSectionChange 
}) => {
  const [position, setPosition] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [showDust, setShowDust] = useState(false);
  const { play, stop } = useSound();
  const animationRef = useRef<number | null>(null);
  const lastTimestampRef = useRef<number | null>(null);
  const stopPositions = [20, 40, 60, 80, 95]; // Percentage positions where the cheetah stops

  // Run animation with requestAnimationFrame for smooth movement
  useEffect(() => {
    play('cheetah');

    const animate = (timestamp: number) => {
      if (!lastTimestampRef.current) {
        lastTimestampRef.current = timestamp;
      }

      const elapsed = timestamp - lastTimestampRef.current;
      lastTimestampRef.current = timestamp;

      // Only move if running
      if (isRunning) {
        // Update position based on elapsed time (speed control)
        setPosition(prevPos => {
          const newPos = prevPos + elapsed * 0.01; // Adjust speed multiplier as needed
          
          // Check if we've reached a stop position
          const nextStop = stopPositions.find(stopPos => prevPos < stopPos && newPos >= stopPos);
          
          if (nextStop !== undefined) {
            setIsRunning(false);
            setShowDust(true);
            
            // Determine which section we've reached (0-based index in stopPositions array)
            const sectionIndex = stopPositions.indexOf(nextStop);
            
            // If not the last stop, schedule the next run
            if (sectionIndex < stopPositions.length - 1) {
              setTimeout(() => {
                onSectionChange(sectionIndex);
                setShowDust(false);
                setIsRunning(true);
              }, 2000);
            } else {
              // If it's the last stop, trigger the final section
              onSectionChange(sectionIndex);
              stop('cheetah');
            }
            
            return nextStop;
          }
          
          return newPos;
        });
      }

      // Continue animation
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      stop('cheetah');
    };
  }, [isRunning, onSectionChange, play, stop]);

  // Calculate sprite frame based on running state
  const spriteFrame = isRunning ? 
    Math.floor(Date.now() / 100) % 6 : // Cycling through frames while running
    0; // Idle frame

  return (
    <div className="absolute bottom-0 left-0 w-full h-40 pointer-events-none z-30">
      <div 
        style={{ 
          left: `${position}%`, 
          transform: 'translate(-50%, 0)',
        }}
        className="absolute bottom-0 h-32 w-32 flex justify-center"
      >
        {/* Cheetah figure */}
        <motion.div
          animate={{
            y: isRunning ? [0, -10, 0] : 0
          }}
          transition={{
            repeat: isRunning ? Infinity : 0,
            duration: 0.3
          }}
          className="relative"
        >
          {/* This should be replaced with an actual sprite sheet or SVG animation */}
          <div 
            className="h-32 w-32 bg-contain bg-no-repeat bg-center"
            style={{
              backgroundImage: "url('/images/cheetah-sprite.png')",
              backgroundPosition: `${-spriteFrame * 100}% 0`,
            }}
          />
        </motion.div>

        {/* Dust cloud animation */}
        <AnimatePresence>
          {showDust && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 100 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-0 left-0 h-16"
            >
              <div className="absolute bottom-0 left-0 w-full h-full opacity-70">
                {[...Array(10)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ 
                      opacity: 1, 
                      x: 0, 
                      y: 0, 
                      scale: 0.5 
                    }}
                    animate={{ 
                      opacity: 0, 
                      x: -20 - Math.random() * 30, 
                      y: -Math.random() * 20, 
                      scale: 1 + Math.random()
                    }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                    className="absolute rounded-full bg-gray-200 w-3 h-3"
                    style={{
                      left: `${Math.random() * 30}px`,
                      bottom: `${Math.random() * 10}px`
                    }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CheetahTransition;
