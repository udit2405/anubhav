/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // "navy" = ink (deep blue-black). "gold" = marigold. Names kept so existing components re-theme automatically.
        navy: { 50: "#F1F2FA", 100: "#E3E5F5", 200: "#C5C9E8", 300: "#9AA1D4", 500: "#5560A8", 600: "#3A4180", 700: "#262B57", 800: "#181C3A", 900: "#0F1226" },
        gold: { 50: "#FFF7E0", 100: "#FFEBB0", 300: "#FFD166", 500: "#FFB400", 600: "#E09A00", 700: "#8A5600" },
        cream: "#FBF6EC",
        coral: { 300: "#FFB3A6", 500: "#FF6B57", 600: "#E0503D" },
        mint: { 100: "#CFF3E6", 300: "#7FDCBB", 500: "#17A878", 700: "#0B6B4C" },
        sky: { 100: "#D6ECFF", 300: "#8FCBFF" },
      },
      fontFamily: {
        sans: ["var(--font-body)", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Noto Sans Devanagari", "sans-serif"],
        serif: ["var(--font-display)", "system-ui", "-apple-system", "Segoe UI", "Noto Sans Devanagari", "sans-serif"],
      },
      boxShadow: { hard: "4px 4px 0 0 #0F1226", "hard-lg": "7px 7px 0 0 #0F1226", "hard-sm": "3px 3px 0 0 #0F1226" },
    },
  },
  plugins: [],
};
