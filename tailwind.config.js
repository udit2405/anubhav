/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // "navy" = trustworthy deep blue. "gold" = soft warm highlight. "saffron" = the main call-to-action colour.
        navy: { 50: "#F3F7FB", 100: "#E4ECF5", 200: "#C9D7E8", 300: "#9FB6D1", 500: "#4F7BAE", 600: "#356093", 700: "#2A4D78", 800: "#1F3B5C", 900: "#17283F" },
        gold: { 50: "#FFF9EA", 100: "#FBEFCC", 300: "#EBCB7A", 500: "#F0C555", 600: "#D9A82E", 700: "#7A5410" },
        saffron: { 500: "#C4640A", 600: "#B85C00", 700: "#9A4C00" },
        cream: "#FFFDF8",
        coral: { 300: "#F4DCD2", 500: "#C2523A", 600: "#A63F2A" },
        mint: { 100: "#E6F4EC", 300: "#CBE8D8", 500: "#2F7D5B", 700: "#1F5C42" },
        sky: { 100: "#E8F1FA", 300: "#BCD6EE" },
      },
      fontFamily: {
        sans: ["var(--font-body)", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Noto Sans Devanagari", "sans-serif"],
        serif: ["var(--font-display)", "Georgia", "Noto Serif Devanagari", "serif"],
      },
      boxShadow: { hard: "0 1px 3px rgba(23,40,63,.14)", "hard-lg": "0 6px 16px rgba(23,40,63,.14)", "hard-sm": "0 1px 2px rgba(23,40,63,.12)" },
    },
  },
  plugins: [],
};
