var gulp = require('gulp'),
    gutil = require('gulp-util'),
    del = require('del'),
    cached = require('gulp-cached'),
    plumber = require('gulp-plumber'),
    exec = require('child_process').exec,
    PATHS = {
        src: {
            html: 'src/**/*.html',
            js: 'src/**/*.js',
            css: 'src/**/*.css'
        },
        dist: 'dist',
        build: 'build'
    };

////////////////////////////////////
    /// Dev
gulp.task('build-clean', function() {
    return del([PATHS.build + '/**']);
});

gulp.task('html', function() {
    return gulp.src(PATHS.src.html)
        .pipe(gulp.dest(PATHS.build + '/'));
});

gulp.task('js', function() {
    return gulp.src(PATHS.src.js)
        .pipe(gulp.dest(PATHS.build + '/'));
});

gulp.task('css', function() {
    return gulp.src(PATHS.src.css)
        .pipe(gulp.dest(PATHS.build + '/'));
});

gulp.task('dev-watch', ['build-clean', 'html', 'js', 'css'], function() {
    var browserSync = require('browser-sync'),
        reload = browserSync.reload;

    browserSync({
        server: {
            baseDir: PATHS.build
        }
    });

    gulp.watch(PATHS.src.html, ['html']).on('change', reload);
    gulp.watch(PATHS.src.js, ['js']).on('change', reload);
    gulp.watch(PATHS.src.css, ['css']).on('change', reload);
});




////////////////////////////////////
/// Dist
gulp.task('dist-clean', function() {
    return del(['dist']);
});

//FIXME build task correct output but never ends
gulp.task('dist', ['clean'], function() {
    return gulp.src(PATHS.src.js)
        // .pipe(plumber())
        .pipe(shell([
            'jspm bundle-sfx index.js dist/index.js',
        ]));
});


gulp.task('default', ['dev-watch']);
