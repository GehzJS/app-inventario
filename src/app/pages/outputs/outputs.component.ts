import { Component, OnInit } from '@angular/core';
import { outputTitles } from 'src/app/config/table.config';
import { AuthService } from 'src/app/services/auth.service';
import { OutputService } from 'src/app/services/output.service';
import { ModalService } from 'src/app/services/modal.service';
import { OutputModel } from 'src/app/models/output.model';
import { outputsURL } from 'src/app/config/endpoints.configuration';
import { PaginationService } from 'src/app/services/pagination.service';

@Component({
  selector: 'app-outputs',
  templateUrl: './outputs.component.html',
  styles: []
})
export class OutputsComponent implements OnInit {
  public tableTitles: string[] = outputTitles;
  public outputs: OutputModel[];

  constructor(
    public _auth: AuthService,
    private _pagination: PaginationService,
    private _output: OutputService,
    private _modal: ModalService
  ) {}

  ngOnInit() {
    this._pagination.resetPagination();
    this.loadOutputs();
  }

  public loadOutputs: any = (): void => {
    this._output
      .loadOutputs()
      .subscribe((response: OutputModel[]) => (this.outputs = response));
  };

  public searchOutputs: any = (word: string): void => {
    this._output
      .searchOutput(word)
      .subscribe((response: OutputModel[]) => (this.outputs = response));
  };

  public openModal(id: number): void {
    this._modal.deleteModal().then((response: boolean) => {
      if (response) {
        this.deleteOutput(id);
      }
    });
  }

  private deleteOutput(id: number) {
    this._output.deleteOutput(id).subscribe(
      (response: OutputModel) => {
        this.loadOutputs();
        this._modal.successModal(
          2,
          `La salida ${response.id}`,
          `/${outputsURL}`
        );
      },
      () => this._modal.errorModal(2)
    );
  }
}
