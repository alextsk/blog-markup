var gulp = require('gulp'),
  rename = require('gulp-rename'),
  uglify = require('gulp-uglify'),
  webpack = require('webpack'),
  imagemin = require('gulp-imagemin'),
  webpackStream = require('webpack-stream');
  var pug = require('gulp-pug');
  var stylus = require('gulp-stylus');
  var gulpDeploy = require('gulp-gh-pages');
  var browserSync = require('browser-sync').create();
  var del = require('del');

const 
  sitePath= 'src/demo',
  uiKitPath= 'src/ui-kit'

function scriptsUi () {
  return gulp.src(`src/ui-kit/app.js`)
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
    .pipe(gulp.dest('./dist/ui/'))
};

function scripts () {
  return gulp.src(`src/demo/app.js`)
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
   // .pipe(rename({ suffix: '.min' }))
   // .pipe(gulp.dest('./dist/'));
};

function htmlUi() {
  //return gulp.src(`${uiKitPath}/index.pug`)
  return gulp.src('src/ui-kit/index.pug')
    .pipe(pug({basedir: __dirname}))
    .pipe(gulp.dest('./dist/ui'))
    .pipe(browserSync.stream());
}

function html() {
  //return gulp.src(`${sitePath}/index.pug`)
  return gulp.src('src/demo/*.pug')
    .pipe(pug({basedir: __dirname}))
    .pipe(gulp.dest('./dist/'))
    .pipe(browserSync.stream());
}

function cssUi() {
  return gulp.src(`${uiKitPath}/styles.styl`)
    .pipe(stylus({
      'include css': true,
       include: ['node_modules', __dirname]
    }))
//    .pipe(minifyCSS())
    .pipe(gulp.dest('./dist/ui'))
    .pipe(browserSync.stream());
}

function css() {
  return gulp.src(`${sitePath}/styles.styl`)
    .pipe(stylus({
      'include css': true,
       include: ['node_modules', __dirname]
    }))
//    .pipe(minifyCSS())
    .pipe(gulp.dest('./dist/'))
    .pipe(browserSync.stream());
}

function img() {
  return gulp.src('images/*.*')
    .pipe(imagemin({verbose: true}))
    .pipe(gulp.dest('./dist/images/'))
}
 
function clean() {
  return del([ 'dist/**/*.*' ]);
}

function favicon() {
  return gulp.src('favicon.ico')
  .pipe(gulp.dest('./dist'))
}

function fonts(){
  return gulp.src('fonts/*.*')
    .pipe(gulp.dest('dist/fonts'))
}

const build = gulp.series(clean, gulp.parallel(html, favicon, htmlUi, css, cssUi, scripts,scriptsUi, img, fonts));

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

  gulp.watch("src/**/*.styl", gulp.parallel(css, cssUi));
  gulp.watch("src/**/*.pug", gulp.parallel(html, htmlUi))
  gulp.watch("src/**/*.js", gulp.parallel(scripts, scriptsUi))
  gulp.watch("images/*.*", img)
  gulp.watch("dist/**/*.*").on('change', browserSync.reload);

});

gulp.task('deploy', deploy)
gulp.task('build', build);
gulp.task('default', serve);