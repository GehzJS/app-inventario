export class PaginationModel {
  constructor(
    public totalEntries: number = 0,
    public currentPage: number = 1,
    public lastPage: number = 1,
    public rowsPerPage: number = 10
  ) {}
}
