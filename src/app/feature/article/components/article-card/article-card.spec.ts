import { ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Article } from '../../model/article.model';
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

  it('uses a single initial for a one-word author', async () => {
    componentRef.setInput('article', { ...ARTICLE, author: 'Madonna' });
    await fixture.whenStable();

    expect(text('.card__avatar')).toBe('M');
  });

  it('uses only the first two initials for long names', async () => {
    componentRef.setInput('article', {
      ...ARTICLE,
      author: 'Jean Claude Van Damme',
    });
    await fixture.whenStable();

    expect(text('.card__avatar')).toBe('JC');
  });

  it('ignores surrounding and repeated whitespace in the author name', async () => {
    componentRef.setInput('article', { ...ARTICLE, author: '  Anna   Bell  ' });
    await fixture.whenStable();

    expect(text('.card__avatar')).toBe('AB');
  });

  function titleImageSrc(): string | null {
    return (
      fixture.nativeElement.querySelector('.card__image') as HTMLImageElement
    ).getAttribute('src');
  }

  it('prefers the landscape image as the title image', () => {
    expect(titleImageSrc()).toBe('https://example.com/l.jpg');
  });

  it('falls back to the portrait image when no landscape image exists', async () => {
    componentRef.setInput('article', {
      ...ARTICLE,
      images: { portrait: ['https://example.com/p.jpg'], landscape: [] },
    });
    await fixture.whenStable();

    expect(titleImageSrc()).toBe('https://example.com/p.jpg');
  });

  it('uses an empty src when the article has no images', async () => {
    componentRef.setInput('article', {
      ...ARTICLE,
      images: { portrait: [], landscape: [] },
    });
    await fixture.whenStable();

    expect(titleImageSrc()).toBeFalsy();
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

  describe('resilience to malformed article data', () => {
    it('renders an empty title image src when the images object is missing', async () => {
      componentRef.setInput('article', {
        ...ARTICLE,
        images: undefined,
      } as unknown as Article);
      await fixture.whenStable();

      expect(titleImageSrc()).toBeFalsy();
    });

    it('shows no initials when the author is missing', async () => {
      componentRef.setInput('article', {
        ...ARTICLE,
        author: undefined,
      } as unknown as Article);
      await fixture.whenStable();

      expect(text('.card__avatar')).toBe('');
    });

    it('treats a missing like count as zero', async () => {
      componentRef.setInput('article', {
        ...ARTICLE,
        likes: undefined,
      } as unknown as Article);
      await fixture.whenStable();

      expect(text('.card__likes-count')).toBe('0');
    });
  });
});
