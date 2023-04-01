const registerRouter = require('./backend/router')

module.exports = {
  
  css: {
    loaderOptions: {
      sass: {
        // 全局引入变量和 mixin
        additionalData: `
          @import "@/assets/scss/variable.scss";
          @import "@/assets/scss/mixin.scss";
        `
      }
    }
  },
  devServer: { //express启用一个node server搭建一个代理，去请求服务，就不会有跨域问题
    onBeforeSetupMiddleware(devServer) { //app是express实例，（来源于后端服务：backend->route.js）
      registerRouter(devServer.app)
    }
  },
  configureWebpack: (config) => {
    if (process.env.npm_config_report) {
      const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
      config.plugins.push(new BundleAnalyzerPlugin())
    }
  },
  // productionSourceMap: false,
  publicPath: process.env.NODE_ENV === 'production' ? '/music-next/' : '/'
}
