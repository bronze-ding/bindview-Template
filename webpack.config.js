const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin")
const DefinePlugin = require("webpack").DefinePlugin
// const BundleAnalyzerPlugin =
//   require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  entry: "./src/index.js",
  output: {
    filename: "dist.js",
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    alias: {
      utils: path.resolve(__dirname, "src/utils")
    },
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  devServer: {
    static: "./dist",
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "bindview.js",
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
      BASE_URL: "'./'", // 两层引号
    }),
    // new BundleAnalyzerPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/i,
        type: "asset/resource",
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      }
    ],
  },
};