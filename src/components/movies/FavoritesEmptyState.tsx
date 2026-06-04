import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import emptyClapperboard from '@/assets/icon/empty-clapperboard.svg';

export function FavoritesEmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-1 flex-col items-center justify-center px-4 py-10 text-center md:py-16"
    >
      <img
        src={emptyClapperboard}
        alt=""
        aria-hidden
        width={160}
        height={160}
        className="mb-6 h-[120px] w-[120px] md:mb-8 md:h-[160px] md:w-[160px]"
      />

      <h2 className="text-xl font-bold text-[#fdfdfd] md:text-2xl">Data Empty</h2>

      <p className="mt-2 max-w-sm text-sm leading-relaxed text-[#9CA3AF] md:text-base">
        You don&apos;t have a favorite movie yet
      </p>

      <Button
        asChild
        variant="primary"
        size="hero"
        className="mt-6 w-full md:mt-8 md:w-auto md:min-w-[280px] md:px-12"
      >
        <Link to="/">Explore Movie</Link>
      </Button>
    </motion.div>
  );
}
