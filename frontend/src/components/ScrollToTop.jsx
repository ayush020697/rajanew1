import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Smoothly scrolls to top whenever the route changes.
 * Mount once inside <BrowserRouter>.
 */
export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Use 'smooth' behavior; fall back to instant if reduced motion preferred
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
