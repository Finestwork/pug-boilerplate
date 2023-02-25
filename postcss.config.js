const purgecss = require('@fullhuman/postcss-purgecss');

module.exports = ({ mode }) => {
  const CSSNANO_CONFIG =
    mode === 'production'
      ? require('cssnano')({ preset: 'advanced' })
      : require('cssnano')({
          preset: [
            'advanced',
            {
              normalizeWhitespace: false,
              discardComments: false,
              reduceIdents: false,
              zindex: false,
            },
          ],
        });
  return {
    plugins: [
      CSSNANO_CONFIG,
      require('autoprefixer'),
      purgecss({
        content: ['./src/*.pug'],
      }),
    ],
  };
};
