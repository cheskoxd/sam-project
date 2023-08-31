/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        'xxs' : '0.5rem',
        'head1': '1.75rem',
        'head2': '0.625rem'
      },
      textColor: {
        'secondary' : '#999899',
        'light1' : '#D9D9D9'
      },
      backgroundColor: {
        'main': '#0174FF',
        'secondary' : '#424243',
        'dark': '#1E1E1E',
        'dark2' : '#191918'
      },
      borderColor: {
        'secondary': '#5C5C5C',
        'dark': '#1E1E1E',
        'dark2': '#424243',
        'main': '#0174FF',

      },
      height:{
        'button' : '2.81rem'
      }
    },
  },
  plugins: [],
}