'use client';

import React, { useState } from 'react';

const VideoBlast = ({ onVideoEnd }) => {
  const [blastEffect, setBlastEffect] = useState(false);

  // Function to handle video click or when the video ends
  const handleVideoClick = () => {
    // Trigger the blast effect
    setBlastEffect(true);
    // Set a timeout to notify the parent component after 2 seconds
    setTimeout(() => {
      onVideoEnd(); // Notify HomePage to hide the video
    }, 2000); // Wait for the blast effect to finish
  };

  return (
    <div className={`relative w-full min-h-screen overflow-hidden ${blastEffect ? 'blast' : ''}`}>
      <video
        className="absolute inset-0 w-full h-full object-cover cursor-pointer"
        src="/videos/start_food.mp4"
        autoPlay
        muted
        playsInline
        onClick={handleVideoClick} // Click handler for navigation
        onEnded={handleVideoClick} // Also handle video end event
      />
      {/* Optionally, you could add styles or overlays here if needed */}
    </div>
  );
};

export default VideoBlast;
