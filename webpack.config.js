const path = require("path");
const os = require("os");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const DefinePlugin = require("webpack").DefinePlugin;
const currentFolderName = path.basename(process.cwd());
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FriendlyErrorsWebpackPlugin = require("@soda/friendly-errors-webpack-plugin");

// ✅ 获取本机局域网 IPv4 地址
function getLocalIp() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === "IPv4" && !iface.internal) {
        return iface.address;
      }
    }
  }
  return "localhost";
}

const HOST = "0.0.0.0"; // 监听所有网卡，方便局域网访问
const LOCAL_IP = getLocalIp();

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  stats: "errors-only",
  entry: {
    components: "./src/App.jsx",
    main: "./src/main.js",
  },
  output: {
    filename: "js/[contenthash].dist.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
    publicPath: "/",
  },
  resolve: {
    alias: {
      utils: path.resolve(__dirname, "src/utils"),
      "@": path.join(__dirname, "./src"),
    },
    extensions: [".js", ".jsx", ".json"],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          keep_fnames: true,
        },
      }),
    ],
  },
  devServer: {
    static: "./dist",
    host: HOST,
    port: "auto", // ✅ 交给 webpack-dev-server 自动寻找可用端口
    open: false,
    allowedHosts: "all",
    client: {
      overlay: {
        errors: false,
        warnings: false,
      },
    },
    // ✅ 关键：启动完成后，webpack-dev-server 会回调这里，能拿到真实端口
    onListening(devServer) {
      const { port } = devServer.server.address();
      console.log("");
      console.log("  您的应用程序正在此处运行:");
      console.log(`    - Local:   http://localhost:${port}`);
      console.log(`    - Network: http://${LOCAL_IP}:${port}`);
      console.log("");
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: currentFolderName,
      filename: "index.html",
      template: "./public/index.html",
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "public",
          to: "./",
          globOptions: {
            ignore: ["**/index.html"],
          },
        },
      ],
    }),
    new DefinePlugin({
      BASE_URL: "'/'",
      "process.env.NODE_ENV": JSON.stringify("development"),
    }),
    new MiniCssExtractPlugin({
      filename: "css/[contenthash].css",
      chunkFilename: "css/[contenthash].css",
    }),
    new FriendlyErrorsWebpackPlugin({
      // ✅ 不再拼 localhost / network 地址（端口是 auto，拼不准）
      compilationSuccessInfo: {
        messages: [`应用 ${currentFolderName} 编译成功`],
        notes: ["使用 npm run serve 启动开发服务器", "使用 npm run build 创建生产版本"],
      },
      onErrors: function (severity, errors) {
        if (severity !== "error") return;
        const tidyErrors = errors.map((err) =>
          err.message.replace(__dirname, "")
        );
        console.log(tidyErrors);
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
          filename: "images/[hash][ext][query]",
        },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)$/,
        use: "file-loader",
        generator: {
          filename: "video/[hash][ext][query]",
        },
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: {
                auto: (resourcePath) => resourcePath.endsWith(".less"),
                localIdentName: "[local]_[hash:base64:10]",
              },
            },
          },
          "less-loader",
        ],
      },
    ],
  },
};