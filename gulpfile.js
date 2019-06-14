// gulpfile.js


// Modules
// -------------------------------------------------------

var gulp            = require("gulp");
var sass            = require("gulp-sass");
var postcssimport   = require('postcss-import');
var postcss         = require("gulp-postcss");
var purgecss        = require("gulp-purgecss");
var csso            = require('gulp-csso');
var rename          = require("gulp-rename");
var terser          = require('gulp-terser');
var replace         = require("gulp-replace");
var tailwindcss     = require("tailwindcss");
var browserSync     = require("browser-sync").create();
var dotenv          = require('dotenv').config().parsed;


// Variables
// -------------------------------------------------------

var path = {
        styles: {
            src: "./scss/*.scss",
            dest: "./css"
        },
        tailwind: {
            js: "./tailwind.config.js",
            src: "./twcss/tailwind.css"
        },
        watch: {
            js: "./js/*.js",
            css: "./css/**/*.css",
            scss: "./scss/**/*.scss",
            twcss: "./twcss/*.css",
            twjs: "./tailwind.config.js",
            html: "./**/*.html"
        },
        dest: "./_dist"
    };


// Reload
// -------------------------------------------------------

function reload(done) {
    browserSync.reload();
    done();
}


// Compiling tailwind CSS
// -------------------------------------------------------

function tailwind() {
    return (
        gulp
            .src(path.tailwind.src)
            .pipe(
                postcss([
                    postcssimport(),
                    tailwindcss(path.tailwind.js), 
                    require("autoprefixer")
                ])
            )
            .pipe(gulp.dest(path.styles.dest))
            .pipe(browserSync.stream({once: true}))
    )
}

exports.tailwind = tailwind;


// Styles SCSS TO CSS
// -------------------------------------------------------

function style() {
    return (
        gulp
            .src(path.styles.src)
            .pipe(sass())
            .on("error", sass.logError)
            .pipe(gulp.dest(path.styles.dest))
            .pipe(browserSync.stream({ once: true }))
    )
}

exports.style = style;


// PURGECSS
// -------------------------------------------------------

function purge() {
    return (
        gulp
            .src(path.watch.css)
            .pipe(
                purgecss({
                content: [path.watch.html]
                })
            )
            .pipe(gulp.dest(path.styles.dest))
    )
}

exports.purge = purge;


// Minify tailwind CSS
// -------------------------------------------------------

function mintailwind() {
    return(
        // Minify tailwind CSS
        gulp
            .src('./css/tailwind.css')
            .pipe(csso())
            .pipe(rename("./css/tailwind.min.css"))
            .pipe(gulp.dest(path.dest))
    )
}
exports.mintailwind = mintailwind;


// Minify styles CSS
// -------------------------------------------------------

function minstyles() {
    return(
        gulp
            .src('./css/styles.css')
            .pipe(csso())
            .pipe(rename("./css/styles.min.css"))
            .pipe(gulp.dest(path.dest))
    )
}
exports.minstyles = minstyles;


// Minify JS
// -------------------------------------------------------

function minjs() {
    return(
        gulp
            .src('./js/app.js')
            .pipe(terser({ mangle: true, ecma: 6 }))
            .pipe(rename("./js/app.min.js"))
            .pipe(gulp.dest(path.dest))
    )
}
exports.minjs = minjs;


// Replace import CSS to min.css
// -------------------------------------------------------

function replacecss() {
    return(
        gulp
            .src('./css/app.css')
            .pipe(replace('tailwind.css', 'tailwind.min.css'))
            .pipe(replace('styles.css', 'styles.min.css'))
            .pipe(gulp.dest(path.dest + '/css'))
    )
}
exports.replacecss = replacecss;

// Replace script src JS to app.min.js
// -------------------------------------------------------

function replacejs() {
    return(
        gulp
            .src('./*.html')
            .pipe(replace('/js/app.js', '/js/app.min.js'))
            .pipe(gulp.dest(path.dest))
    )
}
exports.replacejs = replacejs;


// Build process for live production
// -------------------------------------------------------

gulp.task('build', 
        gulp.series(
            gulp.parallel(
                tailwind,
                style
            ),
            purge,
            gulp.parallel(
                mintailwind,
                minstyles,
                minjs,
                replacecss,
                replacejs
            )
        )
);


// Watch
// -------------------------------------------------------

function watch(){

    // Achtung: Browser Cache in Chrome sollte in Dev deaktiviert werden, damit CSS nicht aus dem Cache geladen wird
    // Möglichkeiten: Erweiterung Cache Killer bzw. gulp-cache (noch nichgt getestet) einbinden
    browserSync.init({
        proxy: `https://${dotenv.project_name}.test`,
        https: {
            key: `/Users/${dotenv.username}/.config/valet/Certificates/${dotenv.project_name}.test.key`, 
            cert: `/Users/${dotenv.username}/.config/valet/Certificates/${dotenv.project_name}.test.crt`
        },
       browser: "chrome",
       notify: true,
       open: false,
       port:3000
    });

    gulp.watch([path.watch.twcss, path.watch.twjs], tailwind);
    gulp.watch(path.watch.scss, style);
    gulp.watch([path.watch.js, path.watch.html], reload);
}

exports.watch = watch;
