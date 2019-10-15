import { Component, OnInit, Input } from '@angular/core';
import { sections } from 'src/app/config/sidebar.configuration';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
    `
      .icon {
        margin-left: 5px;
      }
    `
  ]
})
export class SidebarComponent implements OnInit {
  public sections: any[] = sections;
  public expanded: boolean = true;
  @Input() visibility: boolean = false;

  constructor(private _auth: AuthService, private _router: Router) {}

  ngOnInit() {}

  public logout(): void {
    this._auth.logout();
    this._router.navigateByUrl('/login');
  }
}
