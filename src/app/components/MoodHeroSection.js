// MoodHeroSection.js
import React from 'react';
import Image from 'next/image';

const MoodHeroSection = ({ mood }) => {
  // Define text based on the mood prop
  const moodTexts = {
    Happy: {
      title: "Good Vibes Only",
      description: "Embrace positivity and let the good times roll!",
    },
    Adventurous: {
      title: "Adventure Awaits",
      description: "Explore new horizons and unleash your wanderlust!",
    },
    Cozy: {
      title: "Cozy Vibes",
      description: "Snuggle up and enjoy the warmth of home!",
    },
  };

  // Check if mood is defined
  console.log('Selected mood:', mood);

  // Fallback text for unknown moods
  const { title, description } = moodTexts[mood] || moodTexts.happy;

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/mood-hero.jpg" // Ensure this path is correct and the image is in the public folder
          alt="Mood Hero Background"
          layout="fill" // Fills the entire parent container
          objectFit="cover" // Ensures the image covers the entire section while maintaining aspect ratio
          priority // Loads this image first for better performance
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-40" /> {/* Adjust opacity as needed */}

      {/* Text Container */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center text-center">
        <h1 className="text-white text-5xl md:text-6xl font-bold mb-4">
          {title}
        </h1>
        <p className="text-yellow-300 text-lg md:text-xl">
          {description}
        </p>
      </div>
    </section>
  );
};

export default MoodHeroSection;
