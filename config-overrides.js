module.exports = function override(config, env) {
  config.module.rules = config.module.rules.map((rule) => {
    if (rule.use && rule.use.some((u) => u.loader && u.loader.includes('source-map-loader'))) {
      rule.exclude = /node_modules\/antd/;
    }
    return rule;
  });

  config.module.rules[1].oneOf.splice(2, 0, {
    test: /\.less$/i,
    exclude: /\.module\.(less)$/,
    use: [
      { loader: "style-loader" },
      { loader: "css-loader" },
      {
        loader: "less-loader",
        options: {
          lessOptions: {
            javascriptEnabled: true,
          },
        },
      },
    ],
  });
  return config;
};


