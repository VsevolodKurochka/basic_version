/*
 Порядок команд для загрузки на новом ПК.
 1. npm i gulp -g.
 2. npm install --save-dev gulp
 3. npm i gulp-install --save-dev.
 4. npm install.
 5. npm install gulp-jade --save-dev
*/
/* https://gist.github.com/awakekat/22310686c73a96dbaf74 */
var gulp = require('gulp'),
		install = require('gulp-install'),
		jade = require('gulp-jade'),
		sass = require('gulp-sass'),
		browserSync = require('browser-sync'),
		del = require('del'),
		autoprefixer = require('gulp-autoprefixer');

gulp.src(['./package.json'])
  .pipe(install());

gulp.task('sass', function(){
	return gulp.src('app/sass/**/*.scss')
		.pipe(sass({
		 	outputStyle: 'expanded'
	 	}).on('error', sass.logError))
		.pipe(autoprefixer(
			{browsers: ['last 2 versions', 'ie 11', 'Android >= 4.1', 'Safari >= 8', 'iOS >= 8']}
		))
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({stream: true}))
});

// run this task by typing in gulp jade in CLI
gulp.task('jade', function() {
  return gulp.src('app/*.jade')
  	.pipe(jade({
    	pretty: true
    })) // pip to jade plugin
    .pipe(gulp.dest('app/')); // tell gulp our output folder
});

gulp.task('browser-sync', function(){
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	});
});

gulp.task('watch', ['browser-sync', 'jade', 'sass'] ,function(){
	gulp.watch('app/sass/**/*.scss', ['sass']);
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/*.js', browserSync.reload);
	gulp.watch('app/*.jade', ['jade']);
});

gulp.task('clean', function(){
	return del.sync('dist');
});

gulp.task('build', ['clean', 'sass'], function(){
	var buildCss = gulp.src('app/css/style.css')
		.pipe(gulp.dest('dist/css'))

	var buildFonts = gulp.src('app/fonts/**/*')
		.pipe(gulp.dest('dist/fonts'))

	var buildJs = gulp.src('app/js/**/*')
		.pipe(gulp.dest('dist/js'))

	var buildHtml = gulp.src('app/*.html')
		.pipe(gulp.dest('dist'))
});

//If you enter 'gulp', gulp will do 'watch' function
gulp.task('default', ['watch']);

gulp.task('clear', function(){
	return cache.clearAll();
});