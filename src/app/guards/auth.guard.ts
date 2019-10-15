import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _router: Router, private _auth: AuthService) {}

  canActivate(): boolean {
    const tokenExists = this._auth.loggedIn();
    if (!tokenExists) this._router.navigateByUrl('/login');
    return tokenExists;
  }
}
