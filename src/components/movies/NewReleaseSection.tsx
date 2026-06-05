import { useState } from 'react';
import { motion } from 'framer-motion';
import { MovieCard } from '@/components/movies/MovieCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import type { Movie } from '@/types/movie';

const INITIAL_ROWS = 3;
const DESKTOP_COLUMNS = 5;
const PAGE_SIZE = INITIAL_ROWS * DESKTOP_COLUMNS;

interface NewReleaseSectionProps {
  movies: Movie[];
  isLoading?: boolean;
  isError?: boolean;
}

export function NewReleaseSection({ movies, isLoading, isError }: NewReleaseSectionProps) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const visibleMovies = movies.slice(0, visibleCount);
  const hasMore = visibleCount < movies.length;
  const showGradient = isLoading || (!isError && movies.length > 0);

  return (
    <section
      id="new-release"
      className="relative overflow-hidden bg-black py-8 max-md:pb-0 md:py-12 md:pb-0"
    >
      <div className="container-page relative mx-auto w-full min-w-0 max-md:max-w-page">
        <motion.h2
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative z-20 mb-5 text-xl font-bold text-foreground md:mb-6 md:text-2xl"
        >
          New Release
        </motion.h2>

        {isLoading && (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 lg:gap-5">
            {Array.from({ length: PAGE_SIZE }).map((_, i) => (
              <Skeleton key={i} className="aspect-poster w-full rounded-2xl" />
            ))}
          </div>
        )}

        {isError && (
          <p className="text-sm text-destructive">Failed to load movies. Please try again later.</p>
        )}

        {!isLoading && !isError && movies.length === 0 && (
          <p className="text-sm text-muted-foreground">No movies found.</p>
        )}

        {!isLoading && !isError && movies.length > 0 && (
          <>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 lg:gap-5">
              {visibleMovies.map((movie, index) => (
                <MovieCard key={movie.id} movie={movie} index={index} variant="grid" />
              ))}
            </div>
          </>
        )}
      </div>

      {hasMore && !isLoading && !isError && movies.length > 0 && (
        <div className="new-release-load-more">
          <Button
            type="button"
            variant="loadMore"
            size="loadMore"
            onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
          >
            Load More
          </Button>
        </div>
      )}

      {showGradient && <div className="new-release-bottom-fade pointer-events-none" aria-hidden />}
    </section>
  );
}
