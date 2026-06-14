import { Routes } from '@angular/router';

export const ARTICLE_ROUTES: Routes = [
  {
    path: '',
    title: 'dev articles',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./article-page').then((m) => m.ArticlePage),
      },
    ],
  },
];
