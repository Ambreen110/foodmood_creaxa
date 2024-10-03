"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import { FaSearch } from 'react-icons/fa'; // Import a search icon (using react-icons as an example)

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const API_KEY = 'YOUR_SPOONACULAR_API_KEY'; // Replace with your actual API key

  const onSearch = async (value) => {
    setQuery(value);
    if (value) {
      try {
        const response = await fetch(
          `https://api.spoonacular.com/recipes/complexSearch?query=${encodeURIComponent(value)}&number=10&apiKey=${API_KEY}`
        );
        const data = await response.json();
        setResults(data.results || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    } else {
      setResults([]); // Clear results when input is empty
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch(query); // Trigger search on Enter key
    }
  };

  const handleSearchClick = () => {
    onSearch(query); // Trigger search on button click
  };

  return (
    <div className="flex items-center">
      <input
        type="text"
        value={query}
        placeholder="Search for a dish..."
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown} // Capture key down events
        className="rounded p-2 w-1/3" // Add your desired styles
      />
      <button 
        onClick={handleSearchClick} // Handle search icon click
        className="ml-2 bg-primary text-white p-2 rounded" // Style your button
      >
        <FaSearch /> {/* Render the search icon */}
      </button>
      <div>
        {results.length > 0 && (
          <ul>
            {results.map((recipe) => (
              <li key={recipe.id} className="my-2">
                <h3>{recipe.title}</h3>
                <Image
                  src={recipe.image}
                  alt={recipe.title}
                  width={100} // Set width based on your design
                  height={100} // Set height based on your design
                  layout="responsive" // Optional: allows the image to resize responsively
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
