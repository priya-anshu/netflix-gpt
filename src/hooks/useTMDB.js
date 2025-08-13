import { useState, useEffect, useCallback } from 'react';
import tmdbAPI, { transformMovieData } from '../utils/tmdb';

export const useTMDB = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState({
    trending: [],
    popularMovies: [],
    popularTV: [],
    topRated: [],
    upcoming: [],
    nowPlaying: []
  });

  // Fetch data with error handling
  const fetchData = useCallback(async (apiFunction, key, params = {}) => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await apiFunction(params);
      const transformedData = transformMovieData(result);
      
      setData(prev => ({
        ...prev,
        [key]: transformedData
      }));
      
      return transformedData;
    } catch (err) {
      setError(err.message);
      console.error(`Error fetching ${key}:`, err);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch all initial data
  const fetchAllData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const [
        trending,
        popularMovies,
        popularTV,
        topRated,
        upcoming,
        nowPlaying
      ] = await Promise.all([
        tmdbAPI.getTrending(),
        tmdbAPI.getPopularMovies(),
        tmdbAPI.getPopularTV(),
        tmdbAPI.getTopRatedMovies(),
        tmdbAPI.getUpcomingMovies(),
        tmdbAPI.getNowPlayingMovies()
      ]);

      setData({
        trending: transformMovieData(trending),
        popularMovies: transformMovieData(popularMovies),
        popularTV: transformMovieData(popularTV),
        topRated: transformMovieData(topRated),
        upcoming: transformMovieData(upcoming),
        nowPlaying: transformMovieData(nowPlaying)
      });
    } catch (err) {
      setError(err.message);
      console.error('Error fetching initial data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Search functionality
  const searchContent = useCallback(async (query, page = 1) => {
    if (!query.trim()) return [];
    
    try {
      setLoading(true);
      setError(null);
      
      const result = await tmdbAPI.searchMulti(query, page);
      return transformMovieData(result);
    } catch (err) {
      setError(err.message);
      console.error('Search error:', err);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  // Get content by genre
  const getContentByGenre = useCallback(async (genreId, type = 'movie', page = 1) => {
    try {
      setLoading(true);
      setError(null);
      
      const result = type === 'movie' 
        ? await tmdbAPI.getMoviesByGenre(genreId, page)
        : await tmdbAPI.getTVByGenre(genreId, page);
      
      return transformMovieData(result);
    } catch (err) {
      setError(err.message);
      console.error(`Error fetching ${type} by genre:`, err);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  // Get specific content details
  const getContentDetails = useCallback(async (id, type = 'movie') => {
    try {
      setLoading(true);
      setError(null);
      
      const result = type === 'movie' 
        ? await tmdbAPI.getMovieDetails(id)
        : await tmdbAPI.getTVDetails(id);
      
      return result;
    } catch (err) {
      setError(err.message);
      console.error(`Error fetching ${type} details:`, err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Load initial data on mount
  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  return {
    data,
    loading,
    error,
    fetchData,
    fetchAllData,
    searchContent,
    getContentByGenre,
    getContentDetails,
    refetch: fetchAllData
  };
};

export default useTMDB;
