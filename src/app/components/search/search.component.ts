import { Component, OnInit, Input } from '@angular/core';
import { PaginationService } from 'src/app/services/pagination.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent implements OnInit {
  @Input() table: string = '';
  @Input() loadData: any;
  @Input() searchData: any;

  constructor(public _pagination: PaginationService) {}

  ngOnInit() {}

  public setRowsPerPage(rows: number): void {
    this._pagination.setCurrentPage(1);
    this._pagination.changeNumberOfPages(rows);
    this.loadData();
  }

  public setSearchKeyword(word: string): void {
    word !== '' ? this.searchData(word) : this.loadData();
  }
}
