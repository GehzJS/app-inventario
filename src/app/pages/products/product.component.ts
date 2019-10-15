import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { ProviderService } from 'src/app/services/provider.service';
import { ModalService } from 'src/app/services/modal.service';
import { ProductModel } from 'src/app/models/product.model';
import { ProviderModel } from 'src/app/models/provider.model';
import {
  productsURL,
  providersURL
} from 'src/app/config/endpoints.configuration';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styles: []
})
export class ProductComponent implements OnInit {
  public id: string;
  public product: ProductModel;
  public providers: ProviderModel[];
  public form: FormGroup;
  public validate = [Validators.required, Validators.min(1)];

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _builder: FormBuilder,
    private _product: ProductService,
    private _provider: ProviderService,
    private _modal: ModalService
  ) {}

  ngOnInit() {
    this.id = this._route.snapshot.paramMap.get('id');
    this.verifyId(this.id);
  }

  private verifyId(id: string): void {
    id === 'new'
      ? [this.createForm(), this.loadProviders()]
      : [this.getProduct(id), this.loadProviders()];
  }

  private createForm(): void {
    this.form = this._builder.group({
      name: [null, Validators.required],
      barcode: [null, Validators.required],
      price: [null, this.validate],
      stock: [null, this.validate],
      provider_id: [null, this.validate]
    });
  }

  private setFormValues(product: ProductModel): void {
    this.form.controls.name.setValue(product.name);
    this.form.controls.barcode.setValue(product.barcode);
    this.form.controls.price.setValue(product.price);
    this.form.controls.stock.setValue(product.stock);
    this.form.controls.provider_id.setValue(product.provider_id);
  }

  private getProduct(id: string): void {
    this._product.getProduct(Number(id)).subscribe(
      (response: ProductModel) => {
        this.product = response[0];
        this.createForm();
        this.setFormValues(response[0]);
      },
      () => this._router.navigateByUrl('/products')
    );
  }

  public chooseType(): void {
    this.product ? this.editProduct() : this.saveProduct();
  }

  public saveProduct(): void {
    if (this.form.valid) {
      this._product
        .saveProduct(this.form.value)
        .subscribe(
          (response: ProductModel) =>
            this._modal.successModal(
              0,
              `La producto ${response.name}`,
              `/${productsURL}`
            ),
          () => this._modal.errorModal(0)
        );
    }
  }

  public editProduct(): void {
    if (this.form.valid) {
      this._product
        .editProduct(this.generateProduct())
        .subscribe(
          (response: ProductModel) =>
            this._modal.successModal(
              1,
              `La producto ${response.name}`,
              `/${productsURL}`
            ),
          () => this._modal.errorModal(1)
        );
    }
  }

  private generateProduct(): ProductModel {
    return {
      id: this.product.id,
      ...this.form.value
    };
  }

  private loadProviders(): void {
    this._provider.loadAllProviders().subscribe((response: ProviderModel[]) => {
      this.providers = response;
      if (!this.providers)
        this._modal.noDataModal('proveedor', `/${providersURL}`);
    });
  }
}
