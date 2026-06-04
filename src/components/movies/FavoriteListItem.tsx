import { Link } from 'react-router-dom';
import { Heart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PlayIcon } from '@/components/ui/PlayIcon';
import { IMAGE_SIZES } from '@/lib/constants';
import { useMovieVideos } from '@/hooks/useMovies';
import { formatRating, getImageUrl, getMovieTitle } from '@/lib/utils';
import { useMovieStore } from '@/store/movieStore';
import type { Movie } from '@/types/movie';

interface FavoriteListItemProps {
  movie: Movie;
}

export function FavoriteListItem({ movie }: FavoriteListItemProps) {
  const { removeFromFavorites } = useMovieStore();
  const videos = useMovieVideos(movie.id);
  const title = getMovieTitle(movie);

  const trailer = videos.data?.results?.find((v) => v.site === 'YouTube' && v.type === 'Trailer');

  return (
    <article className="flex gap-4 border-b border-border py-6 last:border-b-0 md:gap-6">
      <Link to={`/movie/${movie.id}`} className="shrink-0 overflow-hidden rounded-xl">
        <img
          src={getImageUrl(movie.poster_path, IMAGE_SIZES.poster.medium)}
          alt={title}
          className="h-[140px] w-[95px] object-cover md:h-[160px] md:w-[108px]"
        />
      </Link>

      <div className="flex min-w-0 flex-1 gap-3">
        <div className="min-w-0 flex-1">
          <Link to={`/movie/${movie.id}`}>
            <h3 className="text-base font-bold leading-tight text-foreground md:text-lg">
              {title}
            </h3>
          </Link>

          <p className="mt-1.5 flex items-center gap-1.5 text-sm text-foreground">
            <Star className="h-3.5 w-3.5 fill-accent text-accent" />
            {formatRating(movie.vote_average)}
          </p>

          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
            {movie.overview}
          </p>

          {trailer && (
            <Button asChild variant="primary" size="hero" className="mt-4 md:mt-5 md:w-[230px]">
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
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#181D27] bg-[rgba(10,13,18,0.6)] backdrop-blur-[20px] transition-colors hover:bg-[rgba(10,13,18,0.8)]"
          aria-label="Remove from favorites"
        >
          <Heart className="h-5 w-5 fill-primary text-primary" />
        </button>
      </div>
    </article>
  );
}
