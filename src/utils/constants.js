// Netflix-style categories and configuration
export const NETFLIX_CATEGORIES = [
  { id: 'trending', title: 'Trending Now', type: 'all' },
  { id: 'popularMovies', title: 'Popular Movies', type: 'movie' },
  { id: 'popularTV', title: 'Popular TV Shows', type: 'tv' },
  { id: 'topRated', title: 'Top Rated', type: 'movie' },
  { id: 'upcoming', title: 'Upcoming', type: 'movie' },
  { id: 'nowPlaying', title: 'Now Playing', type: 'movie' }
];

// Netflix-style genres
export const NETFLIX_GENRES = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentary' },
  { id: 18, name: 'Drama' },
  { id: 10751, name: 'Family' },
  { id: 14, name: 'Fantasy' },
  { id: 36, name: 'History' },
  { id: 27, name: 'Horror' },
  { id: 10402, name: 'Music' },
  { id: 9648, name: 'Mystery' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Science Fiction' },
  { id: 10770, name: 'TV Movie' },
  { id: 53, name: 'Thriller' },
  { id: 10752, name: 'War' },
  { id: 37, name: 'Western' }
];

// Netflix-style content ratings
export const CONTENT_RATINGS = [
  'TV-Y',
  'TV-Y7',
  'TV-G',
  'TV-PG',
  'TV-14',
  'TV-MA',
  'G',
  'PG',
  'PG-13',
  'R',
  'NC-17'
];

// Netflix-style match percentages (for demo purposes)
export const getRandomMatchPercentage = () => {
  const percentages = [95, 96, 97, 98, 99];
  return percentages[Math.floor(Math.random() * percentages.length)];
};

// Netflix-style content duration (for demo purposes)
export const getRandomDuration = () => {
  const durations = ['1h 30m', '1h 45m', '2h 15m', '2h 30m', '1h 55m'];
  return durations[Math.floor(Math.random() * durations.length)];
};

// Netflix-style quality indicators
export const QUALITY_INDICATORS = ['HD', '4K', 'HDR', 'Dolby Vision'];

// Netflix-style navigation items
export const NAVIGATION_ITEMS = [
  { name: 'Home', href: '#' },
  { name: 'TV Shows', href: '#' },
  { name: 'Movies', href: '#' },
  { name: 'New & Popular', href: '#' },
  { name: 'My List', href: '#' },
  { name: 'Browse by Languages', href: '#' }
];
