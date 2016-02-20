var gulp = require('gulp');
   uglify = require('gulp-uglify');
var concat = require('gulp-concat');  
var rename = require('gulp-rename'); 
var gulpUtil = require('gulp-util');
var inject = require('gulp-inject');


gulp.task('build:dev', function() {
   gulp.src('client/**/*')
      .pipe(gulp.dest('build'))
});

var jsFiles = ['client/scripts/**/*.js', 'client/lib/**/*.js'],  
    jsDest = 'build/scripts',
    statFiles = ['client/css/*', 'client/templates/*', 'client/static/*'];

gulp.task('build-scripts', function() {  
    return gulp.src(jsFiles)
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest(jsDest))
        .pipe(rename('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(jsDest));
});

gulp.task('build-copy', function() {
   return gulp.src(statFiles)
      .pipe(gulp.dest('build'))
});

gulp.task('build-index', function() {
   return gulp.src(statFiles)
      .pipe(gulp.dest('build'))
});

gulp.task('build:prod', ['build-scripts', 'build-copy'], function() {
   gulp.src('client/**/*')
      .pipe(gulp.dest('build'))
});
