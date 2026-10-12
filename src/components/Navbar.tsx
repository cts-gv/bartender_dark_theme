import { useEffect, useState } from 'react';
import { Menu, X, Wine } from 'lucide-react';
import { siteConfig } from '@/config/siteConfig';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock page scroll and allow Escape to close while the mobile menu is open
  useEffect(() => {
    if (!menuOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav
        aria-label="Main"
        className={`fixed top-0 left-0 z-50 w-full transition-all duration-500 ${
          scrolled
            ? 'bg-secondary-950/90 backdrop-blur-md border-b border-primary-500/10 py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8">
          {/* Logo / Business Name */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#hero');
            }}
            className="group flex items-center gap-2"
          >
            <Wine className="h-7 w-7 text-primary-400 transition-all duration-300 group-hover:text-primary-300 group-hover:drop-shadow-[0_0_8px_rgba(224,147,32,0.6)]" />
            <span className="heading-display text-xl font-bold text-secondary-50">
              {siteConfig.businessName}
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-8 md:flex">
            {siteConfig.navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="text-sm font-medium uppercase tracking-wider text-secondary-200 transition-colors duration-300 hover:text-primary-400"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => handleNavClick('#contact')}
              className="btn-primary-glow text-xs"
            >
              Book Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="text-secondary-100 md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div id="mobile-menu" className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-6 bg-secondary-950/95 backdrop-blur-lg md:hidden">
          {siteConfig.navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className="heading-display text-2xl font-semibold text-secondary-100 transition-colors hover:text-primary-400"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={() => handleNavClick('#contact')}
            className="btn-primary-glow mt-4"
          >
            Book Now
          </button>
        </div>
      )}
    </>
  );
}
