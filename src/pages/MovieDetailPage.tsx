import { Link, useParams } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import starIcon from '@/assets/icon/star.svg';
import videoIcon from '@/assets/icon/video.svg';
import emojiHappyIcon from '@/assets/icon/emoji-happy.svg';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { FavoriteCircleButton } from '@/components/ui/FavoriteCircleButton';
import { PlayIcon } from '@/components/ui/PlayIcon';
import { Skeleton } from '@/components/ui/skeleton';
import { DetailStatCard } from '@/components/movies/DetailStatCard';
import { IMAGE_SIZES } from '@/lib/constants';
import { useMovieCredits, useMovieDetails, useMovieVideos } from '@/hooks/useMovies';
import {
  formatDetailDate,
  formatRating,
  getAgeLimitLabel,
  getImageUrl,
  getMovieReleaseDate,
  getMovieTitle,
} from '@/lib/utils';
import { useMovieStore } from '@/store/movieStore';

export function MovieDetailPage() {
  const { id } = useParams<{ id: string }>();
  const movieId = Number(id);
  const { addToFavorites, removeFromFavorites, isFavorite } = useMovieStore();
  const { data: movie, isLoading, isError } = useMovieDetails(movieId);
  const credits = useMovieCredits(movieId);
  const videos = useMovieVideos(movieId);

  const trailer = videos.data?.results?.find((v) => v.site === 'YouTube' && v.type === 'Trailer');

  if (isLoading) {
    return <DetailSkeleton />;
  }

  if (isError || !movie) {
    return (
      <div className="container-page py-20 pt-24 text-center">
        <p className="text-destructive">Failed to load movie details.</p>
        <Button asChild variant="secondary" className="mt-4">
          <Link to="/">Back to Home</Link>
        </Button>
      </div>
    );
  }

  const title = getMovieTitle(movie);
  const favorite = isFavorite(movie.id);
  const cast = credits.data?.cast?.slice(0, 10) ?? [];
  const releaseDate = getMovieReleaseDate(movie);
  const primaryGenre = movie.genres?.[0]?.name ?? '—';

  const handleFavoriteClick = () => {
    if (favorite) {
      removeFromFavorites(movie.id);
      return;
    }
    addToFavorites(movie);
  };

  return (
    <main className="w-full min-w-0 overflow-x-hidden pb-8">
      <section className="relative w-full min-w-0 overflow-hidden bg-black md:min-h-[480px]">
        <div className="absolute inset-0 w-full md:min-h-[480px]">
          <img
            src={getImageUrl(movie.backdrop_path, IMAGE_SIZES.backdrop.large)}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="hero-gradient absolute inset-0" />
          <div className="hero-gradient-side absolute inset-0 hidden md:block" />
        </div>

        <div className="container-page relative z-10 mx-auto max-md:max-w-[393px]">
          <div className="pb-2 pt-[calc(4rem+158px)] md:relative md:pb-10 md:pt-[322px]">
            <div className="flex flex-row items-start gap-4 md:gap-8">
              <motion.img
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                src={getImageUrl(movie.poster_path, IMAGE_SIZES.poster.large)}
                alt={title}
                className="aspect-[2/3] w-[120px] shrink-0 rounded-xl object-cover shadow-2xl md:w-[200px] md:object-cover lg:w-[240px]"
              />

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="min-w-0 flex-1 md:pt-0"
              >
                <h1 className="break-words text-base font-bold leading-tight text-[#fdfdfd] md:text-3xl md:leading-snug lg:text-4xl">
                  {title}
                </h1>

                <p className="mt-2 flex items-center gap-2 text-sm text-[#fdfdfd] md:mt-3 md:hidden">
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

                {movie.overview ? (
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#9CA3AF] md:hidden">
                    {movie.overview}
                  </p>
                ) : null}

                {releaseDate && (
                  <p className="mt-2 hidden items-center gap-2 text-sm text-muted-foreground md:flex">
                    <Calendar className="h-4 w-4 shrink-0" />
                    {formatDetailDate(releaseDate)}
                  </p>
                )}

                <div className="mt-5 hidden md:block">
                  <DetailActions
                    trailerKey={trailer?.key}
                    favorite={favorite}
                    onFavoriteClick={handleFavoriteClick}
                  />
                </div>

                <div className="mt-5 hidden md:grid md:grid-cols-3 md:justify-items-center md:gap-5">
                  <DetailStats
                    voteAverage={movie.vote_average}
                    genre={primaryGenre}
                    adult={movie.adult}
                  />
                </div>
              </motion.div>
            </div>

            <div className="mt-4 md:hidden">
              <DetailActions
                trailerKey={trailer?.key}
                favorite={favorite}
                onFavoriteClick={handleFavoriteClick}
              />
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2 md:hidden">
              <DetailStats
                voteAverage={movie.vote_average}
                genre={primaryGenre}
                adult={movie.adult}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="container-page min-w-0 pb-10 max-md:max-w-[393px]">
        <h2 className="text-xl font-bold text-foreground md:text-2xl">Overview</h2>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
          {movie.overview || 'No overview available.'}
        </p>

        {cast.length > 0 && (
          <>
            <h2 className="mt-10 text-xl font-bold text-foreground md:mt-14 md:text-2xl">
              Cast &amp; Crew
            </h2>
            <div className="mt-6 flex flex-col gap-5 md:grid md:grid-cols-2 md:gap-5 lg:grid-cols-3">
              {cast.map((member, i) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.03 }}
                  className="flex items-center gap-3"
                >
                  <img
                    src={getImageUrl(member.profile_path, IMAGE_SIZES.profile.medium)}
                    alt={member.name}
                    className="h-[72px] w-[48px] shrink-0 rounded-lg bg-muted object-cover"
                    loading="lazy"
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-bold leading-tight text-foreground">{member.name}</p>
                    <p className="mt-0.5 text-xs leading-snug text-muted-foreground">
                      {member.character}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  );
}

function DetailActions({
  trailerKey,
  favorite,
  onFavoriteClick,
}: {
  trailerKey?: string;
  favorite: boolean;
  onFavoriteClick: () => void;
}) {
  return (
    <div className="flex w-full items-center gap-3">
      {trailerKey ? (
        <Button
          asChild
          variant="primary"
          size="hero"
          className="min-w-0 flex-1 md:w-[230px] md:flex-none"
        >
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
      <FavoriteCircleButton favorited={favorite} onClick={onFavoriteClick} />
    </div>
  );
}

function DetailStats({
  voteAverage,
  genre,
  adult,
}: {
  voteAverage: number;
  genre: string;
  adult: boolean;
}) {
  return (
    <>
      <DetailStatCard iconSrc={starIcon} label="Rating" value={formatRating(voteAverage)} />
      <DetailStatCard iconSrc={videoIcon} label="Genre" value={genre} />
      <DetailStatCard iconSrc={emojiHappyIcon} label="Age Limit" value={getAgeLimitLabel(adult)} />
    </>
  );
}

function DetailSkeleton() {
  return (
    <main className="w-full min-w-0 overflow-x-hidden bg-black pb-8">
      <section className="relative w-full overflow-hidden md:min-h-[480px]">
        <Skeleton className="absolute inset-0 h-full min-h-[360px] rounded-none md:min-h-[480px]" />
        <div className="hero-gradient absolute inset-0" />
        <div className="container-page relative z-10 mx-auto max-md:max-w-[393px] md:pt-[322px]">
          <div className="flex flex-row gap-4 pb-2 pt-[calc(4rem+158px)] md:mt-0 md:pb-10 md:pt-0">
            <Skeleton className="aspect-[2/3] w-[120px] shrink-0 rounded-xl" />
            <div className="min-w-0 flex-1 space-y-3">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-4 w-20 md:hidden" />
              <Skeleton className="h-10 w-full md:hidden" />
              <Skeleton className="hidden h-4 w-32 md:block" />
            </div>
          </div>
          <div className="mt-4 flex gap-3 md:hidden">
            <Skeleton className="h-11 flex-1 rounded-full" />
            <Skeleton className="h-11 w-11 shrink-0 rounded-full" />
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2 md:hidden">
            <Skeleton className="h-[88px] w-full rounded-xl" />
            <Skeleton className="h-[88px] w-full rounded-xl" />
            <Skeleton className="h-[88px] w-full rounded-xl" />
          </div>
          <div className="mt-4 hidden md:grid md:grid-cols-3 md:justify-items-center md:gap-5">
            <Skeleton className="h-[146px] w-full max-w-[276px] rounded-2xl" />
            <Skeleton className="h-[146px] w-full max-w-[276px] rounded-2xl" />
            <Skeleton className="h-[146px] w-full max-w-[276px] rounded-2xl" />
          </div>
        </div>
      </section>
      <div className="container-page mx-auto max-md:max-w-[393px]">
        <Skeleton className="mt-8 h-6 w-32" />
        <Skeleton className="mt-4 h-24 w-full" />
        <Skeleton className="mt-10 h-6 w-36" />
        <div className="mt-6 space-y-5">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton className="h-[72px] w-[48px] shrink-0 rounded-lg" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-40" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
