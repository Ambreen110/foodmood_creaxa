import React from 'react';
import FoodCategories from '../../components/FoodCategories';
import MoodHeroSection from '@/app/components/MoodHeroSection';

const MoodPage = ({ params }) => {
  const { mood } = params; // Extract the mood from params

  return (
    <div>
      <MoodHeroSection mood={mood} /> {/* Pass the mood prop */}
      
      <FoodCategories mood={mood} />
    </div>
  );
};

export default MoodPage;