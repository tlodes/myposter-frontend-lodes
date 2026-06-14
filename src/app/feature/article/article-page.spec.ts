import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of, throwError } from 'rxjs';

import { ArticlePage } from './article-page';
import { Article } from './model/article.model';
import { ArticleService } from './service/article.service';

const CURRENT_YEAR = new Date().getFullYear();

const ARTICLES: Article[] = [
  makeArticle({ id: 1, author: 'Zoe', title: 'TypeScript tips', dateAdded: '2021-05-01' }),
  makeArticle({ id: 2, author: 'Anna', title: 'Angular signals', dateAdded: '2023-11-20' }),
  makeArticle({ id: 3, author: 'Mike', title: 'CSS grid layouts', dateAdded: `${CURRENT_YEAR}-02-10` }),
];

function makeArticle(partial: Partial<Article> & Pick<Article, 'id'>): Article {
  return {
    author: 'Author',
    title: 'Title',
    dateAdded: '2020-01-01',
    images: { portrait: [], landscape: [] },
    likes: 0,
    ...partial,
  };
}

class StubArticleService {
  getArticles(): Observable<Article[]> {
    return of(ARTICLES);
  }
}

describe('ArticlePage', () => {
  let fixture: ComponentFixture<ArticlePage>;
  // visibleArticles/signals are protected; access via the instance under test.
  let page: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticlePage],
      providers: [{ provide: ArticleService, useClass: StubArticleService }],
    }).compileComponents();

    fixture = TestBed.createComponent(ArticlePage);
    page = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('shows all articles by default', () => {
    expect(page.visibleArticles().map((a: Article) => a.id)).toEqual([1, 2, 3]);
  });

  it('filters by author or title (case-insensitive)', () => {
    page.search.set('angular');
    expect(page.visibleArticles().map((a: Article) => a.id)).toEqual([2]);

    page.search.set('zoe');
    expect(page.visibleArticles().map((a: Article) => a.id)).toEqual([1]);
  });

  it('sorts by author alphabetically', () => {
    page.sort.set('author');
    expect(page.visibleArticles().map((a: Article) => a.author)).toEqual([
      'Anna',
      'Mike',
      'Zoe',
    ]);
  });

  it('sorts by date ascending and descending', () => {
    page.sort.set('date-asc');
    expect(page.visibleArticles().map((a: Article) => a.id)).toEqual([1, 2, 3]);

    page.sort.set('date-desc');
    expect(page.visibleArticles().map((a: Article) => a.id)).toEqual([3, 2, 1]);
  });

  it('keeps only current-year articles when "latest only" is set', () => {
    page.latestOnly.set(true);
    expect(page.visibleArticles().map((a: Article) => a.id)).toEqual([3]);
  });

  it('combines search and "latest only" with AND logic', () => {
    page.latestOnly.set(true);

    // "angular" matches Anna's 2023 article, but it is not from the current year.
    page.search.set('angular');
    expect(page.visibleArticles()).toEqual([]);

    // "css" matches Mike's current-year article, so both filters agree.
    page.search.set('css');
    expect(page.visibleArticles().map((a: Article) => a.id)).toEqual([3]);
  });

  it('returns no articles when nothing matches the query', () => {
    page.search.set('nothing matches this');
    expect(page.visibleArticles()).toEqual([]);
  });

  it('treats a whitespace-only query as empty and shows all articles', () => {
    page.search.set('   ');
    expect(page.visibleArticles().map((a: Article) => a.id)).toEqual([1, 2, 3]);
  });
});

describe('ArticlePage (load error)', () => {
  class ThrowingArticleService {
    getArticles(): Observable<Article[]> {
      return throwError(() => new Error('network down'));
    }
  }

  let fixture: ComponentFixture<ArticlePage>;
  let page: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticlePage],
      providers: [
        { provide: ArticleService, useClass: ThrowingArticleService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ArticlePage);
    page = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('flags loadError, stops loading and shows no articles when the request fails', () => {
    expect(page.loadError()).toBe(true);
    expect(page.loading()).toBe(false);
    expect(page.visibleArticles()).toEqual([]);
  });
});
