// src/app/mood/page.js
import React from 'react';
import FoodCategories from '../components/FoodCategories';

const MoodPage = ({ searchParams }) => {
  // Extract the mood from the query parameters
  const mood = searchParams.mood || 'Happy'; // Default to 'Happy' if no mood is provided

  return (
    <div>
      <FoodCategories mood={mood} />
    </div>
  );
};

export default MoodPage;
