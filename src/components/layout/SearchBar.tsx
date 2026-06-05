import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import searchIcon from '@/assets/icon/search.svg';
import searchCloseIcon from '@/assets/icon/search-close.svg';
import searchCloseSmIcon from '@/assets/icon/search-close-sm.svg';

const searchSchema = z.object({
  query: z.string().min(1, 'Enter a movie title').max(100),
});

export type SearchFormValues = z.infer<typeof searchSchema>;

export type SearchBarSize = 'large' | 'small';

interface SearchBarProps {
  defaultQuery?: string;
  onSubmit: (query: string) => void;
  onClear?: () => void;
  autoFocus?: boolean;
  size?: SearchBarSize;
  className?: string;
  inputClassName?: string;
}

const sizeStyles = {
  large: {
    container: 'gap-2 rounded-2xl px-4 py-2',
    searchIcon: 'h-6 w-6',
    searchIconSize: 24,
    input: 'text-base leading-7.5',
    close: 'h-5 w-5',
    closeIcon: searchCloseIcon,
    closeSize: 20,
  },
  small: {
    container: 'h-11 gap-1 rounded-xl px-4 py-2',
    searchIcon: 'h-5 w-5',
    searchIconSize: 20,
    input: 'text-sm leading-7',
    close: 'h-4 w-4',
    closeIcon: searchCloseSmIcon,
    closeSize: 16,
  },
} as const;

const containerBase = 'surface-glass flex w-full items-center border border-border';

const inputBase =
  'h-auto min-h-0 flex-1 border-0 bg-transparent p-0 font-normal text-foreground shadow-none placeholder:text-neutral-500 focus-visible:ring-0 focus-visible:ring-offset-0 [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden';

export function SearchBar({
  defaultQuery = '',
  onSubmit,
  onClear,
  autoFocus,
  size = 'large',
  className,
  inputClassName,
}: SearchBarProps) {
  const styles = sizeStyles[size];
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

  const hasQuery = Boolean(query?.trim());

  return (
    <div className={cn('w-full', className)}>
      <form onSubmit={submit} className={cn(containerBase, styles.container)}>
        <button
          type="submit"
          className={cn(
            'flex shrink-0 items-center justify-center transition-opacity hover:opacity-80',
            styles.searchIcon
          )}
          aria-label="Search"
        >
          <img
            src={searchIcon}
            alt=""
            aria-hidden
            width={styles.searchIconSize}
            height={styles.searchIconSize}
            className={styles.searchIcon}
          />
        </button>
        <Input
          {...register('query')}
          type="search"
          enterKeyHint="search"
          placeholder="Search Movie"
          autoFocus={autoFocus}
          autoComplete="off"
          className={cn(inputBase, styles.input, inputClassName)}
        />
        {hasQuery && (
          <button
            type="button"
            onClick={handleClear}
            className={cn(
              'flex shrink-0 items-center justify-center transition-opacity hover:opacity-80',
              styles.close
            )}
            aria-label="Clear search"
          >
            <img
              src={styles.closeIcon}
              alt=""
              aria-hidden
              width={styles.closeSize}
              height={styles.closeSize}
              className={styles.close}
            />
          </button>
        )}
      </form>
      {errors.query && (
        <p className="mt-1.5 text-xs text-destructive" role="alert">
          {errors.query.message}
        </p>
      )}
    </div>
  );
}
