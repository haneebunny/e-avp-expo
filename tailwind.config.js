/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/*.{js,jsx,ts,tsx}",
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      "e-blue": "#0c55fa",
      "e-gray": "#6a6a6a",
      // 'e-lightgray' : ''
    },
    extend: {},
  },
  plugins: [],
};
