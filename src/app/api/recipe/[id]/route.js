// pages/api/recipe/[id].js
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  const { id } = params; // Get the dynamic id from the request parameters
  const apiURL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;

  try {
    const response = await fetch(apiURL);
    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching the recipe:', error);
    return NextResponse.json({ error: 'Error fetching recipe' });
  }
}
