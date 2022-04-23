const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');
const path = require('path');

module.exports = (envVars) => {
  const { env } = envVars;
  console.log({ env });
  const envConfig = require(`./webpack.${env || 'prod'}.js`);
  return merge(commonConfig({ env }), envConfig);
};
