var gulp = require('gulp'),
    watch = require('gulp-watch'),
    plumber = require('gulp-plumber'),
    connect = require('gulp-connect');


gulp.task('connect' , function() {

	connect.server({
		root: 'app',
		livereload: true
	});
});    

gulp.task('watch',  function() {

	gulp.watch(['app/*.html'], ['html']);

});

gulp.task('html', function() {

	gulp.src('app/*.html').pipe(connect.reload());
});

gulp.task('default', ['connect', 'watch']);