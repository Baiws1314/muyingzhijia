var gulp=require("gulp");
var connect=require("gulp-connect");
var sass=require("gulp-sass");
var concat=require("gulp-concat");
var uglify=require("gulp-uglify");
var rename=require("gulp-rename");
var cleanCss=require("gulp-clean-css");
var babel=require("gulp-babel");
gulp.task("copy-html",function(){
	gulp.src("*.html")
	.pipe(gulp.dest("dist"))
	.pipe(connect.reload());
});
gulp.task("copy-css",function(){
	gulp.src("css/*.css")
	.pipe(cleanCss())
	.pipe(gulp.dest("dist/css"));
});
gulp.task("copy-img",function(){
	gulp.src("img/*.{png,jpg}")
	.pipe(gulp.dest("dist/img"));
});
gulp.task("babel",function(){
	gulp.src('js/*.js')
	.pipe(babel({"presets":["es2015"]}))
	.pipe(uglify())
	.pipe(gulp.dest('dist/js'))
});
gulp.task("server",function(){
	connect.server({
		root:"dist",
		livereload:true
	})
});
gulp.task("watch",function(){
	gulp.watch("*.html",["copy-html"]);
	gulp.watch("css/*.css",["copy-css"]);
	gulp.watch("js/*.js",["babel"]);
	gulp.watch("img",["copy-img"]);
});
gulp.task("default",["server","watch"])

