// app/home/page.js

'use client';

import React, { useState } from 'react';
import BestFoods from './components/BestFoods';
import HeroSection from './components/HeroSection';
import VideoBlast from './components/VideoBlast'; // Import the VideoBlast component

export default function HomePage() {
  const [showVideo, setShowVideo] = useState(true); // Control to show/hide the video

  // Function to handle the end of the video
  const handleVideoEnd = () => {
    setShowVideo(false); // Hide the video
  };

  return (
    <div>
      {/* VideoBlast component will be shown first */}
      {showVideo && (
        <VideoBlast onVideoEnd={handleVideoEnd} />
      )}

      {/* Show the other components (HeroSection, BestFoods) after the video ends */}
      {!showVideo && (
        <>
          <HeroSection />
          <BestFoods />
        </>
      )}
    </div>
  );
}
