import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, of } from 'rxjs';

import { ArticleGrid } from './components/article-grid/article-grid';
import { SearchBar } from './components/search-bar/search-bar';
import { Article, SortOption } from './model/article.model';
import { ArticleService } from './service/article.service';

@Component({
  selector: 'app-article-page',
  imports: [SearchBar, ArticleGrid],
  templateUrl: './article-page.html',
  styleUrl: './article-page.css',
})
export class ArticlePage {
  private readonly articleService = inject(ArticleService);

  protected readonly loadError = signal(false);
  protected readonly search = signal('');
  protected readonly sort = signal<SortOption>('default');
  protected readonly latestOnly = signal(false);

  private readonly articles = toSignal(
    this.articleService.getArticles().pipe(
      catchError((error: unknown) => {
        console.log(error)
        this.loadError.set(true);
        return of([] as Article[]);
      }),
    ),
  );

  protected readonly loading = computed(
    () => !this.loadError() && this.articles() === undefined,
  );

  protected readonly visibleArticles = computed<Article[]>(() => {
    const query = this.search().trim().toLowerCase();
    const filtered = this.filterArticles(
      this.articles() ?? [],
      query,
      this.latestOnly(),
    );

    return this.sortArticles(filtered, this.sort());
  });

  private filterArticles(
    articles: Article[],
    query: string,
    onlyLatest: boolean,
  ): Article[] {
    const currentYear = new Date().getFullYear();

    return articles.filter((article) => {
      const matchesQuery =
        query === '' ||
        article.author.toLowerCase().includes(query) ||
        article.title.toLowerCase().includes(query);

      const matchesYear =
        !onlyLatest ||
        new Date(article.dateAdded).getFullYear() === currentYear;

      return matchesQuery && matchesYear;
    });
  }

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
