import { Injectable } from '@angular/core';
import {BaseCrudApiService} from "../../../../../core/services/base-crud.api.service";
import {HttpClient} from "@angular/common/http";
import {ApplicationMessageCenterService} from "../../../../../core/services/ApplicationMessageCenter.service";

@Injectable({
  providedIn: 'root'
})
export class SubscriptionsApiService extends BaseCrudApiService {
  serviceUrl: string = 'Subscriptions/';

  constructor(http: HttpClient, handler: ApplicationMessageCenterService) {
    super(http, handler);
  }

  GetAllBySubscriberId(subscriberId:string) {
    return this.get(this.serviceUrl + 'get-subscriptions/', subscriberId);
  }

  Add(req:any){
    return this.post(this.serviceUrl + 'add', req);
  }
}
