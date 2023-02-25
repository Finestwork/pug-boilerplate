const PATH = require('path');
const PugPlugin = require('pug-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const PUG_PLUGIN = new PugPlugin({
  pretty: true,
  js: {
    // output filename of extracted JS file from source script
    filename: 'assets/js/[contenthash:16].js',
  },
  css: {
    // output filename of extracted JS file from source script
    filename: 'assets/css/[contenthash:16].css',
  },
});

module.exports = {
  module: {
    rules: [
      {
        test: /\.pug$/,
        loader: PugPlugin.loader,
      },
      {
        test: /\.js$/,
        exclude: /node_modules/i,
        loader: 'babel-loader',
      },
      {
        test: /\.(s[ac]|c)ss/,
        use: ['css-loader', 'sass-loader', 'postcss-loader'],
      },
    ],
  },
  entry: {
    index: './src/index.pug',
  },
  output: {
    path: PATH.resolve(__dirname, 'dist'),
  },
  plugins: [PUG_PLUGIN, new CleanWebpackPlugin()],
  devServer: {
    static: {
      directory: PATH.resolve(__dirname, './dist'),
    },
    watchFiles: ['./src/**/*.scss', './src/**/*.js'],
  },
};
