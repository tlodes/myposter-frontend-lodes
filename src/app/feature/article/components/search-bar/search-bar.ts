import { Component, model } from '@angular/core';

import { SortOption } from '../../service/article.model';

interface SortChoice {
  value: SortOption;
  label: string;
}

/**
 * Function bar: free-text search, a sort dropdown and a "latest only"
 * checkbox. It owns no business logic — state is exposed via two-way
 * `model()` bindings so the parent page can react to changes.
 */
@Component({
  selector: 'app-search-bar',
  imports: [],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css',
})
export class SearchBar {
  /** Free-text query matched against author and title. */
  readonly search = model('');

  /** Active sort order. */
  readonly sort = model<SortOption>('default');

  /** When true, only show articles from the current year. */
  readonly latestOnly = model(false);

  protected readonly sortChoices: readonly SortChoice[] = [
    { value: 'default', label: 'All Results' },
    { value: 'author', label: 'Author (A–Z)' },
    { value: 'date-desc', label: 'Date (newest first)' },
    { value: 'date-asc', label: 'Date (oldest first)' },
  ];

  protected onSearchInput(value: string): void {
    this.search.set(value);
  }

  protected onSortChange(value: string): void {
    this.sort.set(value as SortOption);
  }

  protected onLatestOnlyChange(checked: boolean): void {
    this.latestOnly.set(checked);
  }
}
