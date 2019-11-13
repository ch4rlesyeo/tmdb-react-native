module.exports = function(api) {
  api.cache(true)

  return {
    presets: ['babel-preset-expo', 'module:react-native-dotenv'],
    plugins: [
      [
        'babel-plugin-module-resolver', {
          alias: {
            '@utils': './universal/utils',
            '@store': './universal/store',
            '@hooks': './universal/hooks',
            '@models': './universal/models',
            '@screens': './universal/screens',
            '@components': './universal/components'
          }
        }
      ]
    ]
  }
}
