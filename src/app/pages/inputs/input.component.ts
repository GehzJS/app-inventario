import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InputService } from 'src/app/services/input.service';
import { ProductService } from 'src/app/services/product.service';
import { ModalService } from 'src/app/services/modal.service';
import { InputModel } from 'src/app/models/input.model';
import { ProductModel } from 'src/app/models/product.model';
import { inputsURL, productsURL } from 'src/app/config/endpoints.configuration';
import { UserModel } from 'src/app/models/user.model';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styles: []
})
export class InputComponent implements OnInit {
  public id: string;
  public input: InputModel;
  public product: ProductModel;
  public user: UserModel;
  public selectedProduct: ProductModel;
  public form: FormGroup;
  public validate = [Validators.required, Validators.min(1)];

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _builder: FormBuilder,
    private _input: InputService,
    private _product: ProductService,
    private _modal: ModalService
  ) {
    this.user = JSON.parse(sessionStorage.getItem('user'));
  }

  ngOnInit() {
    this.id = this._route.snapshot.paramMap.get('id');
    this.verifyId(this.id);
  }

  private verifyId(id: string): void {
    id === 'new' ? this.createForm() : this.getInput(id);
  }

  private createForm(): void {
    this.form = this._builder.group({
      total: [{ value: 0, disabled: true }, Validators.required],
      state: [false, Validators.required],
      quantity: [
        { value: null, disabled: this.input ? true : false },
        this.validate
      ],
      product_id: [null, this.validate],
      user_id: [{ value: null, disabled: true }, this.validate],
      price: [{ value: 0, disabled: true }],
      barcode: [
        { value: null, disabled: this.input ? true : false },
        Validators.required
      ]
    });
  }

  private setFormValues(input: InputModel): void {
    this.form.controls.total.setValue(input.total);
    this.form.controls.state.setValue(input.state ? true : false);
    this.form.controls.quantity.setValue(input.quantity);
    this.form.controls.product_id.setValue(input.product_id);
    this.form.controls.user_id.setValue(input.user_id);
    this.form.controls.price.setValue(input.product.price);
    this.form.controls.barcode.setValue(input.product.barcode);
  }

  public getInput(id: string): void {
    this._input.getInput(Number(id)).subscribe(
      (response: InputModel) => {
        this.input = response[0];
        this.createForm();
        this.setFormValues(response[0]);
      },
      () => this._router.navigateByUrl(`/${inputsURL}`)
    );
  }

  public getProduct(): void {
    let barcode = this.form.controls.barcode.value;
    barcode = barcode.toString();
    if (barcode !== null) {
      if (barcode.length >= 8) {
        this._product
          .getProductByBarcode(barcode)
          .subscribe((response: ProductModel) => {
            this.product = response[0];
            this.setProduct(response[0]);
            if (!this.product)
              this._modal.noDataModal('producto', `/${productsURL}`);
          });
      }
    }
  }

  public chooseType(): void {
    this.input ? this.editInput() : this.saveInput();
  }

  public saveInput(): void {
    if (this.form.valid) {
      this._input
        .saveInput(this.generateInput())
        .subscribe(
          (response: InputModel) =>
            this._modal.successModal(
              0,
              `La entrada ${response.id}`,
              `/${inputsURL}/print/`,
              response.id
            ),
          () => this._modal.errorModal(0)
        );
    }
  }

  public editInput(): void {
    if (this.form.valid) {
      this._input
        .editInput(this.generateInput())
        .subscribe(
          (response: InputModel) =>
            this._modal.successModal(
              1,
              `La entrada ${response.id}`,
              `/${inputsURL}/print/`,
              response.id
            ),
          () => this._modal.errorModal(1)
        );
    }
  }

  private generateInput(): InputModel {
    const newInput: any = {
      state: this.form.controls.state.value,
      quantity: this.form.controls.quantity.value,
      product_id: this.form.controls.product_id.value,
      user_id: this.user.id,
      total: this.calculateTotal()
    };
    if (this.input) newInput.id = this.input.id;
    return newInput;
  }

  private setProduct(product: ProductModel): void {
    this.form.controls.product_id.setValue(product.id);
    this.form.controls.price.setValue(product.price);
  }

  public calculateTotal(): number {
    if (this.product) {
      const total =
        this.form.controls.price.value * this.form.controls.quantity.value;
      this.form.controls.total.setValue(total);
      return total;
    }
  }
}
