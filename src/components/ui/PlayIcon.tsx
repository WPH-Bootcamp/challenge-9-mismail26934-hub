import { cn } from '@/lib/utils';

interface PlayIconProps {
  className?: string;
}

export function PlayIcon({ className }: PlayIconProps) {
  return (
    <span
      className={cn(
        'flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white md:h-8 md:w-8',
        className
      )}
      aria-hidden
    >
      <svg
        viewBox="0 0 24 24"
        className="ml-0.5 h-3.5 w-3.5 fill-primary md:h-4 md:w-4"
      >
        <path d="M8 5.14v13.72L19 12 8 5.14z" />
      </svg>
    </span>
  );
}
