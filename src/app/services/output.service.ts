import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiURL, outputsURL } from 'src/app/config/endpoints.configuration';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OutputModel } from 'src/app/models/output.model';
import { PaginationService } from './pagination.service';

@Injectable({
  providedIn: 'root'
})
export class OutputService {
  private baseURL = `${apiURL}/${outputsURL}`;

  constructor(
    private _http: HttpClient,
    private _pagination: PaginationService
  ) {}

  public loadOutputs(): Observable<OutputModel[]> {
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

  public getOutput(id: number) {
    return this._http.get(`${this.baseURL}/${id}`);
  }

  public searchOutput(word: string): Observable<OutputModel[]> {
    return this._http
      .post(`${this.baseURL}/search?search=${word}`, word)
      .pipe(map((response: any) => response.data));
  }

  public saveOutput(output: OutputModel): Observable<OutputModel> {
    return this._http
      .post(this.baseURL, output)
      .pipe(map((response: OutputModel) => response));
  }

  public editOutput(output: OutputModel): Observable<OutputModel> {
    return this._http
      .put(`${this.baseURL}/${output.id}`, output)
      .pipe(map((response: OutputModel) => response));
  }

  public deleteOutput(id: number): Observable<OutputModel> {
    return this._http
      .delete(`${this.baseURL}/${id}`)
      .pipe(map((response: OutputModel) => response));
  }
}
