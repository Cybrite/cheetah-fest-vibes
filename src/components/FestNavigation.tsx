
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Menu, X, Home } from 'lucide-react';
import { useSound } from '../hooks/useSound';

interface FestNavigationProps {
  currentSection: number;
  onSectionChange: (section: number) => void;
}

const FestNavigation: React.FC<FestNavigationProps> = ({ 
  currentSection, 
  onSectionChange 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { play } = useSound();

  const handleNavClick = (sectionIndex: number) => {
    play('click');
    onSectionChange(sectionIndex);
    setIsOpen(false);
  };

  const toggleMenu = () => {
    play('click');
    setIsOpen(!isOpen);
  };

  // Animation variants for the menu
  const menuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      pointerEvents: 'none' as const,
    },
    open: {
      opacity: 1,
      y: 0,
      pointerEvents: 'auto' as const,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, y: -10 },
    open: { opacity: 1, y: 0 }
  };

  return (
    <div className="fixed top-4 left-4 z-50">
      <button
        onClick={toggleMenu}
        className="p-2 rounded-full bg-fest-black/80 text-white hover:bg-fest-purple/80 transition-colors neon-box"
        aria-label="Toggle navigation menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <motion.div
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={menuVariants}
        className="absolute top-14 left-0 w-64 bg-black/90 backdrop-blur-md rounded-lg p-4 border border-fest-purple/30"
      >
        <nav>
          <ul className="space-y-2">
            <motion.li variants={itemVariants}>
              <button
                onClick={() => handleNavClick(0)}
                className={`w-full text-left p-2 rounded-md transition-colors ${currentSection === 0 ? 'bg-fest-purple text-white' : 'hover:bg-gray-800 text-gray-200'}`}
              >
                Events
              </button>
            </motion.li>
            <motion.li variants={itemVariants}>
              <button
                onClick={() => handleNavClick(1)}
                className={`w-full text-left p-2 rounded-md transition-colors ${currentSection === 1 ? 'bg-fest-purple text-white' : 'hover:bg-gray-800 text-gray-200'}`}
              >
                Tech
              </button>
            </motion.li>
            <motion.li variants={itemVariants}>
              <button
                onClick={() => handleNavClick(2)}
                className={`w-full text-left p-2 rounded-md transition-colors ${currentSection === 2 ? 'bg-fest-purple text-white' : 'hover:bg-gray-800 text-gray-200'}`}
              >
                Crafts
              </button>
            </motion.li>
            <motion.li variants={itemVariants}>
              <button
                onClick={() => handleNavClick(3)}
                className={`w-full text-left p-2 rounded-md transition-colors ${currentSection === 3 ? 'bg-fest-purple text-white' : 'hover:bg-gray-800 text-gray-200'}`}
              >
                Dance
              </button>
            </motion.li>
            <motion.li variants={itemVariants}>
              <button
                onClick={() => handleNavClick(4)}
                className={`w-full text-left p-2 rounded-md transition-colors ${currentSection === 4 ? 'bg-fest-purple text-white' : 'hover:bg-gray-800 text-gray-200'}`}
              >
                Classes
              </button>
            </motion.li>
            <motion.li variants={itemVariants} className="pt-2 border-t border-gray-700">
              <Link 
                to="/home"
                className="flex items-center gap-2 w-full text-left p-2 rounded-md transition-colors hover:bg-gray-800 text-gray-200"
                onClick={() => play('click')}
              >
                <Home size={18} />
                Home Page
              </Link>
            </motion.li>
          </ul>
        </nav>
      </motion.div>
    </div>
  );
};

export default FestNavigation;
