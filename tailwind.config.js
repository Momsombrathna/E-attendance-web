/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        night: {
          100: "#f6f6f6",
          200: "#e0e0e0",
          300: "#c4c4c4",
          400: "#a3a3a3",
          500: "#7b7b7b",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#171717",
        },
        eee: {
          100: "#eeeeee",
          200: "#e0e0e0",
          300: "#c4c4c4",
          400: "#a3a3a3",
          500: "#7b7b7b",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#171717",
        },
        e_attendance: {
          100: "#2F3791",
          200: "#464DAA",
        },
        brown: {
          100: "#FDF5DF",
          200: "#FCE6B3",
          300: "#FBD680",
          400: "#F9C74A",
          500: "#F7B00A",
          600: "#D09308",
          700: "#A47606",
          800: "#754905",
        },
        paper: {
          100: "#5EBEC4",
          200: "#7ACED2",
          300: "#97DEE0",
          400: "#B3EEEF",
          500: "#D0FEFD",
          600: "#E7FFFE",
          700: "#F1FFFE",
          800: "#F8FFFE",
        },
        purple: {
          100: "#F5EEF8",
          200: "#EADCF1",
          300: "#DDB8E6",
          400: "#D094DB",
          500: "#C46FD0",
          600: "#A853B7",
          700: "#8A3A9E",
          800: "#6C2076",
        },
      },
    },
  },
  plugins: [
    require("daisyui"),
    require("flowbite/plugin")({
      charts: true,
    }),
  ],
};
