/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4361EE',
        secondary: '#3F37C9',
        accent: '#4CC9F0',
        danger: '#F72585',
        success: '#4CAF50',
        warning: '#FFC107',
        info: '#2196F3',
        light: '#F8F9FA',
        dark: '#212529',
      },
    },
  },
  plugins: [],
};