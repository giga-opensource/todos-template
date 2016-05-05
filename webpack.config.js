var path = require('path');
var webpack = require('webpack');

var config = {
  devtool: 'eval',
  entry: [
    'webpack-hot-middleware/client?path=http://localhost:8080/__webpack_hmr',
    './src/index.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: 'http://localhost:8080/assets/'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      { test: /\.css$/, loader: 'style-loader!css-loader', include: path.join(__dirname, 'src') },
      { test: /\.js$/, loaders: ['babel'], include: path.join(__dirname, 'src') },
    ]
  }
};

module.exports = config;
