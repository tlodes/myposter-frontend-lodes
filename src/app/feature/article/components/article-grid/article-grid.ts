import { Component, input } from '@angular/core';

import { Article } from '../../model/article.model';
import { ArticleCard } from '../article-card/article-card';

@Component({
  selector: 'app-article-grid',
  imports: [ArticleCard],
  templateUrl: './article-grid.html',
  styleUrl: './article-grid.css',
})
export class ArticleGrid {
  readonly articles = input.required<Article[]>();
}
