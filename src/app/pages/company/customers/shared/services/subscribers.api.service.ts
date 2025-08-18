import { Injectable } from '@angular/core';
import {BaseCrudApiService} from "../../../../../core/services/base-crud.api.service";
import {HttpClient} from "@angular/common/http";
import {ApplicationMessageCenterService} from "../../../../../core/services/ApplicationMessageCenter.service";

@Injectable({
  providedIn: 'root'
})
export class SubscribersApiService  extends BaseCrudApiService {
  serviceUrl: string = 'Subscribers/';

  constructor(http: HttpClient, handler: ApplicationMessageCenterService) {
    super(http, handler);
  }

  getAllByCompanyId(companyId:string){
    return this.get(this.serviceUrl + 'getAll/', companyId).toPromise()
  }
}
