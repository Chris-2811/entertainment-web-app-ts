/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1440px',
        '3xl': '1536px',
      },
      colors: {
        red: 'hsl(0, 97%, 63%)',
        'dark-blue': 'hsl(223, 30%, 9%)',
        'semi-dark-blue': 'hsl(223, 36%, 14%)',
        'greyish-blue': 'hsl(223, 23%, 46%)',
        white: 'hsl(0, 0%, 100%)',
      },
      fontFamily: {
        body: ['Outfit', 'sans-serif'],
        heading: ['Outfit', 'sans-serif'],
        sans: ['Outfit', 'sans-serif'],
      },
      container: {
        center: true,
      },
    },
  },
  plugins: [],
};
