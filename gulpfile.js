const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var imagemin = require('gulp-imagemin');
var cleanCSS = require('gulp-clean-css');

const paths = {
    styles: {
      src: 'src/assets/scss/*.scss',
      dest: 'dist/assets/css/'
    },
    scripts: {
      src: 'src/assets/js/**/*.js',
      dest: 'dist/assets/js/'
    },
    images: {
       src: './src/assets/images/**/*.+(png|jpg|jpeg|gif|svg)',
       dest: './dist/assets/images'
    },
    html: {
       src: './src/**/**.html',
       dest: './dist/'
    }
    
};

const styles = ()=>{
   return gulp.src(paths.styles.src)
      .pipe(sourcemaps.init())
      .pipe(sass({errLogToConsole: true}))
      .pipe(
         autoprefixer({
            browsers: ['last 4 versions'],
            cascade: false,
         }),
      )
      .pipe(
         cleanCSS({ debug: true }, function(details) {
         console.log('=========================================');
         console.log(details.name + ': ' + details.stats.originalSize);
         console.log(details.name + ': ' + details.stats.minifiedSize);
         console.log('=========================================');
         }),
      )
      .pipe(rename({ suffix: '.min' }))
      .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(paths.styles.dest))
      .pipe(gulp.dest('./src/assets/css'))
      .pipe(browserSync.stream())
 }

 const optimiseImages = ()=>{
   return (
     gulp
       .src(paths.images.src)
       .pipe(
         imagemin({
           interlaced: true,
         }),
       )
       .pipe(gulp.dest(paths.images.dest))
   );
 }

const scripts = ()=>{
    return gulp.src([
		'node_modules/bootstrap/dist/js/bootstrap.min.js',
		'node_modules/jquery/dist/jquery.min.js',
      'node_modules/popper.js/dist/umd/popper.min.js',
      paths.scripts.src
	])
   .pipe(gulp.dest(paths.scripts.dest))
	.pipe(browserSync.stream());
}

const watch = ()=>{
    browserSync.init({
		server: './src/'
		// proxy: "project.test/src"
	});

      gulp.watch(paths.scripts.src, scripts);
      gulp.watch(paths.styles.src, styles);
      gulp.watch(paths.html.src, html);

      gulp.watch(paths.scripts.src).on('change', browserSync.reload);
      
      gulp.watch(paths.html.src).on('change', browserSync.reload);
      gulp.watch(paths.html.dest).on('change', browserSync.reload);

      // gulp.watch('./dist/**.php').on('change', browserSync.reload);
   
}

const html = ()=>{
    return gulp.src([paths.html.src,'./src/*.php'])
    .pipe(gulp.dest(paths.html.dest))
    .pipe(browserSync.stream())
}

exports.styles = styles
exports.watch = watch
exports.scripts = scripts
exports.html = html
exports.optimiseImages = optimiseImages

exports.default = gulp.parallel(styles,scripts,html,watch,optimiseImages);

