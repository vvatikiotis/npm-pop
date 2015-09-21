var gulp = require('gulp'),
    PATHS = {
        src: {
            html: 'client/**/*.html',
            js: 'client/**/*.js'
        }
    };


gulp.task('default', function() {
    var browserSync = require('browser-sync'),
        reload = browserSync.reload;

    browserSync({
        server: {
            baseDir: 'client'
        }
    });

    gulp.watch(PATHS.src.html).on('change', reload);
    gulp.watch(PATHS.src.js).on('change', reload);
});
