import { motion } from 'framer-motion';

interface SearchEmptyStateProps {
  query: string;
}

export function SearchEmptyState({ query }: SearchEmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="flex min-h-[50vh] flex-1 flex-col items-center justify-center py-16 text-center md:min-h-[55vh] md:py-24"
      role="status"
    >
      <p className="text-xl font-bold text-[#fdfdfd] md:text-2xl">No movies found</p>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-[#9CA3AF] md:text-base">
        We couldn&apos;t find any results for &ldquo;{query}&rdquo;. Try a different title or
        check your spelling.
      </p>
    </motion.div>
  );
}
