/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}" // ← This ensures EVERY folder (components, sections, pages) gets styled!
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
