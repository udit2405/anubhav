/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: { 50: "#F3F6FB", 100: "#E4EAF3", 200: "#C5D1E3", 300: "#97ABC9", 500: "#3B5B8C", 600: "#25446F", 700: "#183358", 800: "#102645", 900: "#0B1B33" },
        gold: { 50: "#FBF7EC", 100: "#F4EAD0", 300: "#DCC38A", 500: "#B8923A", 600: "#9A7A2D", 700: "#7A6023" },
      },
      fontFamily: { serif: ["Georgia", "Cambria", "Times New Roman", "serif"], sans: ["system-ui", "-apple-system", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif"] },
    },
  },
  plugins: [],
};
