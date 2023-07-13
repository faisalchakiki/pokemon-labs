/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'phone-lg': '370px',
      'tablet': '670px',
      'tablet-md': '768px',
      // => @media (min-width: 640px) { ... }
      'laptop': '1024px',
      // => @media (min-width: 1024px) { ... }
      'desktop': '1280px',
      'monitor': '1400px',
      // => @media (min-width: 1280px) { ... }
    },
    extend: {
      colors: {
        'gray': '#D6D6D6',
        "red-bright" : '#FF5454',
        "green-bright" : '#85FF71',
      },
    }
  },
  plugins: [],
}
