# Chatverlauf

Protokoll der Zusammenarbeit mit Claude Code (Modell: Claude Opus 4.8) bei der Bearbeitung
der Aufgabe. Zusammengefasst pro Konversationsschritt, inklusive der von der KI
durchgeführten Aktionen.

---

## 1. Nutzer — Initialer Auftrag

> Ich habe hier ein neues Angular Projekt erstellt. Ich möchte ein responsive Seite bauen
> die aus einem header, einer Search Bar und einem Grid von Artikeln besteht. […]
> Erstelle bitte erste Komponenten für die Seite. Ich habe mir die Ordnerstruktur bereits
> überlegt und gebe sie dir so vor, bitte halte dich daran. feature/article (mit übergeordneter Page,
> service-Ordner, components-Ordner: search-bar, article-grid, article-card). Daneben
> core/ mit main-layout und header. Zuletzt eine globale CSS-Datei mit dem Color Scheme.

(Vollständiger Wortlaut siehe `initial-prompt.md`.)

## 2. Assistent — Analyse & Kontext sammeln

Vorgehen vor dem Coden:

1. **Anforderungen gelesen:** `src/specifications/README.md` (Aufgabenstellung Teil 1–3:
   Design, Funktionalität, Tests; Content-Bereich max. 920px / min. 320px; Kartenaufbau;
   semantisches HTML; kein CSS-Framework).
2. **API-Spezifikation gelesen:** `src/mockups/api.json` (OpenAPI 3.0) — Endpunkt
   `GET https://www.myposter.de/web-api/job-interview`, Antwort-Envelope mit
   `message` + `payload.data[]`, Felder `id, author, title, dateAdded, images, likes`.
3. **Mockups visuell ausgewertet:** `1_desktop.jpg`, `2_tablet.jpg`, `3_mobile.jpg`,
   `4_active-states.jpg` (Like-Button aktiv = gefülltes Blau) und `color-scheme.jpg`
   (Primary `#00A4E0`, Primary Variant `#0D81B3`, Background `#EEE`, Text `#272727`,
   Text Accent `#888`).
4. **Projekt-Setup geprüft:** Angular 22, Standalone-Komponenten, **zoneless** (kein
   zone.js in `package.json`), Signals, Vitest als Test-Runner, Dateinamen ohne
   `.component`-Suffix.

Die vom Nutzer **vorgegebene Ordnerstruktur** wurde unverändert übernommen.

## 3. Assistent — Implementierung

Erstellte / geänderte Dateien (gemäß der vorgegebenen Struktur):

**Globales Styling**
- `src/app/global.css` — Color Scheme als CSS-Custom-Properties + Layout-Tokens.
- `src/styles.css` — Import von `global.css`, Reset, neutraler System-Font
  (AvenirNext ist proprietär → Ersatz wie in der README gefordert).

**Feature: article**
- `feature/article/service/article.model.ts` — Typen aus `api.json`
  (`Article`, `BlogImages`, `ArticleResponse`, `SortOption`).
- `feature/article/service/article.service.ts` — `HttpClient`-Service, entpackt
  `payload.data`.
- `feature/article/article-page.ts/.html/.css` — übergeordnete Page; hält Such-,
  Sortier- und Filter-State per Signals; `computed` für gefilterte/sortierte Liste;
  `toSignal` für den Daten-Stream.
- `feature/article/components/search-bar/*` — Suchfeld + Sortier-Dropdown +
  „Latest only"-Checkbox; Two-Way-Bindings via `model()`.
- `feature/article/components/article-grid/*` — responsives Grid
  (`auto-fill` + `minmax` → 1/2/3 Spalten je Breakpoint).
- `feature/article/components/article-card/*` — Einzelkarte mit Avatar-Initialen,
  Datumsformat „8 Jan", Inline-SVG-Herz und Like-Toggle (Anzahl + Styling).

**Core**
- `core/header/*` — blaue Brand-Leiste „dev articles".
- `core/main-layout/*` — Header + zentrierter Content; Negative-Margin-Overlap, damit
  die Search-Bar in die blaue Leiste ragt.

**Verdrahtung**
- `app.config.ts` — `provideHttpClient()` ergänzt.
- `app.routes.ts` — `MainLayout` mit lazy-geladener `ArticlePage`.
- `app.ts` / `app.html` — Platzhalter entfernt, Shell auf `<router-outlet />` reduziert.

**Tests (Vitest)**
- `article.service.spec.ts` — Envelope-Unwrapping + Fallback bei fehlendem Payload.
- `article-card.spec.ts` — Initialen, Bildauswahl, Like-Toggle (hoch/runter, ARIA).
- `article-page.spec.ts` — Suche, Sortierungen, Jahres-Filter.
- `app.spec.ts` — an neue Shell angepasst.

## 4. Assistent — Verifikation

- `npx ng test --watch=false` → **13 Tests grün** (4 Dateien).
- `npx ng build` → erfolgreich; `ArticlePage` als eigener Lazy-Chunk.

Zusammenfassung an den Nutzer geliefert (Struktur, umgesetzte Funktionalität,
Architektur-Entscheidungen, Hinweise zu Font & Icons).

## 5. Nutzer — Dokumentation der KI-Nutzung

> Bitte lege mir den initialen Prompt, sowie den Chatverlauf als zwei separate md files in
> den Ordner prompts ab.

## 6. Assistent — Dokumentation

Anlegen von `prompts/initial-prompt.md` und `prompts/chat-history.md`.
