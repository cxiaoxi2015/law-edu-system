const { defineConfig } = require('@vue/cli-service')
const chalk = require('chalk')
const path = require('path')
const { sysTitle } = require('./src/config/sysConfig')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = defineConfig({
  outputDir: 'dist',
  publicPath: '/',
  productionSourceMap: false,
  chainWebpack: config => {
    config.resolve.alias
        .set('@', resolve('src'))
        .set('api', resolve('src/api'))
        .set('assets', resolve('src/assets'))
        .set('views', resolve('src/views'))
        .set('layout', resolve('src/layout'))
    config.plugin('html')
        .tap(args => {
          args[0].title= sysTitle
          return args
        })
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "~assets/styles/variable.scss";`
      }
    }
  },
  devServer: {
    port: '8088'
  }
})

console.log(chalk.green('> 法学实践教学平台 正在启动...'))
