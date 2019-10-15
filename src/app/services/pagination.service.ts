import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  public sidebarVisibility: boolean = true;
  public routerVisibility: boolean = true;
  public rowsConfig: number[] = [10, 25, 50, 100];
  public numberOfPages: any[];
  public pagination = {
    totalEntries: 100,
    currentPage: 1,
    lastPage: 1,
    rowsPerPage: 10
  };
  private backup = { ...this.pagination };

  constructor() {}

  public setPagination(pagination: any): void {
    this.pagination = {
      totalEntries: pagination.total,
      currentPage: pagination.current_page,
      lastPage: pagination.last_page,
      rowsPerPage: pagination.per_page
    };
    this.changeNumberOfPages(this.pagination.rowsPerPage);
  }

  public changeSidebarVisibility(value: boolean): void {
    this.sidebarVisibility = value;
  }

  public changeRouterVisibility(value: boolean): void {
    this.routerVisibility = value;
  }

  public changeNumberOfPages(rows: number): void {
    this.pagination.rowsPerPage = rows;
    this.numberOfPages = Array(this.calculatePages());
  }

  public setCurrentPage(current: number): void {
    this.pagination.currentPage = current;
  }

  private calculatePages(): number {
    const pages = this.pagination.totalEntries / this.pagination.rowsPerPage;
    let totalPages = Math.round(pages);
    const residue = pages - totalPages;
    residue > 0 && residue < 1 ? (totalPages += 1) : totalPages;
    return totalPages;
  }

  public resetPagination(): void {
    this.pagination = this.backup;
    this.changeNumberOfPages(this.pagination.rowsPerPage);
  }
}
