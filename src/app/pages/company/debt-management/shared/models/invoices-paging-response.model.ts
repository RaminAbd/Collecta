import {PagingResponseModel} from "../../../../../core/models/paging-response.model";
import {InvoicesResponseModel} from "./invoices-response.model";

export class InvoicesPagingResponseModel extends PagingResponseModel{
  override items:InvoicesResponseModel[]=[]
}
