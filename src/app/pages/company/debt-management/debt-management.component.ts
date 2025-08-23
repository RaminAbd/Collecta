import { Component, inject } from '@angular/core';
import { InvoicesPagingRequestModel } from './shared/models/invoices-paging-request.model';
import { DebtManagementService } from './debt-management.service';
import { DebtPagingTableComponent } from './shared/components/debt-paging-table/debt-paging-table.component';
import { InvoicesPagingResponseModel } from './shared/models/invoices-paging-response.model';
import { FormsModule } from '@angular/forms';
import { ProvidedServicesResponseModel } from '../provided-services/shared/models/provided-services-response.model';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { NgClass } from '@angular/common';
import { InvoiceSummaryResponseModel } from './shared/models/invoice-summary-response.model';
import { InvoicesResponseModel } from './shared/models/invoices-response.model';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-debt-management',
  standalone: true,
  imports: [
    DebtPagingTableComponent,
    FormsModule,
    CalendarModule,
    DropdownModule,
    MultiSelectModule,
    NgClass,
  ],
  templateUrl: './debt-management.component.html',
  styleUrl: './debt-management.component.scss',
})
export class DebtManagementComponent {
  private service: DebtManagementService = inject(DebtManagementService);
  private confirmationService: ConfirmationService =
    inject(ConfirmationService);
  request: InvoicesPagingRequestModel = new InvoicesPagingRequestModel();
  response: InvoicesPagingResponseModel = new InvoicesPagingResponseModel();
  summary: InvoiceSummaryResponseModel = new InvoiceSummaryResponseModel();
  cols: any[] = [];
  providedServices: ProvidedServicesResponseModel[] = [];
  startDate: any;
  endDate: any;
  selectedItemsForPay: InvoicesResponseModel[] = [];
  constructor() {
    this.service.component = this;
    this.request.status = 3;
    this.service.filter();
    this.service.getAllServices();
    this.service.getSummary();
  }

  Filter(e: any) {
    this.request.PageIndex = e.PageIndex
    this.service.filter();
  }

  search() {
    if (this.startDate || this.endDate) {
      this.request.from = this.startDate.toISOString();
      this.request.to = this.endDate.toISOString();
    }
    this.service.filter();
  }

  clear() {
    this.request.searchText = '';
    this.startDate = null;
    this.endDate = null;
    this.request.from = undefined;
    this.request.to = undefined;
    this.service.filter();
  }

  payItem(item: any) {
    let items = [];
    items.push(structuredClone(item));
    this.service.openDialog(items);
  }

  confirm(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure that you want to mark as paid?',
      header: 'Confirmation',
      closeOnEscape: true,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.service.openDialog(this.selectedItemsForPay);
      },
      reject: () => {},
    });
  }
}
