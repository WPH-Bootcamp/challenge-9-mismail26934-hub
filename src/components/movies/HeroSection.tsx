import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { PlayIcon } from '@/components/ui/PlayIcon';
import { Skeleton } from '@/components/ui/skeleton';
import { IMAGE_SIZES } from '@/lib/constants';
import { getImageUrl, getMovieTitle } from '@/lib/utils';
import type { Movie } from '@/types/movie';

interface HeroSectionProps {
  movie?: Movie;
  isLoading?: boolean;
}

function HeroActions({ movieId }: { movieId: number }) {
  return (
    <div className="flex w-full min-w-0 flex-col gap-2 md:max-w-none md:flex-row md:gap-3">
      <Button asChild variant="primary" size="hero">
        <Link to={`/movie/${movieId}`}>
          Watch Trailer
          <PlayIcon />
        </Link>
      </Button>
      <Button asChild variant="secondary" size="hero">
        <Link to={`/movie/${movieId}`}>See Detail</Link>
      </Button>
    </div>
  );
}

export function HeroSection({ movie, isLoading }: HeroSectionProps) {
  if (isLoading || !movie) {
    return (
      <section className="relative h-[345px] w-full overflow-hidden md:h-[520px] lg:h-[600px]">
        <Skeleton className="absolute inset-0 rounded-none" />
        <div className="relative mx-auto flex h-full w-full max-w-[393px] flex-col justify-end px-4 pb-8 pt-20 md:max-w-7xl md:px-8 md:pb-14 md:pt-24 lg:px-12">
          <Skeleton className="mb-3 h-8 w-3/4 max-w-lg" />
          <Skeleton className="mb-4 h-14 w-full max-w-xl" />
          <div className="flex w-full min-w-0 flex-col gap-2 md:max-w-none md:flex-row md:gap-3">
            <Skeleton className="h-11 w-full rounded-full md:h-[52px] md:w-[230px]" />
            <Skeleton className="h-11 w-full rounded-full md:h-[52px] md:w-[230px]" />
          </div>
        </div>
      </section>
    );
  }

  const title = getMovieTitle(movie);
  const backdrop = getImageUrl(movie.backdrop_path, IMAGE_SIZES.backdrop.large);

  return (
    <section className="relative h-[345px] w-full overflow-hidden md:h-[520px] lg:h-[600px]">
      <img src={backdrop} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="hero-gradient-side absolute inset-0 hidden md:block" />
      <div className="hero-gradient absolute inset-0" />

      <div className="relative mx-auto flex h-full w-full max-w-[393px] flex-col justify-end px-4 pb-8 pt-20 md:max-w-7xl md:px-8 md:pb-14 md:pt-24 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full min-w-0 max-w-2xl"
        >
          <h1 className="break-words text-2xl font-bold leading-tight text-foreground md:text-4xl lg:text-5xl">
            {title}
          </h1>

          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-foreground/90 md:line-clamp-4 md:text-base">
            {movie.overview}
          </p>

          <div className="mt-6">
            <HeroActions movieId={movie.id} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
