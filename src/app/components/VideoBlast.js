'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image'; // Import the Image component

const VideoBlast = ({ onVideoEnd }) => {
  const [blastEffect, setBlastEffect] = useState(false);
  const [isMobile, setIsMobile] = useState(false); // State to check if it's mobile

  // Effect to set isMobile based on window size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Adjust the breakpoint as needed
    };

    // Set initial value
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Return null if it's mobile
  if (isMobile) {
    return null; // Prevent rendering on mobile
  }

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
        className="absolute inset-0 w-full h-full object-cover cursor-pointer video"
        src="/videos/start_food.mp4"
        autoPlay
        muted
        playsInline
        loop
        onClick={handleVideoClick}
        onEnded={onVideoEnd} // Call onVideoEnd directly on video end
      />
      <style jsx>{`
        .blast {
          animation: blast-animation 2s forwards;
        }

        @keyframes blast-animation {
          0% {
            transform: scale(1);
            filter: brightness(100%);
          }
          50% {
            transform: scale(1.1);
            filter: brightness(120%);
          }
          100% {
            transform: scale(1);
            filter: brightness(100%);
          }
        }

        .relative {
          background-color: #00ABFE; /* Blue background */
        }

        video {
          border-radius: 8px; /* Rounded corners */
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2); /* Subtle shadow */
        }
      `}</style>
    </div>
  );
};

export default VideoBlast;
