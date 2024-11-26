import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseApiService } from './base.api.service';
import { ApplicationMessageCenterService } from './ApplicationMessageCenter.service';

@Injectable({
  providedIn: 'root',
})
export class BaseCrudApiService extends BaseApiService {
  constructor(http: HttpClient, handler: ApplicationMessageCenterService) {
    super(http, handler);
  }

  GetAll(serviceUrl: string) {
    return new Promise((resolve) => {
      this.get(serviceUrl + 'GetAll/', null, null)
        .toPromise()
        .then((resp) => {
          resolve(resp.data);
        });
    });
  }

  Create(serviceUrl: string, form: any) {
    return new Promise((resolve) => {
      this.post(serviceUrl + 'Create', form)
        .toPromise()
        .then((resp) => {
          resolve(resp.data);
        });
    });
  }

  Edit(serviceUrl: string, form: any) {
    return new Promise((resolve) => {
      this.post(serviceUrl + 'Edit', form)
        .toPromise()
        .then((resp) => {
          resolve(resp.data);
        });
    });
  }

  GetById(serviceUrl: string, id: string) {
    return new Promise((resolve) => {
      this.get(serviceUrl + 'Get/', id, null)
        .toPromise()
        .then((resp) => {
          resolve(resp.data);
        });
    });
  }

  GetByIdObj(serviceUrl: string, obj:any) {
    return new Promise((resolve) => {
      this.get(serviceUrl + 'Get/', null, obj)
        .toPromise()
        .then((resp) => {
          resolve(resp.data);
        });
    });
  }

  Delete(serviceUrl: string, id: string) {
    return new Promise((resolve) => {
      this.delete(serviceUrl + 'Delete/', id)
        .toPromise()
        .then((resp) => {
          resolve(resp.data);
        });
    });
  }
}
