# Project-Stack1
**Starter Projekt für Tailwindcss**

## Software

---

### Tools

- Gulp (Software, basierend auf Node.js, um verschiedene Aufgaben im Webentwicklungsprozess zu automatisieren)
[https://gulpjs.com/](https://gulpjs.com/)
- Gulp-Pakete: 
  * gulp 
  * gulp-sass
  * postcss-import
  * gulp-postcss
  * gulp-purgecss
  * gulp-csso
  * gulp-rename
  * gulp-terser
  * gulp-replace
  * tailwindcss
  * browser-sync
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

 "Install-Befehl" ausführen.

    $ npm install

Alle Pakete werden ****in das Verzeichnis **"node_modules"** installiert.

### 1.1.  Projekt Name anpassen

Falls das Projekt spezifisch mit einem neuen Projekt Namen geklont wurde, braucht man den Projekt-Verzeichnis-Name nicht ändern.
    "git clone https://github.com/Account/repo 'my-project'"

Ansonsten beim klonen des Projekts mittels "git clone https://github.com/Account/repo" wird der Projekt-Verzeichnis-Namen dementsprechend angepasst. 


### 1.2. Projekt mit TLS schützen (https)
    $ cd my-project/
    $ valet secure

### 1.3. index.html und gulpfile.js anpassen

Anstelle von project-stack1 in src den Projektname des neuen Projekts (my-project)
Wenn das Projekt mit valet TSL geschützt wurde, dann das Protokoll demensprechend auch anpassen: http -> https

/index.html

    <script async="" src="http://my-project.test:3000/browser-sync/browser-sync-client.js"></script>


/gulpfile.js

    // aktuelle proxy-url eintragen und falls die Test-Seite über https läuft den key und cert pfad und den username anpassen
    
    browserSync.init({
            proxy: "https://my-project.test",
            https: {
                key: "/Users/username/.config/valet/Certificates/my-project.test.key", 
                cert: "/Users/username/.config/valet/Certificates/my-project.test.crt"
            },
           browser: "chrome",
           notify: true,
           open: false,
           port:3000
        });


### 1.4. Überwachung starten

Im Projekt-Root-Verzeichnis die Überwachung mit "$ gulp watch" starten:

    $ gulp watch

# Live Produktion

---

## 1. PurgeCSS

PurgeCSS entfernt überflüssige Klassen aus  "/css/tailwind.css" und reduziert dadurch extrem die Größe des CSS-Files. Diese Funktion sollte man ausführen, bevor die Seite live geht.

    $ gulp purgecss

## 2. Build

Der build Process ist dafür, bevor die Seite live geht. 
**Vorher PurgeCss ausführen ! ! !**

    $ gulp build

Dieser Prozess besteht aus mehreren Funktionen.

- Minify Prozess
  - CSS
    - tailwind.css
    - styles.css 
  - JS
    - app.js
  - entfernen von allen Kommentare.

Nach der Minimierung wird eine **tailwind.min.css**, **styles.min.css**, **app.min.js**  erstellt.

- Replace Prozess
  - app.css
  
Die imports von **app.css** wird ersetzt und verweist auf die **tailwind.min.css**, **styles.min.css**

---

/app.css

    old
    @import 'tailwind.css';
    @import 'styles.css';

    new
    @import 'tailwind.min.css';
    @import 'styles.min.css';


/index.html

    old
    <!-- SCRIPTS -->
    <script src="/js/app.js"></script>

    new
    <!-- SCRIPTS -->
    <script src="/js/app.min.js"></script>
