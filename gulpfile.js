/* File: gulpfile.js */

// grab our gulp packages
var gulp        = require('gulp'),
    jshint      = require('gulp-jshint'),
    sass        = require('gulp-sass'),
    sourcemaps  = require('gulp-sourcemaps'),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglify'),
    order       = require('gulp-order'),
    print       = require('gulp-print'),
    connect     = require('gulp-connect'),
    watch       = require('gulp-watch'),
    argv        = require('yargs'),
    gutil       = require('gulp-util');

/*Constants*/
var srcSass  =  'src/custom/scss/**/*.scss',
    srcJS    =  'src/custom/js/**/*.js',
    srcHTML  =  'src/*.html',
    srcVendor=  'src/vendor/js/**/*.js',
    srcVP    =  'src/vendor/js/',
    srcVCSS  =  'src/vendor/css/**/*.css',
    srcVImg  =  'src/vendor/css/images/**/*'
    pbSass   =  'public/css/',
    pbJS     =  'public/js',
    pbCustom =  'bundle.js' ,
    pbVendor =  'vendor.js',
    pbVCSS   =  'vendor.css',
    pbVImg   =  'public/css/images'
    pbHTML   =  'public'
    ;

//Copy html to public folder
gulp.task('copyHtml', function() {
  // copy any html files in source/ to public/
  gulp.src(srcHTML).pipe(gulp.dest(pbHTML));
  gulp.src(srcVImg).pipe(gulp.dest(pbVImg));
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

gulp.task('build-v-css', function(){
  return gulp.src(srcVCSS)
         .pipe(sourcemaps.init())
         .pipe(order([
           '*ui*',
           '**/*.css'
         ]))
         //Comment it post development
         //.pipe(print())
         .pipe(concat(pbVCSS))
         .pipe(argv.type === 'production' ? uglify() : gutil.noop())
         .pipe(gulp.dest(pbSass));
});
/*Build Javascript*/
//Build custom
gulp.task('build-js', function(){
  return gulp.src(srcJS)
         .pipe(sourcemaps.init())
         .pipe(concat(pbCustom))
         //only uglify if gulp is ran with '--type production'
         .pipe(argv.type === 'production' ? uglify() : gutil.noop())
         .pipe(sourcemaps.write())
         .pipe(gulp.dest(pbJS));
});

gulp.task('build-v-js',function(){
  return gulp.src(srcVendor)
         .pipe(sourcemaps.init())
         .pipe(order([
          '*moment*',
          '*jquery.js',
          '*ui*',
          '**/*.js'
         ]))
         //Comment it post development
         //.pipe(print())
         .pipe(concat(pbVendor))
         .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop())
         //.pipe(sourcemaps.write())
         .pipe(gulp.dest(pbJS));
});


//configure which files to watch and what tasks to run on change
gulp.task('watch',function(){
  gulp.watch(srcJS,['jshint','build-js']);
  gulp.watch(srcSass,['build-css']);
  gulp.watch(srcHTML,['copyHtml']);
});

//Build
gulp.task('build',['jshint','build-css','build-v-css','build-js','build-v-js','copyHtml']);

//Dev serving
gulp.task('serve',function(){
  connect.server({
    root: [pbHTML],
    livereload: true
  });
});

//Livereload
gulp.task('live-reload',function(){
  return gulp.src([srcJS,srcSass,srcHTML])
      .pipe(watch([srcJS,srcSass,srcHTML]))
      .pipe(connect.reload());
});

//Prod Serving
gulp.task('serve-prod', function() {
  connect.server({
    root: [pbHTML],
    port: process.env.PORT || 5000, // localhost:5000
    livereload: false
  });
});

//Deployment
gulp.task('deploy',['build','serve-prod']);

// create a default task
gulp.task('default',['build','serve','live-reload','watch']);
