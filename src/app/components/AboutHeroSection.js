import React from 'react';
import Image from 'next/image'; // Import the Image component from next/image

const AboutHeroSection = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/about-hero.jpg" // Ensure this path is correct and the image is in the public folder
          alt="About Hero Background"
          layout="fill" // Fills the entire parent container
          objectFit="cover" // Ensures the image covers the entire section while maintaining aspect ratio
          priority // Loads this image first for better performance
        />
      </div>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-5" /> {/* Ensure the overlay has a background color */}

      {/* Text */}
      <div className="relative flex items-center justify-center w-full h-full">
        <h1 className="text-yellow-400 text-5xl md:text-6xl font-bold">
          About Us
        </h1>
      </div>
    </section>
  );
};

export default AboutHeroSection;
