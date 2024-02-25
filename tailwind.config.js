/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      dropShadow: {
        'vite': '0 0 2em #646cffaa',
        'vue': '0 0 2em #42b883aa'
      }
    },
  },
  plugins: [],
}

