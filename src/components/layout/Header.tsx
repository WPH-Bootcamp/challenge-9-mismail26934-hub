import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { BrandLogo } from '@/components/layout/BrandLogo';
import { SearchBar } from '@/components/layout/SearchBar';
import arrowLeftIcon from '@/assets/icon/arrow-left.svg';
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

function MobileMenuNavLink({
  label,
  to,
  onClick,
}: {
  label: string;
  to: string;
  onClick?: () => void;
}) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="p-2 text-base font-normal leading-[30px] text-white transition-opacity hover:opacity-80"
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

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileMenuOpen]);

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
      {!mobileMenuOpen && (
        <div
          className={cn(
            'mx-auto flex h-16 w-full min-w-0 max-w-[393px] items-center px-4 md:hidden',
            searchOpen ? 'gap-4' : 'justify-between'
          )}
        >
          {searchOpen ? (
            <>
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="flex h-6 w-6 shrink-0 items-center justify-center transition-opacity hover:opacity-80"
                aria-label="Close search"
              >
                <img
                  src={arrowLeftIcon}
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
                autoFocus
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
                  aria-expanded={searchOpen}
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
      <div className="container-page hidden h-[72px] items-center justify-between gap-8 md:flex">
        <div className="flex min-w-0 items-center gap-10">
          <BrandLogo />
          <nav className="flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink key={link.label} label={link.label} to={link.to} />
            ))}
          </nav>
        </div>
        <SearchBar
          defaultQuery={searchQuery}
          onSubmit={handleSearch}
          onClear={handleClearSearch}
          className="w-full max-w-[320px] shrink-0"
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
            className="fixed inset-0 z-50 flex flex-col bg-black md:hidden"
          >
            <div className="mx-auto flex h-16 w-full max-w-[393px] shrink-0 items-center justify-between">
              <Logo />
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
            <nav className="mx-auto flex w-full max-w-[393px] flex-col gap-4 px-4 pt-6">
              {navLinks.map((link) => (
                <MobileMenuNavLink
                  key={link.label}
                  label={link.label}
                  to={link.to}
                  onClick={closeMobile}
                />
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
