const TSDocgenPlugin = require('react-docgen-typescript-webpack-plugin');
module.exports = (storybookBaseConfig, env, config) => {
  storybookBaseConfig.module.rules.push(
    {
      test: /\.(ts|tsx)$/,
      loader: require.resolve('awesome-typescript-loader'),
    },
    {
      test: /\.(css)$/,
      loader: require.resolve('css-loader'),
    },
    {
      test: /.(eot|ttf|woff|woff2|jpg|jpeg|png|svg)$/,
      use: ['file-loader'],
    },
  );
  storybookBaseConfig.plugins.push(new TSDocgenPlugin()); // optional
  storybookBaseConfig.resolve.extensions.push('.ts', '.css', '.tsx');
  return storybookBaseConfig;
};
