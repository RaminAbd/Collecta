import { inject, Injectable } from '@angular/core';
import { RecoverThirdStepComponent } from './recover-third-step.component';
import { AuthApiService } from '../../shared/services/auth.api.service';
import { ApplicationMessageCenterService } from '../../../core/services/ApplicationMessageCenter.service';
import { SignInService } from '../../sign-in/sign-in.service';

@Injectable({
  providedIn: 'root',
})
export class RecoverThirdStepService {
  private service: AuthApiService = inject(AuthApiService);
  private signInService: SignInService = inject(SignInService);
  private message: ApplicationMessageCenterService = inject(
    ApplicationMessageCenterService
  );
  component: RecoverThirdStepComponent;

  constructor() {}

  recover() {
    let req: any = structuredClone(this.component.request);
    req.password = this.component.requestForm.value.password;
    req.remember = true;
    this.service.ForgotPassword(req).subscribe((resp) => {
      if (resp) {
        if (resp.succeded) {
          this.signin(req);
        }
      }
    });
  }

  signin(req: any) {
    this.service.SignIn(req).subscribe((resp: any) => {
      this.component.loading = false;
      if (!resp.succeeded) {
        this.message.showErrorMessage(resp.error);
      } else {
        this.signInService.setToStorage(resp.data, req);
        this.signInService.navigateByRole(resp.data);
      }
    });
  }
}
