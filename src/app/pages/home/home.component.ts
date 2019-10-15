import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaginationService } from 'src/app/services/pagination.service';
import { AuthService } from 'src/app/services/auth.service';
import { sections } from 'src/app/config/sidebar.configuration';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {
  public sections: any[] = sections;

  constructor(
    private _router: Router,
    private _pagination: PaginationService,
    private _auth: AuthService
  ) {}

  ngOnInit() {
    setTimeout(() => {
      this._pagination.changeSidebarVisibility(false);
    }, 100);
  }

  public redirectTo(link: string): void {
    this._pagination.changeSidebarVisibility(true);
    this._router.navigateByUrl(link);
  }

  public logout(): void {
    this._auth.logout();
    this._router.navigateByUrl('/login');
  }
}
