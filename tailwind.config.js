/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0A1B2E',
          soft: '#203349',
          muted: '#54637A',
        },
        navy: {
          950: '#071322',
          900: '#0A1B2E',
          800: '#12283F',
        },
        accent: {
          DEFAULT: '#1652F0',
          dark: '#0C3AC4',
          soft: '#E8EEFF',
        },
        mist: '#F4F5F3',
        line: '#E4E7EA',
        paper: '#F7F8F7',
        canvas: '#EFF1EF',
      },
      fontFamily: {
        sans: ['Inter Variable', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Manrope Variable', 'Manrope', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        page: '1240px',
      },
      boxShadow: {
        card: '0 1px 2px rgba(10, 27, 46, 0.04), 0 16px 40px -24px rgba(10, 27, 46, 0.22)',
        lift: '0 2px 4px rgba(10, 27, 46, 0.04), 0 24px 60px -28px rgba(10, 27, 46, 0.28)',
        panel: '0 32px 80px -24px rgba(7, 19, 34, 0.35)',
      },
      keyframes: {
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(14px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in': {
          from: { transform: 'translateX(100%)' },
          to: { transform: 'translateX(0)' },
        },
        'scale-in': {
          from: { opacity: '0', transform: 'translateY(8px) scale(0.985)' },
          to: { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        'toast-in': {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'count-pop': {
          '0%': { transform: 'scale(1)' },
          '40%': { transform: 'scale(1.22)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.25s ease-out both',
        'fade-up': 'fade-up 0.5s cubic-bezier(0.22, 1, 0.36, 1) both',
        'slide-in': 'slide-in 0.35s cubic-bezier(0.22, 1, 0.36, 1) both',
        'scale-in': 'scale-in 0.25s cubic-bezier(0.22, 1, 0.36, 1) both',
        'toast-in': 'toast-in 0.25s cubic-bezier(0.22, 1, 0.36, 1) both',
        'count-pop': 'count-pop 0.35s ease-out both',
      },
    },
  },
  plugins: [],
};
