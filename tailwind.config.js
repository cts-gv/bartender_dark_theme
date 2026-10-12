/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        /* ===============================================
         * COLOR PALETTE — Change these values to retheme
         * the entire site. All sections reference these.
         * =============================================== */
        // Primary — warm amber/gold (main brand color)
        primary: {
          50: '#fdf8ef',
          100: '#faedd3',
          200: '#f4d9a5',
          300: '#edbf6d',
          400: '#e7a940',
          500: '#e09320', // base
          600: '#c2741a',
          700: '#9b551a',
          800: '#7e441c',
          900: '#6a391b',
          950: '#3b1d0d',
        },
        // Secondary — deep charcoal/espresso
        secondary: {
          50: '#f6f6f7',
          100: '#e2e2e6',
          200: '#c6c6cd',
          300: '#9e9eab',
          400: '#868697', // was an invalid 7-digit hex; this value clears 4.5:1 contrast on the dark backgrounds
          500: '#52525e',
          600: '#3e3e48',
          700: '#2f2f37',
          800: '#1e1e24',
          900: '#131318',
          950: '#0a0a0d',
        },
        // Accent — warm copper/rose for highlights
        accent: {
          50: '#fdf5f2',
          100: '#fce8e0',
          200: '#faced1',
          300: '#f5a9b0',
          400: '#ec7478',
          500: '#dd515e', // base
          600: '#c83244',
          700: '#a82636',
          800: '#8a2231',
          900: '#74212c',
          950: '#400e14',
        },
        success: {
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
        },
        warning: {
          400: '#facc15',
          500: '#eab308',
          600: '#ca8a04',
        },
        error: {
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
        },
      },
      fontFamily: {
        /* ===== FONTS — swap these to change typography ===== */
        display: ['"Cormorant Garamond"', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'fade-in-down': 'fadeInDown 0.8s ease-out forwards',
        'scroll-x': 'scrollX 30s linear infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 3s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scrollX: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(224,147,32,0.3), 0 0 40px rgba(224,147,32,0.1)' },
          '50%': { boxShadow: '0 0 30px rgba(224,147,32,0.5), 0 0 60px rgba(224,147,32,0.2)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
    },
  },
  plugins: [],
};
