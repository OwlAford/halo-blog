module.exports = () => {
  // const isProd = process.env.NODE_ENV === 'production';
  // const prefix = isProd ? 'production.min' : 'development';

  return {
    pwa: true,
    entry: ['@babel/polyfill', '<rootDir>/src/core/entry.js'],
    template: '<rootDir>/public/index.html',
    devServerPort: 3001,
    buildServerPort: 3002,
    productionSourceMap: false,
    publicPath: '/',
    proxyTable: {
      '/media': {
        target: 'https://owlaford.gitee.io/',
        changeOrigin: true,
      },
    },
    alias: {
      '~': '<rootDir>/src',
      '@': '<rootDir>/src/views',
      '#': '<rootDir>/src/assets',
      '&': '<rootDir>/src/models',
      '^': '<rootDir>/src/components',
    },
    eslintExtend: 'prettier',
    autoOpenBrowser: true,
    lintOnSave: true,
    // cdn: {
    //   prodUrl: 'https://cdn.bootcss.com/:name/:version/:path',
    //   modules: {
    //     react: [
    //       {
    //         name: 'react',
    //         var: 'React',
    //         path: `umd/react.${prefix}.js`,
    //       },
    //       {
    //         name: 'react-dom',
    //         var: 'ReactDOM',
    //         path: `umd/react-dom.${prefix}.js`,
    //       },
    //     ],
    //   },
    // },
  };
};
