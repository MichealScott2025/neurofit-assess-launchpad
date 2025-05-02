// postcss.config.cjs
module.exports = {
  plugins: {
    // first tailwindcss itself
    tailwindcss: {},
    // now the Tailwind PostCSS wrapper
    '@tailwindcss/postcss': {},
    // then autoprefixer
    autoprefixer: {},
  },
}
