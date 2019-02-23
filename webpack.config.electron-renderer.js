const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {

  mode: 'none',

  entry: {
    app: "./src/app.desktop"
  },

  output: {
    path: __dirname + "/dist/webpack/desktop",
    filename: "[name].js"
  },

  resolve: {
    extensions: ['.js', '.ts']
  },

  target: 'electron-renderer',

  module: {
    rules: [
      { test: /\.ts$/,   loader: 'ts-loader!angular2-template-loader', exclude: /(node_modules|src\/electron)/ },
      { test: /\.html$/, loader: 'html-loader' },
      { test: /\.less$/, loader: "raw-loader!less-loader" },
      { test: /\.css$/,  loader: 'style-loader!css-loader' },
      { test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,  loader: "file-loader?name=assets/[name].[ext]" },
      { test: /\.json$/, loader: 'json-loader' }
    ]
  },

  plugins: [
    new webpack.ContextReplacementPlugin(/angular(\\|\/)core(\\|\/)@angular/),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true
      }
    })
  ]
};
