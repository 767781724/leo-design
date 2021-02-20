import { defineConfig } from 'dumi';

export default defineConfig({
  mode: 'doc',
  title: 'Leo Design',
  sass: {
    implementation: require('node-sass'),
  },
  publicPath:'./',
  favicon:'/assets/favicon.ico',
  logo:'/assets/logo.png',
  outputPath: 'docs-dist',
  history: {
    type: 'hash'
  }
})