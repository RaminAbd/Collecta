import { inject, Injectable } from '@angular/core';
import { SubscribersApiService } from '../../services/subscribers.api.service';
import { CustomerDetailsComponent } from './customer-details.component';
import {FileModel} from "../../../../../../core/models/File.model";
import {SubscriptionModel} from "../../models/subscription.model";
import {ProvidedServicesApiService} from "../../../../provided-services/shared/services/provided-services.api.service";
import {StorageService} from "../../../../../../core/services/storage.service";
import {
  ProvidedServicesResponseModel
} from "../../../../provided-services/shared/models/provided-services-response.model";
import {SubscriptionsApiService} from "../../services/subscriptions.api.service";

@Injectable({
  providedIn: 'root',
})
export class CustomerDetailsService {
  private service: SubscribersApiService = inject(SubscribersApiService);
  private psService: ProvidedServicesApiService = inject(
    ProvidedServicesApiService
  );
  private storage: StorageService = inject(StorageService);
  private subsService: SubscriptionsApiService = inject(SubscriptionsApiService);
  component: CustomerDetailsComponent;
  providedServices:ProvidedServicesResponseModel[];
  constructor() {}
  getAllProvidedServices() {
    let st = this.storage.getObject('authResponse');
    this.psService.getAllByCompanyId(st.id).then((resp: any) => {
      console.log(resp.data);
      this.providedServices = resp.data.map((item: any) => ({
        ...item,
        status: item.active,
        price: '$' + item.price,
      }));

    });
  }

  getItem() {
    this.service
      .GetById(this.service.serviceUrl, this.component.id)
      .then((resp: any) => {
        this.component.request = resp.data;
        this.getAllSubscriptions()
      });
  }

  getAllSubscriptions(){
    this.subsService.GetAllBySubscriberId(this.component.request.id).subscribe((resp: any) => {
      this.component.subscriptions = resp.data;
    })
  }


}
