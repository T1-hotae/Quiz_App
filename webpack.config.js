// webpack.config.js
const createExpoWebpackConfigAsync = require("@expo/webpack-config");

module.exports = async function (env, argv) {
  // 기존 Expo 기본 설정 가져오기
  const config = await createExpoWebpackConfigAsync(env, argv);

  // 기존 ignoreWarnings 유지 + 우리가 추가할 것
  config.ignoreWarnings = [
    ...(config.ignoreWarnings || []),
    {
      module: /react-native-worklets/,
      message:
        /Critical dependency: require function is used in a way in which dependencies cannot be statically extracted/,
    },
  ];

  return config;
};
