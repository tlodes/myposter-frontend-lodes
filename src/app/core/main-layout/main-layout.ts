import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppTitleStrategy } from '../app-title.strategy';
import { Header } from '../header/header';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, Header],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout {
  protected readonly pageTitle = inject(AppTitleStrategy).pageTitle;
}
