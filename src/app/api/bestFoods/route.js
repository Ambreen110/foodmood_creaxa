export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const cuisine = searchParams.get('cuisine') || 'Indian'; // Default to Indian if no cuisine is provided
  const apiURL = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${cuisine}`;

  try {
    const res = await fetch(apiURL);
    if (!res.ok) {
      throw new Error('Failed to fetch data from TheMealDB API');
    }
    const data = await res.json();

    // Shuffle the array to ensure randomness
    const shuffledMeals = data.meals.sort(() => 0.5 - Math.random());

    // Limit the results to 4 random meals
    const bestFoods = shuffledMeals.slice(0, 4);

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
