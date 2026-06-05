import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { HeroSection } from '@/components/movies/HeroSection';
import { TrendingListItem } from '@/components/movies/TrendingListItem';
import { NewReleaseSection } from '@/components/movies/NewReleaseSection';
import { SearchResultsSection } from '@/components/movies/SearchResultsSection';
import {
  useNowPlayingMovies,
  usePopularMovies,
  useSearchMovies,
  useTrendingMovies,
} from '@/hooks/useMovies';
import { filterMovies } from '@/lib/utils';

export function HomePage() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') ?? '';

  const trending = useTrendingMovies('week');
  const nowPlayingPage1 = useNowPlayingMovies(1);
  const nowPlayingPage2 = useNowPlayingMovies(2);
  const popular = usePopularMovies();
  const search = useSearchMovies(searchQuery);

  const trendingMovies = useMemo(
    () => filterMovies(trending.data?.results ?? []),
    [trending.data]
  );

  const newReleaseMovies = useMemo(
    () => [
      ...(nowPlayingPage1.data?.results ?? []),
      ...(nowPlayingPage2.data?.results ?? []),
    ],
    [nowPlayingPage1.data, nowPlayingPage2.data]
  );

  const searchResults = useMemo(
    () => filterMovies(search.data?.results ?? []),
    [search.data]
  );

  const heroMovie =
    popular.data?.results?.[0] ??
    trendingMovies[0] ??
    newReleaseMovies[0];

  const isSearching = searchQuery.trim().length > 0;

  if (isSearching) {
    return (
      <SearchResultsSection
        movies={searchResults}
        isLoading={search.isLoading}
        isError={search.isError}
      />
    );
  }

  return (
    <main className="min-w-0 overflow-x-hidden">
      <HeroSection movie={heroMovie} isLoading={popular.isLoading} />

      <TrendingListItem
        id="trending"
        title="Trending Now"
        movies={trendingMovies}
        isLoading={trending.isLoading}
        isError={trending.isError}
      />

      <NewReleaseSection
        movies={newReleaseMovies}
        isLoading={nowPlayingPage1.isLoading}
        isError={nowPlayingPage1.isError || nowPlayingPage2.isError}
      />
    </main>
  );
}
