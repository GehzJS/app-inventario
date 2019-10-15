import { Component, Renderer2, HostListener } from '@angular/core';
import { PaginationService } from './services/pagination.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @HostListener('document:keydown.control.alt.c')
  public showConfig(): void {
    this._pagination.changeRouterVisibility(false);
    this._pagination.changeSidebarVisibility(false);
  }

  constructor(public _pagination: PaginationService) {}
}
