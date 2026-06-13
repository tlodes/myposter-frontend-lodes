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
      // Future: article detail page
      // {
      //   path: ':id',
      //   loadComponent: () =>
      //     import('./article-detail/article-detail').then((m) => m.ArticleDetail),
      // },
    ],
  },
];
