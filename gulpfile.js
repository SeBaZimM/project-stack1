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

gulp.task('purgecss', () => {
    return gulp
      .src(path.watch.css)
      .pipe(
        purgecss({
          content: [path.watch.html]
        })
      )
      .pipe(gulp.dest(path.styles.dest))
    }
);


// Build process for live production
// -------------------------------------------------------

gulp.task('build', () => {
    return ( 
        // Minify tailwind CSS
        gulp
            .src('./css/tailwind.css')
            .pipe(csso())
            .pipe(rename("./css/tailwind.min.css"))
            .pipe(gulp.dest('./'))
        ,

        // Minify styles CSS
        gulp
            .src('./css/styles.css')
            .pipe(csso())
            .pipe(rename("./css/styles.min.css"))
            .pipe(gulp.dest('./'))
        ,

        // Minify app JS
        gulp
            .src('./js/app.js')
            .pipe(terser({ mangle: true, ecma: 6 }))
            .pipe(rename("./js/app.min.js"))
            .pipe(gulp.dest('./'))
        ,

        // Replace import CSS to min.css
        gulp
            .src('./css/app.css')
            .pipe(replace('tailwind.css', 'tailwind.min.css'))
            .pipe(replace('styles.css', 'styles.min.css'))
            .pipe(gulp.dest('./css'))
        ,

        // Replace script src JS to app.min.js
        gulp
            .src('./*.html')
            .pipe(replace('/js/app.js', '/js/app.min.js'))
            .pipe(gulp.dest('./'))
    )
});



// Replace the reference in app.css and *.html files
// -------------------------------------------------------




// Watch
// -------------------------------------------------------

function watch(){

    // Achtung: Browser Cache in Chrome sollte in Dev deaktiviert werden, damit CSS nicht aus dem Cache geladen wird
    // Möglichkeiten: Erweiterung Cache Killer bzw. gulp-cache (noch nichgt getestet) einbinden
    browserSync.init({
        proxy: "https://my-project.test",
        https: {
            key: "/Users/sebastianzimmermann/.config/valet/Certificates/my-project.test.key", 
            cert: "/Users/sebastianzimmermann/.config/valet/Certificates/my-project.test.crt"
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
