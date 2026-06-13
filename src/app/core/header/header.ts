import { Component, input } from '@angular/core';

/**
 * App header: the blue brand band with the page heading
 * (see `mockups/1_desktop.jpg`).
 */
@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  /** Heading text shown in the band. */
  readonly title = input('dev articles');
}
