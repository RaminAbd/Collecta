import {Component, inject} from '@angular/core';
import {
  ProvidedServicesTableComponent
} from "../provided-services/shared/components/provided-services-table/provided-services-table.component";
import {ProvidedServicesService} from "../provided-services/provided-services.service";
import {CustomersService} from "./customers.service";
import {CustomersTableComponent} from "./shared/components/customers-table/customers-table.component";

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [
    ProvidedServicesTableComponent,
    CustomersTableComponent
  ],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss'
})
export class CustomersComponent {
  private service:CustomersService = inject(CustomersService)
  cols: any[] = [];
  items:any[];
  constructor() {
    this.service.component = this;
    this.service.getAll()
    this.service.setCols()
  }
  tableActionHandler(e: any) {
    this.service.tableActionHandler(e);
  }
}
