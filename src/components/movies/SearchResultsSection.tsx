import { SearchResultListItem } from '@/components/movies/SearchResultListItem';
import { SearchEmptyState } from '@/components/movies/SearchEmptyState';
import { Skeleton } from '@/components/ui/skeleton';
import type { Movie } from '@/types/movie';

interface SearchResultsSectionProps {
  movies: Movie[];
  isLoading?: boolean;
  isError?: boolean;
}

function SearchResultSkeleton() {
  return (
    <article className="border-b border-divider py-6 md:py-8">
      <div className="flex items-start gap-4 md:gap-8">
        <Skeleton className="aspect-poster w-30 shrink-0 rounded-xl md:w-50" />
        <div className="flex min-w-0 flex-1 flex-col gap-3">
          <Skeleton className="h-6 w-3/4 max-w-xs md:h-8" />
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="mt-2 hidden h-11 w-230 rounded-full md:block" />
        </div>
        <Skeleton className="hidden h-11 w-11 shrink-0 rounded-full md:block" />
      </div>
    </article>
  );
}

export function SearchResultsSection({
  movies,
  isLoading,
  isError,
}: SearchResultsSectionProps) {
  const hasResults = movies.length > 0;

  return (
    <main className="flex min-h-0 w-full flex-1 flex-col bg-black pt-20 md:pt-24">
      <div className="container-page flex flex-1 flex-col max-md:max-w-page">
        {isLoading && (
          <div className="mt-4 md:mt-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <SearchResultSkeleton key={i} />
            ))}
          </div>
        )}

        {isError && (
          <p className="py-10 text-sm text-destructive md:py-16">
            Failed to load search results. Please try again later.
          </p>
        )}

        {!isLoading && !isError && !hasResults && <SearchEmptyState />}

        {!isLoading && !isError && hasResults && (
          <div className="mt-4 md:mt-6">
            {movies.map((movie) => (
              <SearchResultListItem key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
