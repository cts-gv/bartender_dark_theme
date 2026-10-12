/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Public Cloudflare Turnstile site key (safe to expose in the browser). */
  readonly VITE_TURNSTILE_SITE_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
