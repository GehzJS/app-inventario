import { Component, OnInit, Input } from '@angular/core';
import { PaginationService } from 'src/app/services/pagination.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styles: []
})
export class PaginationComponent implements OnInit {
  @Input() loadData: any;

  constructor(public _pagination: PaginationService) {}

  ngOnInit() {}

  public changePage(page: number) {
    this._pagination.setCurrentPage(page);
    this.loadData();
  }
}
