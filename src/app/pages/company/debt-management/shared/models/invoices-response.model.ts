export class InvoicesResponseModel {
  id: string;
  companyName: string;
  code: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  totalAmount: number;
  paidAmount: number;
  service: string;
  sector: number;
  deadline: string;
  paidDate: string;
  status: number;
  checked:boolean
  paymentMethod:number;
}
