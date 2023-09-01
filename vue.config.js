const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  // configureWebpack: {
  //   resolve: {
  //     fallback: {
  //       "url": require.resolve("url/"),
  //       "crypto": require.resolve("crypto-browserify"),
  //       "stream": require.resolve("stream-browserify"),
  //       "http": require.resolve("stream-http"),
  //       // 其他缺失的模块
  //     }
  //   }
  // }
});
