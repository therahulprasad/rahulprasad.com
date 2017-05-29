var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var sass = require("gulp-sass");
var minifyCSS = require('gulp-csso');
const imagemin = require('gulp-imagemin');
var inlineImages = require('gulp-inline-images');
var livereload = require('gulp-livereload');

// For html minification
gulp.task('html', function() {
    return gulp.src('src/index.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist'))
});

// Compiles the scss file and minifies the css
gulp.task('css', function() {
   return gulp.src('src/stylesheet.scss')
       .pipe(sass())
       .pipe(minifyCSS())
       .pipe(gulp.dest('dist'))
});

// This is not needed because all the images are made inline
gulp.task('image', function() {
   gulp.src('src/img/*')
       .pipe(imagemin())
       .pipe(gulp.dest('dist/img'))
});

// To insert the image as base64 within html
gulp.task('inline-images', function(){
    return gulp.src('src/index.html')
        .pipe(inlineImages({/* options */}))
        .pipe(gulp.dest('dist'));
});

gulp.task('default', ['html', 'css', 'inline-images']);


gulp.task('watch-dist', function() {
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
    livereload.listen();
    gulp.watch('src/*.scss', ['css-dev'])
});