import { useState } from 'react';
import { Mail, Phone, Instagram, Facebook, Send, Loader2, AlertCircle } from 'lucide-react';
import { siteConfig } from '@/config/siteConfig';
import { Turnstile } from '@/components/Turnstile';

type Status = 'idle' | 'sending' | 'success' | 'error';

const emptyForm = {
  name: '',
  email: '',
  phone: '',
  eventType: '',
  eventDate: '',
  guestCount: '',
  message: '',
  website: '', // honeypot: real visitors never see or fill this
};

// Shared input styling
const inputClass =
  'w-full rounded-lg border border-secondary-700 bg-secondary-800/50 px-4 py-3 text-secondary-100 outline-none transition-all duration-300 placeholder:text-secondary-500 focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/30';
const labelClass = 'mb-2 block text-xs uppercase tracking-wider text-secondary-400';

// Local-time YYYY-MM-DD so past dates can't be picked
const todayISO = () => {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
};

export function Contact() {
  const { contact } = siteConfig;
  const [formState, setFormState] = useState(emptyForm);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [token, setToken] = useState('');
  // Turnstile tokens are single-use; changing this key remounts the widget for a fresh one.
  const [widgetKey, setWidgetKey] = useState(0);

  const resetWidget = () => {
    setToken('');
    setWidgetKey((k) => k + 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'sending') return;

    if (!token) {
      setStatus('error');
      setErrorMsg('Please complete the verification check below the message box.');
      return;
    }

    setStatus('sending');
    setErrorMsg('');

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 15000);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formState, turnstileToken: token }),
        signal: controller.signal,
      });
      const data = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;

      if (res.ok && data?.ok) {
        setFormState(emptyForm);
        setStatus('success');
      } else {
        setStatus('error');
        setErrorMsg(
          data?.error ||
            `Something went wrong. Please try again or email us at ${contact.email}.`
        );
      }
    } catch {
      setStatus('error');
      setErrorMsg(
        `We couldn't reach the server. Please check your connection and try again, or email us at ${contact.email}.`
      );
    } finally {
      window.clearTimeout(timeout);
      resetWidget();
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden py-24 lg:py-32"
    >
      {/* Parallax background — see siteConfig.contact.parallaxImage */}
      <div
        className="parallax-bg absolute inset-0 opacity-20"
        style={{ backgroundImage: `url('${contact.parallaxImage}')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-secondary-950 via-secondary-950/95 to-secondary-950" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-8">
        {/* Header */}
        <div className="reveal mb-12 text-center">
          <p className="section-label">Let&apos;s Talk</p>
          <h2 className="section-title">{contact.title}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-secondary-300 sm:text-lg">
            {contact.subtitle}
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Contact info */}
          <div className="reveal space-y-8">
            {/* Email */}
            <a
              href={`mailto:${contact.email}`}
              className="glow-card group flex items-center gap-5 p-6"
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary-500/10 ring-1 ring-primary-500/30 transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(224,147,32,0.3)]">
                <Mail className="h-6 w-6 text-primary-400" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-secondary-400">Email</p>
                <p className="text-base text-secondary-100">{contact.email}</p>
              </div>
            </a>

            {/* Phone */}
            <a
              href={`tel:${contact.phoneHref}`}
              className="glow-card group flex items-center gap-5 p-6"
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary-500/10 ring-1 ring-primary-500/30 transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(224,147,32,0.3)]">
                <Phone className="h-6 w-6 text-primary-400" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-secondary-400">Phone</p>
                <p className="text-base text-secondary-100">{contact.phone}</p>
              </div>
            </a>

            {/* Social */}
            <div className="flex gap-4">
              <a
                href={contact.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="glow-card group flex h-14 w-14 items-center justify-center"
                aria-label="Instagram"
              >
                <Instagram className="h-6 w-6 text-primary-400 transition-transform duration-300 group-hover:scale-110" />
              </a>
              <a
                href={contact.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="glow-card group flex h-14 w-14 items-center justify-center"
                aria-label="Facebook"
              >
                <Facebook className="h-6 w-6 text-primary-400 transition-transform duration-300 group-hover:scale-110" />
              </a>
            </div>

            {/* Location */}
            <div className="glow-card p-6">
              <p className="text-xs uppercase tracking-wider text-secondary-400">Service Area</p>
              <p className="mt-1 text-lg text-secondary-100">
                {siteConfig.location} &amp; Greater Yakima Valley
              </p>
            </div>
          </div>

          {/* Contact form */}
          <div className="reveal reveal-delay-1">
            <div className="glow-card p-8">
              {status === 'success' ? (
                <div
                  role="status"
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-success-500/20 ring-1 ring-success-500/40">
                    <Send className="h-8 w-8 text-success-400" />
                  </div>
                  <h3 className="heading-display text-2xl font-bold text-secondary-50">
                    Message Sent!
                  </h3>
                  <p className="mt-2 text-secondary-300">
                    Thank you for reaching out. We will get back to you within 24 hours. A
                    confirmation is on its way to your inbox.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setStatus('idle');
                      setErrorMsg('');
                    }}
                    className="btn-outline mt-6"
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Honeypot: hidden from people and assistive tech, tempting to bots */}
                  <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                    <label htmlFor="cf-website">Website</label>
                    <input
                      id="cf-website"
                      type="text"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formState.website}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Name + Email */}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="cf-name" className={labelClass}>
                        Name
                      </label>
                      <input
                        id="cf-name"
                        type="text"
                        name="name"
                        required
                        minLength={2}
                        maxLength={100}
                        autoComplete="name"
                        value={formState.name}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="cf-email" className={labelClass}>
                        Email
                      </label>
                      <input
                        id="cf-email"
                        type="email"
                        name="email"
                        required
                        maxLength={254}
                        autoComplete="email"
                        value={formState.email}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  {/* Phone + Event type */}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="cf-phone" className={labelClass}>
                        Phone <span className="normal-case tracking-normal">(optional)</span>
                      </label>
                      <input
                        id="cf-phone"
                        type="tel"
                        name="phone"
                        maxLength={30}
                        autoComplete="tel"
                        value={formState.phone}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="(509) 555-0100"
                      />
                    </div>
                    <div>
                      <label htmlFor="cf-eventType" className={labelClass}>
                        Event Type
                      </label>
                      <select
                        id="cf-eventType"
                        name="eventType"
                        value={formState.eventType}
                        onChange={handleChange}
                        className={`${inputClass} [&>option]:bg-secondary-900`}
                      >
                        <option value="">Select one…</option>
                        {contact.eventTypes.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Event date + guest count */}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="cf-eventDate" className={labelClass}>
                        Event Date
                      </label>
                      <input
                        id="cf-eventDate"
                        type="date"
                        name="eventDate"
                        min={todayISO()}
                        value={formState.eventDate}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="cf-guestCount" className={labelClass}>
                        Guest Count
                      </label>
                      <input
                        id="cf-guestCount"
                        type="number"
                        name="guestCount"
                        min="1"
                        max="10000"
                        inputMode="numeric"
                        value={formState.guestCount}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="50"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="cf-message" className={labelClass}>
                      Tell us about your event
                    </label>
                    <textarea
                      id="cf-message"
                      name="message"
                      required
                      minLength={5}
                      maxLength={3000}
                      rows={4}
                      value={formState.message}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="What type of event? Venue or city? Any specific drink preferences?"
                    />
                  </div>

                  {/* Spam protection */}
                  <Turnstile
                    key={widgetKey}
                    onToken={setToken}
                    onError={() => {
                      setStatus('error');
                      setErrorMsg(
                        'The verification check could not load. Please refresh the page, or email us directly.'
                      );
                    }}
                  />

                  {/* Error message (announced to screen readers) */}
                  {status === 'error' && errorMsg && (
                    <div
                      role="alert"
                      className="flex items-start gap-3 rounded-lg border border-error-500/40 bg-error-500/10 px-4 py-3 text-sm text-error-400"
                    >
                      <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                      <p>{errorMsg}</p>
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="btn-primary-glow w-full disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
                  >
                    {status === 'sending' ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs text-secondary-400">
                    We only use your details to respond to your inquiry.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
