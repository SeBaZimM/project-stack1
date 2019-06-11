// gulpfile.js


// Modules
// -------------------------------------------------------

var gulp            = require("gulp");
var sass            = require("gulp-sass");
var postcssimport   = require('postcss-import');
var postcss         = require("gulp-postcss");
var tailwindcss     = require("tailwindcss");
var purgecss        = require("gulp-purgecss");
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
  })



// Watch
// -------------------------------------------------------

function watch(){

    // Achtung: Browser Cache in Chrome sollte in Dev deaktiviert werden, damit CSS nicht aus dem Cache geladen wird
    // Möglichkeiten: Erweiterung Cache Killer bzw. gulp-cache (noch nichgt getestet) einbinden
    browserSync.init({
        proxy: "https://project-stack1.test",
        https: {
            key: "/Users/marco/.config/valet/Certificates/project-stack1.test.key", 
            cert: "/Users/marco/.config/valet/Certificates/project-stack1.test.crt"
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
