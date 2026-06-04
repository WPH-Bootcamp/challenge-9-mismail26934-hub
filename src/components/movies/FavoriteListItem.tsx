import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PlayIcon } from '@/components/ui/PlayIcon';
import { IMAGE_SIZES } from '@/lib/constants';
import { useMovieVideos } from '@/hooks/useMovies';
import { formatRating, getImageUrl, getMovieTitle } from '@/lib/utils';
import { useMovieStore } from '@/store/movieStore';
import type { Movie } from '@/types/movie';
import starIcon from '@/assets/icon/star.svg';

interface FavoriteListItemProps {
  movie: Movie;
}

export function FavoriteListItem({ movie }: FavoriteListItemProps) {
  const { removeFromFavorites } = useMovieStore();
  const videos = useMovieVideos(movie.id);
  const title = getMovieTitle(movie);

  const trailer = videos.data?.results?.find((v) => v.site === 'YouTube' && v.type === 'Trailer');

  return (
    <article className="border-b border-[#181D27] py-6 last:border-b-0 md:py-8">
      <div className="flex items-start gap-4 md:gap-8">
        <Link
          to={`/movie/${movie.id}`}
          className="block shrink-0 overflow-hidden rounded-xl md:rounded-2xl"
        >
          <img
            src={getImageUrl(movie.poster_path, IMAGE_SIZES.poster.medium)}
            alt={title}
            className="aspect-[2/3] w-[120px] object-contain md:w-[200px]"
          />
        </Link>

        <div className="flex min-w-0 flex-1 flex-col">
          <Link to={`/movie/${movie.id}`} className="w-fit">
            <h3 className="text-base font-bold leading-tight text-[#fdfdfd] md:text-2xl md:leading-tight">
              {title}
            </h3>
          </Link>

          <p className="mt-2 flex items-center gap-2 text-sm text-[#fdfdfd] md:mt-3 md:text-base">
            <img src={starIcon} alt="" aria-hidden width={20} height={20} className="h-5 w-5 shrink-0" />
            {formatRating(movie.vote_average)}
          </p>

          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#9CA3AF] md:mt-3 md:text-base md:leading-7">
            {movie.overview}
          </p>

          {trailer && (
            <Button
              asChild
              variant="primary"
              size="hero"
              className="mt-4 hidden md:mt-6 md:inline-flex md:w-[230px]"
            >
              <a
                href={`https://www.youtube.com/watch?v=${trailer.key}`}
                target="_blank"
                rel="noreferrer"
              >
                Watch Trailer
                <PlayIcon />
              </a>
            </Button>
          )}
        </div>

        <button
          type="button"
          onClick={() => removeFromFavorites(movie.id)}
          className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#181D27] bg-[rgba(10,13,18,0.6)] backdrop-blur-[20px] transition-colors hover:bg-[rgba(10,13,18,0.8)] md:flex md:h-11 md:w-11"
          aria-label="Remove from favorites"
        >
          <Heart className="h-5 w-5 fill-primary text-primary" />
        </button>
      </div>

      <div className="mt-4 flex items-center gap-3 md:hidden">
        {trailer ? (
          <Button asChild variant="primary" size="hero" className="min-w-0 flex-1">
            <a
              href={`https://www.youtube.com/watch?v=${trailer.key}`}
              target="_blank"
              rel="noreferrer"
            >
              Watch Trailer
              <PlayIcon />
            </a>
          </Button>
        ) : (
          <div className="min-w-0 flex-1" />
        )}
        <button
          type="button"
          onClick={() => removeFromFavorites(movie.id)}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#181D27] bg-[rgba(10,13,18,0.6)] backdrop-blur-[20px] transition-colors hover:bg-[rgba(10,13,18,0.8)]"
          aria-label="Remove from favorites"
        >
          <Heart className="h-5 w-5 fill-primary text-primary" />
        </button>
      </div>
    </article>
  );
}
