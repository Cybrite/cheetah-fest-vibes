
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import { useSound } from '../../hooks/useSound';

interface Event {
  id: number;
  title: string;
  description: string;
  time: string;
  location: string;
  participants: string;
  image: string;
}

const events: Event[] = [
  {
    id: 1,
    title: "Hackathon 2025",
    description: "48-hour coding challenge to build innovative solutions.",
    time: "March 15-17, 2025",
    location: "Main Auditorium",
    participants: "Teams of 4",
    image: "/images/event1.jpg"
  },
  {
    id: 2,
    title: "Cultural Night",
    description: "A celebration of diverse cultures with performances.",
    time: "March 18, 2025",
    location: "Open-air Theatre",
    participants: "All Students",
    image: "/images/event2.jpg"
  },
  {
    id: 3,
    title: "Robotics Competition",
    description: "Battle of robots designed and programmed by students.",
    time: "March 19, 2025",
    location: "Engineering Block",
    participants: "Teams of 3",
    image: "/images/event3.jpg"
  },
  {
    id: 4,
    title: "Art Exhibition",
    description: "Showcase of student artwork across various mediums.",
    time: "March 20, 2025",
    location: "Art Gallery",
    participants: "Individual",
    image: "/images/event4.jpg"
  }
];

const EventsSection: React.FC = () => {
  const { play } = useSound();

  useEffect(() => {
    play('events');
  }, [play]);

  // Animation variants
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
      transition: { duration: 0.5 }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
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

  const title = "EVENTS";

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-fest-black to-purple-900/20 z-0" />

      <motion.div 
        className="max-w-7xl mx-auto relative z-10"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="text-center mb-16">
          <motion.div variants={titleVariants} className="inline-block">
            {title.split('').map((char, index) => (
              <motion.span
                key={index}
                custom={index}
                variants={characterAnimation}
                className="section-title inline-block"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {char}
              </motion.span>
            ))}
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {events.map((event) => (
            <motion.div
              key={event.id}
              variants={itemVariants}
              whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
              className="bg-gray-900/80 backdrop-blur-md rounded-xl overflow-hidden shadow-lg border border-fest-purple/30 neon-box"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="w-full h-full object-cover object-center transform hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-display font-bold mb-2 text-white">{event.title}</h3>
                <p className="text-gray-300 mb-4">{event.description}</p>
                
                <div className="space-y-2 text-gray-200">
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-fest-purple" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-fest-purple" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-5 h-5 mr-2 text-fest-purple" />
                    <span>{event.participants}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default EventsSection;
