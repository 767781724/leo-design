const gulp = require('gulp');
const babel = require('gulp-babel');
const through2 = require('through2');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const gulpUmd = require('gulp-umd');
const gulpif = require('gulp-if');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

const paths = {
  dest: {
    lib: 'lib', // commonjs 文件存放的目录名
    esm: 'es', // ES module 文件存放的目录名
    dist: 'dist', // umd文件存放的目录名
  },
  styles: 'src/**/*.scss', // 样式文件路径
  scripts: ['src/**/*.{ts,tsx}'], // 脚本文件路径
};
/**
 * 编译脚本文件
 * @param {*} babelEnv babel环境变量
 * @param {*} destDir 目标目录
 * @return {object}
 */
function compileScripts(babelEnv, destDir) {
  process.env.BABEL_ENV = babelEnv;
  const { scripts } =paths;
  return gulp
      .src(scripts)
      .pipe(babel()) // 使用gulp-babel处理
      .pipe(gulpif(babelEnv==='umd', gulpUmd()))
      .pipe(
          through2.obj(function Z(file, encoding, next) {
            this.push(file.clone());
            // 找到目标
            if (file.path.match(/(\/|\\)style(\/|\\)index\.js/)) {
              const content = file.contents.toString(encoding);
              file.contents = Buffer.from(cssInjection(content)); // 文件内容处理
              file.path = file.path.replace(/index\.js/, 'css.js'); // 文件重命名
              this.push(file); // 新增该文件
              next();
            } else {
              next();
            }
          }),
      )
      .pipe(gulpif(babelEnv==='umd', uglify()))
      .pipe(gulpif(babelEnv==='umd', rename({ suffix: '.min' })))
      .pipe(gulp.dest(destDir));
}
/**
 * 当前组件样式 import './index.less' => import './index.css'
 * 依赖的其他组件样式 import '../test-comp/style' => import '../test-comp/style/css.js'
 * 依赖的其他组件样式 import '../test-comp/style/index.js' => import '../test-comp/style/css.js'
 * @param {string} content
 * @return {object}
 */
function cssInjection(content) {
  return content
      .replace(/\/style\/?'/g, '/style/css')
      .replace(/\/style\/?"/g, '/style/css')
      .replace(/\.scss/g, '.css');
};
/**
 * 编译cjs
 * @return {Object}
 */
function compileCJS() {
  const { dest } = paths;
  return compileScripts('cjs', dest.lib);
}

/**
 * 编译esm
 *  @return {Object}
 */
function compileESM() {
  const { dest } = paths;
  return compileScripts('esm', dest.esm);
}

/**
 * 编译umd
 *  @return {Object}
 */
function compileUMD() {
  const { dest } = paths;
  return compileScripts('umd', dest.dist);
}
/**
 * 拷贝scss文件
 * @return {Object}
 */
function copyScss() {
  return gulp.src(paths.styles).pipe(gulp.dest(paths.dest.lib)).pipe(gulp.dest(paths.dest.esm));
}

/**
 * 生成css文件
 * @return {Object}
 */
function scss2css() {
  return gulp
      .src(paths.styles)
      .pipe(sass()) // 处理less文件
      .pipe(autoprefixer()) // 根据browserslistrc增加前缀
      .pipe(cssnano({ zindex: false, reduceIdents: false })) // 压缩
      .pipe(gulp.dest(paths.dest.lib))
      .pipe(gulp.dest(paths.dest.esm))
      .pipe(gulp.dest(paths.dest.dist));
}
const build = gulp.series(compileCJS, compileESM, compileUMD, copyScss, scss2css);

exports.default = build;
