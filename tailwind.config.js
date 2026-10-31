/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--color-bg)',
        surface: 'var(--color-surface)',
        'surface-2': 'var(--color-surface-2)',
        border: 'var(--color-border)',
        text: 'var(--color-text)',
        muted: 'var(--color-text-muted)',
        faint: 'var(--color-text-faint)',
        primary: 'var(--color-primary)',
        // Brand palette (fixed, theme-independent)
        choc: { 950: '#140a06', 900: '#1e0f0a', 800: '#2b1610', 700: '#3e2117', 500: '#6b3b26' },
        cream: { DEFAULT: '#fff4e2', 2: '#f8e6c8' },
        tomato: { DEFAULT: '#e2412b', dark: '#c22f1b' },
        mango: '#f2b33d',
        palm: { DEFAULT: '#1f7a6d', dark: '#0f4a42' },
        sky: '#7cc6c2',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Archivo', 'system-ui', 'sans-serif'],
      },
      maxWidth: { wrap: '1220px' },
      keyframes: {
        marquee: { to: { transform: 'translateX(-50%)' } },
        spin: { to: { transform: 'rotate(360deg)' } },
        pulse2: { '0%,100%': { boxShadow: '0 0 0 0 rgba(58,208,122,.45)' }, '50%': { boxShadow: '0 0 0 7px rgba(58,208,122,0)' } },
      },
      animation: {
        marquee: 'marquee 34s linear infinite',
        'spin-slow': 'spin 90s linear infinite',
        pulse2: 'pulse2 2.2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
