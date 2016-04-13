var gulp = require('gulp');
var gulp = require('gulp');
var imageResize = require('gulp-image-resize');

const dpi = {
	ldpi: 120,
	mdpi: 160,
	hdpi: 240,
	xhdpi: 320,
	xxhdpi: 480,
	xxxhdpi: 640
}
var w = 200;
var h = 200;
 
gulp.task('image-resize', function () {

	var dpw = 48;
	var dph = 48;
	var type = 'drawable';
	for (var i in dpi) {
		var w = dpw * (dpi[i]/160);
		var h = dph * (dpi[i]/160);
		console.log(w);
		console.log(h);
		console.log(i);
		resize(w, h, type + "-" + i);
	}
});

gulp.task('default', ['image-resize']);

var resize = function(w, h, dest) {
	gulp.src('src/icon_green.png')
		.pipe(imageResize({ 
			width : w,
			height : h,
			crop : true,
			upscale : false,
			imageMagick : true
		}))
		.pipe(gulp.dest("res/" + dest));
}