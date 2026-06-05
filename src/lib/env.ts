/** TMDB public endpoints — safe to hardcode as fallbacks when env is unset on Vercel. */
export const TMDB_BASE_URL =
  import.meta.env.VITE_TMDB_BASE_URL ?? 'https://api.themoviedb.org/3';

export const TMDB_IMAGE_BASE_URL =
  import.meta.env.VITE_TMDB_IMAGE_BASE_URL ?? 'https://image.tmdb.org/t/p';

export const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY ?? '';

export const isTmdbConfigured = Boolean(TMDB_API_KEY);
