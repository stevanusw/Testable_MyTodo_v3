/// <binding AfterBuild='default' />
var gulp = require('gulp');

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var karma = require('gulp-karma');

var paths = {
    src: [
       'scripts/src/*.js'
    ],
    testsRelease: [
        'scripts/libs/jquery.min.js',
        'scripts/libs/jquery-ui.min.js',
        'scripts/libs/lodash.min.js',
        'scripts/libs/postal.min.js',
        'scripts/libs/bootstrap.min.js',
        'scripts/libs/knockout-latest.js',
        'scripts/dist/mytodo.min.js',
        'scripts/tests/*_Specs.js'
    ],
    testsDebug: [
        'scripts/libs/jquery.min.js',
        'scripts/libs/jquery-ui.min.js',
        'scripts/libs/lodash.min.js',
        'scripts/libs/postal.min.js',
        'scripts/libs/bootstrap.min.js',
        'scripts/libs/knockout-latest.js',
        'scripts/src/*.js',
        'scripts/tests/*_Specs.js'
    ]
};

gulp.task('debug', function () {
    return gulp.src(paths.src);    
});

gulp.task('release', function () {
    return gulp.src(paths.src)
        .pipe(concat('mytodo.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('scripts/dist'));
});

gulp.task("testsRelease", function () {
    return gulp.src(paths.testsRelease)
        .pipe(karma({
            configFile: "karma.release.js",
            action: "run"
        }));
});

gulp.task("testsDebug", function () {
    return gulp.src(paths.testsDebug)
        .pipe(karma({
            configFile: "karma.debug.js",
            action: "run"
        }));
});

gulp.task('build', gulp.series('debug', 'testsDebug', 'release', 'testsRelease'));

gulp.task('default', gulp.parallel('build'));