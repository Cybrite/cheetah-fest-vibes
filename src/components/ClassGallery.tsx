
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useSound } from '../hooks/useSound';

interface ClassItem {
  id: string;
  name: string;
  image: string;
}

const classes: ClassItem[] = [
  { id: 'cse-a', name: 'CSE-A', image: '/images/class1.jpg' },
  { id: 'cse-b', name: 'CSE-B', image: '/images/class2.jpg' },
  { id: 'ece-a', name: 'ECE-A', image: '/images/class3.jpg' },
  { id: 'ece-b', name: 'ECE-B', image: '/images/class4.jpg' },
  { id: 'mech-a', name: 'MECH-A', image: '/images/class5.jpg' },
  { id: 'mech-b', name: 'MECH-B', image: '/images/class6.jpg' },
];

const ClassGallery: React.FC = () => {
  const navigate = useNavigate();
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const { play } = useSound();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const handleClassClick = (classId: string) => {
    play('click');
    setSelectedClass(classId);
    setTimeout(() => {
      navigate(`/class/${classId}`);
    }, 300);
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

  const title = "CLASS GALLERY";

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 relative overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-fest-black via-purple-900/30 to-black z-0" />
      
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
                  textShadow: '0 0 5px #8B5CF6, 0 0 10px #8B5CF6, 0 0 20px #8B5CF6',
                  animationDelay: `${index * 0.1}s` 
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {classes.map((classItem) => (
            <motion.div
              key={classItem.id}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                rotate: 2,
                transition: { duration: 0.3 }
              }}
              onClick={() => handleClassClick(classItem.id)}
              className={`
                cursor-pointer bg-gray-900/80 rounded-xl overflow-hidden shadow-lg
                ${selectedClass === classItem.id ? 'ring-4 ring-fest-purple' : 'hover:ring-2 hover:ring-fest-purple/50'}
                transform transition-all duration-300
              `}
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={classItem.image} 
                  alt={classItem.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-3xl font-display font-bold text-white text-center">
                    {classItem.name}
                  </h3>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute top-2 left-2 w-10 h-10 border-t-2 border-l-2 border-fest-purple opacity-70" />
              <div className="absolute bottom-2 right-2 w-10 h-10 border-b-2 border-r-2 border-fest-purple opacity-70" />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ClassGallery;
