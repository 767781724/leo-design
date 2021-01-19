const babel = require('rollup-plugin-babel');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const uglify = require('rollup-plugin-uglify').uglify;
const merge = require('lodash.merge');
const path = require('path');
const glob = require('glob');
// const scss = require('rollup-plugin-scss');
const autoprefixer = require('autoprefixer');
// const postcss = require('postcss');
const postcss = require('rollup-plugin-postcss');
const sass = require('node-sass');

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
        name: filePath===''?'index':filePath,
      },
    },
    min: {
      output: {
        format: 'umd',
        file: resolve(mainPath.replace(/(.\w+)$/, '.min$1')),
        name: filePath===''?'index':filePath,
      },
      plugins: [uglify()],
    },
  };
  // 从环境变量获取打包特征
  const config = jobs[process.env.FORMAT || 'esm'];
  return config;
}
const processSass = function(context, payload) {
  return new Promise(( resolve, reject ) => {
    sass.render({
      file: context,
    }, function(err, result) {
      if ( !err ) {
        resolve(result);
      } else {
        reject(err);
      }
    });
  });
};
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
      output: {
        globals: {
          'react': 'React',
          'react-dom': 'ReactDOM',
          'prop-types': 'PropTypes',
        },
      },
      plugins: [
        // scss({
        //   output: 'bundle.css',
        //   processor: (css) => postcss([autoprefixer({ overrideBrowserslist: 'Edge 18' })]),
        // }),
        postcss({
          extract: false,
          minimize: true,
          extensions: ['css', 'scss'],
          process: processSass,
          plugins: [
            autoprefixer,
          ],
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
        const re=new RegExp('^\.\/\w*', 'g');
        const keys=['react', 'react-dom', 'prop-types', ...Object.keys(entryFile)];
        const _id=re.test(id)?id.split('/').pop():id;
        if (keys.includes(_id)) {
          return true;
        } else {
          return false;
        }
      },
    }, mergeConfig(key));
    rollupConfig.push(config);
  }
}
export default rollupConfig;
