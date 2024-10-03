'use client'; // Ensure this is at the top of the file

import React, { useEffect, useState, useRef } from 'react';
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
];

const BestFoods = () => {
  const [foods, setFoods] = useState({});
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);
  const router = useRouter();

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
        setFoods(foodData);
      } catch (error) {
        console.error('Error fetching best foods:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBestFoods();

    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

    if (!isMobile) {
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

      return () => pin.kill();
    }
  }, []);

  const handleRecipeClick = (idMeal) => {
    router.push(`/recipes/${idMeal}`);
  };

  return (
    <div className="relative w-screen h-screen overflow-x-hidden">
      <h2 className="text-secondary text-xl font-bold mb-4 text-center absolute top-4 left-0 right-0 z-50">
        Best Foods
      </h2>

      <div ref={triggerRef} className="w-screen h-full overflow-x-auto"> {/* Allow horizontal scrolling on mobile */}
        <div ref={sectionRef} className={`flex ${typeof window !== 'undefined' && window.innerWidth <= 768 ? 'flex-col' : 'h-[100vh] w-[500vw]'}`}>
          {cuisines.map((cuisine, index) => {
            const cuisineFoods = foods[cuisine] || [];
            const randomFood = cuisineFoods[Math.floor(Math.random() * cuisineFoods.length)];
            const backgroundImage = backgrounds[index];

            return (
              <div
                key={cuisine}
                className="w-screen h-screen flex items-center justify-center relative flex-shrink-0"
                style={{
                  backgroundImage: `url(${backgroundImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                {loading ? (
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
                        height={300}
                        width={300}
                        style={{
                          objectFit: 'cover',
                          borderRadius: '50%',
                          border: '4px solid white',
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
