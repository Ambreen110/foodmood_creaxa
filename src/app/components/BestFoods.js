'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion'; // Import motion from framer-motion
import { BackgroundGradient } from './ui/background-gradient';
import { useRouter } from 'next/navigation'; // Import useRouter

const cuisines = ['Indian', 'American', 'Chinese', 'Italian', 'Mexican'];

const BestFoods = () => {
  const [foods, setFoods] = useState({});
  const [loading, setLoading] = useState(true); // State for loading
  const router = useRouter(); // Initialize useRouter

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
  }, []);

  const handleRecipeClick = (idMeal) => {
    router.push(`/recipes/${idMeal}`); // Navigate to the recipe page
  };

  return (
    <div className="relative w-screen min-h-screen bg-gray-100 overflow-y-scroll">
      <h2 className="text-secondary text-3xl font-bold mb-4 text-center pt-8 z-50">
        Best Foods
      </h2>

      <div className="flex flex-col">
        {cuisines.map((cuisine, index) => {
          const cuisineFoods = foods[cuisine] || [];
          const randomFood = cuisineFoods[Math.floor(Math.random() * cuisineFoods.length)];

          return (
            <motion.div
              key={cuisine}
              className="relative w-full h-screen flex items-center justify-center"
              initial={{ opacity: 0, y: 50 }} // Start with initial opacity and y position
              animate={{ opacity: 1, y: 0 }} // Animate to full opacity and y position
              exit={{ opacity: 0, y: -50 }} // Fade out on exit
              transition={{ duration: 0.5 }} // Smooth transition
            >
              {loading ? ( // Show loading state
                <p className="text-lg">Loading...</p>
              ) : randomFood ? (
                <motion.div
                  className={`w-full h-full cursor-pointer flex flex-col-reverse lg:flex-row ${
                    index % 2 === 0 ? 'flex-row-reverse' : ''
                  }`}
                  onClick={() => handleRecipeClick(randomFood.idMeal)} // Click to view recipe
                  initial={{ scale: 0, rotate: -10 }} // Initial scale and rotation for popup
                  animate={{ scale: 1, rotate: 0 }} // Scale up for popup effect
                  exit={{ scale: 0, rotate: 10 }} // Exit with scale and rotate
                  transition={{ duration: 0.5, type: "spring", stiffness: 300 }} // Duration for scaling effect
                >
                  {/* Transparent Text Container */}
                  <motion.div
                    className={`relative flex-1 z-20 p-8 ${
                      index % 2 === 0 ? 'text-left' : 'text-right'
                    }`}
                    initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }} // Alternating direction for text
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                  >
                    <div className="bg-black bg-opacity-50 p-4 rounded-lg">
                      <h3 className="text-3xl font-bold text-orange-500">
                        {randomFood.strMeal}
                      </h3>
                      <p className="text-lg text-white">{cuisine}</p>
                    </div>
                  </motion.div>

                  {/* Medium-Sized Food Image with Enhanced Animation */}
                  <motion.div
                    className="relative flex-1 z-10"
                    whileHover={{ scale: 1.2, rotate: 3 }} // Hover effect with scale and subtle rotate
                    initial={{ opacity: 0, y: 30, scale: 0.8 }} // Initial opacity, movement, and scale for entrance animation
                    animate={{ opacity: 1, y: 0, scale: 1 }} // Animate to full visibility and size
                    transition={{ duration: 0.7 }} // Animation timing
                  >
                    <Image
                      src={randomFood.strMealThumb}
                      alt={randomFood.strMeal}
                      height={400} // Medium size image (reduced)
                      width={400} // Medium size image (reduced)
                      style={{
                        objectFit: 'cover',
                        borderRadius: '50%', // Circular shape
                        border: '6px solid white', // Optional: Border styling
                      }}
                      className="transition-opacity duration-500 ease-in-out"
                      priority
                    />
                  </motion.div>
                </motion.div>
              ) : (
                <p>No food found for {cuisine}</p>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default BestFoods;
