import type { Config } from 'tailwindcss';

export default {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        soil: {
          900: '#0c0b0a',
          800: '#141312',
          700: '#1b1917'
        },
        stone: {
          900: '#0f1115',
          800: '#171a20',
          700: '#1e232b'
        },
        chlorophyll: {
          500: '#2fbf71',
          400: '#38d97f',
          300: '#6ee7a6'
        }
      },
      boxShadow: {
        floating: '0 10px 30px rgba(0,0,0,0.45)'
      },
      backgroundImage: {
        'soil-gradient': 'linear-gradient(135deg, #0c0b0a 0%, #141312 45%, #1b1917 100%)',
        'stone-gradient': 'linear-gradient(135deg, #0f1115 0%, #171a20 45%, #1e232b 100%)',
        'canopy-gradient': 'radial-gradient(1000px 400px at 20% -10%, rgba(47,191,113,0.12), rgba(47,191,113,0) 70%)'
      }
    }
  },
  plugins: [],
} satisfies Config;
