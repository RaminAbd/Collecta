import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApplicationMessageCenterService} from "../../../core/services/ApplicationMessageCenter.service";
import {BaseCrudApiService} from "../../../core/services/base-crud.api.service";

@Injectable({
  providedIn: 'root'
})
export class CompaniesApiService extends BaseCrudApiService {
  serviceUrl = 'Companies/';
  constructor(http: HttpClient, handler: ApplicationMessageCenterService) {
    super(http, handler);
  }

  Signup(req:any){
    return this.post(this.serviceUrl + 'sign-up', req);
  }
}
