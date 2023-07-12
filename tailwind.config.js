/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
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
