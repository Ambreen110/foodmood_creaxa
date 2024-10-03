// src/app/areaFood/[cuisine]/page.js
'use client'; // Ensure this is at the top of the file

import React from 'react';
import AreaFood from '../../components/AreaFood';
import { useRouter } from 'next/navigation';

const AreaFoodPage = ({ params }) => { // Access params
  const router = useRouter();
  const { cuisine } = params; // Get cuisine from params

  return (
    <>
      <AreaFood cuisine={cuisine} /> {/* Pass the cuisine to AreaFood */}
    </>
  );
};

export default AreaFoodPage;
