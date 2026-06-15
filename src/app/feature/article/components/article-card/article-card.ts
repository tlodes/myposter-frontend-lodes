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
      .map((part) => part[0].toUpperCase())
      .join(''),
  );

  protected readonly imageUrl = computed(() => {
    const images = this.article().images;
    return images.landscape[0] ?? images.portrait[0] ?? '';
  });

  protected readonly publishedDate = computed(() => {
    const date = new Date(this.article().dateAdded);
    return Number.isNaN(date.getTime()) ? null : date;
  });

  protected toggleLike(): void {
    this.liked.update((liked) => !liked);
  }
}
