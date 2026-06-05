import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { IMAGE_SIZES } from '@/lib/constants';
import { cn, formatRating, getImageUrl, getMovieTitle } from '@/lib/utils';
import type { Movie } from '@/types/movie';

interface MovieCardProps {
  movie: Movie;
  index?: number;
  rank?: number;
  variant?: 'carousel' | 'grid';
  /** Fade poster + metadata to black at bottom (New Release last row) */
  fadeBottom?: boolean;
}

export function MovieCard({
  movie,
  index = 0,
  rank,
  variant = 'carousel',
  fadeBottom = false,
}: MovieCardProps) {
  const title = getMovieTitle(movie);

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.35 }}
      className={cn(
        'group relative min-w-0',
        variant === 'grid' ? 'w-poster-card-release' : 'w-poster-card-trending'
      )}
    >
      <Link to={`/movie/${movie.id}`} className="relative block">
        <div className={cn('relative overflow-hidden bg-muted rounded-2xl')}>
          <img
            src={getImageUrl(movie.poster_path, IMAGE_SIZES.poster.medium)}
            alt={title}
            className={cn(
              'object-cover transition-transform duration-300 group-hover:scale-105',
              variant === 'grid' ? 'size-poster-card-release' : 'size-poster-card-trending'
            )}
            loading="lazy"
          />
          {rank !== undefined && (
            <span className="absolute left-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/50 text-xs font-bold text-white backdrop-blur-sm">
              {rank}
            </span>
          )}
          {variant === 'carousel' && (
            <div
              className="trending-poster-bottom-fade pointer-events-none absolute inset-x-0 bottom-0 top-1/2 rounded-b-2xl"
              aria-hidden
            />
          )}
        </div>
        <h3
          className={cn(
            'mt-2 font-bold leading-tight text-foreground',
            variant === 'carousel' ? 'line-clamp-1 text-sm' : 'line-clamp-2 text-sm'
          )}
        >
          {title}
        </h3>
        <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
          <Star className="h-3.5 w-3.5 fill-accent text-accent" />
          {formatRating(movie.vote_average)}
        </p>
        {fadeBottom && (
          <div
            className="new-release-card-fade pointer-events-none absolute inset-x-0 bottom-0 top-card-fade"
            aria-hidden
          />
        )}
      </Link>
    </motion.article>
  );
}
