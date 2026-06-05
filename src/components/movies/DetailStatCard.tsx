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
        'surface-outline box-border flex h-22 min-w-0 w-full flex-col items-center justify-center gap-1 rounded-xl p-3 text-center md:h-146 md:max-w-276 md:gap-2 md:rounded-2xl md:p-5',
        className
      )}
    >
      <img
        src={iconSrc}
        alt={iconAlt}
        aria-hidden={!iconAlt}
        className={cn('h-5 w-5 shrink-0 object-contain md:h-6 md:w-6', iconClassName)}
      />
      <span className="text-xs font-medium leading-none text-foreground md:text-base md:font-normal md:leading-7.5 md:text-neutral-300">
        {label}
      </span>
      <p className="text-sm font-bold leading-none text-foreground md:text-xl md:font-semibold md:leading-8.5">
        {value}
      </p>
    </div>
  );
}
