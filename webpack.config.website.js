const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

  mode: 'none',

  entry: {
    main: "./src/app.website"
  },

  output: {
    path: __dirname + "/dist/webpack/website",
    filename: "[name].js"
  },

  resolve: {
    extensions: ['.js', '.ts'],
  },

  module: {
    rules: [
      { test: /\.ts$/,   loader: 'ts-loader!angular2-template-loader', exclude: /(node_modules|src\/electron|node_modules\/electron)/ },
      { test: /\.html$/, loader: 'html-loader' },
      { test: /\.less$/, loader: "raw-loader!less-loader" },
      { test: /\.css$/,  loader: 'style-loader!css-loader' },
      { test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,  loader: "file-loader?name=assets/[name].[ext]" },
      { test: /\.json$/, loader: 'json-loader' }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true
      }
    })
  ]
};
