// tailwind.config.js
/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tw-elements-react/dist/js/**/*.js"
  ],
  theme: {
    extend: {
      animation: {
        marquee: "marquee 50s linear infinite"
      },
      keyframes: {
        marquee: {
          from: {
            transform: 'translateX(0)',
          },
          to: {
            transform: 'translateX(calc(-100% - 2.5rem))',
          },
        },
      },
   

      screens: {
        mediumSm: "553px",
        mediumMd: "790px",
        ultraSm: "300px",
      },
      // Define your custom button styles here
      'learn-more': {
        position: 'relative',
        display: 'inline-block',
        cursor: 'pointer',
        outline: 'none',
        border: '0',
        verticalAlign: 'middle',
        textDecoration: 'none',
        background: 'transparent',
        padding: '0',
        fontSize: 'inherit',
        fontFamily: 'inherit',
        width: '12rem',
        height: 'auto',
      },
      'learn-more-circle': {
        transition: 'all 0.45s cubic-bezier(0.65, 0, 0.076, 1)',
        position: 'relative',
        display: 'block',
        margin: '0',
        width: '3rem',
        height: '3rem',
        background: '#282936',
        borderRadius: '1.625rem',
      },
      'learn-more-icon': {
        transition: 'all 0.45s cubic-bezier(0.65, 0, 0.076, 1)',
        position: 'absolute',
        top: '0',
        bottom: '0',
        margin: 'auto',
        background: '#fff',
      },
      'learn-more-arrow': {
        transition: 'all 0.45s cubic-bezier(0.65, 0, 0.076, 1)',
        left: '0.625rem',
        width: '1.125rem',
        height: '0.125rem',
        background: 'none',
      },
      'learn-more-arrow-before': {
        position: 'absolute',
        content: '""',
        top: '-0.29rem',
        right: '0.0625rem',
        width: '0.625rem',
        height: '0.625rem',
        borderTop: '0.125rem solid #fff',
        borderRight: '0.125rem solid #fff',
        transform: 'rotate(45deg)',
      },
      'learn-more-text': {
        transition: 'all 0.45s cubic-bezier(0.65, 0, 0.076, 1)',
        position: 'absolute',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        padding: '0.75rem 0',
        margin: '0 0 0 1.85rem',
        color: '#282936',
        fontWeight: '700',
        lineHeight: '1.6',
        textAlign: 'center',
        textTransform: 'uppercase',
      },
      'learn-more:hover .learn-more-circle': {
        width: '100%',
      },
      'learn-more:hover .learn-more-arrow': {
        background: '#fff',
        transform: 'translate(1rem, 0)',
      },
      'learn-more:hover .learn-more-text': {
        color: '#fff',
      },
    },
  },
  daisyui: {
    themes: ["cmyk"],
  },
  plugins: [require("daisyui")],
});
