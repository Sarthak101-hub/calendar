export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#DEDBC8',
        bg: '#000000',
        surface: '#101010',
        card: '#181818',
        border: '#2a2a2a',
        coral: '#FFB7B2',
        sage: '#E8EFE8',
        lavender: '#EFEDF4',
        muted: '#78716C',
      },
      fontFamily: {
        sans: ['Almarai', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        serif: ['"Instrument Serif"', 'serif'],
        cursive: ['"Reenie Beanie"', 'cursive'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
