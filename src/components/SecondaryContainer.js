import React from 'react';
import MovieList from './MovieList';
import useTMDB from '../hooks/useTMDB';

const SecondaryContainer = () => {
  const { data, loading } = useTMDB();

  if (loading) {
    return (
      <div className="bg-black min-h-screen pt-16">
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600"></div>
        </div>
      </div>
    );
  }

  const categories = [
    { title: 'Trending Now', movies: data.trending },
    { title: 'Popular Movies', movies: data.popularMovies },
    { title: 'Popular TV Shows', movies: data.popularTV },
    { title: 'Top Rated', movies: data.topRated },
    { title: 'Upcoming', movies: data.upcoming },
    { title: 'Now Playing', movies: data.nowPlaying }
  ];

  return (
    <div className="bg-black pt-16">
      <div className="space-y-8 pb-20">
        {categories.map((category, index) => (
          <div key={index} className="px-8">
            <h2 className="text-white text-xl font-semibold mb-4">
              {category.title}
            </h2>
            <MovieList movies={category.movies} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SecondaryContainer;
