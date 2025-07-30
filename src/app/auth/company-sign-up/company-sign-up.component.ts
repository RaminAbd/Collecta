import {Component, inject} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {TranslatePipe} from "@ngx-translate/core";
import {CompanySignUpService} from "./company-sign-up.service";
import {CompanySignupRequestModel} from "../shared/models/company-signup-request.model";

@Component({
  selector: 'app-company-sign-up',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule,
    RouterLink,
    TranslatePipe
  ],
  templateUrl: './company-sign-up.component.html',
  styleUrl: './company-sign-up.component.scss'
})
export class CompanySignUpComponent {
  isSubmitted: boolean = false;
  passVisible: boolean = false;
  repeatVisible: boolean = false;
  requestSent: boolean = false;
  signinLoading: boolean = false;
  private fb: FormBuilder = inject(FormBuilder)
  private service: CompanySignUpService = inject(CompanySignUpService);
  private router: Router = inject(Router);

  constructor() {
    this.service.component = this;
  }

  requestForm = this.fb.group({
    companyName: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    companyId: ['', Validators.required],
    password: ['', [Validators.required, Validators.pattern(/^.{6,}$/)]],
    confirmPassword: ['', [Validators.required, Validators.pattern(/^.{6,}$/)]],
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
      var req: CompanySignupRequestModel = this.requestForm.value as CompanySignupRequestModel;
      if(this.service.validate(req)){
        console.log(req)
        this.service.exists(req)
      }
    }
  }

  redirectToCode(req: CompanySignupRequestModel) {
    const serialized = encodeURIComponent(JSON.stringify(req));
    this.router.navigate(['sign-up/business', serialized]);
  }
}
