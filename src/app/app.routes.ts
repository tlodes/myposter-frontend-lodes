import { Routes } from '@angular/router';

import { MainLayout } from './core/main-layout/main-layout';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: 'articles',
        loadChildren: () =>
          import('./feature/article/article.routes').then(
            (m) => m.ARTICLE_ROUTES,
          ),
      },
      { path: '', redirectTo: 'articles', pathMatch: 'full' },
    ],
  },
];
