/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        app: '#F3F5F8',
        sidebar: '#FFFFFF',
        chat: '#F2F4F7',
        bubble: '#FFFFFF',
        accent: {
          DEFAULT: '#4F6FE8',
          hover: '#4161DC',
          online: '#27B89A',
        },
        ink: {
          DEFAULT: '#171A21',
          primary: '#171A21',
          muted: '#747A86',
          faint: '#A4A9B3',
        },
        danger: '#D94B57',
      },
      fontFamily: {
        sans: ['Inter', 'SF Pro Text', 'SF Pro Display', 'Segoe UI', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      boxShadow: {
        float: '0 10px 30px rgba(25, 31, 45, 0.10)',
        modal: '0 24px 70px rgba(20, 25, 40, 0.18)',
      },
    },
  },
  plugins: [],
}
