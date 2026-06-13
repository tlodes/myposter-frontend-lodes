import { Routes } from '@angular/router';

import { MainLayout } from './core/main-layout/main-layout';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: '',
        title: 'dev articles',
        loadComponent: () =>
          import('./feature/article/article-page').then((m) => m.ArticlePage),
      },
    ],
  },
];
