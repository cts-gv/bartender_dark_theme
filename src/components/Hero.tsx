import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { siteConfig } from '@/config/siteConfig';

export function Hero() {
  const [videoReady, setVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  // Skip the background video for people who prefer reduced motion or have Data Saver on.
  const [allowVideo, setAllowVideo] = useState(true);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } })
      .connection?.saveData;
    if (reduce || saveData) setAllowVideo(false);
  }, []);

  const scrollToNext = () => {
    const el = document.querySelector('#banner');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    const el = document.querySelector('#contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToServices = () => {
    const el = document.querySelector('#services');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Poster image as a persistent background layer.
          This stays visible until the video is actually playing,
          eliminating the flash between poster and video. */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${siteConfig.hero.posterImage}')` }}
      />

      {/* Background Video — fades in on top of the poster once playing.
          See siteConfig.hero.videoUrl to replace. */}
      {allowVideo && (
        <video
          ref={videoRef}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            videoReady ? 'opacity-100' : 'opacity-0'
          }`}
          autoPlay
          muted
          loop
          playsInline
          preload="auto" // Changed from "metadata" to "auto"
          aria-hidden="true"
          onPlaying={() => setVideoReady(true)}
          onError={() => setVideoReady(false)}
        >
          <source src={siteConfig.hero.videoUrl} type="video/mp4" />
        </video>
      )}

      {/* Dark gradient overlay for readability */}
      <div className="absolute inset-0 hero-overlay" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        {/* Location badge */}
        <p className="mb-6 animate-fade-in-down text-sm font-semibold uppercase tracking-[0.4em] text-primary-300">
          {siteConfig.location}
        </p>

        {/* Headline */}
        <h1 className="heading-display animate-fade-in-up text-5xl font-bold leading-tight text-secondary-50 sm:text-6xl lg:text-7xl">
          {siteConfig.hero.headline}
        </h1>

        {/* Subheadline */}
        <p className="mx-auto mt-6 max-w-2xl animate-fade-in-up text-lg text-secondary-200 sm:text-xl" style={{ animationDelay: '0.4s', opacity: 0, animationFillMode: 'forwards' }}>
          {siteConfig.hero.subheadline}
        </p>

        {/* CTAs */}
        <div className="mt-10 flex animate-fade-in-up flex-col items-center gap-4 sm:flex-row sm:justify-center" style={{ animationDelay: '0.7s', opacity: 0, animationFillMode: 'forwards' }}>
          <button onClick={scrollToContact} className="btn-primary-glow w-full sm:w-auto">
            {siteConfig.hero.primaryCtaText}
          </button>
          <button onClick={scrollToServices} className="btn-outline-glow w-full sm:w-auto">
            {siteConfig.hero.secondaryCtaText}
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-primary-300 transition-colors hover:text-primary-200"
        aria-label="Scroll down"
      >
        <ChevronDown className="h-10 w-10 animate-float" />
      </button>
    </section>
  );
}
