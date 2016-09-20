/* File: gulpfile.js */

// grab our gulp packages
var gulp      = require('gulp'),
    jshint    = require('gulp-jshint'),
    sass      = require('gulp-sass'),
    sourcemaps= require('gulp-sourcemaps'),
    gutil     = require('gulp-util');

/*Constants*/
var srcSass  =  'src/custom/scss/**/*.scss',
    srcJS    =  'src/custom/js/**/*.js',
    srcHTML  =  'src/*.html',
    pbSass   =  'public/css/',
    pbJS     =  'public/js'
    pbHTML   =  'public'
    ;
// create a default task and just log a message
gulp.task('default',['jshint','watch']);

//Copy html to public folder
gulp.task('copyHtml', function() {
  // copy any html files in source/ to public/
  gulp.src(srcHTML).pipe(gulp.dest(pbHTML));
});

/*JS Hint task*/
//configure jshint task
gulp.task('jshint',function(){
  return gulp.src(srcJS)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});



/*Build Sass*/
//Task to build css from sass files
gulp.task('build-css', function(){
  return  gulp.src(srcSass)
          .pipe(sourcemaps.init())  // Process the original sources
          .pipe(sass())
          .pipe(sourcemaps.write()) // Add the map to modified source
          .pipe(gulp.dest(pbSass));
});

/*Build Javascript*/
gulp.task('build-js', function(){
  return gulp.src(srcJS)
         .pipe(sourcemaps.init())
         .pipe(concat('bundle.js'))
         //only uglify if gulp is ran with '--type production'
         .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop())
         .pipe(sourcemaps.write())
         .pipe(gulp.dest(pbJS));
});


//configure which files to watch and what tasks to run on change
gulp.task('watch',function(){
  gulp.watch(srcJS,['jshint']);
  gulp.watch(srcSass,['build-css']);
  gulp.watch(srcSass,['build-js']);
});


//Deployment
gulp.task('deploy',['copyHtml']);
