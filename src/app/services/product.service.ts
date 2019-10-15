import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiURL, productsURL } from 'src/app/config/endpoints.configuration';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductModel } from 'src/app/models/product.model';
import { PaginationService } from './pagination.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseURL = `${apiURL}/${productsURL}`;

  constructor(
    private _http: HttpClient,
    private _pagination: PaginationService
  ) {}

  public loadProducts(): Observable<ProductModel[]> {
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

  public loadAllProducts(): Observable<ProductModel[]> {
    return this._http
      .get(`${this.baseURL}/all`)
      .pipe(map((response: any) => response));
  }

  public getProduct(id: number): Observable<Object> {
    return this._http.get(`${this.baseURL}/${id}`);
  }

  public getProductByBarcode(barcode: string): Observable<Object> {
    return this._http.get(`${this.baseURL}/barcode/${barcode}`);
  }

  public searchProduct(word: string): Observable<ProductModel[]> {
    return this._http
      .post(`${this.baseURL}/search?search=${word}`, word)
      .pipe(map((response: ProductModel[]) => response));
  }

  public saveProduct(product: ProductModel): Observable<ProductModel> {
    return this._http
      .post(this.baseURL, product)
      .pipe(map((response: ProductModel) => response));
  }

  public editProduct(product: ProductModel): Observable<ProductModel> {
    return this._http
      .put(`${this.baseURL}/${product.id}`, product)
      .pipe(map((response: ProductModel) => response));
  }

  public deleteProduct(id: number): Observable<ProductModel> {
    return this._http
      .delete(`${this.baseURL}/${id}`)
      .pipe(map((response: ProductModel) => response));
  }
}
