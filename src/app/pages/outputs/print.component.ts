import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginationService } from 'src/app/services/pagination.service';
import { OutputService } from 'src/app/services/output.service';
import { OutputModel } from 'src/app/models/output.model';

@Component({
  selector: 'app-output-print',
  templateUrl: './print.component.html',
  styles: []
})
export class OutputPrintComponent implements OnInit {
  public now: any = Date.now();
  public output: OutputModel;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _pagination: PaginationService,
    private _output: OutputService
  ) {}

  ngOnInit() {
    setTimeout(() => {
      this._pagination.changeSidebarVisibility(false);
    }, 100);
    const id = this._route.snapshot.paramMap.get('id');
    this.getOutput(id);
  }

  private getOutput(id: string): void {
    this._output.getOutput(Number(id)).subscribe((response: OutputModel) => {
      this.output = response[0];
    });
  }

  public leave(): void {
    this._pagination.changeSidebarVisibility(true);
    this._router.navigateByUrl('/outputs');
  }
}
