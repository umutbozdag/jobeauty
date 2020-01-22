const gulp = require('gulp')
const browserSync = require('browser-sync').create()
const sass = require('gulp-sass')
const reload = browserSync.reload

gulp.task('browser-sync', function () {
    browserSync.init({
        notify: false,
        server: {
            baseDir: './'
        }
    })
    gulp.watch('./scss/**/*.scss', gulp.series('css'))
    gulp.watch('./js/**/*.js', reload)

})

gulp.task('css', () => {
    return gulp.src('./scss/main.scss')
        .pipe(sass())
        .pipe(gulp.dest('./'))
        .pipe(browserSync.stream())
})

gulp.task('default', gulp.series('css', 'browser-sync'));