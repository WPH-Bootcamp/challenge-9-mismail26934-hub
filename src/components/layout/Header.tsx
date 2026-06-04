import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { BrandLogo } from '@/components/layout/BrandLogo';
import { SearchBar } from '@/components/layout/SearchBar';
import searchIcon from '@/assets/images/search.png';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Favorites', to: '/favorites' },
] as const;

function Logo({ className }: { className?: string }) {
  return <BrandLogo className={className} compact />;
}

function NavLink({
  label,
  to,
  onClick,
  className,
}: {
  label: string;
  to: string;
  onClick?: () => void;
  className?: string;
}) {
  const location = useLocation();
  const isHash = to.includes('#');
  const hash = isHash ? to.split('#')[1] : '';
  const isActive = isHash
    ? location.pathname === '/' && location.hash === `#${hash}`
    : location.pathname === to;

  return (
    <Link
      to={to}
      onClick={onClick}
      className={cn(
        'text-sm font-normal text-foreground transition-colors hover:text-foreground/80',
        isActive ? 'text-foreground' : 'text-foreground/90',
        className
      )}
    >
      {label}
    </Link>
  );
}

const NAVBAR_BLUR = 'navbar-blur';
const NAVBAR_BLACK = 'bg-[var(--color-background)]';

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') ?? '';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const showNavbarBlur = scrolled;

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [location.pathname]);

  useEffect(() => {
    setScrolled(window.scrollY > 8);
  }, [location.pathname]);

  useEffect(() => {
    setSearchOpen(false);
    setMobileMenuOpen(false);
  }, [location.pathname, location.search]);

  const handleSearch = (query: string) => {
    navigate(`/?q=${encodeURIComponent(query)}`);
    setSearchOpen(false);
    setMobileMenuOpen(false);
  };

  const handleClearSearch = () => {
    if (location.pathname === '/' && searchQuery) {
      navigate('/');
    }
  };

  const closeMobile = () => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
  };

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 w-full transition-colors duration-300',
        showNavbarBlur
          ? NAVBAR_BLUR
          : mobileMenuOpen || searchOpen
            ? NAVBAR_BLACK
            : 'bg-transparent'
      )}
    >
      {/* Mobile */}
      <div className="mx-auto flex h-14 w-full min-w-0 max-w-[393px] items-center justify-between gap-4 md:hidden">
        <Logo />

        <div className="flex items-center gap-1">
          {!mobileMenuOpen && (
            <button
              type="button"
              onClick={() => {
                setSearchOpen((open) => !open);
                setMobileMenuOpen(false);
              }}
              className={cn(
                'flex h-10 w-10 items-center justify-center rounded-full transition-colors',
                searchOpen ? 'bg-white/10' : 'hover:bg-white/5'
              )}
              aria-label="Search"
              aria-expanded={searchOpen}
            >
              <img src={searchIcon} alt="" aria-hidden width={20} height={20} className="h-5 w-5" />
            </button>
          )}
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen((open) => !open);
              setSearchOpen(false);
            }}
            className="flex h-10 w-10 items-center justify-center rounded-full text-foreground hover:bg-white/5"
            aria-label="Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Desktop */}
      <div className="mx-auto hidden h-[72px] max-w-7xl items-center gap-10 px-8 md:flex lg:px-12">
        <Logo />
        <nav className="flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink key={link.label} label={link.label} to={link.to} />
          ))}
        </nav>
        <SearchBar
          defaultQuery={searchQuery}
          onSubmit={handleSearch}
          onClear={handleClearSearch}
          className="ml-auto max-w-[320px]"
        />
      </div>

      {/* Mobile search */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={cn(
              'mx-auto w-full min-w-0 max-w-[393px] overflow-hidden border-t border-white/5 px-4 pb-4 pt-3 md:hidden',
              NAVBAR_BLACK
            )}
          >
            <SearchBar
              defaultQuery={searchQuery}
              onSubmit={handleSearch}
              onClear={handleClearSearch}
              autoFocus
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 md:hidden"
              aria-label="Close menu"
              onClick={closeMobile}
            />
            <motion.nav
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className={cn('relative z-50 border-t border-white/5 md:hidden', NAVBAR_BLACK)}
            >
              <div className="mx-auto flex w-full max-w-[393px] flex-col gap-1 px-4 py-4">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.label}
                    label={link.label}
                    to={link.to}
                    onClick={closeMobile}
                    className="rounded-lg px-3 py-2.5"
                  />
                ))}
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
