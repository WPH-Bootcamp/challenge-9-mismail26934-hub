import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { IMAGE_SIZES } from '@/lib/constants';
import type { Movie } from '@/types/movie';

// Utility function for merging Tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getImageUrl(
  path: string | null | undefined,
  size: string = IMAGE_SIZES.poster.medium
): string {
  if (!path) {
    return '/placeholder-poster.svg';
  }
  const base = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;
  return `${base}/${size}${path}`;
}

export function getMovieTitle(movie: Movie): string {
  return movie.title ?? movie.name ?? 'Untitled';
}

export function getMovieReleaseDate(movie: Movie): string {
  return movie.release_date ?? movie.first_air_date ?? '';
}

export function filterMovies(items: Movie[]): Movie[] {
  return items.filter((item) => item.media_type === 'movie' || (!item.media_type && !!item.title));
}
