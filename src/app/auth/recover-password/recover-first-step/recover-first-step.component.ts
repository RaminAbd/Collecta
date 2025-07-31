import {Component, inject} from '@angular/core';
import {NgIf} from "@angular/common";
import {PaginatorModule} from "primeng/paginator";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {TranslatePipe} from "@ngx-translate/core";
import {CompanySignUpService} from "../../company-sign-up/company-sign-up.service";
import {CompanySignupRequestModel} from "../../shared/models/company-signup-request.model";
import {RecoverFirstStepService} from "./recover-first-step.service";

@Component({
  selector: 'app-recover-first-step',
  standalone: true,
    imports: [
        NgIf,
        PaginatorModule,
        ReactiveFormsModule,
        RouterLink,
        TranslatePipe
    ],
  templateUrl: './recover-first-step.component.html',
  styleUrl: './recover-first-step.component.scss'
})
export class RecoverFirstStepComponent {
  isSubmitted: boolean = false;
  signinLoading: boolean = false;
  private fb: FormBuilder = inject(FormBuilder)
  private router: Router = inject(Router);
  private service:RecoverFirstStepService = inject(RecoverFirstStepService)
  constructor() {
    this.service.component = this;
  }

  requestForm = this.fb.group({
    phoneNumber: ['', Validators.required],
  });

  validateField(field: string) {
    return (
      this.requestForm.get(field)?.invalid &&
      (this.requestForm.get(field)?.dirty ||
        this.requestForm.get(field)?.touched ||
        this.isSubmitted)
    );
  }

  Action() {
    this.isSubmitted = true;
    this.signinLoading = true;
    if (this.requestForm.valid) {
      let req = {
        phoneNumber:this.requestForm.value.phoneNumber,
      }

      this.service.exists(req)
    }
  }

  redirectToCode(req: any) {
    const serialized = encodeURIComponent(JSON.stringify(req));
    this.router.navigate(['recover-password/code', serialized]);
  }
}
