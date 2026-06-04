import { useMemo } from 'react';
import { HeroSection } from '@/components/movies/HeroSection';
import { TrendingListItem } from '@/components/movies/TrendingListItem';
import {
  useNowPlayingMovies,
  usePopularMovies,
  useTrendingMovies,
} from '@/hooks/useMovies';
import { filterMovies } from '@/lib/utils';

export function HomePage() {
  const trending = useTrendingMovies('week');
  const nowPlayingQuery = useNowPlayingMovies();
  const popularQuery = usePopularMovies();

  const trendingMovies = useMemo(
    () => filterMovies(trending.data?.results ?? []),
    [trending.data]
  );

  const heroMovie =
    popularQuery.data?.results?.[0] ??
    trendingMovies[0] ??
    nowPlayingQuery.data?.results?.[0];
  const isLoading =
    nowPlayingQuery.isLoading ||
    popularQuery.isLoading ||
    trending.isLoading;

  return (
    <main className="w-full min-w-0 overflow-x-hidden">
      <HeroSection movie={heroMovie} isLoading={isLoading} />

      <TrendingListItem
        id="trending"
        title="Trending Now"
        movies={trendingMovies}
        isLoading={trending.isLoading}
        isError={trending.isError}
      />
    </main>
  );
}
