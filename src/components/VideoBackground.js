import React, { useState, useEffect, useRef } from 'react';
import useTMDB from '../hooks/useTMDB';

const VideoBackground = ({ movie }) => {
  const [videoUrl, setVideoUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef(null);
  const { getContentDetails } = useTMDB();

  useEffect(() => {
    const fetchMovieTrailer = async () => {
      if (!movie) return;
      
      try {
        setIsLoading(true);
        setVideoError(false);
        
        // Fetch movie details including videos
        const details = await getContentDetails(movie.id, movie.type);
        
        if (details && details.videos && details.videos.results) {
          // Find the official trailer or teaser
          const trailer = details.videos.results.find(
            video => video.type === 'Trailer' && video.site === 'YouTube'
          ) || details.videos.results.find(
            video => video.type === 'Teaser' && video.site === 'YouTube'
          ) || details.videos.results.find(
            video => video.site === 'YouTube'
          ) || details.videos.results[0];

          if (trailer && trailer.key) {
            // Create YouTube embed URL with autoplay and proper settings
            const youtubeUrl = `https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1&controls=0&loop=1&playlist=${trailer.key}&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&origin=${window.location.origin}`;
            setVideoUrl(youtubeUrl);
          } else {
            setVideoError(true);
          }
        } else {
          setVideoError(true);
        }
      } catch (error) {
        console.error('Error fetching movie trailer:', error);
        setVideoError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieTrailer();
  }, [movie, getContentDetails]);

  if (isLoading) {
    return (
      <div className="absolute inset-0 overflow-hidden">
        <div className="relative w-full h-full">
          <img
            src={movie?.backdrop || "https://via.placeholder.com/1920x1080/000000/666666?text=Loading..."}
            alt={movie?.title || "Loading..."}
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Video Background */}
      <div className="relative w-full h-full">
        {/* YouTube Video (if available) */}
        {videoUrl && !videoError ? (
          <iframe
            ref={videoRef}
            src={videoUrl}
            title={`${movie?.title} Trailer`}
            className="absolute top-0 left-0 w-full h-full object-cover"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          /* Fallback Image */
          <img
            src={movie?.backdrop || "https://via.placeholder.com/1920x1080/000000/666666?text=Netflix+Background"}
            alt={movie?.title || "Netflix Background"}
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        )}

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
        
        {/* Additional overlay for better text readability */}
        <div className="absolute inset-0 bg-black/20"></div>
      </div>
    </div>
  );
};

export default VideoBackground;
