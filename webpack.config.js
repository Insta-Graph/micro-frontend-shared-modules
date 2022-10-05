const { merge } = require('webpack-merge');
const singleSpaDefaults = require('webpack-config-single-spa-react-ts');
const webpack = require('webpack');

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: 'snapify',
    projectName: 'shared-modules',
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
    plugins: [
      new webpack.DefinePlugin({
        'process.env': JSON.stringify({
          ENVIRONMENT: webpackConfigEnv && webpackConfigEnv.isLocal ? 'dev' : 'prod',
        }),
      }),
    ],
  });
};
