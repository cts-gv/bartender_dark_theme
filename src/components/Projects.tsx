import { siteConfig } from '@/config/siteConfig';

export function Projects() {
  const { projects } = siteConfig;

  return (
    <section
      id="projects"
      className="relative bg-secondary-900 py-24 lg:py-32"
    >
      {/* Top border glow */}
      <div className="absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-primary-500/40 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="reveal mb-14 text-center">
          <p className="section-label">Portfolio</p>
          <h2 className="section-title">{projects.title}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-secondary-300 sm:text-lg">
            {projects.subtitle}
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.items.map((item, idx) => (
            <div
              key={idx}
              className="reveal-tilt"
              style={{ transitionDelay: `${(idx % 3) * 0.25}s` }}
            >
              <div className="group glow-card">
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary-950 via-secondary-950/20 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95" />
                  {/* Category badge */}
                  <span className="absolute left-4 top-4 rounded-full border border-primary-500/40 bg-secondary-950/80 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-300 backdrop-blur-sm">
                    {item.category}
                  </span>
                  {/* Title + description — slides up on hover */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="heading-display text-xl font-bold text-secondary-50">
                      {item.title}
                    </h3>
                    <p className="mt-1 max-h-0 overflow-hidden text-sm text-secondary-300 opacity-0 transition-all duration-500 group-hover:max-h-20 group-hover:opacity-100">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
