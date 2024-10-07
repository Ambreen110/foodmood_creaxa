"use client";
import React from "react";

const AboutUs = () => {
  return (
    <div
      className="bg-gray-100 min-h-screen flex flex-col items-center p-6 relative pt-20" // Added pt-20 for top padding
     
    >
      <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-md max-w-3xl">
        <h1 className="text-4xl font-bold text-center mb-4">About Us</h1>
        <p className="text-lg text-center mb-6">
          Welcome to FoodMood, your ultimate destination for discovering and 
          sharing delightful recipes tailored to your taste preferences! We 
          believe that food is more than just sustenance; it’s an experience, 
          a journey that brings people together. Whether you’re a seasoned chef 
          or a kitchen novice, our app is designed to inspire you to explore 
          the world of culinary delights.
        </p>

        <h2 className="text-2xl font-semibold text-center mb-2">Our Mission</h2>
        <p className="text-lg text-center mb-6">
          At FoodMood, our mission is to make cooking enjoyable and accessible 
          for everyone. We curate recipes from various cuisines, focusing on 
          healthy ingredients and easy-to-follow instructions. Our goal is to 
          empower home cooks to create delicious meals that nourish the body 
          and soul.
        </p>

        <h2 className="text-2xl font-semibold text-center mb-2">Our Vision</h2>
        <p className="text-lg text-center mb-6">
          We envision a world where every meal brings joy and satisfaction. 
          Our platform aims to build a community of food lovers who share their 
          culinary creations, inspire each other, and celebrate the diversity of 
          flavors and cultures through food.
        </p>

        <h2 className="text-2xl font-semibold text-center mb-2">Join Us!</h2>
        <p className="text-lg text-center">
          We invite you to explore our app, share your favorite recipes, and 
          connect with fellow food enthusiasts. Together, let’s create a 
          flavorful journey that enriches our lives one dish at a time!
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
