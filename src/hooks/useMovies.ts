import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/lib/constants';
import { movieService } from '@/services/movieService';

export const useTrendingMovies = (
  timeWindow: 'day' | 'week' = 'week',
  page = 1
) =>
  useQuery({
    queryKey: QUERY_KEYS.movies.trending(timeWindow, page),
    queryFn: () => movieService.getTrending(timeWindow, page),
    staleTime: 1000 * 60 * 5,
  });

export const usePopularMovies = (page = 1) => {
  return useQuery({
    queryKey: QUERY_KEYS.movies.popular(page),
    queryFn: () => movieService.getPopularMovies(page),
  });
};

export const useNowPlayingMovies = (page = 1) => {
  return useQuery({
    queryKey: QUERY_KEYS.movies.nowPlaying(page),
    queryFn: () => movieService.getNowPlayingMovies(page),
  });
};

export const useMovieDetails = (id: number) =>
  useQuery({
    queryKey: QUERY_KEYS.movies.details(id),
    queryFn: () => movieService.getMovieDetails(id),
    enabled: id > 0,
  });

export const useMovieCredits = (id: number) =>
  useQuery({
    queryKey: QUERY_KEYS.movies.credits(id),
    queryFn: () => movieService.getMovieCredits(id),
    enabled: id > 0,
  });

export const useMovieVideos = (id: number) =>
  useQuery({
    queryKey: QUERY_KEYS.movies.videos(id),
    queryFn: () => movieService.getMovieVideos(id),
    enabled: id > 0,
  });

export const useSearchMovies = (query: string, page = 1) =>
  useQuery({
    queryKey: QUERY_KEYS.movies.search(query, page),
    queryFn: () => movieService.searchMovies(query, page),
    enabled: query.trim().length > 0,
  });
