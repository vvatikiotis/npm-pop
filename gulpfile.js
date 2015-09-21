var gulp = require('gulp'),
    del = require('del'),
    plumber = require('gulp-plumber'),
    shell = require('gulp-shell'),
    PATHS = {
        src: {
            html: 'client/**/*.html',
            js: 'client/**/*.js'
        }
    };

gulp.task('clean', function() {
    return del(['dist']);
});

gulp.task('build', ['clean'], function() {
    return gulp.src(PATHS.src.js)
        // .pipe(plumber())
        .pipe(shell([
            'jspm bundle-sfx index.js dist/index.js',
            './node_modules/.bin/uglifyjs dist/index.js -o dist/app.min.js',
            './node_modules/.bin/html-dist client/index.html --remove-all --minify --insert app.min.js -o dist/index.html'
        ]));
});

gulp.task('dev-watch', function() {
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

gulp.task('default', ['dev-watch']);
