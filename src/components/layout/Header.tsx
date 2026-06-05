import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollLock } from '@/hooks/useScrollLock';
import { cn } from '@/lib/utils';
import { useMovieStore } from '@/store/movieStore';
import { BrandLogo } from '@/components/layout/BrandLogo';
import { SearchBar } from '@/components/layout/SearchBar';
import arrowSearchIcon from '@/assets/icon/arrow-search.svg';
import menuCloseIcon from '@/assets/icon/menu-close.svg';
import navbarSearchIcon from '@/assets/icon/navbar-search.svg';
import menuHamburgerIcon from '@/assets/icon/menu-hamburger.svg';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Favorites', to: '/favorites' },
] as const;

function Logo({ className }: { className?: string }) {
  return <BrandLogo className={className} compact />;
}

function FavoriteCountBadge({ count }: { count: number }) {
  if (count <= 0) return null;

  const display = count > 99 ? '99+' : String(count);

  return (
    <span
      className="inline-flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-primary px-1 text-xs font-semibold leading-none text-primary-foreground"
      aria-hidden
    >
      {display}
    </span>
  );
}

function NavLink({
  label,
  to,
  onClick,
  className,
  badgeCount,
}: {
  label: string;
  to: string;
  onClick?: () => void;
  className?: string;
  badgeCount?: number;
}) {
  const location = useLocation();
  const isHash = to.includes('#');
  const hash = isHash ? to.split('#')[1] : '';
  const isActive = isHash
    ? location.pathname === '/' && location.hash === `#${hash}`
    : location.pathname === to;

  const showBadge = badgeCount !== undefined && badgeCount > 0;

  return (
    <Link
      to={to}
      onClick={onClick}
      aria-label={showBadge ? `${label}, ${badgeCount} items` : undefined}
      className={cn(
        'inline-flex items-center gap-1.5 text-sm font-normal text-foreground transition-colors hover:text-foreground/80',
        isActive ? 'text-foreground' : 'text-foreground/90',
        className
      )}
    >
      {label}
      {badgeCount !== undefined ? <FavoriteCountBadge count={badgeCount} /> : null}
    </Link>
  );
}

function MobileMenuNavLink({
  label,
  to,
  onClick,
  badgeCount,
}: {
  label: string;
  to: string;
  onClick?: () => void;
  badgeCount?: number;
}) {
  const showBadge = badgeCount !== undefined && badgeCount > 0;

  return (
    <Link
      to={to}
      onClick={onClick}
      aria-label={showBadge ? `${label}, ${badgeCount} items` : undefined}
      className="inline-flex items-center gap-2 py-2 text-base font-normal leading-7.5 text-foreground transition-opacity hover:opacity-80"
    >
      {label}
      {badgeCount !== undefined ? <FavoriteCountBadge count={badgeCount} /> : null}
    </Link>
  );
}

const NAVBAR_BLUR = 'surface-glass-navbar';
const NAVBAR_BLACK = 'bg-background';

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') ?? '';
  const hasActiveSearch = Boolean(searchQuery.trim());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const favoriteCount = useMovieStore((s) => s.favorites.length);

  const showMobileSearch = searchOpen || hasActiveSearch;
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
    setMobileMenuOpen(false);
    if (!hasActiveSearch) {
      setSearchOpen(false);
    }
  }, [location.pathname, location.search, hasActiveSearch]);

  useScrollLock(mobileMenuOpen);

  const handleSearch = (query: string) => {
    navigate(`/?q=${encodeURIComponent(query)}`);
    setMobileMenuOpen(false);
  };

  const closeMobileSearch = () => {
    if (hasActiveSearch && location.pathname === '/') {
      navigate('/');
      return;
    }
    setSearchOpen(false);
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
          : mobileMenuOpen || showMobileSearch
            ? NAVBAR_BLACK
            : 'bg-transparent'
      )}
    >
      {/* Mobile */}
      {!mobileMenuOpen && (
        <div
          className={cn(
            'mx-auto flex h-16 w-full min-w-0 max-w-page items-center px-4 md:hidden',
            showMobileSearch ? 'gap-4' : 'justify-between'
          )}
        >
          {showMobileSearch ? (
            <>
              <button
                type="button"
                onClick={closeMobileSearch}
                className="flex h-6 w-6 shrink-0 items-center justify-center transition-opacity hover:opacity-80"
                aria-label="Close search"
              >
                <img
                  src={arrowSearchIcon}
                  alt=""
                  aria-hidden
                  width={24}
                  height={24}
                  className="h-6 w-6"
                />
              </button>
              <SearchBar
                size="small"
                defaultQuery={searchQuery}
                onSubmit={handleSearch}
                onClear={handleClearSearch}
                autoFocus={searchOpen && !hasActiveSearch}
                className="min-w-0 flex-1"
              />
            </>
          ) : (
            <>
              <Logo className="gap-1" />
              <div className="flex shrink-0 items-center gap-6">
                <button
                  type="button"
                  onClick={() => {
                    setSearchOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="flex h-6 w-6 items-center justify-center transition-opacity hover:opacity-80"
                  aria-label="Search"
                  aria-expanded={showMobileSearch}
                >
                  <img
                    src={navbarSearchIcon}
                    alt=""
                    aria-hidden
                    width={24}
                    height={24}
                    className="h-6 w-6"
                  />
                </button>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(true)}
                  className="flex h-6 w-6 items-center justify-center transition-opacity hover:opacity-80"
                  aria-label="Menu"
                  aria-expanded={mobileMenuOpen}
                >
                  <img
                    src={menuHamburgerIcon}
                    alt=""
                    aria-hidden
                    width={24}
                    height={24}
                    className="h-6 w-6"
                  />
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* Desktop — aligned with page container (Figma 22419:2721) */}
      <div className="container-page hidden h-18 items-center justify-between gap-8 md:flex">
        <div className="flex min-w-0 items-center gap-10">
          <BrandLogo />
          <nav className="flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.label}
                label={link.label}
                to={link.to}
                badgeCount={link.to === '/favorites' ? favoriteCount : undefined}
              />
            ))}
          </nav>
        </div>
        <SearchBar
          defaultQuery={searchQuery}
          onSubmit={handleSearch}
          onClear={handleClearSearch}
          className="w-full max-w-80 shrink-0"
        />
      </div>

      {/* Mobile menu — full screen per Figma 22424:6780 */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex flex-col overflow-hidden overscroll-none bg-black md:hidden"
          >
            <div className="mx-auto flex h-16 w-full min-w-0 max-w-page shrink-0 items-center justify-between px-4">
              <Logo className="gap-1" />
              <button
                type="button"
                onClick={closeMobile}
                className="flex h-6 w-6 items-center justify-center transition-opacity hover:opacity-80"
                aria-label="Close menu"
              >
                <img
                  src={menuCloseIcon}
                  alt=""
                  aria-hidden
                  width={24}
                  height={24}
                  className="h-6 w-6"
                />
              </button>
            </div>
            <nav className="mx-auto flex w-full max-w-page flex-col gap-4 px-4 pt-6">
              {navLinks.map((link) => (
                <MobileMenuNavLink
                  key={link.label}
                  label={link.label}
                  to={link.to}
                  onClick={closeMobile}
                  badgeCount={link.to === '/favorites' ? favoriteCount : undefined}
                />
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
