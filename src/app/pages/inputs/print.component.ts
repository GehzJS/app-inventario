import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginationService } from 'src/app/services/pagination.service';
import { InputService } from 'src/app/services/input.service';
import { InputModel } from 'src/app/models/input.model';

@Component({
  selector: 'app-input-print',
  templateUrl: './print.component.html',
  styles: []
})
export class InputPrintComponent implements OnInit {
  public now: any = Date.now();
  public input: InputModel;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _pagination: PaginationService,
    private _input: InputService
  ) {}

  ngOnInit() {
    setTimeout(() => {
      this._pagination.changeSidebarVisibility(false);
    }, 100);
    const id = this._route.snapshot.paramMap.get('id');
    this.getOutput(id);
  }

  private getOutput(id: string): void {
    this._input.getInput(Number(id)).subscribe((response: InputModel) => {
      this.input = response[0];
    });
  }

  public leave(): void {
    this._pagination.changeSidebarVisibility(true);
    this._router.navigateByUrl('/inputs');
  }
}
