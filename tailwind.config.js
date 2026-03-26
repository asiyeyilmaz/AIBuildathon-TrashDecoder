/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        accent: 'var(--color-accent)',
        warning: 'var(--color-warning)',
        bg: 'var(--color-bg)',
        text: 'var(--color-text)',
      },
      fontFamily: {
        body: ['Nunito', 'sans-serif'],
        heading: ['Fraunces', 'serif'],
      },
    },
  },
  plugins: [],
}

