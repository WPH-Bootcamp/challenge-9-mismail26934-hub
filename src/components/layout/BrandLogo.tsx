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
      className={cn('inline-flex shrink-0 items-center gap-2', className)}
    >
      <img
        src={movieLogo}
        alt=""
        aria-hidden
        width={34}
        height={32}
        className={cn('shrink-0', compact ? 'h-7 w-[29px]' : 'h-8 w-[34px]')}
      />
      <span
        className={cn(
          'font-[Poppins] font-semibold tracking-[-0.04em] text-[#FDFDFD]',
          compact ? 'text-xl leading-7' : 'text-[28.4444px] leading-9'
        )}
      >
        Movie
      </span>
    </Link>
  );
}
