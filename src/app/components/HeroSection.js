// components/HeroSection.js
'use client'; // Ensure this is at the top of the file

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const moods = [
  { name: 'Happy' },
  { name: 'Adventurous' },
  { name: 'Cozy' },
];

const HeroSection = () => {
  const router = useRouter();

  const handleMoodClick = (mood) => {
    router.push(`/mood/${mood.name}`); // Navigate to the mood page
  };
  

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        <motion.div
          animate={{ opacity: 0.8 }}
          transition={{ duration: 0.5 }}
          className="relative w-full h-full"
        >
          <Image
            src='/images/background.jpg'
            alt='Background'
            fill
            style={{ objectFit: 'cover', opacity: 0.8 }}
          />
        </motion.div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-5xl font-bold mb-4"
        >
          Whats Your Food Mood?
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-xl mb-8"
        >
          Pick your mood and we will suggest the best dishes for you.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="flex gap-4 mb-8"
        >
          {moods.map((mood) => (
            <button
              key={mood.name}
              onClick={() => handleMoodClick(mood)}
              className="px-6 py-2 rounded-lg text-lg font-semibold bg-black text-white transition hover:bg-gray-700"
              aria-label={`Select ${mood.name} mood`}
            >
              {mood.name}
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
