var gulp = require('gulp');
var uglify = require('gulp-uglify');
var clean = require('gulp-clean');
var line = require('gulp-sequence');

var distPath = './dist';
var srcPath = './src';

gulp.task('copyCommon', function () {
    return gulp.src(['./common/**/*']).pipe(gulp.dest(distPath + '/common/'))
});
gulp.task('copyIndex', function () {
    return gulp.src(['./index.html']).pipe(gulp.dest(distPath + '/'))
});
gulp.task('cleanDist', function () {
    return gulp.src(distPath, {read: false}).pipe(clean());
});

gulp.task('uglifyJs', function () {
    return gulp.src(srcPath + '/**/*.js').pipe(uglify()).pipe(gulp.dest(distPath + '/src/'))
});
gulp.task('copyMd', function () {
    return gulp.src(srcPath + '/**/*.md').pipe(gulp.dest(distPath + '/src/'));
});

gulp.task('default', line('cleanDist', 'copyCommon', 'copyIndex', 'uglifyJs', 'copyMd'));
