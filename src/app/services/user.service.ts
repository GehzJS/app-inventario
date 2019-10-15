import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiURL, usersURL } from 'src/app/config/endpoints.configuration';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserModel } from 'src/app/models/user.model';
import { PaginationService } from './pagination.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseURL = `${apiURL}/${usersURL}`;

  constructor(
    private _http: HttpClient,
    private _pagination: PaginationService
  ) {}

  public loadUsers(): Observable<UserModel[]> {
    return this._http
      .get(
        `${this.baseURL}/rows/${this._pagination.pagination.rowsPerPage}?page=${this._pagination.pagination.currentPage}`
      )
      .pipe(
        map((response: any) => {
          this._pagination.setPagination(response);
          return response.data;
        })
      );
  }

  public getUser(id: number) {
    return this._http.get(`${this.baseURL}/${id}`);
  }

  public searchUser(word: string): Observable<UserModel[]> {
    return this._http
      .post(`${this.baseURL}/search?search=${word}`, word)
      .pipe(map((response: UserModel[]) => response));
  }

  public saveUser(user: UserModel): Observable<UserModel> {
    return this._http
      .post(this.baseURL, user)
      .pipe(map((response: UserModel) => response));
  }

  public editUser(user: UserModel): Observable<UserModel> {
    return this._http
      .put(`${this.baseURL}/${user.id}`, user)
      .pipe(map((response: UserModel) => response));
  }

  public deleteUser(id: number): Observable<UserModel> {
    return this._http
      .delete(`${this.baseURL}/${id}`)
      .pipe(map((response: UserModel) => response));
  }
}
