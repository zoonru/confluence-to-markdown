const gulp = require('gulp')
const coffee = require('gulp-coffee')
const clean = require('gulp-clean')
const terser = require('gulp-terser')


gulp.task('coffee', () =>
	gulp.src('./src/**/*.coffee')
		.pipe(coffee({ bare: true }))
		.pipe(terser())
		.pipe(gulp.dest('./dist')))


gulp.task('clean', () =>
	gulp.src('./dist', { read: false })
		.pipe(clean()))


gulp.task('build', gulp.series(['clean', 'coffee']))
