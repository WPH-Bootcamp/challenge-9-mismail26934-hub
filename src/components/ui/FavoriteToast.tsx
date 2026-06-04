import { useEffect } from 'react';
import { Check } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useFavoriteToastStore } from '@/store/favoriteToastStore';

const TOAST_DURATION_MS = 3000;

export function FavoriteToast() {
  const open = useFavoriteToastStore((s) => s.open);
  const hide = useFavoriteToastStore((s) => s.hide);

  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(hide, TOAST_DURATION_MS);
    return () => window.clearTimeout(timer);
  }, [open, hide]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
          className="pointer-events-none fixed left-1/2 top-[114px] z-[60] box-border flex h-[52px] w-[531px] max-w-[calc(100vw-2rem)] -translate-x-1/2 flex-row items-center justify-center gap-3 rounded-2xl bg-[rgba(0,0,0,0.25)] px-6 py-0 backdrop-blur-[20px]"
          role="status"
          aria-live="polite"
        >
          <span
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white"
            aria-hidden
          >
            <Check className="h-4 w-4 text-black" strokeWidth={3} />
          </span>
          <span className="whitespace-nowrap text-sm font-medium text-white">
            Success Add to Favorites
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
