import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

import { Article, ArticleResponse } from '../model/article.model';

@Injectable({ providedIn: 'root' })
export class ArticleService {
  private readonly http = inject(HttpClient);

  private readonly endpoint =
    'https://www.myposter.de/web-api/job-interview';

  getArticles(): Observable<Article[]> {
    return this.http.get<ArticleResponse>(this.endpoint).pipe(
      map((response) => response.payload?.data ?? []),
    );
  }
}
