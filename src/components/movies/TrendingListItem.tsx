import { useState } from 'react';
import { motion } from 'framer-motion';
import { MovieCard } from '@/components/movies/MovieCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import type { Movie } from '@/types/movie';

const overlayNavClass =
  'absolute z-10 flex h-9 w-9 items-center justify-center rounded-full border-0 bg-black/60 p-0 text-white shadow-none backdrop-blur-md hover:bg-black/75 disabled:pointer-events-none disabled:opacity-0 md:h-10 md:w-10';

interface TrendingListItemProps {
  id?: string;
  title: string;
  subtitle?: string;
  movies: Movie[];
  isLoading?: boolean;
  isError?: boolean;
  /** overlay = panah di atas carousel (Trending); header = panah di samping judul */
  carouselNav?: 'overlay' | 'header';
}

export function TrendingListItem({
  id,
  title,
  subtitle,
  movies,
  isLoading,
  isError,
  carouselNav = 'overlay',
}: TrendingListItemProps) {
  const isOverlayNav = carouselNav === 'overlay';

  return (
    <section id={id} className="overflow-x-hidden py-8 md:py-12">
      <div className="container-page mx-auto w-full min-w-0 max-md:max-w-[393px]">
        {isLoading && (
          <>
            {title && (
              <h2 className="mb-5 text-xl font-bold text-foreground md:mb-6 md:text-2xl">
                {title}
              </h2>
            )}
            <div className="grid grid-cols-2 gap-4 md:flex md:overflow-hidden">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton
                  key={i}
                  className="aspect-[2/3] w-full rounded-xl md:h-[240px] md:w-[180px] md:shrink-0 md:aspect-auto lg:w-[200px]"
                />
              ))}
            </div>
          </>
        )}

        {isError && (
          <p className="text-sm text-destructive">Failed to load movies. Please try again later.</p>
        )}

        {!isLoading && !isError && movies.length === 0 && (
          <p className="text-sm text-muted-foreground">No movies found.</p>
        )}

        {!isLoading && !isError && movies.length > 0 && (
          <Carousel
            opts={{
              align: 'start',
              dragFree: true,
              containScroll: 'trimSnaps',
            }}
            className="w-full"
          >
            {(title || subtitle) && (
              <motion.div
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={cn(
                  'mb-5 md:mb-6',
                  !isOverlayNav && 'flex items-end justify-between gap-4'
                )}
              >
                <div>
                  {title && (
                    <h2 className="text-xl font-bold text-foreground md:text-2xl">{title}</h2>
                  )}
                  {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
                </div>
                {!isOverlayNav && (
                  <div className="flex shrink-0 gap-2">
                    <CarouselPrevious />
                    <CarouselNext />
                  </div>
                )}
              </motion.div>
            )}

            <div className={cn('relative min-w-0 overflow-hidden', isOverlayNav && 'md:-mr-4')}>
              <CarouselContent className="-ml-4">
                {movies.map((movie, index) => (
                  <CarouselItem
                    key={movie.id}
                    className="basis-1/2 pl-4 md:basis-[180px] lg:basis-[200px]"
                  >
                    <MovieCard movie={movie} index={index} rank={index + 1} variant="carousel" />
                  </CarouselItem>
                ))}
              </CarouselContent>

              {isOverlayNav && (
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 right-0 z-[5] w-16 bg-gradient-to-l from-background via-background/80 to-transparent sm:w-20 md:w-24"
                />
              )}

              {isOverlayNav ? (
                <CarouselNext
                  variant="ghost"
                  className={cn(
                    overlayNavClass,
                    'right-0 top-[6.75rem] -translate-y-1/2 md:top-[7.25rem] md:right-4'
                  )}
                />
              ) : (
                <>
                  <CarouselPrevious
                    variant="ghost"
                    className={cn(
                      overlayNavClass,
                      'left-0 top-[6.75rem] -translate-y-1/2 md:top-[7.25rem] hidden md:flex'
                    )}
                  />
                  <CarouselNext
                    variant="ghost"
                    className={cn(
                      overlayNavClass,
                      'right-0 top-[6.75rem] -translate-y-1/2 md:top-[7.25rem] md:right-4'
                    )}
                  />
                </>
              )}
            </div>
          </Carousel>
        )}
      </div>
    </section>
  );
}

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

  return (
    <section id="new-release" className="overflow-x-hidden py-8 md:py-12">
      <div className="container-page mx-auto w-full min-w-0 max-md:max-w-[393px]">
        <motion.h2
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-5 text-xl font-bold text-foreground md:mb-6 md:text-2xl"
        >
          New Release
        </motion.h2>

        {isLoading && (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 lg:gap-5">
            {Array.from({ length: PAGE_SIZE }).map((_, i) => (
              <Skeleton key={i} className="aspect-[2/3] w-full rounded-xl" />
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

            {hasMore && (
              <div className="mt-8 flex justify-center md:mt-10">
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
          </>
        )}
      </div>
    </section>
  );
}
