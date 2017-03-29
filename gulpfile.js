var gulp = require('gulp');
var postcss = require('gulp-postcss');
var sourcemaps = require('gulp-sourcemaps');
var plumber = require('gulp-plumber');
var nextcss = require('postcss-cssnext');
var nested = require('postcss-nested');
var importer = require('postcss-import');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync').create();

gulp.task('css', function () {
  return gulp.src('./src/css/pw-grid.css')
    .pipe( plumber() )
    .pipe( sourcemaps.init() )
    .pipe( postcss([importer, nested, nextcss]) )
    .pipe( sourcemaps.write('.') )
    .pipe( uglify())
    .pipe( gulp.dest('./app/css/') );
});

gulp.task('bs-reload', function () {
  browserSync.reload();
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./src/"
        }
    });
});


gulp.task('sync', ['browser-sync'], function(){
  gulp.watch("src/css/*.css", ['css']);
  gulp.watch("src/*.html", ['bs-reload']);
});

gulp.task('build', ['css',  'sync']);
gulp.task('default', ['build']);
