var path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path : path.join(__dirname, '/public'),
    filename : 'bundle.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    root: path.resolve(__dirname, './src')
  },
  devServer : {
    inline : true,
    port : 3000
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react', 'stage-1']
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader'
      },
      {
        test: /\.css$/,
        loader: 'css-loader',
        options: { minimize: true }
      },
      {
        test: /.(jpeg|jpg|png|woff(2)?|eot|ttf|svg|webp)(\?[a-z0-9=\.]+)?$/,
        loader: 'url-loader?limit=10000000!image-webpack-loader',
        exclude: /node_modules/
      }
    ]
  }
}
