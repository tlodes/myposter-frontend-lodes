import { ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Article } from '../../service/article.model';
import { ArticleCard } from './article-card';

const ARTICLE: Article = {
  id: 1,
  author: 'Author Name',
  title: 'How To Start Using TypeScript',
  dateAdded: '2024-01-08',
  images: {
    portrait: ['https://example.com/p.jpg'],
    landscape: ['https://example.com/l.jpg'],
  },
  likes: 230,
};

describe('ArticleCard', () => {
  let fixture: ComponentFixture<ArticleCard>;
  let componentRef: ComponentRef<ArticleCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticleCard],
    }).compileComponents();

    fixture = TestBed.createComponent(ArticleCard);
    componentRef = fixture.componentRef;
    componentRef.setInput('article', ARTICLE);
    await fixture.whenStable();
  });

  function text(selector: string): string {
    return (
      fixture.nativeElement.querySelector(selector)?.textContent?.trim() ?? ''
    );
  }

  it('derives the author initials', () => {
    expect(text('.card__avatar')).toBe('AN');
  });

  it('prefers the landscape image as the title image', () => {
    const img = fixture.nativeElement.querySelector(
      '.card__image',
    ) as HTMLImageElement;
    expect(img.getAttribute('src')).toBe('https://example.com/l.jpg');
  });

  it('shows the initial like count', () => {
    expect(text('.card__likes-count')).toBe('230');
  });

  it('increments the like count and marks the button active when liked', async () => {
    const button = fixture.nativeElement.querySelector(
      '.card__like',
    ) as HTMLButtonElement;

    button.click();
    await fixture.whenStable();

    expect(text('.card__likes-count')).toBe('231');
    expect(button.classList).toContain('card__like--active');
    expect(button.getAttribute('aria-pressed')).toBe('true');
  });

  it('toggles back to the original count when unliked', async () => {
    const button = fixture.nativeElement.querySelector(
      '.card__like',
    ) as HTMLButtonElement;

    button.click();
    await fixture.whenStable();
    button.click();
    await fixture.whenStable();

    expect(text('.card__likes-count')).toBe('230');
    expect(button.getAttribute('aria-pressed')).toBe('false');
  });
});
