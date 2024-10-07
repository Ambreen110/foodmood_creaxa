'use client'; // Ensure this is at the top of the file

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { BackgroundGradient } from './ui/background-gradient';
import { useRouter } from 'next/navigation';

const FoodCategories = ({ mood }) => {
  const [categories, setCategories] = useState({});
  const [loading, setLoading] = useState(true);
  const sectionRefs = useRef([]);
  const router = useRouter();
  const [highlightedIndex, setHighlightedIndex] = useState({});

  gsap.registerPlugin(ScrollTrigger);

  const gradientColors = [
    'linear-gradient(135deg, #ffecd2, #fcb69f)', 
    'linear-gradient(135deg, #ff9a9e, #fecfef)', 
    'linear-gradient(135deg, #a18cd1, #fbc2eb)', 
    'linear-gradient(135deg, #667eea, #764ba2)',
  ];

  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768; // Check if the device is mobile

  useEffect(() => {
    const fetchMealCategories = async () => {
      try {
        const res = await fetch('/api/foodCategories');
        if (!res.ok) throw new Error('Failed to fetch meal categories');
        const data = await res.json();
        setCategories(data);

        const initialHighlightedIndex = {};
        Object.keys(data).forEach((category) => {
          initialHighlightedIndex[category] = 0;
        });
        setHighlightedIndex(initialHighlightedIndex);
      } catch (error) {
        console.error('Error fetching meal categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMealCategories();

<<<<<<< HEAD
    sectionRefs.current.forEach((section, index) => {
      if (section) {
        gsap.fromTo(
          section,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1.5,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    });
  }, []);
=======
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
>>>>>>> 3f40ba32c43f15b261dad55fc8da7f4c39be369d

  useEffect(() => {
    const interval = setInterval(() => {
      setHighlightedIndex((prevState) => {
        const updatedState = { ...prevState };
        Object.keys(updatedState).forEach((category) => {
          updatedState[category] = (updatedState[category] + 1) % categories[category]?.length;
        });
        return updatedState;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [categories]);

  const handleMealClick = (idMeal) => {
    router.push(`/recipes/${idMeal}`);
  };

<<<<<<< HEAD
  const filteredCategories = Object.entries(categories).filter(([foodType]) => foodType === mood);

  return (
    <div className="relative w-screen min-h-screen bg-gradient-to-r from-gray-100 to-gray-200">
     

      <div className="flex flex-col items-center w-full">
        {loading ? (
          <div className="flex justify-center items-center min-h-screen">
            <div className="loader"></div>
          </div>
        ) : (
          filteredCategories.length === 0 ? (
            <p className="text-lg">No categories available for this mood.</p>
          ) : (
            filteredCategories.map(([foodType, foodItems], index) => {
              const itemsToDisplay = foodItems.slice(0, 10);
              const gradientBackground = gradientColors[index % gradientColors.length];

              return (
                <div
                  key={foodType}
                  ref={(el) => (sectionRefs.current[index] = el)}
                  className="w-full flex flex-col items-center justify-center py-16 px-6"
                  style={{
                    background: gradientBackground,
                    transition: 'background 1s ease-in-out',
                  }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
                    {itemsToDisplay.map((food) => (
                      <div key={food.idMeal} className="flex items-center mb-4 shadow-lg rounded-lg bg-white p-4 transition-transform transform hover:scale-105">
                        <div className="relative cursor-pointer flex-1 flex justify-center">
                          <BackgroundGradient className="absolute inset-0 z-10 flex flex-col items-center justify-center h-full w-full">
                            <h3 className="text-2xl font-semibold mb-4 text-white bg-opacity-50 p-2 rounded-lg backdrop-blur-md">
                              {food.strMeal}
                            </h3>
                          </BackgroundGradient>
                          <Image
                            src={food.strMealThumb}
                            alt={food.strMeal}
                            height={300}
                            width={300}
                            style={{
                              objectFit: 'cover',
                              borderRadius: '50%',
                              border: '4px solid white',
                              maxWidth: '100%',
                              height: 'auto',
                            }}
                            className="transform transition-transform duration-500 ease-in-out hover:scale-110"
                            onClick={() => handleMealClick(food.idMeal)}
                          />
                        </div>
                      </div>
                    ))}
=======
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
>>>>>>> 3f40ba32c43f15b261dad55fc8da7f4c39be369d
                  </div>
                </div>
              );
            })
          )
        )}
      </div>
    </div>
  );
};

export default FoodCategories;
