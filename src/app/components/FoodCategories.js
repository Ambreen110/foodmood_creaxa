"use client";

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

  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;

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

    if (!isMobile) {
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
    }
  }, [isMobile]);

  useEffect(() => {
    const interval = setInterval(() => {
      setHighlightedIndex(prev => {
        const newIndex = {  prev };
        Object.keys(newIndex).forEach((category) => {
          newIndex[category] = (newIndex[category] + 1) % categories[category].length;
        });
        return newIndex;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [categories]);

  const handleMealClick = (mealId) => {
    router.push(`/recipes/${mealId}`);
  };

  return (
    <div className="flex flex-col space-y-6 lg:space-y-0">
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <p className="text-lg">Loading </p>
        </div>
      ) : (
        Object.keys(categories).map((category, index) => (
          <div key={category} ref={el => (sectionRefs.current[index] = el)} className="relative flex flex-col items-center">
            <h2 className="text-2xl font-bold text-center">{category}</h2>
            <div className="flex overflow-x-auto space-x-4">
              {categories[category].map((meal, mealIndex) => (
                <div
                  key={meal.idMeal}
                  className={`flex-shrink-0 w-64 h-64 rounded-lg shadow-lg cursor-pointer transform transition duration-300 ${highlightedIndex[category] === mealIndex ? 'scale-105' : 'scale-100'}`}
                  onClick={() => handleMealClick(meal.idMeal)}
                >
                  <BackgroundGradient className="absolute inset-0 z-10 flex items-center justify-center">
                    <h3 className="text-lg font-semibold text-white">{meal.strMeal}</h3>
                  </BackgroundGradient>
                  <Image
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    width={256}
                    height={256}
                    style={{ objectFit: "cover", borderRadius: "0.5rem" }}
                    className="absolute inset-0 rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default FoodCategories;
