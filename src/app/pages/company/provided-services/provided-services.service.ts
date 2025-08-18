import { inject, Injectable } from '@angular/core';
import { ProvidedServicesApiService } from './shared/services/provided-services.api.service';
import { ProvidedServicesComponent } from './provided-services.component';
import { StorageService } from '../../../core/services/storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ProvidedServicesService {
  private service: ProvidedServicesApiService = inject(
    ProvidedServicesApiService
  );
  private storage: StorageService = inject(StorageService);
  private router: Router = inject(Router);
  component: ProvidedServicesComponent;
  constructor() {}

  getAll() {
    let st = this.storage.getObject('authResponse')
    this.service.getAllByCompanyId(st.id).then((resp: any) => {
      console.log(resp.data);
      this.component.items = resp.data.map((item: any) => ({
        ...item,
        status: item.active,
        price: '$' + item.price,
      }));
    });
  }

  setCols() {
    this.component.cols = [
      { field: 'name', header: 'Name' },
      { field: 'price', header: 'Price' },
      { field: 'unit', header: 'Unit' },
      { field: 'status', header: 'Status', width: '200px' },
      { field: 'view', header: 'Actions', width: '200px' },
    ];
  }

  tableActionHandler(e: any) {
    switch (e.type) {
      case 1:
        this.router.navigate(['/main/company/services/upsert', 'create']);
        break;
      case 4:
        this.router.navigate(['/main/company/services/details', e.data.id]);
        break;
    }
  }
}
