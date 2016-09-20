/* File: gulpfile.js */

// grab our gulp packages
var gulp  = require('gulp'),
    jshint = require('gulp-jshint'),
    gutil = require('gulp-util');

// create a default task and just log a message
gulp.task('default',['watch']);

//Copy html to public folder
gulp.task('copyHtml', function() {
  // copy any html files in source/ to public/
  gulp.src('src/*.html').pipe(gulp.dest('public'));
});

//configure jshint task
gulp.task('jshint',function(){
  return gulp.src('src/custom/js/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

//configure which files to watch and what tasks to run on change
gulp.task('watch',function(){
  gulp.watch('src/custom/js/**/*.js',['jshint']);
});
