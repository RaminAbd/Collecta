import {Component, inject} from '@angular/core';
import {ProvidedServicesService} from "./provided-services.service";
import {
  ProvidedServicesTableComponent
} from "./shared/components/provided-services-table/provided-services-table.component";
import {ProvidedServicesResponseModel} from "./shared/models/provided-services-response.model";

@Component({
  selector: 'app-provided-services',
  standalone: true,
  imports: [
    ProvidedServicesTableComponent
  ],
  templateUrl: './provided-services.component.html',
  styleUrl: './provided-services.component.scss'
})
export class ProvidedServicesComponent {
  private service:ProvidedServicesService = inject(ProvidedServicesService)
  cols: any[] = [];
  items:ProvidedServicesResponseModel[];
  constructor() {
    this.service.component = this;
    this.service.getAll()
    this.service.setCols()
  }
  tableActionHandler(e: any) {
    this.service.tableActionHandler(e);
  }
}
