import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FavoriteCircleButtonProps {
  favorited: boolean;
  onClick: () => void;
  className?: string;
  'aria-label'?: string;
}

export function FavoriteCircleButton({
  favorited,
  onClick,
  className,
  'aria-label': ariaLabel = favorited ? 'Remove from favorites' : 'Add to favorites',
}: FavoriteCircleButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#252B37] bg-black transition-colors hover:bg-white/5 md:h-[52px] md:w-[52px]',
        className
      )}
      aria-label={ariaLabel}
    >
      <Heart
        className={cn(
          'h-5 w-5 md:h-6 md:w-6',
          favorited ? 'fill-[#961200] text-[#961200]' : 'text-[#fdfdfd]'
        )}
      />
    </button>
  );
}
