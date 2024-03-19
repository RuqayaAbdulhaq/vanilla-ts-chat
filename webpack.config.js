const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './chat.ts',
  output: {
    filename: 'chatWidget.min.mjs',
    path: __dirname + '/public',
  },
  resolve: {
    extensions: ['.ts', '.js'],
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