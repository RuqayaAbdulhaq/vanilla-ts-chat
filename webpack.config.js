const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'production', // Ensures that the build is optimized
  entry: './chat.ts', // Update this path to your TypeScript entry file
  output: {
    filename: 'chatWidget.min.mjs', // Desired output file name
    path: __dirname + '/dist', // Output directory (ensure this exists or is created)
  },
  resolve: {
    extensions: ['.ts', '.js'], // Correct extensions to resolve
  },
  module: {
    rules: [
      {
        test: /\.ts$/, // Matches .ts files
        use: 'ts-loader', // Uses ts-loader for TypeScript files
        exclude: /node_modules/, // Excludes node_modules
      },
    ],
  },
  optimization: {
    minimize: true, // Enables minification
    minimizer: [new TerserPlugin()], // Uses TerserPlugin for minification
  },
};