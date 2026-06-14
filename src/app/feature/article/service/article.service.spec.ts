import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { vi } from 'vitest';

import { Article, ArticleResponse } from '../model/article.model';
import { ArticleService } from './article.service';

const RETRY_DELAY_MS = 1000;

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

  it('retries transient failures before succeeding', async () => {
    vi.useFakeTimers();
    try {
      let result: Article[] | undefined;
      service.getArticles().subscribe((articles) => (result = articles));

      // Initial attempt + first retry both fail.
      httpMock.expectOne(ENDPOINT).error(new ProgressEvent('error'));
      await vi.advanceTimersByTimeAsync(RETRY_DELAY_MS);
      httpMock.expectOne(ENDPOINT).error(new ProgressEvent('error'));
      await vi.advanceTimersByTimeAsync(RETRY_DELAY_MS);

      // Second (last allowed) retry succeeds.
      httpMock.expectOne(ENDPOINT).flush({
        message: { status: 'success', code: 'ok', text: 'ok' },
        payload: { data: [] },
      });

      expect(result).toEqual([]);
    } finally {
      vi.useRealTimers();
    }
  });

  it('propagates the error after exhausting the retries', async () => {
    vi.useFakeTimers();
    try {
      let errored = false;
      service.getArticles().subscribe({
        next: () => undefined,
        error: () => (errored = true),
      });

      // 1 initial attempt + 2 retries = 3 failures, then it gives up.
      httpMock.expectOne(ENDPOINT).error(new ProgressEvent('error'));
      await vi.advanceTimersByTimeAsync(RETRY_DELAY_MS);
      httpMock.expectOne(ENDPOINT).error(new ProgressEvent('error'));
      await vi.advanceTimersByTimeAsync(RETRY_DELAY_MS);
      httpMock.expectOne(ENDPOINT).error(new ProgressEvent('error'));

      expect(errored).toBe(true);
    } finally {
      vi.useRealTimers();
    }
  });
});
