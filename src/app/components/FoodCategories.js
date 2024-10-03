'use client'; // Ensure this is at the top of the file

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { BackgroundGradient } from './ui/background-gradient';
import { useRouter } from 'next/navigation'; // Import useRouter

const FoodCategories = () => {
  const [categories, setCategories] = useState({});
  const [loading, setLoading] = useState(true); // State for loading
  const sectionRef = useRef(null); // For GSAP animation
  const triggerRef = useRef(null); // For GSAP scroll trigger
  const router = useRouter(); // Initialize useRouter

  gsap.registerPlugin(ScrollTrigger);

  const backgroundImages = [
    '/images/background.jpg',
    '/images/background-2.jpg',
    '/images/background-3.jpg',
    '/images/background-4.jpg',
  ]; // Array of background images

  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768; // Check if the device is mobile

  useEffect(() => {
    const fetchMealCategories = async () => {
      try {
        const res = await fetch('/api/foodCategories'); // API endpoint for meal categories
        if (!res.ok) throw new Error('Failed to fetch meal categories');
        const data = await res.json();
        setCategories(data); // Set data for categories
      } catch (error) {
        console.error('Error fetching meal categories:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchMealCategories();

    if (!isMobile) {
      const pin = gsap.fromTo(
        sectionRef.current,
        { translateY: 0 }, // Change to translateY for vertical scrolling
        {
          translateY: '-200vh', // Adjust to control how far to scroll
          ease: 'power2.inOut',
          duration: 2,
          scrollTrigger: {
            trigger: triggerRef.current,
            start: 'top top',
            end: '+=5000',
            scrub: 0.5,
            pin: true,
            pinSpacing: true,
          },
        }
      );

      return () => pin.kill(); // Cleanup on component unmount
    }
  }, [isMobile]); // Add isMobile to dependencies

  const handleMealClick = (idMeal) => {
    router.push(`/recipes/${idMeal}`); // Navigate to the meal page
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <div ref={triggerRef} className={`w-screen h-[100vh] ${isMobile ? 'overflow-y-auto' : ''}`}>
        <div ref={sectionRef} className={`flex ${isMobile ? 'flex-col' : 'h-[100vh] w-screen'}`}>
          {Object.entries(categories).map(([foodType, foodItems], index) => {
            const randomFood = foodItems[Math.floor(Math.random() * foodItems.length)];
            const backgroundImage = backgroundImages[index % backgroundImages.length]; // Cycle through background images

            return (
              <div
                key={foodType}
                className={`w-screen h-[100vh] flex items-center justify-center relative ${isMobile ? 'flex-col' : ''}`} // Change layout for mobile
                style={{
                  backgroundImage: `url(${backgroundImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                {loading ? ( // Show loading state
                  <p className="text-lg">Loading...</p>
                ) : randomFood ? (
                  <div onClick={() => handleMealClick(randomFood.idMeal)} className="block w-full h-full cursor-pointer">
                    <BackgroundGradient className="absolute inset-0 z-10 flex flex-col items-center justify-center h-full w-full">
                      <h3 className="text-lg font-semibold mt-5 text-center text-orange-500 bg-black bg-opacity-50 p-2 rounded-lg">
                        {randomFood.strMeal}
                      </h3>
                    </BackgroundGradient>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Image
                        src={randomFood.strMealThumb}
                        alt={randomFood.strMeal}
                        height={300} // Adjust image height here
                        width={300}  // Adjust image width here
                        style={{
                          objectFit: 'cover',
                          borderRadius: '50%', // Makes the image round
                          border: '4px solid white', // Optional: Add white border to the image
                        }}
                        className="transition-opacity duration-500 ease-in-out"
                        priority
                      />
                    </div>
                  </div>
                ) : (
                  <p>No food found for {foodType}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FoodCategories;
