const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin")
const DefinePlugin = require("webpack").DefinePlugin
const currentFolderName = path.basename(process.cwd());
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FriendlyErrorsWebpackPlugin = require('@soda/friendly-errors-webpack-plugin');

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  stats: 'errors-only',
  entry: {
    components: './src/App.jsx', // 单独的JSX入口点
    main: "./src/main.js",
  },
  output: {
    filename: "js/[contenthash].dist.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
    publicPath: '/'
  },
  resolve: {
    alias: {
      utils: path.resolve(__dirname, "src/utils"),
      '@': path.join(__dirname, './src'),
      //表示设置路径别名这样在import的文件在src下的时候可以直接 @/component/...
    },
    extensions: ['.js', '.jsx', '.json'], //表示在import 文件时文件后缀名可以不写
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({
      terserOptions: {
        keep_fnames: true,
      },
    })],
  },
  devServer: {
    static: "./dist",
    client: {
      overlay: {
        errors: false,
        warnings: false,
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: currentFolderName,
      filename: 'index.html',
      template: './public/index.html'
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "public", // 复制入口
          to: "./", // 复制到 build，再写路径就是新建一个新的文件夹，./ 默认为 build
          globOptions: {
            ignore: [
              //不想被复制的文件，
              //比如：**/index.html
              "**/index.html"
            ]
          }
        },
      ],
    }),
    new DefinePlugin({
      BASE_URL: "'/'", // 两层引号
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[contenthash].css', // CSS文件名  
      chunkFilename: 'css/[contenthash].css', // 导入的CSS文件名  
    }),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: ['您的应用程序正在此处运行 http://localhost:8080'],
        notes: ['使用 npm run build 创建生产版本']
      },
      onErrors: function (severity, errors) {
        if (severity !== 'error') return;

        const tidyErrors = errors.map(err => err.message.replace(__dirname, ''));
        console.log(tidyErrors)
      },
      clearConsole: true,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/i,
        type: "asset/resource",
        generator: {
          filename: 'images/[hash][ext][query]' // 图片文件打包到 images 目录下
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)$/,
        use: 'file-loader',
        generator: {
          filename: 'video/[hash][ext][query]' // 字体文件打包到 fonts 目录下
        }
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          }
        }
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                auto: (resourcePath) => resourcePath.endsWith('.less'),  // 匹配.less文件来进行css模块化。
                localIdentName: '[local]_[hash:base64:10]',
              },
            },
          },
          'less-loader'
        ]
      }
    ],
  },
};
