module.exports = {

  mode: 'none',

  entry: {
    application: "./src/electron/Application"
  },

  output: {
    path: __dirname + "/dist/webpack/desktop",
    filename: "[name].js"
  },

  resolve: {
    extensions: ['.js', '.ts']
  },

  target: 'electron-main',

  module: {
    rules: [
      { test: /\.ts$/,   loader: 'ts-loader', exclude: /(node_modules|src\/components|src\/pipes|src\/services)/ },
      { test: /\.json$/, loader: 'json-loader' }
    ]
  },

  node: {
    __dirname: false,
    __filename: false
  }
};
