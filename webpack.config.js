const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-ts");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (webpackConfigEnv, argv) => {
  const orgName = "olympus";
  const defaultConfig = singleSpaDefaults({
    orgName,
    projectName: "root-config",
    webpackConfigEnv,
    argv,
    disableHtmlGeneration: true,
  });

  const host = process.env.WEBPACK_HOST || "localhost";
  const port = process.env.WEBPACK_PORT || 9000;
  const webSocketProtocol = process.env.WEBPACK_WEBSOCKET_PROTOCOL || "ws";

  return merge(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
    plugins: [
      new HtmlWebpackPlugin({
        inject: false,
        template: "src/index.ejs",
        templateParameters: {
          isLocal: webpackConfigEnv && webpackConfigEnv.isLocal,
          host,
          port,
          orgName,
        },
      }),
    ],
    devServer: {
      ...defaultConfig.devServer,
      open: false,
      hot: true,
      client: {
        webSocketURL: {
          port,
          hostname: host,
          protocol: webSocketProtocol,
        },
      },
    },
  });
};
