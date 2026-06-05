import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function resetScrollLockStyles() {
  document.documentElement.style.overflow = '';
  document.body.style.overflow = '';
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.width = '';
}

export function ScrollToTop() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    resetScrollLockStyles();

    const frameId = requestAnimationFrame(() => {
      window.scrollTo(0, 0);
    });

    return () => cancelAnimationFrame(frameId);
  }, [pathname, search]);

  return null;
}
