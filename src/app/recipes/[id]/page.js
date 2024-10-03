// pages/recipes/[id].js
'use client'; // Ensure this is at the top
import { useEffect, useState } from 'react';
import RecipeCard from '../../components/RecipeCard'; // Adjust the path if needed
import { useParams } from 'next/navigation';
import { gsap } from 'gsap'; // Import GSAP for animations
import Image from 'next/image'; // To use Next.js Image optimization

const RecipePage = () => {
  const { id } = useParams(); // Extract dynamic ID from the route
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      if (!id) return; // Avoid fetching if id is not available
      try {
        const res = await fetch(`/api/recipe/${id}`);
        if (!res.ok) {
          throw new Error('Failed to fetch');
        }
        const data = await res.json();
        const fetchedRecipe = data.meals[0]; // Use the first meal in the array
        setRecipe(fetchedRecipe);
      } catch (error) {
        console.error('Error fetching recipe:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  // GSAP animations when recipe data is loaded
  useEffect(() => {
    if (recipe) {
      gsap.fromTo(
        '.recipe-card',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.2 }
      );
    }
  }, [recipe]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      {/* Hero section with the image background */}
      <div className="relative w-full h-96">
        {recipe && (
          <Image
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            layout="fill"
            objectFit="cover"
            className="opacity-80"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent flex items-end justify-center">
          <h1 className="text-4xl text-white font-bold p-4">
            {loading ? 'Loading Recipe...' : recipe?.strMeal}
          </h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl p-6 bg-white rounded-lg shadow-xl -mt-16 z-10 recipe-card">
        {loading ? (
          <p className="text-center text-lg text-gray-700">Loading recipe...</p>
        ) : recipe ? (
          <div className="flex flex-col md:flex-row items-start gap-6">
            {/* Recipe Description */}
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl font-semibold mb-4 text-gray-800">
                {recipe.strMeal}
              </h2>
              <p className="text-lg text-gray-600 mb-4">{recipe.strInstructions}</p>

              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Ingredients:</h3>
              <ul className="text-lg text-gray-700 grid grid-cols-2 gap-4 mb-6">
                {Object.keys(recipe)
                  .filter(key => key.includes('Ingredient') && recipe[key])
                  .map((key, index) => (
                    <li key={index}>{recipe[key]}</li>
                  ))}
              </ul>
            </div>

            {/* Recipe Image */}
            <div className="relative w-full md:w-1/2 h-64 md:h-80">
              <Image
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
          </div>
        ) : (
          <p className="text-lg text-gray-700 text-center">No recipe found.</p>
        )}
      </div>
    </div>
  );
};

export default RecipePage;
