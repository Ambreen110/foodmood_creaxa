'use client';

<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
=======
import React, { useEffect, useState, useRef } from 'react';
>>>>>>> 3f40ba32c43f15b261dad55fc8da7f4c39be369d
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const cuisines = ['Indian', 'American', 'Chinese', 'Italian', 'Mexican'];

<<<<<<< HEAD
const BestFoods = () => {
  const [foods, setFoods] = useState({});
  const [loading, setLoading] = useState(true);
  const router = useRouter();
=======
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
>>>>>>> 3f40ba32c43f15b261dad55fc8da7f4c39be369d

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
<<<<<<< HEAD
=======

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
>>>>>>> 3f40ba32c43f15b261dad55fc8da7f4c39be369d
  }, []);

  const handleRecipeClick = (idMeal) => {
    router.push(`/recipes/${idMeal}`);
  };

  return (
<<<<<<< HEAD
    <div className="relative w-screen min-h-screen flex flex-col items-center overflow-hidden gradient-background">
      <h2 className="text-white text-4xl font-extrabold mb-8 text-center pt-8 shadow-md">
        Best Foods
      </h2>

      <div className="flex flex-col w-full max-w-screen-lg">
        {cuisines.map((cuisine, index) => {
          const cuisineFoods = foods[cuisine] || [];
          const randomFood = cuisineFoods[Math.floor(Math.random() * cuisineFoods.length)];

          return (
            <motion.div
              key={cuisine}
              className="relative w-full flex items-center justify-center h-[80vh] overflow-hidden" // Ensures items fit within viewport
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
            >
              {loading ? (
                <p className="text-lg text-white">Loading...</p>
              ) : randomFood ? (
                <motion.div
                  className={`w-full h-full cursor-pointer flex flex-col-reverse lg:flex-row ${
                    index % 2 === 0 ? 'flex-row-reverse' : ''
                  }`}
                  onClick={() => handleRecipeClick(randomFood.idMeal)}
                  initial={{ scale: 0, rotate: -10 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 10 }}
                  transition={{ duration: 0.5, type: "spring", stiffness: 300 }}
                >
                  <motion.div
                    className={`relative flex-1 z-20 p-4 text-white ${
                      index % 2 === 0 ? 'text-left' : 'text-right'
                    }`}
                    initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                  >
                    <div className="bg-black bg-opacity-50 p-4 rounded-lg">
                      <h3 className="text-3xl font-bold text-orange-500 shadow-lg">
                        {randomFood.strMeal}
                      </h3>
                      <p className="text-lg">{cuisine}</p>
=======
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
>>>>>>> 3f40ba32c43f15b261dad55fc8da7f4c39be369d
                    </div>
                  </motion.div>

                  <motion.div
                    className="relative flex-1 z-10"
                    whileHover={{ scale: 1.1, rotate: 3 }}
                    initial={{ opacity: 0, y: 30, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.7 }}
                  >
                    <Image
                      src={randomFood.strMealThumb}
                      alt={randomFood.strMeal}
                      height={300} // Adjust height for better fit
                      width={300}  // Adjust width for better fit
                      style={{
                        objectFit: 'cover',
                        borderRadius: '50%',
                        border: '6px solid white',
                      }}
                      className="transition-opacity duration-500 ease-in-out"
                      priority
                    />
                  </motion.div>
                </motion.div>
              ) : (
                <p className="text-lg text-white">No food found for {cuisine}</p>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default BestFoods;
