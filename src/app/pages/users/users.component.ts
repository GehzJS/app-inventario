import { Component, OnInit } from '@angular/core';
import { userTitles } from 'src/app/config/table.config';
import { AuthService } from 'src/app/services/auth.service';
import { PaginationService } from 'src/app/services/pagination.service';
import { UserService } from 'src/app/services/user.service';
import { ModalService } from 'src/app/services/modal.service';
import { UserModel } from 'src/app/models/user.model';
import { usersURL } from 'src/app/config/endpoints.configuration';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: []
})
export class UsersComponent implements OnInit {
  public tableTitles: string[] = userTitles;
  public users: UserModel[];
  public search: string = '';

  constructor(
    public _auth: AuthService,
    private _pagination: PaginationService,
    private _user: UserService,
    private _modal: ModalService
  ) {}

  ngOnInit() {
    this._pagination.resetPagination();
    this.loadUsers();
  }

  public loadUsers: any = (): void => {
    this._user
      .loadUsers()
      .subscribe((response: UserModel[]) => (this.users = response));
  };

  public searchUsers: any = (word: string): void => {
    this._user
      .searchUser(word)
      .subscribe((response: UserModel[]) => (this.users = response));
  };

  public openModal(id: number): void {
    this._modal.deleteModal().then((response: boolean) => {
      if (response) {
        this.deleteUser(id);
      }
    });
  }

  private deleteUser(id: number) {
    this._user.deleteUser(id).subscribe(
      (response: UserModel) => {
        this.loadUsers();
        this._modal.successModal(
          2,
          `El usuario ${response.username}`,
          `/${usersURL}`
        );
      },
      () => this._modal.errorModal(2)
    );
  }
}
