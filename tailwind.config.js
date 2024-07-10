/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        customBg: '#233142',
        customText: '#333333',
      },
      fontSize: {
        '13px': '13px',
      },
      lineHeight: {
        1: '1',
      },
    },
  },
  plugins: [],
};
