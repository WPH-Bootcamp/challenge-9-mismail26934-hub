import { motion } from 'framer-motion';
import dataNotFoundIcon from '@/assets/icon/data-not-found.svg';

export function SearchEmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-1 flex-col items-center justify-center px-4 py-10 text-center md:py-16"
      role="status"
    >
      <img
        src={dataNotFoundIcon}
        alt=""
        aria-hidden
        width={200}
        height={200}
        className="mb-6 h-[160px] w-[160px] md:mb-8 md:h-[200px] md:w-[200px]"
      />

      <h2 className="text-xl font-bold text-[#fdfdfd] md:text-2xl">Data Not Found</h2>

      <p className="mt-2 text-sm leading-relaxed text-[#9CA3AF] md:text-base">
        Try other keywords
      </p>
    </motion.div>
  );
}
