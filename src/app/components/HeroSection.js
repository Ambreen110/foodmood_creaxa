// app/components/HeroSection.js
'use client';

import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import { useRouter } from 'next/navigation'; // Import useRouter from next/navigation

const moods = [
  { name: 'Happy', image: '/images/happy-food.jpg', color: '#f7c948' },
  { name: 'Adventurous', image: '/images/adventurous-food.jpg', color: '#ff6f61' },
  { name: 'Cozy', image: '/images/cozy-food.jpg', color: '#6b705c' },
];

const HeroSection = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const router = useRouter(); // Initialize the router

  useEffect(() => {
    gsap.fromTo(
      '.hero-content',
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1, ease: 'power3.out' }
    );
  }, [selectedMood]);

  const handleMoodClick = (mood) => {
    setSelectedMood(mood);
    console.log(mood); // Check if the mood is being set
    router.push(`/mood?mood=${mood.name}`); // Navigate to the mood page with query param
  };

  return (
    <section className="relative h-screen w-full">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={selectedMood ? selectedMood.image : '/images/happy-food.jpg'} // Default background image
          alt={`${selectedMood?.name || 'Happy'} Food`}
          layout="fill"
          objectFit="cover"
          className="opacity-80"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white hero-content">
        <h1 className="text-5xl font-bold mb-4">Whats Your Food Mood?</h1>
        <p className="text-xl mb-8">Pick your mood and we will suggest the best dishes for you.</p>

        {/* Mood Buttons */}
        <div className="flex gap-4 mb-8">
          {moods.map((mood) => (
            <button
              key={mood.name}
              onClick={() => handleMoodClick(mood)}
              className={`px-6 py-2 rounded-lg text-lg font-semibold transition ${
                selectedMood?.name === mood.name ? 'bg-white text-black' : 'bg-black text-white'
              }`}
            >
              {mood.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
