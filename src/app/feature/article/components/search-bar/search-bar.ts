import { Component, model } from '@angular/core';
import { SortOption } from '../../service/article.model';
import { FormsModule } from '@angular/forms';

interface SortDropdownOptions {
  value: SortOption;
  label: string;
}

@Component({
  selector: 'app-search-bar',
  imports: [FormsModule],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css',
})
export class SearchBar {
  readonly search = model('');
  readonly sort = model<SortOption>('default');
  readonly latestOnly = model(false);

  protected readonly sortDropdownOptions: readonly SortDropdownOptions[] = [
    { value: 'default', label: 'All Results' },
    { value: 'author', label: 'Author (A–Z)' },
    { value: 'date-desc', label: 'Date (newest first)' },
    { value: 'date-asc', label: 'Date (oldest first)' },
  ];
}
