
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Menu, X, Home, ArrowLeft, ArrowRight } from 'lucide-react';
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
  const sectionTitles = ["Events", "Tech", "Crafts", "Dance", "Classes"];

  const handleNavClick = (sectionIndex: number) => {
    play('click');
    onSectionChange(sectionIndex);
    setIsOpen(false);
  };

  const toggleMenu = () => {
    play('click');
    setIsOpen(!isOpen);
  };

  const goToPrevSection = () => {
    play('click');
    if (currentSection > 0) {
      onSectionChange(currentSection - 1);
    }
  };

  const goToNextSection = () => {
    play('click');
    if (currentSection < sectionTitles.length - 1) {
      onSectionChange(currentSection + 1);
    }
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
    <>
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
              {sectionTitles.map((title, index) => (
                <motion.li key={index} variants={itemVariants}>
                  <button
                    onClick={() => handleNavClick(index)}
                    className={`w-full text-left p-2 rounded-md transition-colors ${currentSection === index ? 'bg-fest-purple text-white' : 'hover:bg-gray-800 text-gray-200'}`}
                  >
                    {title}
                  </button>
                </motion.li>
              ))}
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

      {/* Section navigation controls */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 flex items-center gap-4">
        <button
          onClick={goToPrevSection}
          disabled={currentSection <= 0}
          className={`p-3 rounded-full bg-fest-black/80 text-white transition-colors ${currentSection <= 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-fest-purple/80 neon-box'}`}
          aria-label="Previous section"
        >
          <ArrowLeft size={20} />
        </button>
        
        <div className="bg-black/80 px-4 py-2 rounded-full text-white backdrop-blur-sm border border-fest-purple/30">
          {sectionTitles[currentSection]}
        </div>
        
        <button
          onClick={goToNextSection}
          disabled={currentSection >= sectionTitles.length - 1}
          className={`p-3 rounded-full bg-fest-black/80 text-white transition-colors ${currentSection >= sectionTitles.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-fest-purple/80 neon-box'}`}
          aria-label="Next section"
        >
          <ArrowRight size={20} />
        </button>
      </div>
    </>
  );
};

export default FestNavigation;

