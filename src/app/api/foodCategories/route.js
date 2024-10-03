export async function GET(request) {
  const fetchMealCategories = async () => {
    const res = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    if (!res.ok) {
      throw new Error('Failed to fetch meal categories');
    }
    const data = await res.json();
    return data.meals; // Returns the array of meal categories
  };

  const foodCategoriesMapping = {
    "Happy Food": ["Dessert", "Breakfast", "Side"],
    "Adventurous Food": ["Seafood", "Pasta", "Miscellaneous", "Chicken", "Goat"],
    "Cozy Food": ["Beef", "Lamb", "Vegan", "Vegetarian"]
  };

  try {
    // Fetch meal categories from TheMealDB API
    const categories = await fetchMealCategories();
    
    // Initialize an object to hold meals categorized by food type
    const mealsByType = {
      "Happy Food": [],
      "Adventurous Food": [],
      "Cozy Food": []
    };

    // Fetch meals for each category and sort them into the respective food types
    for (const category of categories) {
      const mealsAPIUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category.strCategory}`;
      const res = await fetch(mealsAPIUrl);
      if (!res.ok) {
        console.error(`Failed to fetch meals for category: ${category.strCategory}`);
        continue; // Skip to the next category if the fetch fails
      }
      
      const mealsData = await res.json();
      
      for (const meal of mealsData.meals) {
        // Fix the image URL issue by replacing spaces with underscores in meal names
        meal.strMealThumb = meal.strMealThumb.replace(/\s/g, '_');

        // Check which food type the meal category belongs to
        for (const [foodType, categoryArray] of Object.entries(foodCategoriesMapping)) {
          if (categoryArray.includes(category.strCategory)) {
            mealsByType[foodType].push(meal);
          }
        }
      }
    }

    // Shuffle and limit meals to 4 for each food type
    const bestFoods = {};
    for (const [foodType, meals] of Object.entries(mealsByType)) {
      bestFoods[foodType] = meals.sort(() => 0.5 - Math.random()).slice(0, 10);
    }

    return new Response(JSON.stringify(bestFoods), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error fetching best foods:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch best foods' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
