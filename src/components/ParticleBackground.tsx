
import React, { useEffect, useRef } from 'react';

interface ParticleBackgroundProps {
  count?: number;
  color?: string;
  speed?: number;
  size?: number;
}

const ParticleBackground: React.FC<ParticleBackgroundProps> = ({
  count = 100,
  color = 'rgba(255, 255, 255, 0.8)',
  speed = 1,
  size = 2,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    let particles: HTMLElement[] = [];

    const createParticle = () => {
      const particle = document.createElement('div');
      
      // Random position
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      
      // Random size variation
      const sizeVariation = size * (0.5 + Math.random());
      
      // Set particle properties
      particle.className = 'particle';
      particle.style.left = `${x}%`;
      particle.style.top = `${y}%`;
      particle.style.width = `${sizeVariation}px`;
      particle.style.height = `${sizeVariation}px`;
      particle.style.background = color;
      
      // Random animation delay and duration
      const animDelay = Math.random() * 5;
      const animDuration = 5 + Math.random() * 5;
      particle.style.animationDelay = `${animDelay}s`;
      particle.style.animationDuration = `${animDuration}s`;
      
      container.appendChild(particle);
      return particle;
    };

    // Create initial particles
    for (let i = 0; i < count; i++) {
      particles.push(createParticle());
    }

    // Cleanup function
    return () => {
      particles.forEach(particle => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      });
      particles = [];
    };
  }, [count, color, speed, size]);

  return <div ref={containerRef} className="absolute inset-0 overflow-hidden z-0" />;
};

export default ParticleBackground;
