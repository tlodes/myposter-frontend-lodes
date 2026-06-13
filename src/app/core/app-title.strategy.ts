import { Injectable, inject, signal } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';


@Injectable({ providedIn: 'root' })
export class AppTitleStrategy extends TitleStrategy {
  private readonly title = inject(Title);

  readonly pageTitle = signal('');

  override updateTitle(snapshot: RouterStateSnapshot): void {
    const resolved = this.buildTitle(snapshot);
    this.pageTitle.set(resolved ?? '');
    this.title.setTitle(resolved ?? 'dev articles');
  }
}
