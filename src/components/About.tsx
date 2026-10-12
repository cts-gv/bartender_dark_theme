import { siteConfig } from '@/config/siteConfig';

export function About() {
  const { about } = siteConfig;

  return (
    <section
      id="about"
      className="relative overflow-hidden py-24 lg:py-32"
    >
      {/* Parallax background image — see siteConfig.about.parallaxImage */}
      <div
        className="parallax-bg absolute inset-0 opacity-20"
        style={{ backgroundImage: `url('${about.parallaxImage}')` }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary-950 via-secondary-950/95 to-secondary-950" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Image */}
          <div className="reveal relative">
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src={about.image}
                alt={`About ${siteConfig.businessName}`}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
              {/* Glow border */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-primary-500/20 transition-all duration-500 hover:ring-primary-400/40" />
            </div>
            {/* Floating accent glow */}
            <div className="absolute -bottom-6 -right-6 h-32 w-32 rounded-full bg-primary-500/20 blur-3xl" />
            <div className="absolute -top-6 -left-6 h-24 w-24 rounded-full bg-accent-500/15 blur-3xl" />
          </div>

          {/* Text */}
          <div className="reveal reveal-delay-1">
            <p className="section-label">Our Story</p>
            <h2 className="section-title mb-6">{about.title}</h2>

            {about.paragraphs.map((para, idx) => (
              <p key={idx} className="mb-4 text-base leading-relaxed text-secondary-300 sm:text-lg">
                {para}
              </p>
            ))}

            {/* Stats grid */}
            <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {about.stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="reveal glow-card p-4 text-center"
                  style={{ transitionDelay: `${0.2 + idx * 0.1}s` }}
                >
                  <div className="heading-display text-3xl font-bold text-primary-400">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-xs uppercase tracking-wider text-secondary-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
