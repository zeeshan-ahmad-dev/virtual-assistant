/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
          aliceblue: '#f0f8ff',
      },
      fontFamily: {
          protest: ['"Protest Guerrilla"', 'sans-serif'],
          rubik: ['"Rubik Glitch"', 'sans-serif'],
      },
  },
  },
  plugins: [],
}

