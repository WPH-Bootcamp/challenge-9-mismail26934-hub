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
        'box-border flex h-[146px] w-full max-w-[276px] flex-col items-center justify-center gap-2 rounded-2xl border border-[#252B37] bg-black p-5 text-center',
        className
      )}
    >
      <img
        src={iconSrc}
        alt={iconAlt}
        aria-hidden={!iconAlt}
        className={cn('h-6 w-6 shrink-0 object-contain', iconClassName)}
      />
      <span className="text-sm font-medium leading-none text-[#fdfdfd]">{label}</span>
      <p className="text-base font-bold leading-none text-[#fdfdfd]">{value}</p>
    </div>
  );
}
