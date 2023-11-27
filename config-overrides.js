const path = require('path');

module.exports = function override(config, env) {
  config.resolve = {
    ...config.resolve,
    alias: {
      ...config.resolve.alias,
      "@src": path.resolve(__dirname, 'src/'),
      "@assets": path.resolve(__dirname, "src/assets/"),
      "@components": path.resolve(__dirname, "src/components/"),
      "@routes": path.resolve(__dirname, "src/routes/"),
      "@contexts": path.resolve(__dirname, "src/contexts/"),
      "@helpers": path.resolve(__dirname, "src/helpers"),
      "@typings": path.resolve(__dirname, "src/types/"),
      "@css-utils": path.resolve(__dirname, "src/style-utils/"),
      "@hooks": path.resolve(__dirname, "src/hooks/")
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.d.ts']
  };
  return config;
};
