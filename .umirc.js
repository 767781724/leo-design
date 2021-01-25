import { defineConfig } from 'dumi';

export default defineConfig({
  mode: 'doc',
  title: 'leo-design',
  sass: {
    implementation: require('node-sass'),
  },
  favicon:'https://cdn3.f-cdn.com/contestentries/48032/7653005/52943c045ae05_thumb900.jpg',
  logo:'https://cdn3.f-cdn.com/contestentries/48032/7653005/52943c045ae05_thumb900.jpg',
  outputPath: 'docs-dist',
})