import { Component, OnInit } from '@angular/core';
import { inputTitles } from 'src/app/config/table.config';
import { AuthService } from 'src/app/services/auth.service';
import { PaginationService } from 'src/app/services/pagination.service';
import { InputService } from 'src/app/services/input.service';
import { ModalService } from 'src/app/services/modal.service';
import { InputModel } from 'src/app/models/input.model';
import { inputsURL } from 'src/app/config/endpoints.configuration';

@Component({
  selector: 'app-inputs',
  templateUrl: './inputs.component.html',
  styles: []
})
export class InputsComponent implements OnInit {
  public tableTitles: string[] = inputTitles;
  public inputs: InputModel[];

  constructor(
    public _auth: AuthService,
    private _pagination: PaginationService,
    private _input: InputService,
    private _modal: ModalService
  ) {}

  ngOnInit() {
    this._pagination.resetPagination();
    this.loadInputs();
  }

  public loadInputs: any = (): void => {
    this._input
      .loadInputs()
      .subscribe((response: InputModel[]) => (this.inputs = response));
  };

  public searchInputs: any = (word: string): void => {
    this._input
      .searchInput(word)
      .subscribe((response: InputModel[]) => (this.inputs = response));
  };

  public openModal(id: number): void {
    this._modal.deleteModal().then((response: boolean) => {
      if (response) {
        this.deleteInput(id);
      }
    });
  }

  private deleteInput(id: number) {
    this._input.deleteInput(id).subscribe(
      (response: InputModel) => {
        this.loadInputs();
        this._modal.successModal(
          2,
          `La entrada ${response.id}`,
          `/${inputsURL}`
        );
      },
      () => this._modal.errorModal(2)
    );
  }
}
