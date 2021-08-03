const CracoLessPlugin = require('craco-less')

module.exports = {
  // 按需打包
  babel: {
    plugins: [
      [
        'import',
        {
          libraryName: 'antd',
          libraryDirectory: 'es',
          style: true, //设置为true即是less  这里就自动打包相应样式了
        },
      ],
    ],
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#524a9d',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
}
