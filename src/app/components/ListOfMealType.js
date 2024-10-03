'use client'; // Ensure this is at the top of the file

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation'; // For navigation
import { BackgroundGradient } from './ui/background-gradient';

const ListOfMealType = () => {
  const mealTypes = [
    'Miscellaneous',
    'Chicken',
    'Dessert',
    'Lamb',
    'Beef',
    'Pasta',
    'Breakfast',
    'Seafood',
    'Side',
    'Starter',
    'Vegetarian',
    'Goat',
  ];

  const [selectedType, setSelectedType] = useState('Miscellaneous'); // Default to 'Miscellaneous'
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false); // State to handle dropdown visibility
  const router = useRouter(); // Router for navigation

  const fetchRecipes = async (mealType) => {
    setLoading(true);
    try {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${mealType}`);
      if (!res.ok) {
        throw new Error('Failed to fetch recipes');
      }

      const data = await res.json();
      setRecipes(data.meals.slice(0, 8)); // Limit to 4 recipes
    } catch (error) {
      console.error('Error fetching recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMealTypeSelect = (type) => {
    setSelectedType(type);
    fetchRecipes(type);
  };

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const handleRecipeClick = (idMeal) => {
    // Navigate to the recipe page
    router.push(`/recipes/${idMeal}`);
  };

  // Fetch recipes on component mount or when selectedType changes
  useEffect(() => {
    fetchRecipes(selectedType); // Fetch recipes based on the current selected type
  }, [selectedType]); // Add selectedType to the dependency array

  return (
    <div className="container mx-auto my-6 pt-16">
      <h2 className="text-secondary text-xl font-bold mb-4 text-center">
        Select a Meal Type
      </h2>

      <div className="relative">
        {/* Meal Type Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {mealTypes.slice(0, showMore ? mealTypes.length : 4).map((type) => (
            <button
              key={type}
              onClick={() => handleMealTypeSelect(type)}
              className={`bg-primary text-white py-2 px-4 rounded hover:bg-secondary transition ${selectedType === type ? 'bg-secondary' : ''}`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* See More Button */}
        <button
          onClick={toggleShowMore}
          className="flex items-center text-primary hover:text-secondary transition"
        >
          <span>{showMore ? 'See Less' : 'See More'}</span>
          <span className={`ml-1 transform transition-transform ${showMore ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </button>
      </div>

      {loading && <p>Loading recipes...</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <div
              key={recipe.idMeal}
              onClick={() => handleRecipeClick(recipe.idMeal)} // Handle recipe click
              className="cursor-pointer bg-white shadow-md rounded-lg p-4"
            >
              <BackgroundGradient className="rounded-[22px] bg-white dark:bg-zinc-900">
                <Image 
                  src={recipe.strMealThumb} // API provides 'strMealThumb' for image
                  alt={recipe.strMeal} // API provides 'strMeal' for title
                  width={300} 
                  height={200} 
                  className="w-full h-full object-cover rounded-lg" 
                />
                {/* Scrollable title container */}
                <div className="h-16 overflow-hidden">
                  <h3 className="text-lg font-semibold mt-2 whitespace-nowrap overflow-hidden text-ellipsis">
                    {recipe.strMeal}
                  </h3>
                </div>
              </BackgroundGradient>
            </div>
          ))
        ) : (
          !loading && <p>No recipes found for this meal type.</p>
        )}
      </div>
    </div>
  );
};

export default ListOfMealType;
