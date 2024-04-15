module.exports = {
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ],

  content: [
    "./content/**/*.{html,js}",
    "./layouts/**/*.{html,js}",
    "./node_modules/flowbite/**/*.js",
  ]
}

