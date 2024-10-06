// tailwind.config.js
import defaultTheme from 'tailwindcss/defaultTheme';
import typographyPlugin from '@tailwindcss/typography';

module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,json,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: '#5D14F0',
        secondary: 'var(--aw-color-secondary)',
        accent: '#69F5CA',
        default: 'var(--aw-color-text-default)',
        muted: 'var(--aw-color-text-muted)',
        'custom-bg': '#060710', // Aggiungi questa linea
      },
      fontFamily: {
        sans: ['var(--aw-font-sans, "Source Sans 3")', ...defaultTheme.fontFamily.sans],
        serif: ['var(--aw-font-serif, ui-serif)', ...defaultTheme.fontFamily.serif],
        heading: ['var(--aw-font-heading, "Source Sans 3")', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [typographyPlugin],
  darkMode: 'class',
};
