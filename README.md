# project-stack1
Starter Projekt für Tailwindcss

## Software

---

### Tools

- Gulp (Software, basierend auf Node.js, um verschiedene Aufgaben im Webentwicklungsprozess zu automatisieren)
[https://gulpjs.com/](https://gulpjs.com/)
 * Gulp-Pakete: 
 * gulp 
 * browser-sync
 * gulp-postcss
 * gulp-sass
 * postcss-import
 * gulp-purgecss
 * tailwindcss
- Tailwind (A utility-first CSS framework for rapidly building custom designs.)
[https://tailwindcss.com/](https://tailwindcss.com/)

### Vanilla JS-Plugins

- Flickity (Touch, responsive, flickable carousels)
[https://flickity.metafizzy.co/](https://flickity.metafizzy.co/)
- Lightgallery (Full featured javascript lightbox gallery, No dependencies.)
[https://sachinchoolur.github.io/lightgallery.js/](https://sachinchoolur.github.io/lightgallery.js/)

# Installation

---

## 0. Gulp-CLI

Um Gulp für ein Projekt nutzen zu könne, muss die Gulp-CLI einmalig global installiert sein. 

    # Check Gulp-Version
    $ gulp --version
    
    # Install Gulp-CLI
    $ npm install --global gulp-cli

## 1.  Installation Gulp-Projekt

Bei der Einbindung einer **Gulp-Projektvorlage** (mit **package.json, gulpfile.js** und **ohne node_modules**) wird die Installation von allen benötigten Modulen einfach mit "npm install" ausgeführt. 

### 1.1.  Projekt anlegen

Projekt in den Web-Root clonen.

    $ cd websites/
    $ git clone https://github.com/github_Account/project-stack1.git

Projekt-Verzeichnis-Namen anpassen. 


### 1.2. Projekt mit TLS schützen (https)
    $ cd project-stack1/
    $ valet secure

### 1.3.  Projekt anpassen

Anstelle von project-stack1 in src den Projektname des neuen Projekts

/index.html

    <script async="" src="http://project-stack1.test:3000/browser-sync/browser-sync-client.js"></script>

    
Anstelle von project-stack1 in proxy, key und cert den Projektname des neuen Projekts

/gulpfile.js

    // aktuelle proxy-url eintragen und falls die Test-Seite über https läuft den key und cert pfad anpassen
    
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

### 1.4.  Gulp Pakete installieren

 "Install-Befehl" ausführen.

    $ npm install

Alle Pakete werden ****in das Verzeichnis **"node_modules"** installiert.

### 1.5.  Überwachung starten

Im Projekt-Root-Verzeichnis die Überwachung mit "$ gulp watch" starten:

    $ gulp watch

### 1.6 PurgeCSS

PurgeCSS entfernt überflüssige Klassen aus  "/css/tailwind.css" und reduziert dadurch extrem die Größe des CSS-Files. Diese Funktion sollte man ausführen, bevor die Seite live geht.

    $ gulp purgecss

## 2. Installation Project Stack 1 from scratch

### 2.1.  Projektfolder anlegen

 In die Webroot wechseln und Projekt-Verzeichnis anlegen z.B. "project-stack1"

    $ mkdir project-stack1

### 2.2.  Verzeichnisse und Dateien anlegen

- project-stack1

/index.html

    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Project Stack 1</title>
    
        <!-- STYLES -->
        <link rel="stylesheet" href="/css/app.css">
    
    </head>
    <body>
        
        <h1 class="text-blue-500 text-6xl">Project Stack 1</h1>
    
        <button class="btn-blue">
            Button
        </button>
    
        <!-- SCRIPTS -->
        <script src="/js/app.js"></script>
        <script async="" src="https://project-stack1.test:3000/browser-sync/browser-sync-client.js"></script>
    
    </body>
    </html>

### 2.3.  Gulp-Pakete installieren und konfigurieren

2.3.1.  Ins **Projektverzeichnis** wechseln: 

    $ cd project-stack1

2.3.2.  "**package.json**" erstellen:

    $ npm init

2.3.3.  **Gulp Packete** als **devDependencies** installieren:

    $ npm install --save-dev gulp gulp-sass gulp-postcss postcss-import browser-sync autoprefixer tailwindcss

Pakete: gulp - autoprefixer, browser-sync, gulp-postcss, gulp-sass, postcss-import, gulp-purgecss, tailwindcss

2.3.4.  **gulpfile.js** erstellen und folgenden Inhalt einfügen und **browserSync.init()** "proxy" und "https" Anpassungen vornehmen:

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

### 2.4.  TailwindCSS einbinden

2.4.1.  Minimale **tailwind.config.js** erstellen 

    npx tailwind init

    // tailwind.config.js
    module.exports = {
      theme: {},
      variants: {},
      plugins: [],
    }

oder eine komplette config-Datei mit

    npx tailwind init --full

2.4.2. Tailwind-css-Dateien

/twcss/tailwind.css

    @import "tailwindcss/base";
    @import "tailwindcss/components";
    @import "tailwind-custom";
    @import "tailwindcss/utilities";

/twcss/tailwind-custom.css

    /* Tailwind-Test-Styles  */
    .btn-blue {
        @apply bg-blue-500 text-white font-bold py-2 px-4 rounded;
    }
    
    .btn-blue:hover {
        @apply bg-blue-700;
    }

### 2.5.  Überwachung starten

Im Projekt-Root-Verzeichnis die Überwachung mit "$ gulp watch" starten:

    $ gulp watch

### 2.6 PurgeCSS

PurgeCSS entfernt überflüssige Klassen aus  "/css/tailwind.css" und reduziert dadurch extrem die Größe des CSS-Files. Diese Funktion sollte man ausführen, bevor die Seite live geht.

    $ gulp purgecss
