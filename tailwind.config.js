/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Brand palette taken from the Anubhav logo. "navy" = deep brand green, "gold" = brand gold.
        // (Token names are kept so every component re-themes automatically.)
        navy: { 50: "#F0F5F2", 100: "#E0EBE5", 200: "#C0D5CA", 300: "#8FB2A0", 500: "#3F7A62", 600: "#2B5E49", 700: "#1F4A39", 800: "#123C2D", 900: "#0C2B20" },
        gold: { 50: "#FBF6EA", 100: "#F4E9CC", 300: "#E0C27F", 500: "#C69A45", 600: "#AE8130", 700: "#7A5A1C" },
        saffron: { 500: "#A57A28", 600: "#8A6420", 700: "#6E4F18" },
        cream: "#F8F5ED", line: "#E4E0D4",
        coral: { 300: "#F1DDD2", 500: "#B9533C", 600: "#9C402B" },
        mint: { 100: "#E3F0E8", 300: "#C5E1D1", 500: "#2F7D5B", 700: "#1F5C42" },
        sky: { 100: "#EAEFE6", 300: "#C9D8C4" },
      },
      fontFamily: {
        sans: ["var(--font-body)", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Noto Sans Devanagari", "sans-serif"],
        serif: ["var(--font-display)", "Georgia", "Noto Serif Devanagari", "serif"],
      },
      boxShadow: { hard: "0 1px 3px rgba(12,43,32,.14)", "hard-lg": "0 6px 16px rgba(12,43,32,.14)", "hard-sm": "0 1px 2px rgba(12,43,32,.12)" },
    },
  },
  plugins: [],
};
