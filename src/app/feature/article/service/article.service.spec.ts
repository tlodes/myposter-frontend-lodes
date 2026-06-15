import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { ArticleResponse } from '../model/article.model';
import { ArticleService } from './article.service';

const ENDPOINT = 'https://www.myposter.de/web-api/job-interview';

describe('ArticleService', () => {
  let service: ArticleService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ArticleService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(ArticleService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('unwraps the article list from the API envelope', () => {
    const response: ArticleResponse = {
      message: { status: 'success', code: 'ok', text: 'ok' },
      payload: {
        data: [
          {
            id: 1,
            author: 'Special developer',
            title: 'QA this year',
            dateAdded: '2024-08-06',
            images: { portrait: [], landscape: [] },
            likes: 12,
          },
        ],
      },
    };

    let result;
    service.getArticles().subscribe((articles) => (result = articles));

    const req = httpMock.expectOne(ENDPOINT);
    expect(req.request.method).toBe('GET');
    req.flush(response);

    expect(result).toEqual(response.payload.data);
  });

  it('returns an empty list when payload data is missing', () => {
    let result;
    service.getArticles().subscribe((articles) => (result = articles));

    httpMock.expectOne(ENDPOINT).flush({ message: {}, payload: {} });

    expect(result).toEqual([]);
  });

  it('propagates the error to the caller', () => {
    let errored = false;
    service.getArticles().subscribe({
      next: () => undefined,
      error: () => (errored = true),
    });

    httpMock.expectOne(ENDPOINT).error(new ProgressEvent('error'));

    expect(errored).toBe(true);
  });
});
