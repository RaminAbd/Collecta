import {Component, inject} from '@angular/core';
import {DropdownModule} from "primeng/dropdown";
import {FormsModule} from "@angular/forms";
import {NgClass, NgForOf} from "@angular/common";
import {
  ProvidedServicesResponseModel
} from "../../../../provided-services/shared/models/provided-services-response.model";
import {SubscriptionModel} from "../../models/subscription.model";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {ApplicationMessageCenterService} from "../../../../../../core/services/ApplicationMessageCenter.service";

@Component({
  selector: 'app-subscription-dialog',
  standalone: true,
  imports: [
    DropdownModule,
    FormsModule,
    NgForOf,
    NgClass
  ],
  templateUrl: './subscription-dialog.component.html',
  styleUrl: './subscription-dialog.component.scss'
})
export class SubscriptionDialogComponent {
  public ref: DynamicDialogRef = inject(DynamicDialogRef);
  public message: ApplicationMessageCenterService = inject(ApplicationMessageCenterService);
  public config: DynamicDialogConfig = inject(DynamicDialogConfig);
  isSubmitted: boolean = false;
  providedServices:ProvidedServicesResponseModel[];
  request:SubscriptionModel = new SubscriptionModel();
  constructor() {
    this.providedServices = this.config.data;
  }

  save() {
    this.isSubmitted = true;
    if(!this.request.serviceId || !this.request.qty || !this.request.price || !this.request.payDay){
      this.message.showTranslatedWarningMessage("Please fill all fields.");
      return;
    }
    this.ref.close(this.request)
  }
}
