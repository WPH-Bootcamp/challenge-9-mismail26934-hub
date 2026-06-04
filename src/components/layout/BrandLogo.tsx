import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import movieLogo from '@/assets/images/movie-logo.png';

interface BrandLogoProps {
  className?: string;
  /** Skala teks/logo di navbar mobile */
  compact?: boolean;
}

export function BrandLogo({ className, compact }: BrandLogoProps) {
  return (
    <Link
      to="/"
      aria-label="Movie Explorer home"
      className={cn('inline-flex shrink-0 items-center', compact ? 'gap-1' : 'gap-2', className)}
    >
      <img
        src={movieLogo}
        alt=""
        aria-hidden
        width={compact ? 28 : 34}
        height={compact ? 28 : 32}
        className={cn('shrink-0', compact ? 'h-7 w-7' : 'h-8 w-[34px]')}
      />
      <span
        className={cn(
          'font-[Poppins] font-semibold text-[#FDFDFD]',
          compact
            ? 'text-[19.911px] leading-[24.889px] tracking-[-0.7964px]'
            : 'text-[28.4444px] leading-9 tracking-[-0.04em]'
        )}
      >
        Movie
      </span>
    </Link>
  );
}
