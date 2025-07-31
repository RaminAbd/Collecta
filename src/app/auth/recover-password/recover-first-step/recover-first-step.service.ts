import { Injectable } from '@angular/core';
import {CompanySignupRequestModel} from "../../shared/models/company-signup-request.model";
import {ApplicationMessageCenterService} from "../../../core/services/ApplicationMessageCenter.service";
import {AuthApiService} from "../../shared/services/auth.api.service";
import {RecoverFirstStepComponent} from "./recover-first-step.component";

@Injectable({
  providedIn: 'root'
})
export class RecoverFirstStepService {
  component:RecoverFirstStepComponent;
  constructor(
    private message: ApplicationMessageCenterService,
    private service: AuthApiService
  ) { }

  exists(req:any) {
    this.service.Exists(req.phoneNumber).subscribe(resp => {
      if(resp.data.exists){
        this.component.redirectToCode(req)
      }
      else{
        this.message.showTranslatedWarningMessage('Account does not exists');
      }
    })
  }
}
