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
  * dotenv
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

Alle Pakete werden **in das Verzeichnis "node_modules"** installiert.

### 1.1.  Projekt Name anpassen

Falls das Projekt spezifisch mit einem neuen Projekt Namen geklont wurde, braucht man den Projekt-Verzeichnis-Name nicht ändern.
    "git clone git@github.com:'github_account'/repo.git 'my-project'"

Ansonsten beim klonen des Projekts mittels "git clone git@github.com:'github_account'/repo.git" wird der Projekt-Verzeichnis-Namen dementsprechend angepasst. 


### 1.2. Projekt mit TLS schützen (https)
    $ cd my-project/
    $ valet secure

### 1.3. Enviroment Variablen Erstellen

Wenn mehrere Entwickler am Projekt arbeiten, muss man immer die gulpfile.js (o.ä) für seine Umgebung anpassen. Hierbei hilft es sehr einmalig für das Projekt eine .env Datei zu erstellen, die die Umgebungsvariablen, wie username bereitstellt.

/.env

    username="dein mac username"
    project_name="der Projektname"

### 1.4. index.html anpassen

Anstelle von project-stack1 in src den Projektname des neuen Projekts (my-project)
Wenn das Projekt mit valet TSL geschützt wurde, dann das Protokoll demensprechend auch anpassen: http -> https

/index.html

    <script async="" src="http://my-project.test:3000/browser-sync/browser-sync-client.js"></script>


### 1.5. Überwachung starten

Im Projekt-Root-Verzeichnis die Überwachung mit "$ gulp watch" starten:

    $ gulp watch

#### Hinweis

Beim erstenmal Aufrufen der Seite im Browser ist kein CSS import vorhanden. 

    /css
    |- app.css

Erst bei einer Änderung in der tailwind-custom.css oder styles.css werden die benötigten **/css/tailwind.css** und **/css/styles.css** erstellt.

    /css
    |- app.css
    |- styles.css
    |- tailwind.css

##### Alternativ kann man die auch mit Gulp erstellen lassen:

    $ gulp tailwind
    $ gulp style

oder beide auf einmal:

    $ gulp tailwind && gulp style

# Live Produktion

---

## 1. Build

Diese Funktion sollte man ausführen, bevor die Seite live geht.

    $ gulp purgecss

**Dieser Prozess besteht aus mehreren Prozesse.**

- Compile CSS Prozess
  - tailwind.css
  - styles.css

Beim Start des Build-Prozess werden nochmals die CSS kompaliert, um auch alle änderungen von CSS zu übernehmen,

- Purge CSS Prozess
  - tailwind.css
  - styles.css

Purge entfernt überflüssige Klassen aus **tailwind.css** **styles.css**  und reduziert dadurch extrem die Größe der CSS-Files.

- Minify Prozess
  - CSS
    - tailwind.css
    - styles.css 
  - JS
    - app.js
  - entfernen von allen Kommentare.

Nach der Minimierung wird eine **tailwind.min.css**, **styles.min.css**, **app.min.js** in *_dest_* Ordner gespeichert.

- Replace Prozess
  - app.css
  - *.html
  
Die imports von **app.css** wird ersetzt und verweist auf die **tailwind.min.css**, **styles.min.css** die in *_dest_* Ordner gespeichert werden.
Alle verweise auf Javascript Dateien werden ebenfalls in den einzelnen HTML Datein durch **/js/app.min.js** ersetzt und in *_dest* Ordner gespeichert

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
