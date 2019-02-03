'use strict';

// Load plugins
const gulp = require('gulp');
const del = require('del');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
// 要加裝 babel-preset-env
const babel = require('gulp-babel');
const prettify = require('gulp-prettify');

var css = function() {
  return gulp
    .src('sourse/scss/*.scss')
    .pipe(plumber())
    .pipe(
      sass({
        outputStyle: 'compact',
        includePaths: [''],
      }).on('error', sass.logError)
    )
    .pipe(autoprefixer())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/css'));
};

var js = function() {
  return gulp
    .src('sourse/js/*.js')
    .pipe(plumber())
    .pipe(babel({ presets: ['env'] }))
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(gulp.dest('public/js'));
};

var html = function() {
  return gulp
    .src(['sourse/*.html', 'sourse/**/*.html'])
    .pipe(plumber())
    .pipe(prettify({ indent_size: 2 }))
    .pipe(gulp.dest('public'));
};

var clean = function() {
  return del(['public/include/**', 'public/scss/**']);
};

var watchfile = function() {
  gulp.watch('sourse/scss/*.scss', css);
  gulp.watch('sourse/js/*.js', js);
  gulp.watch(['sourse/*.html', 'sourse/**/*.html'], html);
  gulp.watch(['public'], clean);
};

const watch = gulp.series(clean, gulp.parallel(watchfile));
exports.default = watch;
