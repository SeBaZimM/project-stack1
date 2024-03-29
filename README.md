# Project-Stack1
**Starter Projekt für Tailwindcss**

---

# Inhaltsverzeichniss
- [Project-Stack1](#project-stack1)
- [Inhaltsverzeichniss](#inhaltsverzeichniss)
  - [Software](#software)
    - [Tools](#tools)
    - [Vanilla JS-Plugins](#vanilla-js-plugins)
- [Installation](#installation)
  - [0. Gulp-CLI](#0-gulp-cli)
  - [1. Installation Gulp-Projekt](#1-installation-gulp-projekt)
    - [1.1. Projekt Name anpassen](#11-projekt-name-anpassen)
    - [1.2. Projekt mit TLS schützen (https)](#12-projekt-mit-tls-sch%C3%BCtzen-https)
    - [1.3. Enviroment Variablen erstellen](#13-enviroment-variablen-erstellen)
    - [1.4. index.html anpassen](#14-indexhtml-anpassen)
    - [1.5. Überwachung starten](#15-%C3%BCberwachung-starten)
    - [Hinweis](#hinweis)
- [Live Produktion](#live-produktion)
  - [1. Build](#1-build)

---

## Software

### Tools

- Gulp (Software, basierend auf Node.js, um verschiedene Aufgaben im Webentwicklungsprozess zu automatisieren)
**[https://gulpjs.com/](https://gulpjs.com/)**
- Gulp-Pakete: 
  * [gulp](https://www.npmjs.com/package/gulp)
  * [gulp-sass](https://www.npmjs.com/package/gulp-sass)
  * [postcss-import](https://www.npmjs.com/package/postcss-import)
  * [gulp-postcss](https://www.npmjs.com/package/gulp-postcss)
  * [gulp-purgecss](https://www.npmjs.com/package/gulp-purgecss)
  * [gulp-csso](https://www.npmjs.com/package/gulp-csso)
  * [gulp-rename](https://www.npmjs.com/package/gulp-rename)
  * [gulp-terser](https://www.npmjs.com/package/gulp-terser)
  * [gulp-replace](https://www.npmjs.com/package/gulp-replace)
  * [tailwindcss](https://www.npmjs.com/package/tailwind)
  * [browser-sync](https://www.npmjs.com/package/browser-sync)
  * [dotenv](https://www.npmjs.com/package/dotenv)
- Tailwind (A utility-first CSS framework for rapidly building custom designs.)
[https://tailwindcss.com/](https://tailwindcss.com/)

### Vanilla JS-Plugins

- Flickity (Touch, responsive, flickable carousels)
[https://flickity.metafizzy.co/](https://flickity.metafizzy.co/)
- Lightgallery (Full featured javascript lightbox gallery, No dependencies.)
[https://sachinchoolur.github.io/lightgallery.js/](https://sachinchoolur.github.io/lightgallery.js/)

---

# Installation

## 0. Gulp-CLI

Um Gulp für ein Projekt nutzen zu könne, muss die Gulp-CLI einmalig global installiert sein. 

    # Check Gulp-Version
    $ gulp --version
    
    # Install Gulp-CLI
    $ npm install --global gulp-cli

---

## 1.  Installation Gulp-Projekt

Bei der Einbindung einer **Gulp-Projektvorlage** (mit **package.json, gulpfile.js** und **ohne node_modules**) wird die Installation von allen benötigten Modulen einfach mit "==npm install==" ausgeführt. 

 "Install-Befehl" ausführen.

    $ npm install

Alle Pakete werden **in das Verzeichnis "node_modules"** installiert.

### 1.1.  Projekt Name anpassen

Falls das Projekt spezifisch mit einem neuen Projekt Namen geklont wurde, braucht man den Projekt-Verzeichnis-Name nicht ändern.
Beispiel:

    $ git clone git@github.com:github_account/repo.git my-project

    Cloning into 'my-project'...
    remote: Enumerating objects: XXX, done.
    remote: Counting objects: 100% (XXX/XXX), done.
    remote: Compressing objects: 100% (XXX/XXX), done.
    remote: Total XXX (delta XX), reused XXX (delta XX), pack-reused 0
    Receiving objects: 100% (XXX/XXX), XXX.XX KiB | XXX.00 KiB/s, done.
    Resolving deltas: 100% (XX/XX), done.

Ansonsten beim klonen des Projekts wird der Projekt-Verzeichnis-Namen dementsprechend angepasst.

    $ git clone git@github.com:'github_account'/repo.git

    Cloning into 'repo'...
    remote: Enumerating objects: XXX, done.
    remote: Counting objects: 100% (XXX/XXX), done.
    remote: Compressing objects: 100% (XXX/XXX), done.
    remote: Total XXX (delta XX), reused XXX (delta XX), pack-reused 0
    Receiving objects: 100% (XXX/XXX), XXX.XX KiB | XXX.00 KiB/s, done.
    Resolving deltas: 100% (XX/XX), done.

    $ mv repo my-project

### 1.2. Projekt mit TLS schützen (https)
    $ cd my-project/
    $ valet secure

### 1.3. Enviroment Variablen erstellen

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

---

### Hinweis

Beim erstenmal Aufrufen der Seite im Browser ist kein ==CSS== kompaliert. 

    /css
    |- app.css

Erst bei einer ==Änderung== in der **tailwind-custom.css** oder **styles.css** werden die benötigten **/css/tailwind.css** und **/css/styles.css** erstellt.

    /css
    |- app.css
    |- styles.css
    |- tailwind.css

Alternativ kann man die auch mit **==Gulp==** erstellen lassen:

    $ gulp tailwind
    $ gulp style

oder beide auf einmal:

    $ gulp tailwind && gulp style


# Live Produktion

---

## 1. Build

Diese Funktion sollte man ausführen, bevor die Seite live geht.

    $ gulp build

**Dieser Prozess besteht aus mehreren Prozesse.**

- Compile CSS Prozess (tailwind, style)
  - tailwind.css
  - styles.css

Beim Start des Build-Prozess werden nochmals die CSS kompaliert, um auch alle änderungen von CSS zu übernehmen,

- Purge CSS Prozess (purge)
  - tailwind.css
  - styles.css

Purge entfernt überflüssige Klassen aus **tailwind.css** **styles.css**  und reduziert dadurch extrem die Größe der CSS-Files.

- Minify Prozess (mintailwind, minstyles, minjs)
  - CSS
    - tailwind.css
    - styles.css 
  - JS
    - app.js
  - entfernen von allen Kommentare.

**mintailwind**, **minstyles**, **minjs** verkleinert den Programmcode ohne seine Funktion zu ändern. Dadurch werden
Whitespaces, sofern nicht syntaktisch erforderlich, Kommentare entfernt.
Nach der Minimierung wird eine **tailwind.min.css**, **styles.min.css**, **app.min.js** in *_dist* Ordner gespeichert.

- Replace Prozess
  - app.css
  - *.html
  
Die imports von **app.css** werden ersetzt und verweisen auf die **tailwind.min.css**, **styles.min.css** die in *_dist* Ordner gespeichert werden.
Alle verweise von Javascript Dateien werden ebenfalls in den einzelnen HTML Datein durch **/js/app.min.js** ersetzt und in *_dist* Ordner gespeichert

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
