import { Component, OnInit } from '@angular/core';
import { productTitles } from 'src/app/config/table.config';
import { AuthService } from 'src/app/services/auth.service';
import { PaginationService } from 'src/app/services/pagination.service';
import { ProductService } from 'src/app/services/product.service';
import { ModalService } from 'src/app/services/modal.service';
import { ProductModel } from 'src/app/models/product.model';
import { productsURL } from 'src/app/config/endpoints.configuration';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styles: []
})
export class ProductsComponent implements OnInit {
  public tableTitles: string[] = productTitles;
  public products: ProductModel[];

  constructor(
    public _auth: AuthService,
    private _pagination: PaginationService,
    private _product: ProductService,
    private _modal: ModalService
  ) {}

  ngOnInit() {
    this._pagination.resetPagination();
    this.loadProducts();
  }

  public loadProducts: any = (): void => {
    this._product
      .loadProducts()
      .subscribe((response: ProductModel[]) => (this.products = response));
  };

  public searchProducts: any = (word: string): void => {
    this._product
      .searchProduct(word)
      .subscribe((response: ProductModel[]) => (this.products = response));
  };

  public openModal(id: number): void {
    this._modal.deleteModal().then((response: boolean) => {
      if (response) {
        this.deleteProduct(id);
      }
    });
  }

  private deleteProduct(id: number) {
    this._product.deleteProduct(id).subscribe(
      (response: ProductModel) => {
        this.loadProducts();
        this._modal.successModal(
          2,
          `El producto ${response.name}`,
          `/${productsURL}`
        );
      },
      () => this._modal.errorModal(2)
    );
  }
}
