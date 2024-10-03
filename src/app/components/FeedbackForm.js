"use client"
import React, { useState } from 'react';

const FeedbackForm = () => {
  const [rating, setRating] = useState(0);

  return (
    <div className="container mx-auto my-6">
      <h2 className="text-primary text-2xl font-bold">Leave a Comment</h2>
      <form className="mt-4">
        <input 
          type="text" 
          placeholder="Your Name" 
          className="block w-full p-2 border mb-4" 
        />
        <input 
          type="email" 
          placeholder="Your Email" 
          className="block w-full p-2 border mb-4" 
        />
        <textarea 
          placeholder="Your Comment" 
          className="block w-full p-2 border mb-4" 
        />
        <div>
          <span className="text-lg font-bold">Rate: </span>
          {[1, 2, 3, 4, 5].map(star => (
            <button 
              key={star} 
              type="button" 
              onClick={() => setRating(star)}
              className={`text-xl ${rating >= star ? 'text-primary' : 'text-gray-300'}`}
            >
              ★
            </button>
          ))}
        </div>
        <button type="submit" className="bg-secondary text-white p-2 mt-4">Submit</button>
      </form>
    </div>
  );
};

export default FeedbackForm;
