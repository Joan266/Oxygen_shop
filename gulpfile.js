const gulp = require('gulp');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const fs = require('fs');

const ensureDistFolder = () => {
  const dirs = [
    'dist'
  ];
  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
};

gulp.task('minify-js', function () {
  ensureDistFolder();
  return gulp.src('src/scripts/**/*.js')
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('minify-css', function () {
  ensureDistFolder();
  return gulp.src('src/styles/**/*.css')
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/css'));
});


gulp.task('update-html-paths', function () {
  ensureDistFolder();
  return gulp.src('src/index.html')
    .pipe(replace(/href="styles\/(.*?)\.css"/g, 'href="css/$1.min.css"'))
    .pipe(replace(/src="scripts\/(.*?)\.js"/g, 'src="js/$1.min.js"'))
    .pipe(gulp.dest('dist'));
});

gulp.task('default', gulp.series('minify-js', 'minify-css', 'update-html-paths'));
