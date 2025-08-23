import { Component, EventEmitter, Output } from '@angular/core';
import { TableModule } from 'primeng/table';
import { TranslatePipe } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { NgClass, NgForOf, NgIf, NgStyle } from '@angular/common';
import { Skeleton, SkeletonModule } from 'primeng/skeleton';
import { PagingTablePaginationComponent } from '../../../../../../shared/components/paging-table/shared/components/paging-table-pagination/paging-table-pagination.component';
import { ConfirmPopup, ConfirmPopupModule } from 'primeng/confirmpopup';
import { PagingTableComponent } from '../../../../../../shared/components/paging-table/paging-table.component';
import { InvoicesResponseModel } from '../../models/invoices-response.model';
@Component({
  selector: 'app-debt-paging-table',
  standalone: true,
  imports: [
    TableModule,
    TranslatePipe,
    FormsModule,
    NgStyle,
    NgForOf,
    NgIf,
    PagingTablePaginationComponent,
    ConfirmPopupModule,
    SkeletonModule,
    NgClass,
  ],
  templateUrl: './debt-paging-table.component.html',
  styleUrl: './debt-paging-table.component.scss',
})
export class DebtPagingTableComponent extends PagingTableComponent {
  selectedItems: InvoicesResponseModel[] = [];
  @Output() selectedItemsChanged: any = new EventEmitter();
  @Output() payItem: any = new EventEmitter();

  getCheckedElements(item: InvoicesResponseModel) {
    if (item.checked) {
      this.selectedItems.push(item);
    } else {
      this.selectedItems = this.selectedItems.filter((x) => x.id !== item.id);
    }
    this.selectedItemsChanged.emit(this.selectedItems);
  }

  confirm(event: Event, item: any) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure that you want to mark as paid?',
      header: 'Confirmation',
      closeOnEscape: true,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.payItem.emit(item);
      },
      reject: () => {},
    });
  }

  isSelected(id: string) {
    return this.selectedItems.some((x: any) => x.id == id);
  }
}
