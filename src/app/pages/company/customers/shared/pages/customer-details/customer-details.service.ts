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
import {DialogService} from "primeng/dynamicdialog";
import {SubscriptionDialogComponent} from "../../components/subscription-dialog/subscription-dialog.component";

@Injectable({
  providedIn: 'root',
})
export class CustomerDetailsService {
  private service: SubscribersApiService = inject(SubscribersApiService);
  private psService: ProvidedServicesApiService = inject(
    ProvidedServicesApiService
  );
  public dialogService: DialogService = inject(DialogService);
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
        if(!this.component.request.image)this.component.request.image = new FileModel()
        if(!this.component.request.document)this.component.request.document = new FileModel()
        this.getAllSubscriptions()
      });
  }

  getAllSubscriptions(){
    this.subsService.GetAllBySubscriberId(this.component.request.id).subscribe((resp: any) => {
      this.component.subscriptions = resp.data;
    })
  }


  openSubscriptionDialog() {
    console.log('geldi')
    const ref = this.dialogService.open(SubscriptionDialogComponent, {
      header: 'Adding a service to a costumer',
      width: '750px',
      style: {
        maxWidth: '95%',

      },
      data:this.providedServices
    });
    ref.onClose.subscribe((e: any) => {
      if (e) {
        console.log(e)
       this.addSubscription(e)
      }
    });
  }

  addSubscription(e:SubscriptionModel){
    let req:any = {
      subscriberId:this.component.id,
      subscription:e,
      startAt:e.startAt
    }
    this.subsService.Add(req).subscribe((resp: any) => {
      this.getAllSubscriptions()
    })
  }
}
