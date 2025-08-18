import { inject, Injectable } from '@angular/core';
import { ProvidedServicesApiService } from '../../services/provided-services.api.service';
import { ApplicationMessageCenterService } from '../../../../../../core/services/ApplicationMessageCenter.service';
import { ProvidedServicesDetailsComponent } from './provided-services-details.component';

@Injectable({
  providedIn: 'root',
})
export class ProvidedServicesDetailsService {
  private service: ProvidedServicesApiService = inject(
    ProvidedServicesApiService
  );
  private message: ApplicationMessageCenterService = inject(
    ApplicationMessageCenterService
  );

  component: ProvidedServicesDetailsComponent;

  constructor() {}

  getItem() {
    this.service
      .GetById(this.service.serviceUrl, this.component.id)
      .then((resp: any) => {
        this.component.request = resp.data;
      });
  }

  activate() {
    let req = {
      id: this.component.id,
    };
    this.service.Activate(req).then((resp: any) => {
      this.message.showTranslatedSuccessMessage(
        'Provided service activated successfully.'
      );
      this.getItem();
    });
  }

  deactivate() {
    let req = {
      id: this.component.id,
    };
    this.service.Deactivate(req).then((resp: any) => {
      this.message.showTranslatedSuccessMessage(
        'Provided service deactivated successfully.'
      );
      this.getItem();
    });
  }
}
