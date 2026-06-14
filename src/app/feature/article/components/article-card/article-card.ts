import { DatePipe } from '@angular/common';
import { Component, computed, input, signal } from '@angular/core';

import { Article } from '../../model/article.model';

@Component({
  selector: 'app-article-card',
  imports: [DatePipe],
  templateUrl: './article-card.html',
  styleUrl: './article-card.css',
})
export class ArticleCard {
  readonly article = input.required<Article>();
  protected readonly liked = signal(false);

  protected readonly likeCount = computed(
    () => this.article().likes + (this.liked() ? 1 : 0),
  );

  protected readonly initials = computed(() =>
    this.article()
      .author.split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? '')
      .join(''),
  );

  /** Landscape title image, falling back to a portrait one if needed. */
  protected readonly imageUrl = computed(() => {
    const { landscape, portrait } = this.article().images;
    return landscape?.[0] ?? portrait?.[0] ?? '';
  });

  protected toggleLike(): void {
    this.liked.update((liked) => !liked);
  }
}
