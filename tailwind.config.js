/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    colors: {
      "drak-color": "#030712",
      "light-color": "#FFFFFF",
      "gray-color": "#808080",
    },
    fontFamily: {
      // raliway: ["Raleway", "sans-serif"],
      // roboto: ["Roboto", "sans-serif"],
      Mulish: ["Mulish", "sans-serif"],
    },
    extend: {},
  },
  plugins: [require("daisyui")],
};
