import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      "light", "dark", "cupcake", "bumblebee", "emerald",
      "corporate", "synthwave", "retro", "cyberpunk", "valentine",
      "halloween", "garden", "forest", "aqua", "lofi",
      "pastel", "fantasy", "wireframe", "black", "luxury",
      "dracula", "cmyk", "autumn", "business", "acid",
      "lemonade", "night", "coffee", "winter", "dim",
      "nord", "sunset", "caramellatte", "abyss", "silk"
    ],
    darkTheme: "dark",
    base: true,
    styled: true,
    utils: true,
    rtl: false,
    prefix: "",
    logs: true,
  },
} 