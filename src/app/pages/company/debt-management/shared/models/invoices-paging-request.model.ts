import {PagingRequestModel} from "../../../../../core/models/paging-request.model";

export class InvoicesPagingRequestModel extends PagingRequestModel{
  companyId: string;
  subscriberId?: string;
  status?: number;
  serviceIds?: string[]=[];
  from?: string;
  to?: string;
}
