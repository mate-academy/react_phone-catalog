module.exports = {
  test: /\.scss$/,
  use: [
    {
      loader: "style-loader"
    },
    {
      loader: "css-loader",
      options: {
        importLoaders: 1
      }
    },
    {
      loader: "sass-loader"
    }
  ]
};
