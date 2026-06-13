import { DatePipe } from '@angular/common';
import { Component, computed, input, signal } from '@angular/core';

import { Article } from '../../service/article.model';

/**
 * A single article card: title image, author info, post title and a
 * like button whose styling and counter react to the liked state
 * (see `mockups/4_active-states.jpg`).
 *
 * The like state is local UI state for now — there is no write endpoint
 * in the API — so it lives in a signal on the component.
 */
@Component({
  selector: 'app-article-card',
  imports: [DatePipe],
  templateUrl: './article-card.html',
  styleUrl: './article-card.css',
})
export class ArticleCard {
  readonly article = input.required<Article>();

  /** Whether the current user has liked this article. */
  protected readonly liked = signal(false);

  /** Like count including the user's own (un)like. */
  protected readonly likeCount = computed(
    () => this.article().likes + (this.liked() ? 1 : 0),
  );

  /** Initials shown in the author avatar, e.g. "Author Name" -> "AN". */
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
