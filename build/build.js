const webpack = require('webpack')
const prodConfig = require('./webpack.prod.config')

process.env.NODE_ENV = 'production'

webpack(prodConfig,(err,status)=>{
    if (err) throw err
    process.stdout.write(status.toString({
      colors: true,
      modules: false,
      children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
      chunks: false,
      chunkModules: false
    }) + '\n\n')
})