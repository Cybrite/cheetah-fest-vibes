
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useSound } from '../hooks/useSound';

interface Student {
  id: number;
  name: string;
  rollNumber: string;
  image: string;
  role?: string;
}

// Mock data - would be fetched based on class ID in a real app
const studentsData: Record<string, Student[]> = {
  'cse-a': [
    { id: 1, name: 'Rahul Sharma', rollNumber: 'CSE-001', image: '/images/student1.jpg', role: 'Class Representative' },
    { id: 2, name: 'Ananya Patel', rollNumber: 'CSE-002', image: '/images/student2.jpg' },
    { id: 3, name: 'Vikram Singh', rollNumber: 'CSE-003', image: '/images/student3.jpg' },
    { id: 4, name: 'Priya Verma', rollNumber: 'CSE-004', image: '/images/student4.jpg' },
    { id: 5, name: 'Karthik R', rollNumber: 'CSE-005', image: '/images/student5.jpg' },
    { id: 6, name: 'Meera Joshi', rollNumber: 'CSE-006', image: '/images/student6.jpg' },
    { id: 7, name: 'Arjun Kumar', rollNumber: 'CSE-007', image: '/images/student7.jpg' },
    { id: 8, name: 'Neha Gupta', rollNumber: 'CSE-008', image: '/images/student8.jpg' },
    { id: 9, name: 'Sanjay Mehta', rollNumber: 'CSE-009', image: '/images/student9.jpg' },
  ],
  'cse-b': [
    { id: 1, name: 'Riya Kapoor', rollNumber: 'CSE-101', image: '/images/student10.jpg', role: 'Event Coordinator' },
    { id: 2, name: 'Vivek Malhotra', rollNumber: 'CSE-102', image: '/images/student11.jpg' },
    { id: 3, name: 'Sneha Reddy', rollNumber: 'CSE-103', image: '/images/student12.jpg' },
    { id: 4, name: 'Rohan Saxena', rollNumber: 'CSE-104', image: '/images/student13.jpg' },
    { id: 5, name: 'Aisha Khan', rollNumber: 'CSE-105', image: '/images/student14.jpg' },
    { id: 6, name: 'Varun Nair', rollNumber: 'CSE-106', image: '/images/student15.jpg' },
  ],
  'ece-a': [
    { id: 1, name: 'Divya Mishra', rollNumber: 'ECE-001', image: '/images/student16.jpg' },
    { id: 2, name: 'Rajat Agarwal', rollNumber: 'ECE-002', image: '/images/student17.jpg', role: 'Tech Lead' },
    { id: 3, name: 'Nandini Sen', rollNumber: 'ECE-003', image: '/images/student18.jpg' },
    { id: 4, name: 'Aman Tiwari', rollNumber: 'ECE-004', image: '/images/student19.jpg' },
  ],
  'ece-b': [
    { id: 1, name: 'Kavya Menon', rollNumber: 'ECE-101', image: '/images/student20.jpg' },
    { id: 2, name: 'Aryan Desai', rollNumber: 'ECE-102', image: '/images/student21.jpg' },
    { id: 3, name: 'Sarika Das', rollNumber: 'ECE-103', image: '/images/student22.jpg', role: 'Cultural Secretary' },
  ],
  'mech-a': [
    { id: 1, name: 'Prakash Rao', rollNumber: 'MECH-001', image: '/images/student23.jpg', role: 'Sports Captain' },
    { id: 2, name: 'Ishaan Khanna', rollNumber: 'MECH-002', image: '/images/student24.jpg' },
    { id: 3, name: 'Tanvi Sharma', rollNumber: 'MECH-003', image: '/images/student25.jpg' },
  ],
  'mech-b': [
    { id: 1, name: 'Kunal Bajaj', rollNumber: 'MECH-101', image: '/images/student26.jpg' },
    { id: 2, name: 'Pooja Hegde', rollNumber: 'MECH-102', image: '/images/student27.jpg', role: 'Dance Team Lead' },
    { id: 3, name: 'Akash Kumar', rollNumber: 'MECH-103', image: '/images/student28.jpg' },
  ]
};

const classNames: Record<string, string> = {
  'cse-a': 'Computer Science A',
  'cse-b': 'Computer Science B',
  'ece-a': 'Electronics & Comm. A',
  'ece-b': 'Electronics & Comm. B',
  'mech-a': 'Mechanical A',
  'mech-b': 'Mechanical B'
};

const StudentGrid: React.FC = () => {
  const { classId } = useParams<{ classId: string }>();
  const navigate = useNavigate();
  const { play } = useSound();
  
  useEffect(() => {
    play('click');
  }, [play]);

  const students = classId ? studentsData[classId] || [] : [];
  const className = classId ? classNames[classId] || classId : '';

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
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 50,
        duration: 0.5 
      }
    }
  };

  const handleBackClick = () => {
    play('click');
    navigate('/');
  };

  // No students found
  if (students.length === 0) {
    return (
      <div className="min-h-screen py-20 px-4 sm:px-6 bg-gradient-to-b from-fest-black to-black flex flex-col items-center justify-center">
        <h2 className="text-4xl font-display font-bold text-white mb-6">Class Not Found</h2>
        <p className="text-gray-300 mb-8">The class you're looking for doesn't exist or has no students.</p>
        <button
          onClick={handleBackClick}
          className="flex items-center gap-2 px-5 py-3 bg-fest-purple text-white rounded-md font-medium hover:bg-fest-purple/80 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Gallery
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-fest-black to-fest-purple/10 z-0" />
      
      <motion.div 
        className="max-w-7xl mx-auto relative z-10"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div 
          className="flex items-center mb-8 gap-4"
          variants={itemVariants}
        >
          <button
            onClick={handleBackClick}
            className="p-2 bg-fest-purple/20 text-white rounded-full hover:bg-fest-purple/40 transition-colors"
            aria-label="Back to gallery"
          >
            <ArrowLeft size={24} />
          </button>
          
          <h2 className="text-4xl font-display font-bold text-white">
            {className}
          </h2>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {students.map((student) => (
            <motion.div
              key={student.id}
              variants={itemVariants}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 } 
              }}
              className="group bg-gray-900/80 rounded-lg overflow-hidden"
            >
              <div className="relative aspect-square overflow-hidden">
                <img 
                  src={student.image} 
                  alt={student.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Overlay with info on hover */}
                <motion.div 
                  className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={false}
                  whileHover={{ opacity: 1 }}
                >
                  <p className="text-gray-300 text-sm font-medium">
                    {student.rollNumber}
                  </p>
                  <h3 className="text-white text-lg font-bold">
                    {student.name}
                  </h3>
                  {student.role && (
                    <p className="text-fest-purple text-sm mt-1">
                      {student.role}
                    </p>
                  )}
                </motion.div>
              </div>
              
              {/* Name tag shown when not hovering */}
              <div className="p-3 group-hover:opacity-0 transition-opacity duration-300">
                <p className="text-gray-400 text-xs">
                  {student.rollNumber}
                </p>
                <h3 className="text-white font-medium truncate">
                  {student.name}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default StudentGrid;
