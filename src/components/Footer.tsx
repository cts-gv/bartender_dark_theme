import { Wine } from 'lucide-react';
import { siteConfig } from '@/config/siteConfig';

export function Footer() {
  return (
    <footer className="border-t border-primary-500/20 bg-secondary-950 py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Wine className="h-6 w-6 text-primary-400" />
            <span className="heading-display text-lg font-bold text-secondary-50">
              {siteConfig.businessName}
            </span>
          </div>

          {/* Nav links */}
          <div className="flex flex-wrap items-center justify-center gap-6">
            {siteConfig.navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs uppercase tracking-wider text-secondary-400 transition-colors hover:text-primary-400"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 border-t border-secondary-800 pt-6 text-center">
          <p className="text-sm text-secondary-400">
            &copy; {new Date().getFullYear()} {siteConfig.businessName}. All rights reserved.
            {' '}
            <span className="text-secondary-400">{siteConfig.location}</span>
          </p>
          
          {/* Crafted by credit link */}
          <p className="mt-2 text-xs text-secondary-500">
            Crafted by:{' '}
            <a 
              href="https://ctechsolution.tech" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-secondary-400 hover:text-white transition-colors underline underline-offset-4"
            >
              Community Tech Solutions
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
