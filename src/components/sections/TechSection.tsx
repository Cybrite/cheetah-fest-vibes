
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code, Cpu, Database, Globe, Shield, Smartphone } from 'lucide-react';
import { useSound } from '../../hooks/useSound';

interface TechEvent {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const techEvents: TechEvent[] = [
  {
    id: 1,
    title: "AI Showdown",
    description: "Build and present AI models that can solve real-world problems.",
    icon: <Cpu className="w-8 h-8" />
  },
  {
    id: 2,
    title: "Cyber Security CTF",
    description: "Compete in a capture-the-flag contest to test your security skills.",
    icon: <Shield className="w-8 h-8" />
  },
  {
    id: 3,
    title: "Web Dev Championship",
    description: "Design and develop responsive websites in a time-boxed challenge.",
    icon: <Globe className="w-8 h-8" />
  },
  {
    id: 4,
    title: "Database Derby",
    description: "Optimize and query complex database systems for maximum performance.",
    icon: <Database className="w-8 h-8" />
  },
  {
    id: 5,
    title: "Code Jamming",
    description: "Solve algorithmic problems against the clock to win prizes.",
    icon: <Code className="w-8 h-8" />
  },
  {
    id: 6,
    title: "App Innovation",
    description: "Develop mobile applications that address campus needs and beyond.",
    icon: <Smartphone className="w-8 h-8" />
  }
];

const TechSection: React.FC = () => {
  const { play } = useSound();

  useEffect(() => {
    play('tech');
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

  const title = "TECH";

  // Fixed glitch effect variants for cards
  const glitchVariants = {
    initial: { x: 0, y: 0 },
    hover: {
      x: [0, -2, 2, -2, 0],
      y: [0, 1, -1, 1, 0],
      transition: { 
        duration: 0.3,
        repeat: Infinity,
        repeatType: "mirror" as const
      }
    }
  };

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 relative overflow-hidden">
      {/* Cyberpunk grid background */}
      <div className="absolute inset-0 bg-fest-black z-0">
        <div className="absolute inset-0 bg-[radial-gradient(#6E59A5_1px,transparent_1px)] bg-[size:20px_20px] opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-fest-blue/10" />
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
                className="section-title inline-block"
                style={{ 
                  textShadow: '0 0 5px #0EA5E9, 0 0 10px #0EA5E9, 0 0 20px #0EA5E9',
                  animationDelay: `${index * 0.1}s` 
                }}
              >
                {char}
              </motion.span>
            ))}
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {techEvents.map((event) => (
            <motion.div
              key={event.id}
              variants={itemVariants}
              whileHover="hover"
              initial="initial"
              className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg overflow-hidden"
            >
              {/* Border glow effect */}
              <div className="absolute inset-0 rounded-lg border border-blue-500/30 glow" />
              
              {/* Content with glitch effect */}
              <motion.div
                variants={glitchVariants}
                className="relative p-6 h-full"
              >
                <div className="text-fest-blue mb-4">
                  {event.icon}
                </div>
                <h3 className="text-xl font-display font-bold mb-2 text-white">{event.title}</h3>
                <p className="text-gray-300">{event.description}</p>
                
                {/* Holographic effect */}
                <div className="absolute bottom-0 right-0 w-20 h-20 opacity-10 bg-gradient-to-tl from-fest-blue via-purple-500 to-transparent rounded-tl-full" />
              </motion.div>
              
              {/* Digital circuit lines */}
              <div className="absolute top-0 right-0 w-1/2 h-1 bg-fest-blue/50" />
              <div className="absolute top-0 right-0 w-1 h-1/2 bg-fest-blue/50" />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default TechSection;
