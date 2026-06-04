import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FavoriteListItem } from '@/components/movies/FavoriteListItem';
import { Button } from '@/components/ui/button';
import { useMovieStore } from '@/store/movieStore';

export function FavoritesPage() {
  const favorites = useMovieStore((s) => s.favorites);

  return (
    <div className="min-h-[60vh] pt-20 md:pt-24">
      <div className="mx-auto w-full max-w-[393px] px-4 md:max-w-3xl md:px-8 lg:max-w-4xl lg:px-12">
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-foreground md:text-3xl"
        >
          Favorites
        </motion.h1>

        {favorites.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-muted-foreground">
              You haven&apos;t added any favorites yet.
            </p>
            <Button asChild variant="secondary" size="hero" className="mt-6 md:w-[230px]">
              <Link to="/">Browse Movies</Link>
            </Button>
          </div>
        ) : (
          <div className="mt-2 md:mt-4">
            {favorites.map((movie) => (
              <FavoriteListItem key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
