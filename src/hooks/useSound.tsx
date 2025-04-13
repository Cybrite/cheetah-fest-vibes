
import { useState, useEffect, useCallback } from 'react';

interface SoundMap {
  [key: string]: HTMLAudioElement;
}

export const useSound = () => {
  const [sounds, setSounds] = useState<SoundMap>({});
  const [isMuted, setIsMuted] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const soundFiles = {
      intro: '/sounds/intro.mp3',
      cheetah: '/sounds/cheetah.mp3',
      click: '/sounds/click.mp3',
      hover: '/sounds/hover.mp3',
      events: '/sounds/events.mp3',
      tech: '/sounds/tech.mp3',
      crafts: '/sounds/crafts.mp3',
      dance: '/sounds/dance.mp3',
    };

    const loadedSounds: SoundMap = {};

    Object.entries(soundFiles).forEach(([key, path]) => {
      const audio = new Audio();
      audio.src = path;
      audio.preload = 'auto';
      
      if (key === 'intro' || key === 'cheetah') {
        audio.loop = true;
      }

      loadedSounds[key] = audio;
    });

    setSounds(loadedSounds);
    setIsLoaded(true);

    return () => {
      // Cleanup sounds
      Object.values(loadedSounds).forEach(audio => {
        audio.pause();
        audio.src = '';
      });
    };
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    Object.values(sounds).forEach(audio => {
      audio.muted = isMuted;
    });
  }, [isMuted, sounds, isLoaded]);

  const play = useCallback((soundId: string) => {
    if (!isLoaded || isMuted) return;

    const sound = sounds[soundId];
    if (sound) {
      // Reset the audio to the beginning if it's already playing
      sound.currentTime = 0;
      sound.play().catch(err => console.error('Error playing sound:', err));
    }
  }, [sounds, isMuted, isLoaded]);

  const stop = useCallback((soundId: string) => {
    if (!isLoaded) return;

    const sound = sounds[soundId];
    if (sound) {
      sound.pause();
      sound.currentTime = 0;
    }
  }, [sounds, isLoaded]);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev);
  }, []);

  return { play, stop, toggleMute, isMuted, isLoaded };
};
