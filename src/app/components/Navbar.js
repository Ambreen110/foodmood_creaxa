"use client"; // This component is rendered on the client side

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 50); // Set true if scrolled more than 50 pixels
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const cuisines = [
    { name: 'American' },
    { name: 'Chinese' },
    { name: 'Italian' },
    { name: 'Mexican' },
    { name: 'Indian' },
  ];

  const handleCuisineClick = (cuisine) => {
    router.push(`/areaFood/${cuisine}`);
    setIsOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 p-4 transition-all duration-300 ${isScrolled ? 'bg-gray-500 shadow-lg' : 'bg-gray-500'}`}>
      <div className="container mx-auto flex justify-between items-center">
        <h1 
          className="text-xl font-bold cursor-pointer transition-colors duration-300 text-orange-500 hover:text-orange-300" 
          onClick={() => router.push('/')}
        >
          FoodMood
        </h1>
        
        <button 
          className="md:hidden focus:outline-none" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          <svg 
            className={`w-6 h-6 transition-transform duration-300 ${isOpen ? 'transform rotate-90' : ''}`} 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4 6h16M4 12h16m-7 6h7" 
            />
          </svg>
        </button>

        <div className={`hidden md:flex md:space-x-6 text-orange-500 font-bold transition-all duration-300`}>
          {cuisines.map((cuisine) => (
            <button 
              key={cuisine.name} 
              onClick={() => handleCuisineClick(cuisine.name)} 
              className={`block py-2 px-4 transition-colors duration-300 hover:text-orange-300`}
            >
              {cuisine.name}
            </button>
          ))}
        </div>
      </div>

      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} transition-all duration-300 bg-gray-800 bg-opacity-90 rounded-lg shadow-lg`}>
        <div className="flex flex-col items-center py-4">
          {cuisines.map((cuisine) => (
            <button 
              key={cuisine.name} 
              onClick={() => handleCuisineClick(cuisine.name)} 
              className={`block py-2 px-4 w-full text-left text-orange-500 font-bold transition-colors duration-300 hover:text-orange-300`}
            >
              {cuisine.name}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
