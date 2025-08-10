/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1677ff',
        secondary: '#6b7280',
        success: '#00b42a',
        warning: '#ff7d00',
        danger: '#f53f3f',
        light: '#f5f5f5',
        dark: '#1d2129',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}