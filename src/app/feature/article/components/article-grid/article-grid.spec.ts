import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Article } from '../../model/article.model';
import { ArticleGrid } from './article-grid';

function makeArticle(id: number): Article {
  return {
    id,
    author: 'Author',
    title: 'Title',
    dateAdded: '2024-01-01',
    images: { portrait: [], landscape: [] },
    likes: 0,
  };
}

describe('ArticleGrid', () => {
  let fixture: ComponentFixture<ArticleGrid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticleGrid],
    }).compileComponents();

    fixture = TestBed.createComponent(ArticleGrid);
  });

  async function setArticles(articles: Article[]): Promise<void> {
    fixture.componentRef.setInput('articles', articles);
    await fixture.whenStable();
  }

  it('renders one card per article', async () => {
    await setArticles([makeArticle(1), makeArticle(2), makeArticle(3)]);

    const cards = fixture.nativeElement.querySelectorAll('.grid__item');
    expect(cards.length).toBe(3);
    expect(fixture.nativeElement.querySelector('.grid__empty')).toBeNull();
  });

  it('shows the empty-state message when there are no articles', async () => {
    await setArticles([]);

    expect(fixture.nativeElement.querySelector('.grid')).toBeNull();
    expect(
      fixture.nativeElement.querySelector('.grid__empty')?.textContent?.trim(),
    ).toBe('No articles match your filters.');
  });
});
