import { HeroSection } from '@/components/movies/HeroSection';
import { useNowPlayingMovies, usePopularMovies } from '@/hooks/useMovies';

export function HomePage() {
  const nowPlayingQuery = useNowPlayingMovies();
  const popularQuery = usePopularMovies();

  const heroMovie = nowPlayingQuery.data?.results?.[0] ?? popularQuery.data?.results?.[0];
  const isLoading = nowPlayingQuery.isLoading || popularQuery.isLoading;

  return (
    <main className="overflow-x-hidden">
      <HeroSection movie={heroMovie} isLoading={isLoading} />
    </main>
  );
}
