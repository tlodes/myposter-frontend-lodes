import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

import { Article, ArticleResponse } from './article.model';

/**
 * Loads blog articles from the MYPOSTER job-interview API.
 *
 * The component layer is only ever interested in the flat list of articles,
 * so the envelope (`message` / `payload`) is unwrapped here.
 */
@Injectable({ providedIn: 'root' })
export class ArticleService {
  private readonly http = inject(HttpClient);

  private readonly endpoint =
    'https://www.myposter.de/web-api/job-interview';

  getArticles(): Observable<Article[]> {
    return this.http
      .get<ArticleResponse>(this.endpoint)
      .pipe(map((response) => response.payload?.data ?? []));
  }
}
