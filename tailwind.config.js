/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "bg-white": "#fefefe",
        "bg-grey": "#e5e5e5",
        "cta-black": "#111111",
        "custom-green": "#4CAF50",
        "custom-hover-green": "#45a049",
      },
      spacing: {
        "custom-padding": "15px 32px",
        "custom-margin": "4px 2px",
      },
      fontSize: {
        "custom-size": "16px",
      },
      borderColor: {
        "custom-border": "#4CAF50",
      },
    },
  },
  plugins: [],
};
