'use client'; // Ensure this is at the top of the file

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { BackgroundGradient } from './ui/background-gradient';
import { useRouter } from 'next/navigation'; // Import useRouter

const cuisines = ['Indian', 'American', 'Chinese', 'Italian', 'Mexican'];

const backgrounds = [
  '/images/background.jpg',
  '/images/background-2.jpg',
  '/images/background-3.jpg',
  '/images/background-4.jpg',
  '/images/background-5.jpg',
]; // Array of background images

const BestFoods = () => {
  const [foods, setFoods] = useState({});
  const [loading, setLoading] = useState(true); // State for loading
  const sectionRef = useRef(null); // For GSAP animation
  const triggerRef = useRef(null); // For GSAP scroll trigger
  const router = useRouter(); // Initialize useRouter

  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    const fetchBestFoods = async () => {
      const foodData = {};
      try {
        await Promise.all(
          cuisines.map(async (cuisine) => {
            const res = await fetch(`/api/bestFoods?cuisine=${cuisine}`);
            if (!res.ok) throw new Error(`Failed to fetch foods for ${cuisine}`);
            const data = await res.json();
            foodData[cuisine] = data;
          })
        );
        setFoods(foodData); // Set data for all cuisines
      } catch (error) {
        console.error('Error fetching best foods:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchBestFoods();

    const pin = gsap.fromTo(
      sectionRef.current,
      { translateX: 0 },
      {
        translateX: '-300vw',
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
  }, []);

  const handleRecipeClick = (idMeal) => {
    router.push(`/recipes/${idMeal}`); // Navigate to the recipe page
  };

  return (
    <div className="relative w-screen h-screen">
      {/* Background styles applied directly to each section */}
      <h2 className="text-secondary text-xl font-bold mb-4 text-center absolute top-4 left-0 right-0 z-50">
        Best Foods
      </h2>

      <div ref={triggerRef} className="w-screen h-[100vh]">
        <div ref={sectionRef} className="flex h-[100vh] w-[500vw]">
          {cuisines.map((cuisine, index) => {
            const cuisineFoods = foods[cuisine] || [];
            const randomFood = cuisineFoods[Math.floor(Math.random() * cuisineFoods.length)];
            const backgroundImage = backgrounds[index]; // Assign the corresponding background

            return (
              <div
                key={cuisine}
                className="w-screen h-screen flex items-center justify-center relative"
                style={{
                  backgroundImage: `url(${backgroundImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundAttachment: 'fixed', // Background moves with the content
                }}
              >
                {loading ? ( // Show loading state
                  <p className="text-lg">Loading...</p>
                ) : randomFood ? (
                  <div onClick={() => handleRecipeClick(randomFood.idMeal)} className="block w-full h-full cursor-pointer">
                    <BackgroundGradient className="absolute inset-0 z-10 flex flex-col items-center justify-center h-full w-full">
                      <h3 className="text-lg font-semibold mt-52 text-center text-orange-500 bg-black bg-opacity-50 p-2 rounded-lg">
                        {randomFood.strMeal} ({cuisine})
                      </h3>
                    </BackgroundGradient>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Image
                        src={randomFood.strMealThumb}
                        alt={randomFood.strMeal}
                        height={300} // Adjust image height here
                        width={300} // Adjust image width here
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
                  <p>No food found for {cuisine}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BestFoods;
