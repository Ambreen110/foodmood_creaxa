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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState({});

  gsap.registerPlugin(ScrollTrigger);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const gradientColors = [
    'linear-gradient(135deg, #FFCCB6, #FF6F61)', // Light orange
    'linear-gradient(135deg, #FFD1A4, #FFABAB)', // Light peach
    'linear-gradient(135deg, #FF677D, #D4A5A5)', // Light coral
    'linear-gradient(135deg, #FFABAB, #FFC3A0)', // Light apricot
  ];

  useEffect(() => {
    const fetchMealCategories = async () => {
      try {
        const res = await fetch('/api/foodCategories');
        if (!res.ok) throw new Error('Failed to fetch meal categories');
        const data = await res.json();
        console.log(data); // Log the data to see its structure
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

  // Filter categories based on the selected mood
  const filteredCategories = Object.entries(categories).filter(([foodType]) => foodType === mood);

  return (
    <div className="relative w-screen min-h-screen bg-gradient-to-r from-blue-200 to-gray-300">
      {/* Updated heading with gradient background and proper styling */}
      <h1 className="text-black font-bold text-4xl mb-8 text-center py-4 px-2 bg-gradient-to-r from-blue-200 to-gray-300 rounded-lg shadow-md">
        {mood} Food
      </h1>
      {/* <nav className="navbar">
       
        <ul className={`navigation-menu ${isMenuOpen ? 'open' : ''}`}>
        </ul>
      </nav> */}

      <div className="flex flex-col items-center w-full">
        {loading ? (
          <p className="text-lg">Loading...</p>
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
                  className="w-full flex flex-col items-center justify-center py-16"
                  style={{
                    background: gradientBackground,
                    transition: 'background 1s ease-in-out',
                  }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full px-4">
                    {itemsToDisplay.map((food) => (
                      <div key={food.idMeal} className="flex items-center mb-4">
                        <div className="relative cursor-pointer flex-1 flex justify-center">
                          <BackgroundGradient className="absolute inset-0 z-10 flex flex-col items-center justify-center h-full w-full">
                            <h3 className="text-2xl font-semibold mb-8 text-white bg-opacity-50 p-2 rounded-lg backdrop-blur-md">
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
