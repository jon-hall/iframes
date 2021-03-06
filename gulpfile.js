var gulp = require('gulp');
var jasmine = require('gulp-jasmine');
require("harmonize")();

gulp.task('dev', ['test'], function() {
    gulp.watch(['./src/*.js', './test/*.js'], ['test']);
});

gulp.task('test', function () {
    gulp.src('./test/*.js')
        .pipe(jasmine())
        .on('error', function(err) {
            if(err.message !== 'Tests failed') console.error(err);
        })
        .on('err', function(err) {
            if(err.message !== 'Tests failed') console.error(err);
        });
});
