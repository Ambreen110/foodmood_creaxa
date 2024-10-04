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
    "Happy": ["Dessert", "Breakfast", "Side"],
    "Adventurous": ["Seafood", "Pasta", "Miscellaneous", "Chicken", "Goat"],
    "Cozy": ["Beef", "Lamb", "Vegan", "Vegetarian"]
  };

  try {
    const categories = await fetchMealCategories();
    const mealsByType = {
      "Happy": [],
      "Adventurous": [],
      "Cozy": []
    };

    for (const category of categories) {
      const mealsAPIUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category.strCategory}`;
      const res = await fetch(mealsAPIUrl);
      if (!res.ok) {
        console.error(`Failed to fetch meals for category: ${category.strCategory}`);
        continue;
      }
      
      const mealsData = await res.json();
      
      for (const meal of mealsData.meals) {
        meal.strMealThumb = meal.strMealThumb.replace(/\s/g, '_');

        for (const [foodType, categoryArray] of Object.entries(foodCategoriesMapping)) {
          if (categoryArray.includes(category.strCategory)) {
            mealsByType[foodType].push(meal);
          }
        }
      }
    }

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
