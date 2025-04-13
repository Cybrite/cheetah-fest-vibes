
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, Cpu, Brush, Music, Users, ArrowRight } from 'lucide-react';
import { useSound } from '../hooks/useSound';
import ParticleBackground from '../components/ParticleBackground';
import SoundToggle from '../components/SoundToggle';

const HomePage = () => {
  const { isMuted, toggleMute, play } = useSound();

  useEffect(() => {
    play('intro');
  }, [play]);

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.4,
      }
    }
  };

  const hoverVariants = {
    hover: { 
      scale: 1.05, 
      boxShadow: "0 10px 20px rgba(139, 92, 246, 0.3)",
      transition: { duration: 0.3 }
    }
  };

  const handleSectionHover = () => {
    play('hover');
  };

  const handleSectionClick = () => {
    play('click');
  };

  const sections = [
    {
      id: 'events',
      title: 'Events',
      description: 'Discover the exciting events planned throughout the festival.',
      icon: <Calendar className="w-8 h-8 text-purple-400" />,
      color: 'from-purple-900/80 to-purple-700/60',
      link: '/'
    },
    {
      id: 'tech',
      title: 'Tech',
      description: 'Explore cutting-edge technology showcases and competitions.',
      icon: <Cpu className="w-8 h-8 text-blue-400" />,
      color: 'from-blue-900/80 to-blue-700/60',
      link: '/'
    },
    {
      id: 'crafts',
      title: 'Crafts',
      description: 'Experience traditional and modern craft exhibitions and workshops.',
      icon: <Brush className="w-8 h-8 text-pink-400" />,
      color: 'from-pink-900/80 to-pink-700/60',
      link: '/'
    },
    {
      id: 'dance',
      title: 'Dance',
      description: 'Witness breathtaking dance performances from various cultures.',
      icon: <Music className="w-8 h-8 text-yellow-400" />,
      color: 'from-yellow-900/80 to-yellow-700/60',
      link: '/'
    },
    {
      id: 'classes',
      title: 'Class Gallery',
      description: 'Browse through our student gallery organized by class.',
      icon: <Users className="w-8 h-8 text-green-400" />,
      color: 'from-green-900/80 to-green-700/60',
      link: '/'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background particles */}
      <div className="fixed inset-0 z-0">
        <ParticleBackground count={70} speed={0.5} />
      </div>
      
      {/* Sound toggle */}
      <SoundToggle isMuted={isMuted} toggleMute={toggleMute} />
      
      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            VIBRANCE 2025
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            Welcome to the most awaited cultural and technical festival of the year!
          </p>
        </motion.div>
        
        {/* Festival highlight video/image */}
        <motion.div 
          className="mb-20 relative"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="relative overflow-hidden rounded-xl aspect-video mx-auto max-w-5xl shadow-2xl shadow-purple-500/20">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/50 to-pink-900/50 mix-blend-overlay" />
            <img 
              src="/images/fest-banner.jpg" 
              alt="Vibrance 2025 Festival" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/10 backdrop-blur-sm rounded-full p-5 cursor-pointer"
                onClick={() => play('click')}
              >
                <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center">
                  <div className="w-0 h-0 border-y-[10px] border-y-transparent border-l-[20px] border-l-purple-600 ml-2" />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
        
        {/* Festival sections */}
        <motion.h2 
          className="text-3xl font-display font-bold mb-10 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Discover What's Happening
        </motion.h2>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          transition={{ 
            staggerChildren: 0.1,
            delayChildren: 0.6
          }}
        >
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              variants={itemVariants}
              whileHover="hover"
              variants={hoverVariants}
              onMouseEnter={handleSectionHover}
              onClick={handleSectionClick}
              className="relative overflow-hidden rounded-xl bg-gradient-to-br border border-white/10 backdrop-blur-sm"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${section.color} opacity-50`} />
              <Link 
                to={section.link} 
                className="block p-6 relative z-10 h-full"
                state={{ targetSection: index }}
              >
                <div className="flex justify-between items-start">
                  <div className="bg-black/30 p-3 rounded-lg backdrop-blur-sm mb-4">
                    {section.icon}
                  </div>
                  <ArrowRight className="w-5 h-5 text-white/70" />
                </div>
                <h3 className="text-2xl font-display font-bold mb-2">{section.title}</h3>
                <p className="text-gray-300">{section.description}</p>
              </Link>
              
              {/* Decorative corner elements */}
              <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-white/30" />
              <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-white/30" />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA for full experience */}
        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <Link 
            to="/" 
            state={{ skipIntro: false }}
            className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40"
            onClick={() => play('click')}
          >
            Experience Full Journey
          </Link>
          <p className="mt-4 text-gray-400">
            Follow our festival mascot through an immersive experience
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;
