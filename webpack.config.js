var webpack = require('webpack');

var config = {
  context: __dirname + '/src', // `__dirname` is root of project and `src` is source

  entry: {
    app: './app.js',
  },

  output: {
    path: __dirname + '/dist', // `dist` is the destination
    filename: 'bundle.js'
  },

  //To run development server
  devServer: {
    contentBase: __dirname + '/src',
  },

  module: {
    rules: [
      {
        test: /\.js$/, // Check for all js files
        exclude: [/node_modules/, /palha/],
        use: [{
          loader: 'babel-loader',
          options: { presets: ['es2015'] }
        }]
      }
    ]
  },

  devtool: "eval-source-map" // Default development sourcemap
};

// Check if build is running in production mode, then change the sourcemap type
if (process.env.NODE_ENV === "production") {
  config.devtool = ""; // No sourcemap for production

  // Add more configuration for production here like
  // Uglify plugin
  // Offline plugin
  // Etc,
}

module.exports = config;
