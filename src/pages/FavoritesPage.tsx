import { motion } from 'framer-motion';
import { FavoriteListItem } from '@/components/movies/FavoriteListItem';
import { FavoritesEmptyState } from '@/components/movies/FavoritesEmptyState';
import { useMovieStore } from '@/store/movieStore';

export function FavoritesPage() {
  const favorites = useMovieStore((s) => s.favorites);

  return (
    <main className="flex min-h-0 w-full flex-1 flex-col bg-black pt-20 md:pt-24">
      <div className="container-page flex flex-1 flex-col max-md:max-w-page">
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-foreground md:text-3xl"
        >
          Favorites
        </motion.h1>

        {favorites.length === 0 ? (
          <FavoritesEmptyState />
        ) : (
          <div className="mt-4 md:mt-6">
            {favorites.map((movie) => (
              <FavoriteListItem key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
