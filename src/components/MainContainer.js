import React, { useState, useEffect } from 'react';
import useTMDB from '../hooks/useTMDB';
import VideoBackground from './VideoBackground';
import { getRandomMatchPercentage, getRandomDuration, CONTENT_RATINGS, QUALITY_INDICATORS } from '../utils/constants';

const MainContainer = () => {
  const { data, loading } = useTMDB();
  const [featuredMovie, setFeaturedMovie] = useState(null);

  useEffect(() => {
    if (data.trending && data.trending.length > 0) {
      // Get a random featured movie from trending
      const randomIndex = Math.floor(Math.random() * Math.min(5, data.trending.length));
      setFeaturedMovie(data.trending[randomIndex]);
    }
  }, [data.trending]);

  if (loading || !featuredMovie) {
    return (
      <div className="relative h-screen bg-black">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600"></div>
        </div>
      </div>
    );
  }

  const matchPercentage = getRandomMatchPercentage();
  const duration = getRandomDuration();
  const rating = CONTENT_RATINGS[Math.floor(Math.random() * CONTENT_RATINGS.length)];
  const quality = QUALITY_INDICATORS[Math.floor(Math.random() * QUALITY_INDICATORS.length)];

  return (
    <div className="relative h-screen">
      {/* Video Background */}
      <VideoBackground movie={featuredMovie} />

      {/* Content */}
      <div className="relative z-10 h-full flex items-end">
        <div className="px-8 pb-32 max-w-2xl">
          {/* Title */}
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            {featuredMovie.title}
          </h1>

          {/* Rating and Info */}
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex items-center space-x-1">
              <span className="text-green-400 text-sm font-semibold">{matchPercentage}% Match</span>
            </div>
            <span className="text-gray-300 text-sm">{featuredMovie.releaseDate?.split('-')[0]}</span>
            <span className="text-gray-300 text-sm border border-gray-600 px-1 text-xs">{rating}</span>
            <span className="text-gray-300 text-sm">{duration}</span>
            <span className="text-gray-300 text-sm border border-gray-600 px-1 text-xs">{quality}</span>
          </div>

          {/* Description */}
          <p className="text-gray-300 text-lg mb-6 line-clamp-3">
            {featuredMovie.overview}
          </p>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 bg-white text-black px-8 py-3 rounded-md font-semibold hover:bg-gray-200 transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
              <span>Play</span>
            </button>
            
            <button className="flex items-center space-x-2 bg-gray-600/80 text-white px-8 py-3 rounded-md font-semibold hover:bg-gray-600 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>More Info</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"></div>
    </div>
  );
};

export default MainContainer;
