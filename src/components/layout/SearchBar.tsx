import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import searchIcon from '@/assets/images/search.png';

const searchSchema = z.object({
  query: z.string().min(1, 'Enter a movie title').max(100),
});

export type SearchFormValues = z.infer<typeof searchSchema>;

interface SearchBarProps {
  defaultQuery?: string;
  onSubmit: (query: string) => void;
  onClear?: () => void;
  autoFocus?: boolean;
  className?: string;
  inputClassName?: string;
}

const inputStyles =
  'h-11 rounded-full border-0 bg-[#1e2130] pl-11 pr-10 text-sm font-normal text-foreground placeholder:text-[#8e919f] focus-visible:ring-2 focus-visible:ring-[#961200]/40 focus-visible:ring-offset-0';

export function SearchBar({
  defaultQuery = '',
  onSubmit,
  onClear,
  autoFocus,
  className,
  inputClassName,
}: SearchBarProps) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<SearchFormValues>({
    resolver: zodResolver(searchSchema),
    defaultValues: { query: defaultQuery },
  });

  const query = watch('query');

  useEffect(() => {
    reset({ query: defaultQuery });
  }, [defaultQuery, reset]);

  const submit = handleSubmit((data) => onSubmit(data.query.trim()));

  const handleClear = () => {
    reset({ query: '' });
    onClear?.();
  };

  return (
    <form onSubmit={submit} className={cn('relative w-full', className)}>
      <img
        src={searchIcon}
        alt=""
        aria-hidden
        width={20}
        height={20}
        className="pointer-events-none absolute left-4 top-1/2 z-10 h-5 w-5 -translate-y-1/2"
      />
      <Input
        {...register('query')}
        type="search"
        enterKeyHint="search"
        placeholder="Search Movie"
        autoFocus={autoFocus}
        autoComplete="off"
        className={cn(inputStyles, inputClassName)}
      />
      {query?.trim() && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-3 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-[#8e919f] transition-colors hover:bg-white/10 hover:text-foreground"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </button>
      )}
      {errors.query && (
        <p className="mt-1.5 text-xs text-destructive" role="alert">
          {errors.query.message}
        </p>
      )}
    </form>
  );
}
