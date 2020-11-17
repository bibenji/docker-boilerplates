var path = require('path');
var gulp = require('gulp');
var less = require('gulp-less');
var rename = require("gulp-rename");
var minifyCSS = require('gulp-minify-css');
var browserify = require('gulp-browserify');
var plumber = require('gulp-plumber');
// var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var Ractive = require('ractive');
var tap = require('gulp-tap');
var gutil = require('gulp-util');

var onError = function(err) {
    gutil.beep();
    console.log(err);
}

gulp.task('css', function() {
    return gulp.src('./src/less/styles.less')
        .pipe(less({
            paths: [ path.join(__dirname, 'less') ]
        }))
        .pipe(gulp.dest('./public/static/css'))
        // .pipe(minifyCSS({keepBreaks:true}))
        // .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./public/static/css'));
});

gulp.task('js', function() {
    // gulp.src('./src/**/*.js')
    return gulp.src('./src/frontend/js/app.js')
        // .pipe(concat('scripts.js'))
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(browserify())
        .pipe(gulp.dest('./public/static/js'))
        // .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./public/static/js'))
});

gulp.task('templates', function() {
    return gulp.src('./src/templates/*.html')
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(tap(function(file, t) {
            var precompiled = Ractive.parse(file.contents.toString());
            precompiled = JSON.stringify(precompiled);
            file.contents = new Buffer('module.exports = ' + precompiled);
        }))
        .pipe(rename(function(path) {
            path.extname = '.js';
        }))
        .pipe(gulp.dest('./public/templates/'))
});

gulp.task('watchers', function() {
    gulp.watch('less/**/*.less', ['css']);
    gulp.watch('src/**/*.js', ['js']);
    gulp.watch('src/templates/**/*.html', ['templates']);
});

gulp.task('default', ['css', 'templates', 'js', 'watchers']);
