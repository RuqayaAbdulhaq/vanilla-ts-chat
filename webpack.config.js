const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: './chatWidget.mts',
  output: {
    filename: 'chatWidget.min.mjs',
  },
  resolve: {
    extensions: ['.mts', '.mjs'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
};
