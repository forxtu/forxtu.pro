// Include gulp
var gulp = require("gulp");

// Include Our Plugins
var jshint = require("gulp-jshint"),
    sass = require("gulp-sass"),
    concat = require("gulp-concat"),
    uglify = require("gulp-uglify"),
    rename = require("gulp-rename"),
    moreCSS = require("gulp-more-css"),
    //cssnano = require("gulp-cssnano"),
    //jade = require("gulp-jade"),
    browserSync = require('browser-sync');


// Browser Sync
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'dist'
    },
  })
});

// Lint Task
gulp.task("lint", function() {
  return gulp.src("src/js/*.js")
    .pipe(jshint())
    .pipe(jshint.reporter("default"));
});

// Compile Our Sass
gulp.task("sass", function() {
  return gulp.src("src/scss/*.scss")
    .pipe(sass())
   // .pipe(cssnano())
    .pipe(gulp.dest("dist/css"))
    .pipe(browserSync.reload({
      stream: true
    }));
});

// Concatenate & Minify JS
gulp.task("scripts", function() {
  return gulp.src("src/js/*.js")
    .pipe(rename("app.js"))
    .pipe(uglify())
    .pipe(gulp.dest("dist/js"))
    //browser sync
    .pipe(browserSync.reload({
      stream: true
    }));
});

// gulp.task("jade", function() {
//   var locals = new Object();

//   gulp.src("src/*.jade")
//     .pipe(jade({
//       locals: locals
//     }))
//     .pipe(gulp.dest("dist/"))
// });

// Watch Files For Changes
gulp.task("watch", ["browserSync", "sass", "scripts"], function() {
  // Watch .js files
  gulp.watch("src/js/*.js", ["lint", "scripts"]);

  // Watch .scss files
  gulp.watch("src/scss/*.scss", ["sass"]);

  // Watch .jade files
  // gulp.watch("src/*.jade", ["jade"]);

  // Watch .html files
  gulp.watch("dist/*.html", browserSync.reload); 
});

// Default Task
gulp.task("default", ["lint", "sass", "scripts", "watch"]);  //add "jade" if need
