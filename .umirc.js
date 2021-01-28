import { defineConfig } from 'dumi';

export default defineConfig({
  mode: 'doc',
  title: 'leo-design',
  sass: {
    implementation: require('node-sass'),
  },
  publicPath:'./',
  favicon:'/assets/logo.jpg',
  logo:'/assets/logo.jpg',
  outputPath: 'docs-dist',
  history: {
    type: 'hash'
  }
})