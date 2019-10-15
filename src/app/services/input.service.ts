import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { apiURL, inputsURL } from 'src/app/config/endpoints.configuration';
import { InputModel } from 'src/app/models/input.model';
import { PaginationService } from './pagination.service';

@Injectable({
  providedIn: 'root'
})
export class InputService {
  private baseURL = `${apiURL}/${inputsURL}`;

  constructor(
    private _http: HttpClient,
    private _pagination: PaginationService
  ) {}

  public loadInputs(): Observable<InputModel[]> {
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

  public getInput(id: number) {
    return this._http.get(`${this.baseURL}/${id}`);
  }

  public searchInput(word: string): Observable<InputModel[]> {
    return this._http
      .post(`${this.baseURL}/search?search=${word}`, word)
      .pipe(map((response: any) => response.data));
  }

  public saveInput(input: InputModel): Observable<InputModel> {
    return this._http
      .post(this.baseURL, input)
      .pipe(map((response: any) => response));
  }

  public editInput(input: InputModel): Observable<InputModel> {
    return this._http
      .put(`${this.baseURL}/${input.id}`, input)
      .pipe(map((response: any) => response));
  }

  public deleteInput(id: number): Observable<InputModel> {
    return this._http
      .delete(`${this.baseURL}/${id}`)
      .pipe(map((response: any) => response));
  }
}
