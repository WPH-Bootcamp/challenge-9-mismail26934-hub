import { cn } from '@/lib/utils';

interface DetailStatCardProps {
  iconSrc: string;
  iconAlt?: string;
  label: string;
  value: string;
  iconClassName?: string;
  className?: string;
}

export function DetailStatCard({
  iconSrc,
  iconAlt = '',
  label,
  value,
  iconClassName,
  className,
}: DetailStatCardProps) {
  return (
    <div
      className={cn(
        'flex min-w-0 flex-1 flex-col items-center gap-1.5 rounded-xl border border-[#181D27] bg-black px-2 py-3 text-center',
        'md:items-center md:gap-2 md:px-4 md:py-3 md:text-left md:bg-[rgba(10,13,18,0.6)] md:backdrop-blur-[20px]',
        className
      )}
    >
      <img
        src={iconSrc}
        alt={iconAlt}
        aria-hidden={!iconAlt}
        className={cn('h-5.5 w-5.5 md:h-7.25 md:w-7.25 shrink-0 object-contain', iconClassName)}
      />
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <p className="text-sm font-bold text-foreground">{value}</p>
    </div>
  );
}
