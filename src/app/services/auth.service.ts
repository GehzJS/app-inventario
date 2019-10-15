import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  apiURL,
  apiBaseURL,
  clientId,
  clientSecret
} from 'src/app/config/endpoints.configuration';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private _http: HttpClient) {}

  public loggedIn(): boolean {
    const token = sessionStorage.getItem('token');
    return token !== null;
  }

  public getUserRole(): boolean {
    const user = this.getUserFromStorage();
    return user ? user.role === 'ROLE_ADMIN' : null;
  }

  public login(data: any): Observable<any> {
    const body = this.generateLoginBody(data);
    return this._http.post(`${apiURL}/login`, body).pipe(
      map((response: any) => {
        this.saveData(response);
        return response;
      })
    );
  }

  public refreshToken(): Observable<any> {
    const body = this.generateRefreshTokenBody();
    return this._http.post(`${apiBaseURL}/oauth/token`, body).pipe(
      map((response: any) => {
        this.saveData(response);
        return response;
      })
    );
  }

  public logout(): void {
    sessionStorage.clear();
  }

  private generateLoginBody(data: any): object {
    return {
      grant_type: 'password',
      client_id: clientId,
      client_secret: clientSecret,
      username: data.username,
      password: data.password
    };
  }

  private generateRefreshTokenBody(): object {
    const user = this.getUserFromStorage();
    const refreshToken = sessionStorage.getItem('refresh');
    return {
      grant_type: 'refresh_token',
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken.toString(),
      scope: user.role ? user.role : 'ROLE_USER'
    };
  }

  private getUserFromStorage(): any {
    return JSON.parse(sessionStorage.getItem('user'));
  }

  private saveData(data: any): void {
    sessionStorage.setItem('token', data.access_token);
    sessionStorage.setItem('refresh', data.refresh_token);
    sessionStorage.setItem('expire', data.expires_in);
    if (data.user) sessionStorage.setItem('user', JSON.stringify(data.user));
  }
}
