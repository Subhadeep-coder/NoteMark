/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
  content: ['./src/renderer/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', ...defaultTheme.fontFamily.sans],
        roboto: ['Roboto', ...defaultTheme.fontFamily.sans],
        lato: ['Lato', ...defaultTheme.fontFamily.sans],
        montserrat: ['Montserrat', ...defaultTheme.fontFamily.sans],
        nunito: ['Nunito', ...defaultTheme.fontFamily.sans],
        'open-sans': ['"Open Sans"', ...defaultTheme.fontFamily.sans],
        'playfair-display': ['"Playfair Display"', ...defaultTheme.fontFamily.serif],
        poppins: ['Poppins', ...defaultTheme.fontFamily.sans],
        raleway: ['Raleway', ...defaultTheme.fontFamily.sans],
        ubuntu: ['Ubuntu', ...defaultTheme.fontFamily.sans],
        'yuji-mai': ['"Yuji Mai"', ...defaultTheme.fontFamily.serif],
        'hachi-maru-pop': ['"Hachi Maru Pop"', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
}

