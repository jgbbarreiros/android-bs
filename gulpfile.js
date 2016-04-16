var gulp = require('gulp');
var imageResize = require('gulp-image-resize');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var prompt = require('prompt');

const dpi = {
	ldpi: 120,
	mdpi: 160,
	hdpi: 240,
	xhdpi: 320,
	xxhdpi: 480,
	xxxhdpi: 640}

gulp.task('default', ['html', 'styles', 'scripts', 'browser-sync', 'watch']);

gulp.task('html', function () {
	gulp.src('app/**/*.html')
		.pipe(reload({stream: true}));});

gulp.task('styles', function () {
	gulp.src('app/**/*.css')
		.pipe(reload({stream: true}));});

gulp.task('scripts', function () {
	gulp.src('app/**/*.js')
		.pipe(reload({stream: true}));});

gulp.task('browser-sync', function () {
	browserSync({
		server: {
			baseDir: 'app',
			routes: {
        "/bower_components": "bower_components"
      }
		}
	});});

gulp.task('watch', function () {
	gulp.watch('app/**/*.html', ['html']);
	gulp.watch('app/js/**/*.js', ['scripts']);
	gulp.watch('app/css/**/*.css', ['styles']);});

var resize = function(w, h, dest) {
	gulp.src('src/*.{png,jpg,jpeg,gif}')
		.pipe(imageResize({ 
			width : w,
			height : h,
			crop : true,
			upscale : false,
			imageMagick : true
		}))
		.pipe(gulp.dest("res/" + dest));}

gulp.task('image-resize', function () {
	prompt.start();
	prompt.get(['dpw', 'dph', 'type'], function (err, result) {
		for (var i in dpi) {
			var w = result.dpw * (dpi[i]/160);
			var h = result.dph * (dpi[i]/160);
			resize(w, h, result.type + "-" + i);
		}
	});});