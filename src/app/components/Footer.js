"use client";
import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'; // Import icons from react-icons

const Footer = () => {
  return (
    <footer
      className="bg-cover bg-center text-white p-12"
      style={{
        backgroundImage: "url('/images/footer.jpg')", // Update with the correct image path
      }}
    >
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <h2 className="text-3xl font-bold">FoodMood</h2>
          <p className="text-sm">© 2024 FoodMood. All Rights Reserved.</p>
        </div>

        <div className="flex space-x-4 mb-4 md:mb-0">
          {/* Placeholder links */}
          <span className="text-gray-200">About Us</span>
          <span className="text-gray-200">Privacy Policy</span>
          <span className="text-gray-200">Terms of Service</span>
          <span className="text-gray-200">Contact</span>
        </div>

        <div className="flex space-x-4">
          <a href="#" className="text-gray-400 hover:text-white transition duration-300">
            <FaFacebook size={24} />
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition duration-300">
            <FaTwitter size={24} />
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition duration-300">
            <FaInstagram size={24} />
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition duration-300">
            <FaLinkedin size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
