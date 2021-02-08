module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: theme => ({
        'image-bg': "url('/src/images/blur-background-1187974.jpg')",
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
