import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { FavoriteCircleButton } from '@/components/ui/FavoriteCircleButton';
import { PlayIcon } from '@/components/ui/PlayIcon';
import { IMAGE_SIZES } from '@/lib/constants';
import { useMovieVideos } from '@/hooks/useMovies';
import { formatRating, getImageUrl, getMovieTitle } from '@/lib/utils';
import { useMovieStore } from '@/store/movieStore';
import type { Movie } from '@/types/movie';
import starIcon from '@/assets/icon/star.svg';

interface SearchResultListItemProps {
  movie: Movie;
}

export function SearchResultListItem({ movie }: SearchResultListItemProps) {
  const { toggleFavorite, isFavorite } = useMovieStore();
  const videos = useMovieVideos(movie.id);
  const title = getMovieTitle(movie);
  const favorited = isFavorite(movie.id);

  const trailer = videos.data?.results?.find((v) => v.site === 'YouTube' && v.type === 'Trailer');

  return (
    <article className="border-b border-divider py-6 last:border-b-0 md:py-8">
      <div className="flex items-start gap-4 md:gap-8">
        <Link
          to={`/movie/${movie.id}`}
          className="block shrink-0 overflow-hidden rounded-xl md:rounded-2xl"
        >
          <img
            src={getImageUrl(movie.poster_path, IMAGE_SIZES.poster.medium)}
            alt={title}
            className="aspect-poster w-30 object-contain md:w-50"
          />
        </Link>

        <div className="flex min-w-0 flex-1 items-start md:gap-126">
          <div className="flex min-w-0 flex-1 flex-col">
            <Link to={`/movie/${movie.id}`} className="w-fit">
              <h3 className="text-base font-bold leading-tight text-foreground md:text-2xl md:leading-tight">
                {title}
              </h3>
            </Link>

            <p className="mt-2 flex items-center gap-2 text-sm text-foreground md:mt-3 md:text-base">
              <img
                src={starIcon}
                alt=""
                aria-hidden
                width={20}
                height={20}
                className="h-5 w-5 shrink-0"
              />
              {formatRating(movie.vote_average)}
            </p>

            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-body-muted md:mt-3 md:text-base md:leading-7">
              {movie.overview}
            </p>

            {trailer && (
              <Button
                asChild
                variant="primary"
                size="hero"
                className="mt-4 hidden md:mt-6 md:inline-flex md:w-230"
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

          <FavoriteCircleButton
            favorited={favorited}
            onClick={() => toggleFavorite(movie)}
            className="hidden md:flex"
          />
        </div>
      </div>

      <div className="mt-4 flex items-center gap-4 md:hidden">
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
        <FavoriteCircleButton favorited={favorited} onClick={() => toggleFavorite(movie)} />
      </div>
    </article>
  );
}
