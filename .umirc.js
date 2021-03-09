import { defineConfig } from 'dumi';

export default defineConfig({
  mode: 'doc',
  title: 'Leo Design',
  sass: {
    implementation: require('node-sass'),
  },
  publicPath:'./',
  favicon:'./assets/favicon.ico',
  logo:'./assets/logo.png',
  outputPath: 'docs-dist',
  history: {
    type: 'hash'
  },
  themeConfig: {
    hd: {
      // umi-hd 的 750 高清方案（默认值）
      // [{ mode: 'vw', options: [100, 750] }],
      // 禁用高清方案

      rules: [],
    }
  },
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'leo-design',
        libraryDirectory: "lib",
        // camel2DashComponentName: false,
        customStyleName: name => {
          return `./style`;
        },
      }
    ],
  ]
})