import {inject, Injectable} from '@angular/core';
import {RecoverSecondStepComponent} from "./recover-second-step.component";
import {VerificationApiService} from "../../shared/services/verification.api.service";

@Injectable({
  providedIn: 'root'
})
export class RecoverSecondStepService {
  private verificationService: VerificationApiService = inject(
    VerificationApiService
  );
  component:RecoverSecondStepComponent;
  constructor() { }
  sendVerificationCode() {
    let req = {
      phoneNumber: this.component.request.phoneNumber,
    };
    this.verificationService.SendVerification(req).subscribe((resp) => {});
  }
}
