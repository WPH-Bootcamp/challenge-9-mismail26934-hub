import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { MovieCard } from '@/components/movies/MovieCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import type { Movie } from '@/types/movie';

const INITIAL_ROWS = 3;
const DESKTOP_COLUMNS = 5;
const PAGE_SIZE = INITIAL_ROWS * DESKTOP_COLUMNS;

const GRID_COLUMN_BREAKPOINTS = [
  { query: '(min-width: 1280px)', columns: 5 },
  { query: '(min-width: 1024px)', columns: 4 },
  { query: '(min-width: 48rem)', columns: 3 },
] as const;

function useGridColumnCount() {
  const [columns, setColumns] = useState(2);

  useEffect(() => {
    const mediaQueries = GRID_COLUMN_BREAKPOINTS.map(({ query, columns: cols }) => ({
      mql: window.matchMedia(query),
      columns: cols,
    }));

    const update = () => {
      const matched = mediaQueries.find(({ mql }) => mql.matches);
      setColumns(matched?.columns ?? 2);
    };

    update();
    mediaQueries.forEach(({ mql }) => mql.addEventListener('change', update));
    return () => mediaQueries.forEach(({ mql }) => mql.removeEventListener('change', update));
  }, []);

  return columns;
}

function isLastGridRow(index: number, total: number, columns: number) {
  const remainder = total % columns;
  const lastRowSize = remainder === 0 ? columns : remainder;
  return index >= total - lastRowSize;
}

interface NewReleaseSectionProps {
  movies: Movie[];
  isLoading?: boolean;
  isError?: boolean;
}

export function NewReleaseSection({ movies, isLoading, isError }: NewReleaseSectionProps) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const columnCount = useGridColumnCount();
  const visibleMovies = movies.slice(0, visibleCount);
  const hasMore = visibleCount < movies.length;
  const showGradient = isLoading || (!isError && movies.length > 0);
  const sectionRef = useRef<HTMLElement>(null);
  const gridAreaRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!showGradient) return;

    const section = sectionRef.current;
    const gridArea = gridAreaRef.current;
    if (!section || !gridArea) return;

    const updateFadeTop = () => {
      const sectionRect = section.getBoundingClientRect();
      const gridRect = gridArea.getBoundingClientRect();
      const gridBottom = gridRect.bottom - sectionRect.top;
      const itemCount = isLoading ? PAGE_SIZE : visibleMovies.length;
      const rows = Math.max(1, Math.ceil(itemCount / columnCount));
      const lastRowHeight = gridRect.height / rows;
      const fadeTop = Math.max(0, gridBottom - lastRowHeight);

      section.style.setProperty('--new-release-fade-top', `${fadeTop}px`);
    };

    updateFadeTop();

    const observer = new ResizeObserver(updateFadeTop);
    observer.observe(gridArea);
    observer.observe(section);
    window.addEventListener('resize', updateFadeTop);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateFadeTop);
    };
  }, [showGradient, isLoading, visibleMovies.length, columnCount]);

  return (
    <section
      ref={sectionRef}
      id="new-release"
      className="page-section relative overflow-hidden bg-black py-8 max-md:pb-0 md:py-12 md:pb-0"
    >
      <div className="page-inner relative min-w-0">
        <motion.h2
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative z-20 mb-5 text-xl font-bold text-foreground md:mb-6 md:text-2xl"
        >
          New Release
        </motion.h2>

        <div ref={gridAreaRef} className="min-w-0 w-full">
          {isLoading && (
            <div className="grid-poster-release">
              {Array.from({ length: PAGE_SIZE }).map((_, i) => (
                <Skeleton key={i} className="size-poster-card-release rounded-2xl" />
              ))}
            </div>
          )}

          {isError && (
            <p className="text-sm text-destructive">
              Failed to load movies. Please try again later.
            </p>
          )}

          {!isLoading && !isError && movies.length === 0 && (
            <p className="text-sm text-muted-foreground">No movies found.</p>
          )}

          {!isLoading && !isError && movies.length > 0 && (
            <div className="grid-poster-release">
              {visibleMovies.map((movie, index) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  index={index}
                  variant="grid"
                  fadeBottom={
                    showGradient && isLastGridRow(index, visibleMovies.length, columnCount)
                  }
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {hasMore && !isLoading && !isError && movies.length > 0 && (
        <div className="new-release-load-more">
          <Button
            type="button"
            variant="loadMore"
            size="loadMore"
            onClick={() => setVisibleCount((c) => c + columnCount)}
          >
            Load More
          </Button>
        </div>
      )}

      {showGradient && <div className="new-release-bottom-fade pointer-events-none" aria-hidden />}
    </section>
  );
}
