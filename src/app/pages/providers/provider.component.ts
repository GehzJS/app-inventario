import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProviderService } from 'src/app/services/provider.service';
import { ModalService } from 'src/app/services/modal.service';
import { ProviderModel } from 'src/app/models/provider.model';
import { providersURL } from 'src/app/config/endpoints.configuration';

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styles: []
})
export class ProviderComponent implements OnInit {
  public id: string;
  public provider: ProviderModel;
  public form: FormGroup;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _builder: FormBuilder,
    private _provider: ProviderService,
    private _modal: ModalService
  ) {}

  ngOnInit() {
    this.id = this._route.snapshot.paramMap.get('id');
    this.verifyId(this.id);
  }

  private verifyId(id: string): void {
    id === 'new' ? this.createForm() : this.getProvider(id);
  }

  private createForm(): void {
    this.form = this._builder.group({
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      phone: [null, Validators.required]
    });
  }

  private setFormValues(provider: ProviderModel): void {
    this.form.controls.name.setValue(provider.name);
    this.form.controls.email.setValue(provider.email);
    this.form.controls.phone.setValue(provider.phone);
  }

  private getProvider(id: string): void {
    this._provider.getProvider(Number(id)).subscribe(
      (response: ProviderModel) => {
        this.provider = response;
        this.createForm();
        this.setFormValues(response);
      },
      () => this._router.navigateByUrl('/providers')
    );
  }

  public chooseType(): void {
    this.provider ? this.editProvider() : this.saveProvider();
  }

  public saveProvider(): void {
    if (this.form.valid) {
      this._provider
        .saveProvider(this.form.value)
        .subscribe(
          (response: ProviderModel) =>
            this._modal.successModal(
              0,
              `El proveedor ${response.name}`,
              `/${providersURL}`
            ),
          () => this._modal.errorModal(0)
        );
    }
  }

  public editProvider(): void {
    if (this.form.valid) {
      this._provider
        .editProvider(this.generateProvider())
        .subscribe(
          (response: ProviderModel) =>
            this._modal.successModal(
              1,
              `El proveedor ${response.name}`,
              `/${providersURL}`
            ),
          () => this._modal.errorModal(1)
        );
    }
  }

  private generateProvider(): ProviderModel {
    return {
      id: this.provider.id,
      ...this.form.value
    };
  }
}
