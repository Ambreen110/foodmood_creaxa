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

  const backgrounds = [
    "/images/background.jpg",
    "/images/background-2.jpg",
    "/images/background-3.jpg",
    "/images/background-4.jpg",
    "/images/background-5.jpg",
  ];

  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768; // Check if the device is mobile

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

    if (!isMobile) {
      const pin = gsap.fromTo(
        sectionRef.current,
        { translateX: 0 },
        {
          translateX: "-300vw",
          ease: "power2.inOut",
          duration: 2,
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top top",
            end: "+=5000",
            scrub: 0.5,
            pin: true,
            pinSpacing: true,
          },
        }
      );

      return () => pin.kill();
    }
  }, [cuisine, isMobile]); // Add isMobile to dependencies

  const handleMealClick = (idMeal) => {
    router.push(`/recipes/${idMeal}`);
  };

  return (
    <div className="relative w-screen h-screen overflow-x-hidden"> {/* Added overflow-x-hidden */}
     
      <div ref={triggerRef} className="w-screen h-[100vh] overflow-x-auto"> {/* Added overflow-x-auto for horizontal scrolling */}
        <div ref={sectionRef} className={`flex ${isMobile ? 'flex-col' : 'h-[100vh] w-[500vw]'}`}>
          {loading ? ( // Show loading state
            <p className="text-lg">Loading...</p>
          ) : bestFoods.length > 0 ? (
            bestFoods.map((food, index) => {
              const backgroundImage = backgrounds[index % backgrounds.length]; // Cycle through background images

              return (
                <div
                  key={food.idMeal}
                  className="w-screen h-screen flex items-center justify-center relative flex-shrink-0" // Added flex-shrink-0 to prevent shrinking
                  style={{
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div
                    onClick={() => handleMealClick(food.idMeal)}
                    className="block w-full h-full cursor-pointer"
                  >
                    <BackgroundGradient className="absolute inset-0 z-10 flex flex-col items-center justify-center h-full w-full">
                      <h3 className="text-lg font-semibold mt-52 text-center text-orange-500 bg-black bg-opacity-50 p-2 rounded-lg">
                        {food.strMeal}
                      </h3>
                    </BackgroundGradient>
                    <div className="absolute inset-0 flex items-center justify-center"> 
                      <Image
                        src={food.strMealThumb}
                        alt={food.strMeal}
                        height={300} 
                        width={300} 
                        style={{
                          objectFit: "cover",
                          borderRadius: "50%", // Makes the image round
                          border: "4px solid white", // Optional: Add white border to the image
                        }}
                        className="transition-opacity duration-500 ease-in-out"
                        priority
                      />
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p>No best foods found for {cuisine || "this cuisine"}.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AreaFood;
