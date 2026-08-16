import React, { useRef, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { OptimizedImage } from './OptimizedImage';
import { imageAssets } from '../lib/images';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const scrolledRef = useRef(false);
  const rafRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const updateScrolled = () => {
      rafRef.current = null;
      const next = window.scrollY > 20;
      if (next !== scrolledRef.current) {
        scrolledRef.current = next;
        setIsScrolled(next);
      }
    };

    const handleScroll = () => {
      if (rafRef.current === null) {
        rafRef.current = window.requestAnimationFrame(updateScrolled);
      }
    };

    updateScrolled();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' },
  { name: 'Our Collection', path: '/collection' },
  { name: 'Stores', path: '/stores' },
  { name: 'Offers', path: '/offers' },
  { name: 'Contact', path: '/contact' }];


  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled ?
      'bg-zinc-950/95 backdrop-blur-md shadow-lg shadow-black/20' :
      'bg-transparent'}`
      }>

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo - Compact Navbar Version */}
          <Link to="/" className="flex-shrink-0">
            <div className="flex items-center gap-3 group">
              {/* Logo Image with Refined Premium Styling - Perfectly Round */}
              <div className="relative">
                {/* Soft premium halo effect */}
                <div className="absolute inset-0 bg-amber-500/10 rounded-full blur-sm group-hover:bg-amber-500/15 transition-all duration-500"></div>
                <div className="relative bg-gradient-to-br from-zinc-100 to-zinc-50 rounded-full p-2 sm:p-2.5 border border-amber-600/20 group-hover:border-amber-500/30 transition-all duration-500 shadow-md shadow-black/10">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden flex items-center justify-center bg-white">
                    <OptimizedImage
                      imageId={imageAssets.logo.id}
                      alt={imageAssets.logo.alt}
                      width={144}
                      height={144}
                      sizes="72px"
                      widths={[72, 96, 144]}
                      loading="eager"
                      wrapperClassName="w-14 h-14 sm:w-[72px] sm:h-[72px] bg-white"
                      className="w-14 h-14 sm:w-[72px] sm:h-[72px] object-contain transition-transform duration-500 group-hover:scale-105"
                      data-testid="header-logo-image" />
                  </div>
                </div>
              </div>
              
              {/* Brand Name - Desktop Only, Hidden on Mobile */}
              <div className="hidden lg:flex flex-col">
                <span className="text-2xl font-serif font-semibold text-amber-600 tracking-wide" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  Rajan Wines
                </span>
                <span className="text-[11px] text-gray-500 tracking-[0.15em] uppercase font-light">Since 2001

                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) =>
            <Link
              key={link.path}
              to={link.path}
              className={`relative text-sm font-medium tracking-wide transition-colors duration-300 whitespace-nowrap ${
              location.pathname === link.path ?
              'text-amber-500' :
              'text-gray-300 hover:text-amber-400'}`
              }>

                {link.name}
                {location.pathname === link.path &&
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-amber-500"></span>
              }
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-gray-300 hover:text-amber-400 transition-colors p-2"
            aria-label="Toggle menu">

            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen &&
        <nav className="lg:hidden pb-4 border-t border-zinc-800 mt-2">
            <div className="flex flex-col space-y-4 pt-4">
              {navLinks.map((link) =>
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-sm font-medium transition-colors duration-300 ${
              location.pathname === link.path ?
              'text-amber-500' :
              'text-gray-300 hover:text-amber-400'}`
              }>

                  {link.name}
                </Link>
            )}
            </div>
          </nav>
        }
      </div>
    </header>);

};
