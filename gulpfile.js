'use strict';

var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');

// css
var postcss = require('gulp-postcss');
var concat = require('gulp-concat');
var autoprefixer = require('autoprefixer');
var cssimport = require('postcss-import')
var cssnext = require('postcss-cssnext')

// pug
var pug = require('gulp-pug');

// js
var iife = require('gulp-iife');
var babel = require('gulp-babel');

// reload
var browserSync = require('browser-sync');

gulp.task('build-html', function() {
  return gulp.src(['dev/**/*.pug', '!dev/_*.pug'])
    .pipe(pug({pretty: true}))
    .pipe(gulp.dest('app'));
});

gulp.task('build-css', function() {
  return gulp.src(['dev/css/*.postcss'])
    .pipe(sourcemaps.init())
    .pipe(postcss([
      cssimport(),
      cssnext(),
      autoprefixer({browsers: ['> 5%']})
      // require('cssnano')
    ]))
    .pipe(concat('styles.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('app/css'));
});

gulp.task('build-js', function() {
  return gulp.src(['dev/**/*.js'])
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(concat('scripts.js'))
    // .pipe(iife({useStrict: true}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('app/js'));
});

gulp.task('serve', ['build-html', 'build-css', 'build-js'], function() {
  browserSync({
    server: {
      baseDir: 'app'
    }
  });

  gulp.watch(['dev/**/*.postcss'], ['build-css']);
  gulp.watch(['dev/**/*.js'], ['build-js']);
  gulp.watch(['dev/**/*.pug'], ['build-html']);
  gulp.watch('app/**/*.*').on('change', browserSync.reload);
});


gulp.task('default', ['serve']);
