import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, of } from 'rxjs';

import { ArticleGrid } from './components/article-grid/article-grid';
import { SearchBar } from './components/search-bar/search-bar';
import { Article, SortOption } from './service/article.model';
import { ArticleService } from './service/article.service';

/**
 * Top-level page for the article feature.
 *
 * Owns the view state (search query, sort order, "latest only") and derives
 * the visible list of articles from the data loaded by {@link ArticleService}.
 * The child components stay presentational.
 */
@Component({
  selector: 'app-article-page',
  imports: [SearchBar, ArticleGrid],
  templateUrl: './article-page.html',
  styleUrl: './article-page.css',
})
export class ArticlePage {
  private readonly articleService = inject(ArticleService);

  /** Raw articles from the API (undefined while loading). */
  private readonly articles = toSignal(
    this.articleService.getArticles().pipe(catchError(() => of([] as Article[]))),
  );

  protected readonly search = signal('');
  protected readonly sort = signal<SortOption>('default');
  protected readonly latestOnly = signal(false);

  protected readonly loading = computed(() => this.articles() === undefined);

  /** Articles after search + year filter + sorting are applied. */
  protected readonly visibleArticles = computed<Article[]>(() => {
    const query = this.search().trim().toLowerCase();
    const onlyLatest = this.latestOnly();
    const currentYear = new Date().getFullYear();

    const filtered = (this.articles() ?? []).filter((article) => {
      const matchesQuery =
        query === '' ||
        article.author.toLowerCase().includes(query) ||
        article.title.toLowerCase().includes(query);

      const matchesYear =
        !onlyLatest ||
        new Date(article.dateAdded).getFullYear() === currentYear;

      return matchesQuery && matchesYear;
    });

    return this.sortArticles(filtered, this.sort());
  });

  private sortArticles(articles: Article[], sort: SortOption): Article[] {
    const sorted = [...articles];

    switch (sort) {
      case 'author':
        return sorted.sort((a, b) => a.author.localeCompare(b.author));
      case 'date-desc':
        return sorted.sort(
          (a, b) =>
            new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime(),
        );
      case 'date-asc':
        return sorted.sort(
          (a, b) =>
            new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime(),
        );
      default:
        return sorted;
    }
  }
}
