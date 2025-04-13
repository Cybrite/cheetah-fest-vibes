
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import IntroScene from '../components/IntroScene';
import CheetahTransition from '../components/CheetahTransition';
import EventsSection from '../components/sections/EventsSection';
import TechSection from '../components/sections/TechSection';
import CraftsSection from '../components/sections/CraftsSection';
import DanceSection from '../components/sections/DanceSection';
import ClassGallery from '../components/ClassGallery';
import SoundToggle from '../components/SoundToggle';
import FestNavigation from '../components/FestNavigation';
import { useSound } from '../hooks/useSound';
import ParticleBackground from '../components/ParticleBackground';

const Index = () => {
  const location = useLocation();
  const { state } = location;
  const [introComplete, setIntroComplete] = useState(false);
  const [currentSection, setCurrentSection] = useState(-1);
  const { toggleMute, isMuted } = useSound();

  // Sections in order of appearance
  const sections = [
    <EventsSection key="events" />,
    <TechSection key="tech" />,
    <CraftsSection key="crafts" />,
    <DanceSection key="dance" />,
    <ClassGallery key="gallery" />
  ];

  // Check if we should skip the intro based on the location state
  useEffect(() => {
    if (state?.skipIntro === true) {
      setIntroComplete(true);
    }

    if (state?.targetSection !== undefined && state.targetSection >= 0) {
      setCurrentSection(state.targetSection);
    }
  }, [state]);

  // Function to handle direct section navigation
  const handleSectionChange = (sectionIndex: number) => {
    setCurrentSection(sectionIndex);
  };

  // Set initial section if none is selected after intro
  useEffect(() => {
    if (introComplete && currentSection === -1) {
      setCurrentSection(0); // Show first section after intro completes
    }
  }, [introComplete, currentSection]);

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Sound toggle button */}
      <SoundToggle isMuted={isMuted} toggleMute={toggleMute} />
      
      {/* Navigation menu - only show after intro */}
      {introComplete && currentSection >= 0 && (
        <FestNavigation 
          currentSection={currentSection} 
          onSectionChange={handleSectionChange} 
        />
      )}

      {/* Intro scene */}
      {!introComplete && (
        <IntroScene onComplete={() => setIntroComplete(true)} />
      )}

      {/* Main content after intro */}
      {introComplete && (
        <>
          {/* Background Particles */}
          <div className="fixed inset-0 z-0">
            <ParticleBackground count={70} speed={0.5} />
          </div>
          
          {/* Cheetah transition */}
          <CheetahTransition 
            currentSection={currentSection} 
            onSectionChange={handleSectionChange} 
          />
          
          {/* Current section content */}
          <div className="relative z-10">
            {currentSection >= 0 && currentSection < sections.length && (
              sections[currentSection]
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Index;

