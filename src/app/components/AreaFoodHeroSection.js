import React from 'react';
import Image from 'next/image'; // Import the Image component from next/image

const AreaFoodHeroSection = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/cuisine-hero.jpg" // Ensure this path is correct and the image is in the public folder
          alt="Cuisine Hero Background"
          layout="fill" // Fills the entire parent container
          objectFit="cover" // Ensures the image covers the entire section while maintaining aspect ratio
          priority // Loads this image first for better performance
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-30" /> {/* Adjust opacity as needed */}

      {/* Window Frame Effect */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center text-center z-10">
        <div className="p-8 bg-white rounded-lg shadow-lg border-4 border-gray-300">
          <h1 className="text-[#E97415] text-5xl md:text-6xl font-bold">
            Cuisine
          </h1>
          <p className="text-gray-700 mt-4 text-lg">
            Explore the flavors of our dishes
          </p>
        </div>
      </div>
    </section>
  );
};

export default AreaFoodHeroSection;
