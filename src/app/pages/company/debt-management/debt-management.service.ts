import { inject, Injectable } from '@angular/core';
import { DebtManagementComponent } from './debt-management.component';
import { InvoicesApiService } from './shared/services/invoices.api.service';
import { StorageService } from '../../../core/services/storage.service';
import { ProvidedServicesApiService } from '../provided-services/shared/services/provided-services.api.service';
import {
  SubscriptionDialogComponent
} from "../customers/shared/components/subscription-dialog/subscription-dialog.component";
import {DialogService} from "primeng/dynamicdialog";
import {PayDebtsDialogComponent} from "./shared/components/pay-debts-dialog/pay-debts-dialog.component";
import {ApplicationMessageCenterService} from "../../../core/services/ApplicationMessageCenter.service";

@Injectable({
  providedIn: 'root',
})
export class DebtManagementService {
  private service: InvoicesApiService = inject(InvoicesApiService);
  private storage: StorageService = inject(StorageService);
  private message: ApplicationMessageCenterService = inject(ApplicationMessageCenterService);
  public dialogService: DialogService = inject(DialogService);
  private psService: ProvidedServicesApiService = inject(
    ProvidedServicesApiService
  );
  component: DebtManagementComponent;

  constructor() {}

  filter() {
    let st = this.storage.getObject('authResponse');
    this.component.request.companyId = st.id;
    delete this.component.request.subscriberId;
    // this.component.request.PageSize = 1;
    // if (!this.component.request.status) delete this.component.request.status;
    if (!this.component.request.from) delete this.component.request.from;
    if (!this.component.request.to) delete this.component.request.to;
    if (!this.component.request.searchText)
      delete this.component.request.searchText;
    this.setCols()
    this.service.Filter(this.component.request).subscribe((resp) => {
      // console.log(resp.data);
      this.component.response = resp.data;
      this.component.response.items = resp.data.items.map((item: any) => ({
        ...item,
        customer: item.firstName + ' ' + item.lastName,
        amount: '$' + item.totalAmount,
        checked:this.component.selectedItemsForPay.some(x => x.id === item.id)
      }));
    });
  }

  getSummary() {
    this.service.GetSummary(this.component.request).subscribe((resp) => {
      this.component.summary = resp.data;
    });
  }

  setCols() {
    this.component.cols = [
      { field: 'check', header: '' },
      { field: 'customer', header: 'Customer' },
      { field: 'service', header: 'Service' },
      { field: 'amount', header: 'Amount' },
      { field: 'deadline', header: 'Payment date' },
      { field: 'code', header: 'Transaction code' },
      { field: 'actions', header: 'Action' },
    ];
    if(this.component.request.status === 2){
      this.component.cols.splice(0,1)
      this.component.cols.splice(5,1)
    }
  }

  getAllServices() {
    let st = this.storage.getObject('authResponse');
    this.psService.getAllByCompanyId(st.id).then((resp: any) => {
      console.log(resp.data);
      this.component.providedServices = resp.data.map((item: any) => ({
        ...item,
        status: item.active,
        price: '$' + item.price,
      }));
    });
  }



  openDialog(items:any){
    const ref = this.dialogService.open(PayDebtsDialogComponent, {
      header: 'Confirm Payment',
      width: '750px',
      style: {
        maxWidth: '95%',
      },
      data:items
    });
    ref.onClose.subscribe((e: any) => {
      if (e) {
        this.payAll(e)
      }
    });
  }

  payAll(req:any) {
    this.service.PayAll(req).subscribe((resp: any) => {
      this.message.showTranslatedSuccessMessage('Payed successfully.');
      this.component.selectedItemsForPay = []
      this.filter()
    })
  }
}
