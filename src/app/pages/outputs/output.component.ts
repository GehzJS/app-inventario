import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
} from '@angular/forms';
import { OutputService } from 'src/app/services/output.service';
import { ProductService } from 'src/app/services/product.service';
import { ModalService } from 'src/app/services/modal.service';
import { OutputModel } from 'src/app/models/output.model';
import { ProductModel } from 'src/app/models/product.model';
import {
  outputsURL,
  productsURL
} from 'src/app/config/endpoints.configuration';

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styles: []
})
export class OutputComponent implements OnInit {
  public id: string;
  public output: OutputModel;
  public product: ProductModel;
  public form: FormGroup;
  private validate = [Validators.required, Validators.min(1)];

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _builder: FormBuilder,
    private _output: OutputService,
    private _product: ProductService,
    private _modal: ModalService
  ) {}

  ngOnInit() {
    this.id = this._route.snapshot.paramMap.get('id');
    this.verifyId(this.id);
  }

  private verifyId(id: string): void {
    id === 'new' ? this.createForm() : this.getOutput(id);
  }

  private createForm(): void {
    this.form = this._builder.group({
      state: [false],
      operator: [
        { value: null, disabled: this.output ? true : false },
        Validators.required
      ],
      product_id: [{ value: null, disabled: true }, this.validate],
      quantity: [
        { value: null, disabled: this.output ? true : false },
        this.validate,
        this.checkQuantity.bind(this)
      ],
      barcode: [
        { value: null, disabled: this.output ? true : false },
        Validators.required
      ]
    });
  }

  private setFormValues(output: OutputModel): void {
    this.form.controls.state.setValue(output.state ? true : false);
    this.form.controls.operator.setValue(output.operator);
    this.form.controls.product_id.setValue(output.product_id);
    this.form.controls.quantity.setValue(output.quantity);
    this.form.controls.barcode.setValue(output.product.barcode);
  }

  private getOutput(id: string): void {
    this._output.getOutput(Number(id)).subscribe(
      (response: OutputModel) => {
        this.output = response[0];
        this.product = response[0].product;
        this.createForm();
        this.setFormValues(response[0]);
      },
      () => this._router.navigateByUrl('/outputs')
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
            this.setProduct(response[0].id);
            if (!this.product)
              this._modal.noDataModal('producto', `/${productsURL}`);
          });
      }
    }
  }

  public chooseType(): void {
    this.output ? this.editOutput() : this.saveOutput();
  }

  public saveOutput(): void {
    if (this.form.valid) {
      this._output
        .saveOutput(this.generateOutput())
        .subscribe(
          (response: OutputModel) =>
            this._modal.successModal(
              0,
              `La salida ${response.id}`,
              `/${outputsURL}/print/`,
              response.id
            ),
          () => this._modal.errorModal(0)
        );
    }
  }

  public editOutput(): void {
    if (this.form.valid) {
      this._output
        .editOutput(this.generateOutput())
        .subscribe(
          (response: OutputModel) =>
            this._modal.successModal(
              1,
              `La salida ${response.id}`,
              `/${outputsURL}/print/`,
              response.id
            ),
          () => this._modal.errorModal(1)
        );
    }
  }

  private generateOutput(): OutputModel {
    const newInput: any = {
      state: this.form.controls.state.value,
      operator: this.form.controls.operator.value,
      quantity: this.form.controls.quantity.value,
      product_id: this.product.id
    };
    if (this.output) newInput.id = this.output.id;
    return newInput;
  }

  private setProduct(id: number): void {
    this.form.controls.product_id.setValue(id);
  }

  private checkQuantity(control: AbstractControl): any {
    const quantity = this.form.controls.quantity.value;
    if (quantity !== null && this.product) {
      return new Promise((resolve, reject) => {
        this.product.stock < quantity
          ? resolve({ greaterThanStock: true })
          : resolve(null);
      });
    }
  }
}
