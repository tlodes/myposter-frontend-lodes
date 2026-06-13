# Initialer Prompt

Dies ist der erste Prompt, mit dem die KI (Claude Code) zur Bearbeitung der Aufgabe
angeleitet wurde.

---

Ich habe hier ein neues Angular Projekt erstellt. Ich möchte ein repsonsive Seite bauen
die aus einem header, einer Search Bar und einem Grid von Artikeln besteht. Im Ordner
specifications findest du eine Readme Datei, welche die genauen Anorderungen an die Seite
beschreibt. Im Ordner Mockups findest du vier jps, welche das Design der Seite für
Dekstop, Tablet und Mobil Fenstergröße zeigen, sowie eine Datei, welchen den aktiven
State von geklickten Like Elementen zeigt. Zudem findest du eine api.json file, welche
die Schnittstelle beschreibt, von der die Artikel kommen.

Erstelle bitte erste Komponenten für die Seite. Ich habe mir die Ordnerstruktur bereits
überlegt und gebe sie dir so vor, bitte halte dich daran. Überprüfe bitte auch, ob die Ordner Stuktur deiner Meinung nach so Sinn macht:

Im app folder soll ein feature Ordner liegen. Darin kommt ein Ordner article. Innerhalb
des article Ordners liegt die übergeordnete component file für die article page. Daneben
im article Ordner soll ein service Ordner liegen, welcher die service.ts file beinhaltet
für die api schnittstelle. Ebenfalls im article Ordner liegt ein components ordner,
welcher alle Komponente für die article page beinhaltet. Diese Komponenten sind
aufgegliedert in search-bar, article-grid und die einzelnen article-card.

Neben dem feature Ordner soll im app folder ein core Ordner liegen. Darin liegt ein
Ordner für das main-layout, welcher das layout für die article page (und evtl. weitere
folgende pages) definiert. Über die routes werden dann die passenden content-pages
geladen. Im core Ordner liegt außerdem ein Ordner für eine header component.

Zuletzt soll in app eine globale.css file liegen, welche das vorgegebene color scheme in
color-scheme.jpg beinhaltet.
