import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiURL, providersURL } from 'src/app/config/endpoints.configuration';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProviderModel } from 'src/app/models/provider.model';
import { PaginationService } from './pagination.service';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {
  private baseURL = `${apiURL}/${providersURL}`;

  constructor(
    private _http: HttpClient,
    private _pagination: PaginationService
  ) {}

  public loadProviders(): Observable<ProviderModel[]> {
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

  public loadAllProviders(): Observable<ProviderModel[]> {
    return this._http
      .get(`${this.baseURL}/all`)
      .pipe(map((response: ProviderModel[]) => response));
  }

  public getProvider(id: number) {
    return this._http.get(`${this.baseURL}/${id}`);
  }

  public searchProvider(word: string): Observable<ProviderModel[]> {
    return this._http
      .post(`${this.baseURL}/search?search=${word}`, word)
      .pipe(map((response: ProviderModel[]) => response));
  }

  public saveProvider(provider: ProviderModel): Observable<ProviderModel> {
    return this._http
      .post(this.baseURL, provider)
      .pipe(map((response: ProviderModel) => response));
  }

  public editProvider(provider: ProviderModel): Observable<ProviderModel> {
    return this._http
      .put(`${this.baseURL}/${provider.id}`, provider)
      .pipe(map((response: ProviderModel) => response));
  }

  public deleteProvider(id: number): Observable<ProviderModel> {
    return this._http
      .delete(`${this.baseURL}/${id}`)
      .pipe(map((response: ProviderModel) => response));
  }
}
