import { inject, Injectable } from '@angular/core';
import { ApplicationMessageCenterService } from '../../../../../../core/services/ApplicationMessageCenter.service';
import { Router } from '@angular/router';
import { BlobService } from '../../../../../../core/services/blob.service';
import { StorageService } from '../../../../../../core/services/storage.service';
import { CustomersUpsertComponent } from './customers-upsert.component';
import { SubscribersApiService } from '../../services/subscribers.api.service';
import { ProvidedServicesApiService } from '../../../../provided-services/shared/services/provided-services.api.service';
import { SubscriptionModel } from '../../models/subscription.model';
import {FileModel} from "../../../../../../core/models/File.model";

@Injectable({
  providedIn: 'root',
})
export class CustomersUpsertService {
  private service: SubscribersApiService = inject(SubscribersApiService);
  public message: ApplicationMessageCenterService = inject(
    ApplicationMessageCenterService
  );
  private providedServices: ProvidedServicesApiService = inject(
    ProvidedServicesApiService
  );
  private router: Router = inject(Router);
  public blob: BlobService = inject(BlobService);
  private storage: StorageService = inject(StorageService);
  component: CustomersUpsertComponent;

  constructor() {}

  getAllProvidedServices() {
    let st = this.storage.getObject('authResponse');
    this.providedServices.getAllByCompanyId(st.id).then((resp: any) => {
      console.log(resp.data);
      this.component.providedServices = resp.data.map((item: any) => ({
        ...item,
        status: item.active,
        price: '$' + item.price,
      }));

      if (this.component.id !== 'create') this.getItem();
      else {
        this.component.request.subscriptions.push(new SubscriptionModel());
      }
    });
  }

  getItem() {
    this.service
      .GetById(this.service.serviceUrl, this.component.id)
      .then((resp: any) => {
        this.component.request = resp.data;
        this.component.request.document = new FileModel()
      });
  }

  getFile(e: any, fileHandler: any) {
    const files = e.target.files;
    console.log(files);
    for (let i = 0; i < files.length; i++) {
      const fd = new FormData();
      fd.append('file', files[i]);
      this.blob.UploadFile(fd).subscribe((resp: any) => {
        fileHandler(resp);
      });
    }
  }

  save() {
    let st = this.storage.getObject('authResponse');
    this.component.request.companyId = st.id;
    if (this.isValid())
      this.component.id === 'create' ? this.create() : this.update();
  }

  private create() {
    this.service
      .Create(this.service.serviceUrl, this.component.request)
      .then((resp: any) => {
        console.log(resp);
        if (resp.succeeded) {
          this.message.showSuccessMessage('Successfully created!');
          this.router.navigate(['/main/company/customers']);
        }
      });
  }

  private update() {
    this.service
      .Edit(this.service.serviceUrl, this.component.request)
      .then((resp: any) => {
        if (resp.succeeded) {
          this.message.showSuccessMessage('Successfully updated!');
          this.router.navigate(['/main/company/customers']);
        }
      });
  }

  private isValid() {
    let result = true;
    if (
      !this.component.request.firstName ||
      !this.component.request.lastName ||
      !this.component.request.phoneNumber ||
      !this.component.request.additionalPhoneNumber ||
      !this.component.request.personalId ||
      !this.component.request.email ||
      !this.component.request.preferredLanguage ||
      !this.component.request.image.fileUrl ||
      this.component.request.subscriptions.length === 0
    )
      result = false;

    if (this.component.request.subscriptions.length !== 0) {
      this.component.request.subscriptions.forEach(
        (item: SubscriptionModel) => {
          if (!item.serviceId || !item.qty || !item.payDay || !item.price)
            result = true;
        }
      );
    }

    return result;
  }
}
