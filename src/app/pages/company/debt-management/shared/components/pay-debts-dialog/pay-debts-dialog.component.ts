import { Component, inject } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InvoicesResponseModel } from '../../models/invoices-response.model';
import {MultiSelectModule} from "primeng/multiselect";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule} from "@angular/forms";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-pay-debts-dialog',
  standalone: true,
  imports: [
    MultiSelectModule,
    DropdownModule,
    FormsModule,
    DatePipe
  ],
  templateUrl: './pay-debts-dialog.component.html',
  styleUrl: './pay-debts-dialog.component.scss',
})
export class PayDebtsDialogComponent {
  public ref: DynamicDialogRef = inject(DynamicDialogRef);
  public config: DynamicDialogConfig = inject(DynamicDialogConfig);
  selectedItemsForPay: InvoicesResponseModel[] = [];
  date:Date = new Date();
  paymentMethods: any[] = [
    { name: 'Cash', value: 1 },
    { name: 'Card', value: 2 },
  ];
  constructor() {
    this.selectedItemsForPay = this.config.data;
    this.selectedItemsForPay.forEach((item) => item.paymentMethod = 1)
  }

  payAll() {
    let req = {
      requests:this.selectedItemsForPay.map(item=>({
        id:item.id,
        amount:item.totalAmount,
        paymentMethod:item.paymentMethod,
      }))
    }
    this.ref.close(req);
  }
}
