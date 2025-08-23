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
import {CalendarModule} from "primeng/calendar";

@Component({
  selector: 'app-subscription-dialog',
  standalone: true,
  imports: [
    DropdownModule,
    FormsModule,
    NgClass,
    CalendarModule
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
  startDate:any
  constructor() {
    this.providedServices = this.config.data;
  }

  save() {

    this.isSubmitted = true;
    if(!this.request.serviceId || !this.request.qty || !this.request.price || !this.request.payDay || !this.startDate){
      this.message.showTranslatedWarningMessage("Please fill all fields.");
      return;
    }
    this.request.startAt = this.startDate.toISOString();
    this.ref.close(this.request)
  }
}
