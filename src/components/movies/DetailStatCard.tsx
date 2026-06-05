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
        'box-border flex h-[88px] min-w-0 w-full flex-col items-center justify-center gap-1 rounded-xl border border-[#252B37] bg-black p-3 text-center md:h-[146px] md:max-w-[276px] md:gap-2 md:rounded-2xl md:p-5',
        className
      )}
    >
      <img
        src={iconSrc}
        alt={iconAlt}
        aria-hidden={!iconAlt}
        className={cn('h-5 w-5 shrink-0 object-contain md:h-6 md:w-6', iconClassName)}
      />
      <span className="text-xs font-medium leading-none text-[#fdfdfd] md:h-[30px] md:w-[236px] md:text-base md:font-normal md:leading-[30px] md:text-[#D5D7DA]">
        {label}
      </span>
      <p className="text-sm font-bold leading-none text-[#fdfdfd] md:h-[34px] md:w-[236px] md:text-xl md:font-semibold md:leading-[34px] md:text-[#FDFDFD]">
        {value}
      </p>
    </div>
  );
}
