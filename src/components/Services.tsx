import {
  Wine,
  Martini,
  Users,
  Package,
  GlassWater,
  Truck,
  type LucideIcon,
} from 'lucide-react';
import { siteConfig } from '@/config/siteConfig';

// Map icon string names from config to actual Lucide components
const iconMap: Record<string, LucideIcon> = {
  Wine,
  Martini,
  Users,
  Package,
  GlassWater,
  Truck,
};

export function Services() {
  const { services } = siteConfig;

  return (
    <section
      id="services"
      className="relative overflow-hidden py-24 lg:py-32"
    >
      {/* Parallax background — see siteConfig.services.parallaxImage */}
      <div
        className="parallax-bg absolute inset-0 opacity-15"
        style={{ backgroundImage: `url('${services.parallaxImage}')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-secondary-950 via-secondary-950/97 to-secondary-950" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="reveal mb-14 text-center">
          <p className="section-label">What We Do</p>
          <h2 className="section-title">{services.title}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-secondary-300 sm:text-lg">
            {services.subtitle}
          </p>
        </div>

        {/* Services grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.items.map((item, idx) => {
            const Icon = iconMap[item.icon] ?? Wine;
            return (
              <div
                key={idx}
                className="reveal-tilt"
                style={{ transitionDelay: `${(idx % 3) * 0.25}s` }}
              >
                <div className="glow-card group h-full p-8">
                  {/* Icon with glow */}
                  <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary-500/10 ring-1 ring-primary-500/30 transition-all duration-500 group-hover:bg-primary-500/20 group-hover:ring-primary-400/50 group-hover:shadow-[0_0_25px_rgba(224,147,32,0.3)]">
                    <Icon className="h-7 w-7 text-primary-400 transition-transform duration-500 group-hover:scale-110" />
                  </div>

                  <h3 className="heading-display mb-3 text-2xl font-bold text-secondary-50">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-secondary-300">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="reveal mt-14 text-center">
          <button
            onClick={() => {
              const el = document.querySelector('#contact');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-primary-glow"
          >
            Request a Quote
          </button>
        </div>
      </div>
    </section>
  );
}
