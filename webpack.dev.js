const path = require('path')
const webpack = require('webpack')
const webpackDevServer = require('webpack-dev-server')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = {
  entry: {
    index: './src/index.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: true,
              removeComments: true,
              /**
               * webpack 构建的项目，通常无法直接在 html 中引用图片
               * html-loader 解决了这个问题
               * 下列配置表示 html-loader 会自动转化 img 的 src、data-src 和 div 的 data-src 中的路径（用于懒加载）
               * 可以修改下列配置，实现更多的支持
               * 开发时按正常的相对路径设置 url 即可，打包后会自动转化为最终的路径
               */
              attrs: ['img:src', 'img:data-src', 'div:data-src']
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.js$/,
        include: ['./src'],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.png|jpe?g|gif|svg$/,
        loader: 'url-loader'
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader'
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    })
  ]
}

const options = {
  contentBase: './dist',
  hot: true,
  host: 'localhost'
}

webpackDevServer.addDevServerEntrypoints(config, options)
const compiler = webpack(config)
const server = new webpackDevServer(compiler, options)

server.listen(5000, '0.0.0.0', () => {
  console.log('dev server listening on port 5000');
})