/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "custom-radial-gradient":
          "radial-gradient(circle, rgba(48,2,108,1) 0%, rgba(9,9,121,1) 0%, rgba(48,2,108,1) 100%)",
      },

      fontFamily: {
        coolvetica: ["Coolvetica RG", "sans-serif"],
      },

      animation: {
        "fill-color": "fillColor 1.5s ease-out forwards",
      },
      keyframes: {
        fillColor: {
          "0%": {
            backgroundPosition: "100% 0",
          },
          "100%": {
            backgroundPosition: "0 0",
          },
        },
      },
    },
  },
  plugins: [],
};
