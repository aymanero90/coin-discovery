const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); 
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'production',
  // 1
  // Use the src/index.js file as entry point to bundle it.
  // If the src/index.js file imports other JS files,
  // bundle them as well
  entry: [
      path.resolve(__dirname, './src/scripts/coins.js'),
      path.resolve(__dirname, './src/scripts/common.js'),
      path.resolve(__dirname, './src/scripts/favorites.js')
  ],
  // 2
  // The bundles source code files shall result in a bundle.js file
  // in the /dist folder
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js'
  },
  // 3
  // The /dist folder will be used to serve our application
  // to the browser
  devServer: {
    static: path.resolve(__dirname, './dist')
  },
  // 4
  // Add plugins for webpack here
  plugins: [
    new CleanWebpackPlugin,
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.resolve(__dirname, './src/html/index.html'),
    }),
    new HtmlWebpackPlugin({
      filename: "about.html",
      template: path.resolve(__dirname, './src/html/about.html'),
      chunks: []
    }),
    new HtmlWebpackPlugin({
      filename: "contact.html",
      template: path.resolve(__dirname, './src/html/contact.html'),
      chunks: []
    }),
    new MiniCssExtractPlugin(),
  ],
  module: {
    // configuration regarding modules
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/, // files to exclude
        use: ['babel-loader'],
      },
      // CSS and SASS
      {
        test: /\.css$/,  // load files that end with scss and css
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
        ],
      },
      // Images
      {
        test: /\.jpg$/,
        use: ['file-loader'],
      }
    ]
  },
  resolve: {
    // options for resolving module requests
    extensions: ['*', '.js']  // files to load
  }
};
