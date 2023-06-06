/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        sora: ["Sora", "sans-serif"],
      },
      colors: {
        primary: "var(--text-color)",
        backdrop: "rgb(var(--bg-backdrop)/var(--tw-bg-opacity))",
        secondary: "var(--background-color)",
        "secondary-light": "var(--background-color-light)",
        "secondary-lighter": "var(--background-color-lighter)",
        "primary-button": "var(--primary-button-color)",
        "secondary-button": "var(--secondary-button-color)",
        accent: "var(--accent-color)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [],
};
// :root {
//   --text-color: #e8cfb1;
//   --background-color: #151314;
//   --primary-button-color: #f1be70;
//   --secondary-button-color: #e7ceb0;
//   --accent-color: #e07534;
//   --background-color-light: rgba(231, 206, 176, 0.1);
// }
