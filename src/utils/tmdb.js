// TMDB API Configuration
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

// You'll need to replace this with your actual TMDB API key
const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY || 'dc10ea13c5611831023986dec7a9959b';

// API endpoints
export const TMDB_ENDPOINTS = {
  trending: '/trending/all/week',
  popularMovies: '/movie/popular',
  popularTV: '/tv/popular',
  topRated: '/movie/top_rated',
  upcoming: '/movie/upcoming',
  nowPlaying: '/movie/now_playing',
  search: '/search/multi',
  movieDetails: '/movie',
  tvDetails: '/tv',
  genreMovies: '/genre/movie/list',
  genreTV: '/genre/tv/list',
  discoverMovies: '/discover/movie',
  discoverTV: '/discover/tv'
};

// Image size configurations
export const IMAGE_SIZES = {
  poster: {
    small: 'w154',
    medium: 'w185',
    large: 'w342',
    xlarge: 'w500',
    xxlarge: 'w780'
  },
  backdrop: {
    small: 'w300',
    medium: 'w780',
    large: 'w1280',
    original: 'original'
  },
  profile: {
    small: 'w45',
    medium: 'w185',
    large: 'h632'
  }
};

// Helper function to build image URL
export const getImageUrl = (path, size = 'w500', type = 'poster') => {
  if (!path) return null;
  
  if (type === 'poster') {
    return `${TMDB_IMAGE_BASE_URL}/${IMAGE_SIZES.poster[size]}/${path}`;
  } else if (type === 'backdrop') {
    return `${TMDB_IMAGE_BASE_URL}/${IMAGE_SIZES.backdrop[size]}/${path}`;
  } else if (type === 'profile') {
    return `${TMDB_IMAGE_BASE_URL}/${IMAGE_SIZES.profile[size]}/${path}`;
  }
  
  return `${TMDB_IMAGE_BASE_URL}/original/${path}`;
};

// Helper function to make API requests
export const tmdbRequest = async (endpoint, params = {}) => {
  try {
    const url = new URL(`${TMDB_BASE_URL}${endpoint}`);
    url.searchParams.append('api_key', TMDB_API_KEY);
    url.searchParams.append('language', 'en-US');
    
    // Add additional parameters
    Object.keys(params).forEach(key => {
      url.searchParams.append(key, params[key]);
    });

    const response = await fetch(url.toString());
    
    if (!response.ok) {
      throw new Error(`TMDB API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('TMDB API request failed:', error);
    throw error;
  }
};

// API functions for different data types
export const tmdbAPI = {
  // Get trending content (movies + TV shows)
  getTrending: async (timeWindow = 'week') => {
    return await tmdbRequest(`/trending/all/${timeWindow}`);
  },

  // Get popular movies
  getPopularMovies: async (page = 1) => {
    return await tmdbRequest('/movie/popular', { page });
  },

  // Get popular TV shows
  getPopularTV: async (page = 1) => {
    return await tmdbRequest('/tv/popular', { page });
  },

  // Get top rated movies
  getTopRatedMovies: async (page = 1) => {
    return await tmdbRequest('/movie/top_rated', { page });
  },

  // Get upcoming movies
  getUpcomingMovies: async (page = 1) => {
    return await tmdbRequest('/movie/upcoming', { page });
  },

  // Get now playing movies
  getNowPlayingMovies: async (page = 1) => {
    return await tmdbRequest('/movie/now_playing', { page });
  },

  // Search for movies, TV shows, and people
  searchMulti: async (query, page = 1) => {
    return await tmdbRequest('/search/multi', { 
      query, 
      page,
      include_adult: false 
    });
  },

  // Get movies by genre
  getMoviesByGenre: async (genreId, page = 1) => {
    return await tmdbRequest('/discover/movie', {
      with_genres: genreId,
      page,
      sort_by: 'popularity.desc'
    });
  },

  // Get TV shows by genre
  getTVByGenre: async (genreId, page = 1) => {
    return await tmdbRequest('/discover/tv', {
      with_genres: genreId,
      page,
      sort_by: 'popularity.desc'
    });
  },

  // Get movie details
  getMovieDetails: async (movieId) => {
    return await tmdbRequest(`/movie/${movieId}`, {
      append_to_response: 'videos,credits,similar,recommendations'
    });
  },

  // Get TV show details
  getTVDetails: async (tvId) => {
    return await tmdbRequest(`/tv/${tvId}`, {
      append_to_response: 'videos,credits,similar,recommendations'
    });
  },

  // Get genres
  getGenres: async () => {
    const [movieGenres, tvGenres] = await Promise.all([
      tmdbRequest('/genre/movie/list'),
      tmdbRequest('/genre/tv/list')
    ]);
    
    return {
      movies: movieGenres.genres,
      tv: tvGenres.genres
    };
  }
};

// Transform TMDB data to our app format
export const transformMovieData = (tmdbData) => {
  if (!tmdbData || !tmdbData.results) return [];
  
  return tmdbData.results.map(item => ({
    id: item.id,
    title: item.title || item.name,
    type: item.media_type || (item.title ? 'movie' : 'tv'),
    image: getImageUrl(item.poster_path, 'large'),
    backdrop: getImageUrl(item.backdrop_path, 'large', 'backdrop'),
    rating: (item.vote_average / 2).toFixed(1), // Convert 10-scale to 5-scale
    voteCount: item.vote_count,
    overview: item.overview,
    releaseDate: item.release_date || item.first_air_date,
    genreIds: item.genre_ids || [],
    popularity: item.popularity
  }));
};

export default tmdbAPI;
