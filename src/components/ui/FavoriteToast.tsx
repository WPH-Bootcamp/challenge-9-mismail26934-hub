import { Check } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

interface FavoriteToastProps {
  open: boolean;
}

export function FavoriteToast({ open }: FavoriteToastProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
          className="pointer-events-none fixed left-1/2 top-20 z-[60] flex -translate-x-1/2 items-center gap-2 rounded-full border border-[#181D27] bg-[rgba(10,13,18,0.6)] px-4 py-2.5 text-sm font-medium text-foreground backdrop-blur-[20px] md:top-24"
          role="status"
          aria-live="polite"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-foreground/10">
            <Check className="h-4 w-4" />
          </span>
          Success Add to Favorites
        </motion.div>
      )}
    </AnimatePresence>
  );
}
