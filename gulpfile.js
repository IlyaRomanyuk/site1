const gulp = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const del = require('del');
const less = require('gulp-less');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();


const cssFiles = [
    './src/css/main.scss'
]

const jsFiles = [
    './src/js/main.js'
]

function watch() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch('./src/css/**/*.scss', styles)
    gulp.watch('./src/js/**/*.js', scripts)
    gulp.watch("./*.html").on('change', browserSync.reload);
}

function clean() {
    return del(['build/*'])
}

function styles() {
    return gulp.src(cssFiles)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(concat('style.css'))
    .pipe(cleanCSS({level: 2}))
    .pipe(autoprefixer({
        cascade: false
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./build/css'))
    .pipe(browserSync.stream());
}

function scripts() {
    return gulp.src(jsFiles)
    .pipe(concat('script.js'))
    .pipe(uglify({
        toplevel: true
    }))
    .pipe(gulp.dest('./build/js'))
    .pipe(browserSync.stream());
}

gulp.task('styles', styles);
gulp.task('scripts', scripts);
gulp.task('del', clean);

gulp.task('watch', watch);

gulp.task('build', gulp.series(clean, gulp.parallel(styles,scripts)));

gulp.task('dev', gulp.series('build', 'watch'));