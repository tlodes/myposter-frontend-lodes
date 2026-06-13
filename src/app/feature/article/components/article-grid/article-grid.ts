import { Component, input } from '@angular/core';

import { Article } from '../../service/article.model';
import { ArticleCard } from '../article-card/article-card';

/**
 * Responsive grid of article cards.
 *
 * The grid is purely presentational: it renders whatever (already filtered
 * and sorted) list it is given. The number of columns adapts to the
 * available width via CSS `auto-fill`, so cards resize within a breakpoint.
 */
@Component({
  selector: 'app-article-grid',
  imports: [ArticleCard],
  templateUrl: './article-grid.html',
  styleUrl: './article-grid.css',
})
export class ArticleGrid {
  readonly articles = input.required<Article[]>();
}
