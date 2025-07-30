import { Injectable } from '@angular/core';
import {BaseApiService} from "../../../core/services/base.api.service";
import {HttpClient} from "@angular/common/http";
import {ApplicationMessageCenterService} from "../../../core/services/ApplicationMessageCenter.service";

@Injectable({
  providedIn: 'root'
})
export class CompaniesApiService extends BaseApiService {
  serviceUrl = 'Companies/';
  constructor(http: HttpClient, handler: ApplicationMessageCenterService) {
    super(http, handler);
  }

  Signup(req:any){
    return this.post(this.serviceUrl + 'sign-up', req);
  }
}
