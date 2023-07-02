export const module = {
  rules: [
    {
      test: /\.(png|jp(e*)g|svg|gif)$/,
      use: [
        {
          loader: 'file-loader',
        },
      ],
    },
  ],
};
