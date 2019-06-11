// gulpfile.js


// Modules
// -------------------------------------------------------

var gulp            = require("gulp");
var csso            = require('gulp-csso');
var sass            = require("gulp-sass");
var rename          = require("gulp-rename");
var terser          = require('gulp-terser');
var tailwindcss     = require("tailwindcss");
var postcss         = require("gulp-postcss");
var replace         = require("gulp-replace");
var purgecss        = require("gulp-purgecss");
var postcssimport   = require('postcss-import');
var browserSync     = require("browser-sync").create();


// Variables
// -------------------------------------------------------

var path = {
    styles: {
        src: "./scss/*.scss",
        dest: "./css"
    },
    tailwind: {
        js: "./tailwind.config.js",
        src: "./twcss/tailwind.css",
        dest: "./css"
    },
    build: {
        css: "./css/app.css",
        js: "./js/app.js",
        html: "./*.html",
        dest: "./_dest"
    },
    watch: {
        js: "./js/*.js",
        scss: "./scss/**/*.scss",
        twcss: "./twcss/*.css",
        twjs: "./tailwind.config.js",
        html: "./**/*.html"
    }
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
            .pipe(gulp.dest(path.tailwind.dest))
            .pipe(browserSync.stream({once: true}))
    );
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
            .pipe(browserSync.stream({once: true}))
    );
}

exports.style = style;


// purge => Removes unnecessary css
// -------------------------------------------------------

class TailwindExtractor {
    static extract(content) {
        return content.match(/[A-z0-9-:\/]+/g) || [];
    }
}

function purge() {
    return (
        gulp
            .src('./css/*.css')
            .pipe(
                purgecss({
                    content: ['./*.html'],
                    extractors: [
                        {
                            extractor: TailwindExtractor,
                            extensions: ['html']
                        }
                    ],
                    whitelist: []
                })
            )
            .pipe(gulp.dest('./css'))
    )
}

exports.purge = purge;


// Minify tailwind.css to tailwind.min.css
// -------------------------------------------------------

function mintwcss() {
    return (
        gulp
            .src('./css/tailwind.css')
            .pipe(csso())
            .pipe(rename("./css/tailwind.min.css"))
            .pipe(gulp.dest(path.build.dest))
    )
}

exports.mintwcss = mintwcss;


// Minify style.css to style.min.css
// -------------------------------------------------------

function minstyles() {
    return (
        gulp
            .src('./css/styles.css')
            .pipe(csso())
            .pipe(rename("./css/styles.min.css"))
            .pipe(gulp.dest(path.build.dest))
    )
}

exports.minstyles = minstyles;


// Minify app.js to app.min.js
// -------------------------------------------------------

function minjs() {
    return (
        gulp
            .src('./js/app.js')
            .pipe(
                terser(
                    { 
                        mangle: true, 
                        ecma: 6 
                    }
                )
            )
            .pipe(rename("./js/app.min.js"))
            .pipe(gulp.dest(path.build.dest))
    )
}

exports.minjs = minjs;


// Replaced the imports *.css to *.min.css
// -------------------------------------------------------

function cssreplace() {
    return (
        gulp
            .src(path.build.css)
            .pipe(replace('"tailwind.css"', '"tailwind.min.css"'))
            .pipe(replace('"styles.css"', '"styles.min.css"'))
            .pipe(gulp.dest(path.build.dest + "/css"))
    )
}

exports.cssreplace = cssreplace;


// Replaced the import *.js to *.min.js in html
// -------------------------------------------------------

function jsreplace() {
    return (
        gulp
            .src(path.build.html)
            .pipe(replace('"/js/app.js"', '"/js/app.min.js"'))
            .pipe(gulp.dest(path.build.dest))
    )
}

exports.jsreplace = jsreplace;


// Compile Process for CSS / SCSS
// -------------------------------------------------------

gulp.task('compile', 
    gulp.parallel(
        tailwind, 
        style
    )
)


// Minifyprocess for CSS and JS
// -------------------------------------------------------

gulp.task('compress', 
    gulp.parallel(
        mintwcss, 
        minstyles, 
        minjs
    )
)


// Replace process
// -------------------------------------------------------

gulp.task('replace', 
    gulp.parallel(
        cssreplace, 
        jsreplace
    )
)


// Build process for live production
// -------------------------------------------------------

gulp.task('build', 
    gulp.series(
        purge,
        gulp.parallel(
            mintwcss, 
            minstyles, 
            minjs,
            cssreplace,
            jsreplace
        )
    )
)


// Watch
// -------------------------------------------------------

function watch() {

    // Achtung: Browser Cache in Chrome sollte in Dev deaktiviert werden, damit CSS nicht aus dem Cache geladen wird
    // Möglichkeiten: Erweiterung Cache Killer bzw. gulp-cache (noch nichgt getestet) einbinden
    browserSync.init({
        proxy: "https://project-stack1.test",
        https: {
            key: "/Users/username/.config/valet/Certificates/project-stack1.test.key", 
            cert: "/Users/username/.config/valet/Certificates/project-stack1.test.crt"
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
