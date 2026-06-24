# Test-Übersicht

Überblick über alle Tests im Projekt, gruppiert nach Test-Kategorien.
Insgesamt **26 Tests** in **5 Spec-Dateien**.

| Kategorie | Anzahl Tests |
| --- | --- |
| Smoke / Bootstrap | 1 |
| Service & API-Integration | 3 |
| Suche & Filterung | 4 |
| Sortierung | 2 |
| Rendering & Darstellung | 5 |
| Abgeleitete Werte (Display-Logik) | 7 |
| Benutzer-Interaktion | 2 |
| Robustheit & Fehlerbehandlung | 2 |

---

## Smoke / Bootstrap

Stellt sicher, dass die App-Wurzel überhaupt instanziiert werden kann.

- **App**
  - `should create the app` — die Root-Komponente lässt sich erzeugen
  - 📄 `src/app/app.spec.ts`

---

## Service & API-Integration

Verhalten des `ArticleService` gegenüber der HTTP-API (mit `HttpTestingController`).

- **ArticleService**
  - `unwraps the article list from the API envelope` — packt `payload.data` aus der API-Hülle aus (GET-Request)
  - `returns an empty list when payload data is missing` — Fallback auf `[]` bei fehlendem Payload
  - `propagates the error to the caller` — leitet HTTP-Fehler an den Aufrufer weiter
  - 📄 `src/app/feature/article/service/article.service.spec.ts`

---

## Suche & Filterung

Filter-Logik der `ArticlePage` (Suchfeld + „latest only").

- **ArticlePage**
  - `shows all articles by default` — ohne Filter werden alle Artikel angezeigt
  - `filters by author or title (case-insensitive)` — Suche nach Autor oder Titel, Groß-/Kleinschreibung egal
  - `keeps only current-year articles when "latest only" is set` — „latest only" zeigt nur Artikel des aktuellen Jahres
  - `combines search and "latest only" with AND logic` — Suche und „latest only" greifen kombiniert (UND-Verknüpfung)
  - 📄 `src/app/feature/article/article-page.spec.ts`

---

## Sortierung

Sortier-Logik der `ArticlePage`.

- **ArticlePage**
  - `sorts by author alphabetically` — alphabetische Sortierung nach Autor
  - `sorts by date ascending and descending` — Sortierung nach Datum auf- und absteigend
  - 📄 `src/app/feature/article/article-page.spec.ts`

---

## Rendering & Darstellung

Was tatsächlich im DOM erzeugt wird (Grid, Empty-State, Titelbild).

- **ArticleGrid**
  - `renders one card per article` — pro Artikel genau eine Karte
  - `shows the empty-state message when there are no articles` — Empty-State bei leerer Liste
  - 📄 `src/app/feature/article/components/article-grid/article-grid.spec.ts`

- **ArticleCard**
  - `prefers the landscape image as the title image` — Landscape-Bild wird als Titelbild bevorzugt
  - `falls back to the portrait image when no landscape image exists` — Fallback auf Portrait-Bild
  - `uses an empty src when the article has no images` — leeres `src`, wenn keine Bilder vorhanden
  - 📄 `src/app/feature/article/components/article-card/article-card.spec.ts`

---

## Abgeleitete Werte (Display-Logik)

Berechnete Werte der `ArticleCard` (Initialen, Like-Anzeige).

- **ArticleCard**
  - `derives the author initials` — Initialen aus dem Autorennamen ableiten
  - `uses a single initial for a one-word author` — nur eine Initiale bei Ein-Wort-Namen
  - `uses only the first two initials for long names` — maximal zwei Initialen bei langen Namen
  - `ignores surrounding and repeated whitespace in the author name` — ignoriert führende/mehrfache Leerzeichen
  - `shows the initial like count` — zeigt den initialen Like-Zähler
  - 📄 `src/app/feature/article/components/article-card/article-card.spec.ts`

---

## Benutzer-Interaktion

Reaktion auf Klicks (Like-Button).

- **ArticleCard**
  - `increments the like count and marks the button active when liked` — Like erhöht Zähler, Button wird aktiv (`aria-pressed=true`)
  - `toggles back to the original count when unliked` — erneutes Klicken setzt zurück (`aria-pressed=false`)
  - 📄 `src/app/feature/article/components/article-card/article-card.spec.ts`

---

## Robustheit & Fehlerbehandlung

Verhalten bei kaputten Daten und Netzwerkfehlern.

- **ArticlePage (load error)**
  - `flags loadError, stops loading and shows no articles when the request fails` — bei Request-Fehler: `loadError=true`, `loading=false`, keine Artikel
  - 📄 `src/app/feature/article/article-page.spec.ts`

- **ArticlePage (resilient to invalid dates)**
  - `sorts by date without crashing when a date is invalid` — ungültiges Datum fällt auf Zeitstempel 0 zurück, kein Absturz
  - 📄 `src/app/feature/article/article-page.spec.ts`

### Verwandte „defensive" Tests aus anderen Kategorien

Diese Tests prüfen ebenfalls Robustheit, sind aber thematisch oben einsortiert:

- `returns no articles when nothing matches the query` *(Suche & Filterung)*
- `treats a whitespace-only query as empty and shows all articles` *(Suche & Filterung)*
- `returns an empty list when payload data is missing` *(Service & API)*
- `ignores surrounding and repeated whitespace in the author name` *(Abgeleitete Werte)*
- `uses an empty src when the article has no images` *(Rendering)*
