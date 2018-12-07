var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var sass = require("gulp-sass");
var minifyCSS = require('gulp-csso');
const imagemin = require('gulp-imagemin');
var inlineImages = require('gulp-inline-images');
var livereload = require('gulp-livereload');
// var htmlreplace = require('gulp-html-replace');
// var rename = require('gulp-rename');
// var replace = require('gulp-replace');

// For html minification
gulp.task('html', function() {
    return gulp.src('src/index.html')
        // .pipe(htmlreplace({'css': 'stylesheet.min.css'}))
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist'))
});

// Compiles the scss file and minifies the css
gulp.task('css', function() {
   return gulp.src('src/stylesheet.scss')
       .pipe(sass())
       .pipe(minifyCSS())
       // .pipe(rename('stylesheet.min.css'))
       .pipe(gulp.dest('dist'))
});

// This is not needed because all the images are made inline
gulp.task('favicon', function() {
   gulp.src('src/favicon.png')
       .pipe(imagemin())
       .pipe(gulp.dest('dist'));
});

// To insert the image as base64 within html
gulp.task('inline-images', function(){
    return gulp.src('src/index.html')
        .pipe(inlineImages({/* options */}))
        .pipe(gulp.dest('dist'));
});

// gulp.task('replace-html', function() {
//     return gulp.src('src/index.html')
//         .pipe(htmlreplace({'css': 'stylesheet.min.css'}));
// });

gulp.task('default', ['html', 'css', 'inline-images', 'favicon']);


gulp.task('watch-dist', function() {
    // Generate development css
    gulp.start('css');
    livereload.listen();
    gulp.watch('src/*.scss', ['css']);
    gulp.watch('src/index.html', ['html']);
});

gulp.task('css-dev', function() {
    return gulp.src('src/stylesheet.scss')
        .pipe(sass())
        .pipe(gulp.dest('src'))
});
gulp.task('watch', function() {
    // Generate development css
    gulp.start('css-dev');
    livereload.listen({port: 5678});
    gulp.watch('src/*.scss', ['css-dev'])
});