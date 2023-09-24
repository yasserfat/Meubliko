/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
    'xs':"550px",
    'sm': '640px',
    'md': '768px',
    'lg': '1024px',
    'xl': '1280px',
    '2xl': '1536px',
  },
    extend: {
      fontFamily: {
        'poppins': ['Rubik']

      },
      backgroundImage: {
        'hero-pattern': "url('./src/assets/images/cropped-image-woman-inputting-card-information-key-phone-laptop-while-shopping-online.jpg')",
       
      },
    },
    container: {
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
  },
}