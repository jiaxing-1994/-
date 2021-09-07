const path = require('path');

module.exports = {
  publicPath: './',
  configureWebpack: {
    resolve: {
      alias: {
        '@components': path.resolve(__dirname, './src/components'),
        '@assets': path.resolve(__dirname, './src/assets'),
      },
    },
  },
  devServer: {
    host: '0.0.0.0',
  }
}
