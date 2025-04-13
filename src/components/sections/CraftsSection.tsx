
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Brush, Scissors, Palette, PenTool } from 'lucide-react';
import { useSound } from '../../hooks/useSound';

interface CraftEvent {
  id: number;
  title: string;
  description: string;
  image: string;
  icon: React.ReactNode;
}

const craftEvents: CraftEvent[] = [
  {
    id: 1,
    title: "Origami Workshop",
    description: "Learn the ancient art of paper folding with expert guidance.",
    image: "/images/craft1.jpg",
    icon: <PenTool className="w-6 h-6" />
  },
  {
    id: 2,
    title: "Pottery Making",
    description: "Create beautiful ceramic art with traditional techniques.",
    image: "/images/craft2.jpg",
    icon: <Brush className="w-6 h-6" />
  },
  {
    id: 3,
    title: "Textile Art",
    description: "Design and print your own fabric patterns and creations.",
    image: "/images/craft3.jpg",
    icon: <Scissors className="w-6 h-6" />
  },
  {
    id: 4,
    title: "Digital Art Contest",
    description: "Showcase your digital illustration and design skills.",
    image: "/images/craft4.jpg",
    icon: <Palette className="w-6 h-6" />
  }
];

const CraftsSection: React.FC = () => {
  const { play } = useSound();

  useEffect(() => {
    play('crafts');
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
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 }
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

  const title = "CRAFTS";

  // Paint brush stroke animation
  const brushStrokeVariants = {
    initial: { pathLength: 0, opacity: 0 },
    animate: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 1, ease: "easeInOut" },
        opacity: { duration: 0.2 }
      }
    }
  };

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 relative overflow-hidden">
      {/* Artistic background */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-900/20 to-purple-900/20 z-0" />
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%">
          <pattern id="pattern-circles" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse" patternContentUnits="userSpaceOnUse">
            <circle id="pattern-circle" cx="25" cy="25" r="12" fill="none" stroke="#D946EF" strokeWidth="1"></circle>
          </pattern>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-circles)"></rect>
        </svg>
      </div>

      <motion.div 
        className="max-w-7xl mx-auto relative z-10"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="text-center mb-16">
          <motion.div className="inline-block relative">
            {/* Decorative brush stroke under title */}
            <svg 
              className="absolute -bottom-4 left-0 w-full h-8 text-fest-pink opacity-70"
              viewBox="0 0 200 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.path
                d="M0,10 C50,30 150,-10 200,10"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                variants={brushStrokeVariants}
                initial="initial"
                animate="animate"
              />
            </svg>
            
            {title.split('').map((char, index) => (
              <motion.span
                key={index}
                custom={index}
                variants={characterAnimation}
                className="section-title inline-block"
                style={{ 
                  textShadow: '0 0 5px #D946EF, 0 0 10px #D946EF, 0 0 20px #D946EF',
                  animationDelay: `${index * 0.1}s` 
                }}
              >
                {char}
              </motion.span>
            ))}
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {craftEvents.map((event) => (
            <motion.div
              key={event.id}
              variants={itemVariants}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl border border-white/10"
            >
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-display font-bold text-white">
                    {event.title}
                  </h3>
                </div>
                
                {/* Craft icon in top-right corner */}
                <div className="absolute top-4 right-4 bg-fest-pink rounded-full p-2 text-white">
                  {event.icon}
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-gray-300">{event.description}</p>
                
                {/* Animated button with brush stroke effect */}
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-4 px-5 py-2 bg-gradient-to-r from-fest-pink to-fest-purple text-white rounded-md font-medium relative overflow-hidden group"
                >
                  <span className="relative z-10">Join Workshop</span>
                  <motion.span 
                    initial={{ left: "-100%" }}
                    whileHover={{ left: "100%" }}
                    transition={{ duration: 1 }}
                    className="absolute top-0 bottom-0 left-0 w-full bg-white/20"
                  />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default CraftsSection;
