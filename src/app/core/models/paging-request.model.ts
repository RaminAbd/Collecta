export class PagingRequestModel {
  PageIndex: number = 1;
  PageSize: number = 10;
  SortField?: string;
  SortOrder?: number;
  searchText?: string = '';
  sortType?: number;
}
