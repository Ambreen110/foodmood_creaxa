"use client"; // Ensure this is at the top of the file

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { BackgroundGradient } from "./ui/background-gradient";
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation

const AreaFood = ({ cuisine }) => {
  const [bestFoods, setBestFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);
  const router = useRouter();

  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    const fetchBestFoods = async () => {
      const foodData = [];
      if (!cuisine) return; // Exit if cuisine is not defined

      try {
        const res = await fetch(`/api/bestFoods?cuisine=${cuisine}`);
        if (!res.ok) throw new Error(`Failed to fetch foods for ${cuisine}`);
        const data = await res.json();
        foodData.push(...data);
      } catch (error) {
        console.error("Error fetching best foods:", error);
      } finally {
        setBestFoods(foodData);
        setLoading(false);
      }
    };

    fetchBestFoods(); // Call the fetch function

    // Only apply horizontal scroll animations on desktop
    const viewportWidth = window.innerWidth;

    if (viewportWidth > 768) {
      const pin = gsap.fromTo(
        sectionRef.current,
        { translateX: 0 },
        {
          translateX: "-300vw", // Horizontal scroll for larger screens
          ease: "power2.inOut",
          duration: 2,
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top top",
            end: "+=2000",
            scrub: 1,
            pin: true,
            pinSpacing: true,
          },
        }
      );

      return () => pin.kill();
    }
  }, [cuisine]);

  const handleMealClick = (idMeal) => {
    router.push(`/recipes/${idMeal}`);
  };

  // Array of gradient backgrounds for each food card
  const gradientBackgrounds = [
    "bg-gradient-to-r from-orange-400 to-blue-500",
    "bg-gradient-to-r from-purple-400 to-pink-500",
    "bg-gradient-to-r from-green-400 to-yellow-500",
    "bg-gradient-to-r from-blue-400 to-indigo-500",
  ];

  return (
    <div className="relative w-screen h-screen bg-gray-100">
      <div ref={triggerRef} className="w-screen h-[100vh]">
        {/* Container for large screens */}
        <div
          ref={sectionRef}
          className="flex lg:h-[100vh] lg:w-[500vw] lg:flex-row flex-col h-auto"
        >
          {loading ? ( // Show loading state
            <p className="text-lg">Loading...</p>
          ) : bestFoods.length > 0 ? (
            bestFoods.map((food, index) => (
              <div
                key={food.idMeal}
                className={`w-screen h-screen flex items-center justify-center relative lg:w-screen lg:h-screen py-10 ${gradientBackgrounds[index % gradientBackgrounds.length]}`} // Apply unique gradient background
              >
                <div
                  onClick={() => handleMealClick(food.idMeal)}
                  className="block w-full h-full cursor-pointer group"
                >
                  <BackgroundGradient className="absolute inset-0 z-10 flex flex-col items-center justify-center h-full w-full">
                    <h3 className="text-lg font-semibold mt-52 text-center text-orange-500 bg-black bg-opacity-50 p-2 rounded-lg transition duration-500 ease-in-out group-hover:scale-110 group-hover:text-yellow-400">
                      {food.strMeal}
                    </h3>
                  </BackgroundGradient>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Image
                      src={food.strMealThumb}
                      alt={food.strMeal}
                      height={250} // Medium size image
                      width={250} // Medium size image
                      style={{
                        objectFit: "cover",
                        borderRadius: "50%", // Makes the image round
                        border: "4px solid white", // Optional: Add white border to the image
                      }}
                      className="transition-transform duration-700 ease-in-out group-hover:rotate-6 group-hover:scale-125 transform"
                      priority
                    />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No best foods found for {cuisine || "this cuisine"}.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AreaFood;
