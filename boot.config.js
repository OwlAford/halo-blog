module.exports = {
  pwa: true,
  entry: [
    '@babel/polyfill',
    '<rootDir>/boot/core/entry.js'
  ],
  template: '<rootDir>/public/mobile.html',
  devServerPort: 3030,
  buildServerPort: 4040,
  productionSourceMap: false,
  publicPath: '/boot/',
  outputDir: '<rootDir>/dist-boot',
  proxyTable: {
    '/lazyMan': {
      target: 'http://106.14.138.86:8080/',
      changeOrigin: true
    }
  },
  alias: {
    '~': '<rootDir>/boot',
    '@': '<rootDir>/boot/views',
    '#': '<rootDir>/boot/assets',
    '&': '<rootDir>/boot/models',
    '^': '<rootDir>/boot/components'
  },
  autoOpenBrowser: true,
  lintOnSave: true
}
