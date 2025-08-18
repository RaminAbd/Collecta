import { Route } from '@angular/router';
import { ProvidedServicesComponent } from '../../../../pages/company/provided-services/provided-services.component';
import { ProvidedServicesUpsertComponent } from '../../../../pages/company/provided-services/shared/pages/provided-services-upsert/provided-services-upsert.component';
import { ProvidedServicesDetailsComponent } from '../../../../pages/company/provided-services/shared/pages/provided-services-details/provided-services-details.component';
import { CompanyProfileComponent } from '../../../../pages/company/company-profile/company-profile.component';
import { CustomersComponent } from '../../../../pages/company/customers/customers.component';
import {
  CustomersUpsertComponent
} from "../../../../pages/company/customers/shared/pages/customers-upsert/customers-upsert.component";
import {
  CustomerDetailsComponent
} from "../../../../pages/company/customers/shared/pages/customer-details/customer-details.component";
export class CompanyChildrenRoutes {
  static children: Route[] = [
    { path: 'services', component: ProvidedServicesComponent },
    { path: 'services/upsert/:id', component: ProvidedServicesUpsertComponent },
    {
      path: 'services/details/:id',
      component: ProvidedServicesDetailsComponent,
    },

    { path: 'profile', component: CompanyProfileComponent },

    { path: 'customers', component: CustomersComponent },
    { path: 'customers/upsert/:id', component: CustomersUpsertComponent },
    { path: 'customers/details/:id', component: CustomerDetailsComponent },

    { path: '', redirectTo: 'services', pathMatch: 'full' },
  ];
}
