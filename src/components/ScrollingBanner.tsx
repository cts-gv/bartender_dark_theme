import { siteConfig } from '@/config/siteConfig';

export function ScrollingBanner() {
  // Duplicate the items so the loop is seamless
  const items = [...siteConfig.banner.items, ...siteConfig.banner.items];

  return (
    <section
      id="banner"
      className="relative overflow-hidden border-y border-primary-500/20 bg-secondary-950 py-6"
    >
      {/* Glow accents at edges */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-secondary-950 to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-secondary-950 to-transparent z-10" />

      <div className="marquee-mask">
        <p className="sr-only">{siteConfig.banner.items.join(', ')}</p>
        <div aria-hidden="true" className="flex w-max animate-scroll-x items-center gap-12 whitespace-nowrap">
          {items.map((item, idx) => (
            <div key={idx} className="flex items-center gap-12">
              <span className="heading-display text-2xl font-semibold uppercase tracking-wider text-secondary-300 transition-colors hover:text-primary-400 sm:text-3xl">
                {item}
              </span>
              <span className="text-primary-500 text-xl">✦</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
