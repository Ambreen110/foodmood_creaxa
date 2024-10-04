// app/home/page.js

'use client';

import React, { useState, useEffect } from 'react';
import BestFoods from './components/BestFoods';
import HeroSection from './components/HeroSection';
import VideoBlast from './components/VideoBlast'; // Import the VideoBlast component

export default function HomePage() {
  const [showVideo, setShowVideo] = useState(true); // Control to show/hide the video
  const [isMobile, setIsMobile] = useState(false); // State to check if it's mobile

  // Function to handle the end of the video
  const handleVideoEnd = () => {
    setShowVideo(false); // Hide the video
  };

  // Effect to set isMobile based on window size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Set initial value
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      {/* VideoBlast component will be shown on all screens */}
      {showVideo && (
        <VideoBlast onVideoEnd={handleVideoEnd} />
      )}

      {/* Show the HeroSection and BestFoods components only after the video ends */}
      {!showVideo && (
        <>
          <HeroSection />
          <BestFoods />
        </>
      )}
    </div>
  );
}
