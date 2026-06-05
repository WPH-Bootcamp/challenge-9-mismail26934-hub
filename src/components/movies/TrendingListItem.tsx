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

const overlayNavClass = 'trending-carousel-nav-btn border-0! shadow-none!';

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
    <section
      id={id}
      className="page-section max-md:overflow-x-hidden py-8 md:overflow-visible md:py-12"
    >
      <div className="page-inner">
        {isLoading && (
          <>
            {title && (
              <h2 className="mb-5 text-xl font-bold text-foreground md:mb-6 md:text-2xl">
                {title}
              </h2>
            )}
            <div className="trending-carousel-shell">
              <div className="trending-carousel-peek flex gap-poster overflow-hidden">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="size-poster-card-trending shrink-0 rounded-2xl" />
                ))}
              </div>
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
                    <CarouselPrevious className="h-10 w-10 rounded-lg" />
                    <CarouselNext className="h-10 w-10 rounded-lg" />
                  </div>
                )}
              </motion.div>
            )}

            <div className="trending-carousel-shell">
              <div className="trending-carousel-peek">
                <CarouselContent className="ml-0 gap-poster">
                  {movies.map((movie, index) => (
                    <CarouselItem key={movie.id} className="shrink-0 basis-auto pl-0">
                      <MovieCard movie={movie} index={index} rank={index + 1} variant="carousel" />
                    </CarouselItem>
                  ))}
                </CarouselContent>

                {isOverlayNav && (
                  <div aria-hidden className="trending-carousel-fade hidden md:block" />
                )}

                {isOverlayNav ? (
                  <CarouselNext
                    variant="ghost"
                    className={cn(overlayNavClass, 'trending-carousel-nav')}
                  />
                ) : (
                  <>
                    <CarouselPrevious
                      variant="ghost"
                      className={cn(
                        overlayNavClass,
                        'trending-carousel-nav left-0 right-auto hidden md:flex'
                      )}
                    />
                    <CarouselNext
                      variant="ghost"
                      className={cn(overlayNavClass, 'trending-carousel-nav')}
                    />
                  </>
                )}
              </div>
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

function getGridColumnCount() {
  if (window.matchMedia('(min-width: 1280px)').matches) return 5;
  if (window.matchMedia('(min-width: 1024px)').matches) return 4;
  if (window.matchMedia('(min-width: 48rem)').matches) return 3;
  return 2;
}

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
      <div className="container-page mx-auto w-full min-w-0 max-md:max-w-page">
        <motion.h2
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-5 text-xl font-bold text-foreground md:mb-6 md:text-2xl"
        >
          New Release
        </motion.h2>

        {isLoading && (
          <div className="grid grid-cols-2 gap-5 md:grid-cols-3 md:gap-4 lg:grid-cols-4 xl:grid-cols-5">
            {Array.from({ length: PAGE_SIZE }).map((_, i) => (
              <Skeleton key={i} className="aspect-poster w-full rounded-xl" />
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
            <div className="grid grid-cols-2 gap-5 md:grid-cols-3 md:gap-4 lg:grid-cols-4 xl:grid-cols-5">
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
                  onClick={() => setVisibleCount((c) => c + getGridColumnCount())}
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
