import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { PlayIcon } from '@/components/ui/PlayIcon';
import { Skeleton } from '@/components/ui/skeleton';
import { IMAGE_SIZES } from '@/lib/constants';
import { getImageUrl, getMovieTitle } from '@/lib/utils';
import type { Movie } from '@/types/movie';
import { useMovieVideos } from '@/hooks/useMovies';

interface HeroSectionProps {
  movie?: Movie;
  isLoading?: boolean;
}

function HeroActions({ movieId, trailerKey }: { movieId: number; trailerKey?: string }) {
  return (
    <div className="flex w-full min-w-0 flex-col gap-2 md:max-w-none md:flex-row md:gap-3">
      {trailerKey ? (
        <Button asChild variant="primary" size="hero">
          <a
            href={`https://www.youtube.com/watch?v=${trailerKey}`}
            target="_blank"
            rel="noreferrer"
          >
            Watch Trailer
            <PlayIcon />
          </a>
        </Button>
      ) : null}
      <Button asChild variant="secondary" size="hero">
        <Link to={`/movie/${movieId}`}>See Detail</Link>
      </Button>
    </div>
  );
}

export function HeroSection({ movie, isLoading }: HeroSectionProps) {
  const videos = useMovieVideos(movie?.id ?? 0);
  const trailerKey = videos.data?.results?.find(
    (v) => v.site === 'YouTube' && v.type === 'Trailer'
  )?.key;

  if (isLoading || !movie) {
    return (
      <section className="relative h-[345px] w-full min-w-0 overflow-hidden md:h-[520px] lg:h-[600px]">
        <Skeleton className="absolute inset-0 rounded-none" />
        <div className="container-page relative mx-auto flex h-full flex-col justify-end pb-8 pt-20 max-md:max-w-[393px] md:pb-14 md:pt-24">
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
    <section className="relative h-[345px] w-full min-w-0 overflow-hidden md:h-[520px] lg:h-[600px]">
      <img src={backdrop} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="hero-gradient-side absolute inset-0 hidden md:block" />
      <div className="hero-gradient absolute inset-0" />

      <div className="container-page relative mx-auto flex h-full flex-col justify-end pb-8 pt-20 max-md:max-w-[393px] md:pb-14 md:pt-24">
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
            <HeroActions movieId={movie.id} trailerKey={trailerKey} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
