const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: {
      app: ['./app/src/app.js'],
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'public/dist'),
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
                path: path.resolve(__dirname, 'public/dist'),
                name: '[name].[contenthash].css',
            },
          },
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({
    }),
  ],
};