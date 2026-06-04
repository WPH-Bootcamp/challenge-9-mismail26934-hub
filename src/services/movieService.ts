import api from '@/lib/axios';
import type { Movie, MovieResponse, VideosResponse } from '@/types/movie';

// TODO: Create service functions to fetch data from TMDB API
// Reference: https://developer.themoviedb.org/reference/intro/getting-started

export const movieService = {
  async getPopularMovies(page = 1): Promise<MovieResponse<Movie>> {
    const { data } = await api.get<MovieResponse<Movie>>('/movie/popular', {
      params: { page },
    });
    return data;
  },

  async getNowPlayingMovies(page = 1): Promise<MovieResponse<Movie>> {
    const { data } = await api.get<MovieResponse<Movie>>('/movie/now_playing', {
      params: { page },
    });
    return data;
  },

  async getMovieDetails(movieId: number): Promise<Movie> {
    const { data } = await api.get<Movie>(`/movie/${movieId}`);
    return data;
  },

  async searchMovies(query: string, page = 1): Promise<MovieResponse<Movie>> {
    const { data } = await api.get<MovieResponse<Movie>>('/search/movie', {
      params: { query, page },
    });
    return data;
  },

  async getMovieVideos(id: number): Promise<VideosResponse> {
    const { data } = await api.get<VideosResponse>(`/movie/${id}/videos`);
    return data;
  },
};
