var gulp = require('gulp'),
  rename = require('gulp-rename'),
  uglify = require('gulp-uglify'),
  webpack = require('webpack'),
  webpackStream = require('webpack-stream');
  var pug = require('gulp-pug');
  var stylus = require('gulp-stylus');
  var gulpDeploy = require('gulp-gh-pages');
  var browserSync = require('browser-sync').create();
  var del = require('del');


 function scripts () {
  return gulp.src('./src/app.js')
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
    .pipe(gulp.dest('./dist/'))
    //.pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./dist/'));
};

function html() {
  return gulp.src('src/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('./dist/'))
    .pipe(browserSync.stream());
}

function css() {
  return gulp.src('src/styles.styl')
    .pipe(stylus({
      'include css': true,
       include: 'node_modules'
    }))
//    .pipe(minifyCSS())
    .pipe(gulp.dest('./dist/'))
    .pipe(browserSync.stream());
}

function img() {
  return gulp.src('img/*.*')
    .pipe(gulp.dest('./dist/img/'))
}
 
function clean () {
  return del([ 'dist/**/*.*' ]);
}

function fonts(){
  return gulp.src('fonts/*.*')
    .pipe(gulp.dest('dist/fonts'))
}

const build = gulp.series(clean, gulp.parallel(html, css, scripts, img, fonts));

const deploy = gulp.series(build, function () {
  return gulp.src("./dist/**/*")
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

    gulp.watch("src/**/*.styl", css);
    gulp.watch("src/**/*.pug", html)
    gulp.watch("src/**/*.js", scripts)
    gulp.watch("dist/**/*.*").on('change', browserSync.reload);
});

gulp.task('deploy', deploy)
gulp.task('build', build);
gulp.task('default', serve);