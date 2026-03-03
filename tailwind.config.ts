// Tailwind configuration file
import type { Config } from 'tailwindcss'

const config: Config = {
  // content tells Tailwind WHERE to look for class names
  // It scans these files and removes any unused CSS classes from the final build
  // This keeps the CSS file small in production
  content: [
  './pages/**/*.{js,ts,jsx,tsx,mdx}',
  './components/**/*.{js,ts,jsx,tsx,mdx}',
  './app/**/*.{js,ts,jsx,tsx,mdx}',
],
  theme: {
    extend: {
      // Register custom fonts so we can use them as Tailwind classes
      // font-display → Playfair Display (headings)
      // font-body → DM Sans (body text)
      fontFamily: {
        display: ['var(--font-display)'],  // References the CSS variable from layout.tsx
        body: ['var(--font-body)'],
      },

      // Custom color palette matching our design
      colors: {
        navy: {
          950: '#020817', // Darkest — page background
          900: '#0a1628', // Card backgrounds
          800: '#0f2040', // Skill bar tracks, borders
          700: '#163058', // Dividers
        },
        gold: {
          400: '#f4c430', // Primary accent — CTAs, highlights
          500: '#e6b800', // Hover state
        },
      },

      // Custom animations we can use as Tailwind classes
      animation: {
        'fade-up': 'fadeUp 0.6s ease forwards',
        'fade-in': 'fadeIn 0.8s ease forwards',
      },

      // Keyframes define the actual animation behaviour
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

export default config