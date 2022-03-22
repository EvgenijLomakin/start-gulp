// Определяем константы Gulp
const { src, dest, watch, parallel }     = require('gulp');
const scss              = require('gulp-sass')(require('sass'));
const concat            = require('gulp-concat');
const browserSync       = require('browser-sync').create();
const reload            = browserSync.reload;
// Указываем папку с сырцами (разработчика)
const server_site_url = 'app-start';
const source_dir        = 'source/';
const source_path       = {
    'scss' : source_dir + 'scss/style.scss',
}
//const public_dir = 'public/'; // Указываем папку сервера
const public_dir = 'public/';
const public_path = {
    'php' : public_dir,
    'css' : public_dir + 'css/',
}

function browsersync() {
    browserSync.init({
        proxy: server_site_url,
        notify: false
    });
}

function styles() {
    return src(source_path.scss)
        .pipe(scss({outputStyle: 'compressed'}))
        .pipe(concat('style.min.css'))
        .pipe(dest(public_path.css))
        .pipe(browserSync.stream())
}

// gulp.watch("*.html").on("change", reload);
function watching() {
    watch([source_dir + 'scss/**/*.scss'], styles);
    watch(public_dir + '**/*.php').on('change', browserSync.reload);
    watch(public_dir + "**/*.html").on('change', browserSync.reload);
}

exports.styles = styles;
exports.watching = watching;
exports.browsersync = browsersync;
 
exports.default = parallel(browsersync, watching);