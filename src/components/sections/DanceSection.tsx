
import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Music, Star, Users } from 'lucide-react';
import { useSound } from '../../hooks/useSound';

interface DanceEvent {
  id: number;
  title: string;
  description: string;
  dancers: string;
  style: string;
  image: string;
}

const danceEvents: DanceEvent[] = [
  {
    id: 1,
    title: "Hip Hop Showdown",
    description: "Competitive freestyle hip hop battles between campus crews.",
    dancers: "Solo & Group",
    style: "Hip Hop, Breaking, Popping",
    image: "/images/dance1.jpg"
  },
  {
    id: 2,
    title: "Classical Fusion",
    description: "A fusion of Indian classical and contemporary dance forms.",
    dancers: "Group Choreography",
    style: "Bharatanatyam, Contemporary",
    image: "/images/dance2.jpg"
  },
  {
    id: 3,
    title: "Street Dance Battle",
    description: "Street dance competition with eliminations and final showcase.",
    dancers: "Solo & Duo",
    style: "Street, Urban, Freestyle",
    image: "/images/dance3.jpg"
  },
  {
    id: 4,
    title: "Dance Workshop",
    description: "Learn from professional choreographers in various dance styles.",
    dancers: "Open to All",
    style: "Multiple Styles",
    image: "/images/dance4.jpg"
  }
];

const DanceSection: React.FC = () => {
  const { play } = useSound();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const spotlightControls = useAnimation();

  // Track mouse position for spotlight effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Update spotlight position based on mouse movement
  useEffect(() => {
    spotlightControls.start({
      x: mousePosition.x,
      y: mousePosition.y,
      transition: { type: 'spring', damping: 30, stiffness: 200 }
    });
  }, [mousePosition, spotlightControls]);

  useEffect(() => {
    play('dance');
  }, [play]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        type: "spring",
        damping: 12,
        stiffness: 100,
        duration: 0.5 
      }
    }
  };

  // Character animation for the section title
  const characterAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3
      }
    })
  };

  const title = "DANCE";

  // Audio waveform animation
  const waveformVariants = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const waveBarVariants = {
    animate: {
      height: [20, 60, 30, 70, 20],
      transition: {
        repeat: Infinity,
        duration: 1 + Math.random() * 1,
        ease: "linear"
      }
    }
  };

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 relative overflow-hidden">
      {/* Dark background with spotlight effect */}
      <div className="absolute inset-0 bg-black z-0" />
      
      {/* Spotlight effect that follows mouse */}
      <motion.div 
        className="spotlight absolute w-[600px] h-[600px] rounded-full bg-gradient-radial from-purple-500/30 to-transparent pointer-events-none"
        animate={spotlightControls}
        initial={{ x: 0, y: 0 }}
        style={{ 
          left: -300,
          top: -300,
        }}
      />
      
      {/* Dancing silhouettes at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10" />
        <div className="flex justify-around">
          {[1, 2, 3, 4, 5].map((i) => (
            <motion.div
              key={i}
              className="w-32 h-48 bg-contain bg-no-repeat bg-bottom opacity-40"
              style={{ 
                backgroundImage: `url('/images/dancer-silhouette-${(i % 3) + 1}.png')` 
              }}
              animate={{
                y: [0, -10, 0, -5, 0],
                rotate: [0, i % 2 === 0 ? 5 : -5, 0, i % 2 === 0 ? -3 : 3, 0]
              }}
              transition={{
                duration: 3 + Math.random(),
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Audio waveform visualization at the top */}
      <div className="absolute top-10 left-0 right-0 flex justify-center">
        <motion.div 
          className="flex items-end h-10 space-x-1" 
          variants={waveformVariants}
          animate="animate"
        >
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="w-1 bg-gradient-to-t from-fest-pink to-fest-purple rounded-full"
              variants={waveBarVariants}
              style={{ 
                animationDelay: `${i * 0.05}s`,
                height: `${20 + Math.random() * 50}px` 
              }}
            />
          ))}
        </motion.div>
      </div>

      <motion.div 
        className="max-w-7xl mx-auto relative z-10"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="text-center mb-16">
          <motion.div className="inline-block">
            {title.split('').map((char, index) => (
              <motion.span
                key={index}
                custom={index}
                variants={characterAnimation}
                className="section-title inline-block animate-pulse"
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  animationDuration: '1.5s'
                }}
              >
                {char}
              </motion.span>
            ))}
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {danceEvents.map((event) => (
            <motion.div
              key={event.id}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.03, 
                transition: { duration: 0.2 },
              }}
              className="group relative overflow-hidden rounded-xl"
            >
              {/* Dynamic card that moves with music rhythm */}
              <motion.div 
                animate={{ 
                  y: [0, -3, 0, -2, 0],
                  scale: [1, 1.01, 1, 1.005, 1] 
                }}
                transition={{ 
                  duration: 2 + Math.random() * 2, 
                  repeat: Infinity,
                  ease: "easeInOut" 
                }}
                className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-xl overflow-hidden"
              >
                {/* Image with overlay */}
                <div className="relative h-48 md:h-56 overflow-hidden">
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                  
                  {/* Spotlight effect on hover */}
                  <motion.div 
                    className="absolute inset-0 bg-fest-pink/0 group-hover:bg-fest-pink/20 transition-colors duration-300"
                    initial={false}
                    whileHover={{
                      background: "radial-gradient(circle at center, rgba(217, 70, 239, 0.3) 0%, rgba(0, 0, 0, 0) 70%)"
                    }}
                  />
                </div>
                
                <div className="p-6 relative">
                  {/* Star decoration */}
                  <motion.div
                    className="absolute top-4 right-4 text-fest-gold"
                    animate={{ 
                      rotate: 360,
                      scale: [1, 1.2, 1]
                    }}
                    transition={{ 
                      rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                      scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                    }}
                  >
                    <Star size={24} />
                  </motion.div>
                  
                  {/* Content */}
                  <h3 className="text-2xl font-display font-bold mb-2 text-white">{event.title}</h3>
                  <p className="text-gray-300 mb-4">{event.description}</p>
                  
                  <div className="flex justify-between items-center text-gray-300">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2 text-fest-pink" />
                      <span>{event.dancers}</span>
                    </div>
                    <div className="flex items-center">
                      <Music className="w-4 h-4 mr-2 text-fest-pink" />
                      <span>{event.style}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default DanceSection;
