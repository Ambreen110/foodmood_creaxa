// src/app/areaFood/[cuisine]/page.js
'use client'; // Ensure this is at the top of the file

import React from 'react';
import AreaFood from '../../components/AreaFood';
import AreaFoodHeroSection from '@/app/components/AreaFoodHeroSection';

const AreaFoodPage = ({ params }) => { // Access params
  const { cuisine } = params; // Get cuisine from params

  return (
    <>
    <AreaFoodHeroSection/>
      <AreaFood cuisine={cuisine} /> {/* Pass the cuisine to AreaFood */}
    </>
  );
};

export default AreaFoodPage;
