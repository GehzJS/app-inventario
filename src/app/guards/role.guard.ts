import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private _router: Router, private _auth: AuthService) {}

  canActivate(): boolean {
    const role = this._auth.getUserRole();
    if (role !== null) {
      return role;
    } else {
      this._router.navigateByUrl('/login');
    }
  }
}
