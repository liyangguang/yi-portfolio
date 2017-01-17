'use strict';

var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');

// css
var postcss = require('gulp-postcss');
var concat = require('gulp-concat');
var cssimport = require("gulp-cssimport");

// jade
var pug = require('gulp-pug');

// js
var iife = require('gulp-iife');
var babel = require('gulp-babel');

// reload
var browserSync = require('browser-sync');

gulp.task('build-html', function() {
  return gulp.src('dev/**/*.jade')
    .pipe(pug({pretty: true}))
    .pipe(gulp.dest('app'));
});

gulp.task('build-css', function() {
  return gulp.src([
      'dev/**/*.css',
      '!dev/css/common.css',
    ])
    .pipe(sourcemaps.init())
    .pipe(cssimport())
    .pipe(postcss([
      require('postcss-import'),
      require('postcss-short'),
      require('postcss-cssnext'),
      require('cssnano')
    ]))
    // .pipe(concat('style.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('app'));
});

gulp.task('build-js', function() {
  return gulp.src(['dev/**/*.js'])
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(concat('script.js'))
    .pipe(iife({useStrict: true}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('app/js'));
});

gulp.task('serve', ['build-html', 'build-css', 'build-js'], function() {
  browserSync({
    server: {
      baseDir: 'app'
    }
  });

  gulp.watch(['dev/**/*.css'], ['build-css']);
  gulp.watch(['dev/**/*.js'], ['build-js']);
  gulp.watch(['dev/**/*.jade'], ['build-html']);
  gulp.watch('app/**/*.*').on('change', browserSync.reload);
});


gulp.task('default', ['serve']);
