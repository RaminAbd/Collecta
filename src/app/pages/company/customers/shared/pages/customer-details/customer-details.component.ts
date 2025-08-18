import {Component, inject} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {CustomersRequestModel} from "../../models/customers-request.model";
import {CustomerDetailsService} from "./customer-details.service";
import {DatePipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {SubscriptionResponseModel} from "../../models/subscription-response.model";

@Component({
  selector: 'app-customer-details',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    NgClass,
    NgForOf,
    DatePipe
  ],
  templateUrl: './customer-details.component.html',
  styleUrl: './customer-details.component.scss'
})
export class CustomerDetailsComponent {
  private service:CustomerDetailsService = inject(CustomerDetailsService)
  private route: ActivatedRoute = inject(ActivatedRoute);
  request: CustomersRequestModel = new CustomersRequestModel();
  id = this.route.snapshot.paramMap.get('id') as string;
  selectedTab:number = 2;
  subscriptions:SubscriptionResponseModel[]=[]
  constructor() {
    this.service.component = this;
    this.service.getItem()
    this.service.getAllProvidedServices()
  }
}
