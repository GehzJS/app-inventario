import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { UserModel } from 'src/app/models/user.model';
import { ModalService } from 'src/app/services/modal.service';
import { usersURL } from 'src/app/config/endpoints.configuration';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styles: []
})
export class UserComponent implements OnInit {
  public id: string;
  public user: UserModel;
  public form: FormGroup;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _builder: FormBuilder,
    private _user: UserService,
    private _modal: ModalService
  ) {}

  ngOnInit() {
    this.id = this._route.snapshot.paramMap.get('id');
    this.verifyId(this.id);
  }

  private verifyId(id: string): void {
    id === 'new' ? this.createForm() : this.getUser(id);
  }

  private createForm(): void {
    this.form = this._builder.group(
      {
        username: [null, Validators.required],
        email: [null, [Validators.required, Validators.email]],
        password: [null, [Validators.required, Validators.minLength(8)]],
        verify: [null, [Validators.required]],
        role: ['ROLE_USER', [Validators.required]]
      },
      {
        validator: this.checkPasswordMatch('password', 'verify')
      }
    );
  }

  private checkPasswordMatch(password: string, verify: string) {
    return (formGroup: FormGroup) => {
      const originalPassword = formGroup.controls[password];
      const verifyPassword = formGroup.controls[verify];
      if (!originalPassword.errors && !verifyPassword.errors) {
        if (originalPassword.value !== verifyPassword.value) {
          verifyPassword.setErrors({ mustMatch: true });
        } else {
          verifyPassword.setErrors(null);
        }
      }
    };
  }

  private setFormValues(user: UserModel): void {
    this.form.controls.username.setValue(user.username);
    this.form.controls.email.setValue(user.email);
    this.form.controls.role.setValue(user.role);
  }

  private getUser(id: string): void {
    this._user.getUser(Number(id)).subscribe(
      (response: UserModel) => {
        this.user = response;
        this.createForm();
        this.setFormValues(response);
      },
      () => this._router.navigateByUrl('/users')
    );
  }

  public chooseType(): void {
    this.user ? this.editUser() : this.saveUser();
  }

  public saveUser(): void {
    if (this.form.valid) {
      this._user
        .saveUser(this.form.value)
        .subscribe(
          (response: UserModel) =>
            this._modal.successModal(
              0,
              `El usuario ${response.username}`,
              `${usersURL}`
            ),
          () => this._modal.errorModal(0)
        );
    }
  }

  public editUser(): void {
    if (this.form.valid) {
      this._user
        .editUser(this.generateUser())
        .subscribe(
          (response: UserModel) =>
            this._modal.successModal(
              1,
              `El usuario ${response.username}`,
              `${usersURL}`
            ),
          () => this._modal.errorModal(1)
        );
    }
  }

  private generateUser(): UserModel {
    return {
      id: this.user.id,
      ...this.form.value
    };
  }
}
