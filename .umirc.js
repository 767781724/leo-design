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
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'leo-design',
        libraryDirectory: "lib",
        customStyleName: name => {
          return `./style`;
        },
      }
    ],
  ]
})