/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        customBg: '#233142',
        customText: '#333333',
        'bg-dark-dark': '#1a1c35',
        'bg-light-dark': '#f5f5f5',
        'bg-dark-light': '#22243b',
        'bg-light-light': '#fdfffd',
        'color-dark-grey': '#4e4e4e',
        'color-light-grey': '#d1d1d1',
        'color-text-light': '#22243b',
        'color-text-dark': '#fdfffd',
        'color-accent': '#f16e03',
        'color-accent-second': '#2AC420',
      },
      fontSize: {
        '13px': '13px',
      },
      lineHeight: {
        1: '1',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.shared-container-style': {
          '@apply w-full h-full min-h-0 dark:bg-bg-dark-light dark:text-color-text-dark py-4 px-2':
            {},
        },
        '.shared-icon-style': {
          '@apply hover:scale-105 hover:text-color-accent': {},
        },
      };
      addUtilities(newUtilities);
    },
  ],
};
