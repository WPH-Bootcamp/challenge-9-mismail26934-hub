// Constants untuk aplikasi

// TODO: Define constants yang digunakan di seluruh aplikasi

export const IMAGE_SIZES = {
  poster: {
    small: 'w185',
    medium: 'w342',
    large: 'w500',
    original: 'original',
  },
  backdrop: {
    small: 'w300',
    medium: 'w780',
    large: 'w1280',
    original: 'original',
  },
  profile: {
    small: 'w45',
    medium: 'w185',
    large: 'h632',
    original: 'original',
  },
} as const;

// TODO: Add more constants as needed
// Examples: API endpoints, query keys, storage keys, etc.

export const STORAGE_KEYS = {
  favorites: 'movie-favorites',
  watchlist: 'movie-watchlist',
} as const;

export const QUERY_KEYS = {
  movies: {
    trending: (window: string, page: number) =>
      ['movies', 'trending', window, page] as const,
    popular: (page: number) => ['movies', 'popular', page] as const,
    nowPlaying: (page: number) => ['movies', 'now-playing', page] as const,
    details: (id: number) => ['movie', id] as const,
    credits: (id: number) => ['movie', id, 'credits'] as const,
    videos: (id: number) => ['movie', id, 'videos'] as const,
    search: (query: string, page: number) => ['movies', 'search', query, page] as const,
  },
} as const;
