import React from 'react';
import FoodCategories from '../../components/FoodCategories';

const MoodPage = ({ params }) => {
  const {mood} = params; // Default mood

  return (
    <div>
      <h1 className="text-center text-2xl font-bold mb-8">{mood}</h1>
      <FoodCategories mood={mood} />
    </div>
  );
};

export default MoodPage;
