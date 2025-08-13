import React, { useState } from 'react';
import { getRandomMatchPercentage, CONTENT_RATINGS } from '../utils/constants';

const MovieList = ({ movies }) => {
  const [hoveredMovie, setHoveredMovie] = useState(null);

  if (!movies || movies.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-400 text-lg">No movies found</p>
      </div>
    );
  }

  return (
    <div className="relative group">
      <div className="flex space-x-2 overflow-x-auto pb-4 scrollbar-hide">
        {movies.map((movie) => {
          const matchPercentage = getRandomMatchPercentage();
          const rating = CONTENT_RATINGS[Math.floor(Math.random() * CONTENT_RATINGS.length)];
          
          return (
            <div
              key={movie.id}
              className="flex-shrink-0 relative cursor-pointer transition-all duration-300 hover:scale-110 hover:z-10"
              onMouseEnter={() => setHoveredMovie(movie.id)}
              onMouseLeave={() => setHoveredMovie(null)}
            >
              {/* Movie Poster */}
              <div className="relative">
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="w-48 h-72 object-cover rounded-md shadow-lg"
                />
                
                {/* Hover Overlay */}
                {hoveredMovie === movie.id && (
                  <div className="absolute inset-0 bg-black bg-opacity-90 rounded-md flex flex-col justify-between p-4 transition-all duration-200">
                    {/* Top Section - Title and Rating */}
                    <div className="text-white">
                      <h3 className="text-lg font-semibold mb-2 line-clamp-2">{movie.title}</h3>
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-green-400 text-sm font-semibold">{matchPercentage}% Match</span>
                        <span className="text-gray-300 text-sm">{movie.releaseDate?.split('-')[0]}</span>
                        <span className="text-gray-300 text-sm border border-gray-600 px-1 text-xs">{rating}</span>
                      </div>
                      <p className="text-gray-300 text-sm line-clamp-3">{movie.overview}</p>
                    </div>
                    
                    {/* Bottom Section - Action Buttons */}
                    <div className="flex space-x-2">
                      <button className="flex-1 bg-white text-black py-2 px-3 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors flex items-center justify-center space-x-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                        <span>Play</span>
                      </button>
                      <button className="flex-1 bg-gray-600 text-white py-2 px-3 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors flex items-center justify-center space-x-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        <span>My List</span>
                      </button>
                      <button className="w-10 h-10 bg-gray-600 text-white rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Scroll Indicators */}
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-12 h-24 bg-gradient-to-r from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        <div className="w-full h-full flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </div>
      </div>
      
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-12 h-24 bg-gradient-to-l from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        <div className="w-full h-full flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default MovieList;
