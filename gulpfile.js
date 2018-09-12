var gulp = require('gulp');
var webpack = require('webpack');
var imagemin = require('gulp-imagemin');
var webpackStream = require('webpack-stream');
var fs = require("fs");
var pug = require('gulp-pug');
var stylus = require('gulp-stylus');
var gulpDeploy = require('gulp-gh-pages');
var browserSync = require('browser-sync').create();
var del = require('del');
var eslint = require('gulp-eslint');
var data = require('gulp-data');
var rename = require('gulp-rename');
var pxtorem = require('gulp-pxtorem');
const debug = require('gulp-debug');
var concatCss = require('gulp-concat-css');
var insert = require('gulp-insert');
const 
  siteSrc = 'src/demo',
  uiKitSrc = 'src/ui-kit',
  uiKitDist = './dist/ui',
  siteDist = './dist/';

function scriptsGeneric(src, dist) {
  return function() {
    return gulp.src(`${src}/app.js`)
    .pipe(webpackStream({
      output: {
        filename: 'app.js',
      },
      module: {
        rules: [
          {
            test: /\.(js)$/,
            exclude: /(node_modules)/,
            loader: 'babel-loader',
            query: {
              presets: ['env']
            }
          }
        ]
      }
    }))
    .pipe(gulp.dest(dist))
  }
}

var scriptsUi = scriptsGeneric(uiKitSrc, uiKitDist); 
var scriptsSite = scriptsGeneric(siteSrc, siteDist); 

function htmlUi() {
  return gulp.src('src/ui-kit/index.pug')
    .pipe(pug({basedir: __dirname}))
    .pipe(gulp.dest('./dist/ui'))
    .pipe(browserSync.stream());
}

function html() {
  return gulp.src('src/demo/pages/**/*.pug')
    .pipe(
      data( function() {
        return { 
          loadJson: 
            function(pathFromRoot) { return JSON.parse(fs.readFileSync(pathFromRoot)) } 
          }
      } 
    ))
    .pipe(pug({basedir: __dirname}))
    .pipe(rename({dirname: ''}))
    .pipe(gulp.dest('./dist/'))
    .pipe(browserSync.stream());
}

function cssGeneric(src, dist) {
  return function() {
    var variableContent = fs.readFileSync(`${src}/variables.styl`, "utf8");
    return gulp.src([`src/components/**/*.styl`,`${src}/**/*.styl`])
    .pipe(insert.transform(function(contents, file) {
      return variableContent + '\n' + contents;       
    }))
    .pipe(stylus({
      'include css': true,
       include: ['node_modules', __dirname],
       define: { 'mobile-break': '640px' }
    }))
    .pipe(pxtorem({propList: ['*']}))
    .pipe(concatCss('styles.css'))
    .pipe(gulp.dest(dist))
    .pipe(browserSync.stream());
  }
}

var cssUi = cssGeneric(uiKitSrc, uiKitDist)
var cssSite = cssGeneric(siteSrc, siteDist)

function img() {
  return gulp.src(['src/images/*.*', 'src/**/*.png'])
    //.pipe(imagemin({verbose: true}))
    .pipe(rename({dirname: ''}))
    .pipe(gulp.dest('./dist/images/'))
    .pipe(browserSync.stream());
}
 
function clean() {
  return del([ 'dist/**' ]);
}

function favicon() {
  return gulp.src('favicon.ico')
  .pipe(gulp.dest('./dist'))
}

function fonts(){
  return gulp.src('src/fonts/*.*')
    .pipe(gulp.dest('dist/fonts'))
}
function lint() {
  return gulp.src(['./src/**/*.js'])
    .pipe(eslint({
      configFile: "./.eslintrc",
      fix: true
    }))
    .pipe(eslint.format());
}

const build = gulp.series(clean, gulp.parallel(html, lint, favicon, htmlUi, cssSite, cssUi, scriptsSite, scriptsUi, img, fonts));

const deploy = gulp.series(build, function () {
  return gulp.src(["./dist/**/*"] )
    .pipe(gulpDeploy()) 
});


const browser = function() {
  browserSync.init({
    server: {
        baseDir: "./"
    }
  });
};

const serve = gulp.series(build, function() {
  browserSync.init({
      server: "./dist"
  });
  gulp.watch("src/**/*.styl", gulp.parallel(cssSite, cssUi));
  gulp.watch("src/**/*.pug", gulp.parallel(html, htmlUi))
  gulp.watch("src/**/*.js", gulp.parallel(scriptsSite, scriptsUi))
  gulp.watch(['images/*.*' ,'src/**/*.png'], img)
  gulp.watch("dist/**/*.*").on('change', browserSync.reload);
});

gulp.task('clean', clean);
gulp.task('lint', lint);
gulp.task('deploy', deploy);
gulp.task('build', build);
gulp.task('default', serve);