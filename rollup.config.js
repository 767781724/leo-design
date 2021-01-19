const babel = require('rollup-plugin-babel');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const uglify = require('rollup-plugin-uglify').uglify;
const merge = require('lodash.merge');
const path = require('path');
const glob = require('glob');
const scss = require('rollup-plugin-scss');
const autoprefixer = require('autoprefixer');
const postcss = require('postcss');

const extensions = ['.js', 'jsx', '.ts', '.tsx'];

const resolve = function(...args) {
  return path.resolve(__dirname, ...args);
};
process.env.BABEL_ENV = process.env.FORMAT || 'esm';
/**
 * 获取输出路径
 * @param {string} filePath
 * @return {object}
 */
function mergeConfig(filePath) {
  const mainPath=path.join('lib/dist', filePath, 'index.js');
  const jobs = {
    esm: {
      output: {
        format: 'esm',
        file: resolve('lib/es', filePath, 'index.js'),
      },
    },
    umd: {
      output: {
        format: 'umd',
        file: resolve(mainPath),
        name: 'rem',
      },
    },
    min: {
      output: {
        format: 'umd',
        file: resolve(mainPath.replace(/(.\w+)$/, '.min$1')),
        name: 'rem',
      },
      plugins: [uglify()],
    },
  };
  // 从环境变量获取打包特征
  const config = jobs[process.env.FORMAT || 'esm'];
  return config;
}

/**
 * 获取入口文件
 * @param {string[]} projects
 * @return {object}
 * @throws no entry file
 */
function getEntry() {
  const entrys = [];
  const filePath = path.resolve(__dirname, './src');
  const files = glob.sync(`${filePath}/**/index.*(ts|tsx)`);
  files.forEach((val) => {
    const rst = val.match(/\/(.*)\/index.(ts|tsx)$/);
    if (rst && /^((?!style).)*$/.test(rst)) {
      let key = rst[1].split('/').pop();
      if (key === 'src') {
        key = '';
      }
      entrys[key] = val;
    }
  });
  if (Object.keys(entrys).length === 0) {
    throw new Error('no entry file');
  }
  return entrys;
}
const entryFile = getEntry();
const rollupConfig = [];

for (const key in entryFile) {
  if (Object.hasOwnProperty.call(entryFile, key)) {
    const element = entryFile[key];
    const config = merge({
      input: element,
      output: {},
      plugins: [
        scss({
          processor: (css) => postcss([autoprefixer({ overrideBrowserslist: 'Edge 18' })]),
        }),
        nodeResolve({
          extensions,
          modulesOnly: true,
        }),
        babel({
          exclude: 'node_modules/**',
          runtimeHelpers: true,
          extensions,
        }),
      ],
      external: (id) => {
        const re=new RegExp(`\.\/${key}`, 'g');
        return re.test(id);
      },
    }, mergeConfig(key));
    rollupConfig.push(config);
  }
}
export default rollupConfig;
