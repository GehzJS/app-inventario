import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaginationService } from 'src/app/services/pagination.service';
import { AuthService } from 'src/app/services/auth.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {
  public form: FormGroup;

  constructor(
    private _router: Router,
    private _pagination: PaginationService,
    private _auth: AuthService,
    private _builder: FormBuilder,
    private _modal: ModalService
  ) {}

  ngOnInit() {
    setTimeout(() => {
      this._pagination.changeSidebarVisibility(false);
    }, 100);
    const user = sessionStorage.getItem('user');
    const token = sessionStorage.getItem('token');
    if (user && token) this._router.navigateByUrl('/home');
    this.createForm();
  }

  private createForm(): void {
    this.form = this._builder.group({
      username: [null, Validators.required],
      password: [null, [Validators.required, Validators.minLength(8)]]
    });
  }

  public login(): void {
    if (this.form.valid) {
      this._auth
        .login(this.form.value)
        .subscribe(
          () => this._router.navigateByUrl('/home'),
          () => this._modal.errorLoginModal()
        );
    }
  }
}
