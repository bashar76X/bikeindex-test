/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        secondaryText: "#666666",
        lightGray: "#f2f2f2",
      },
    },
  },
  plugins: [],
};
