import {Component, inject} from '@angular/core';
import {SignInService} from "./sign-in.service";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthRequestModel} from "../shared/models/auth-request.model";
import {TranslatePipe} from "@ngx-translate/core";
import {NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    TranslatePipe,
    ReactiveFormsModule,
    NgIf,
    RouterLink
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
  isSubmitted: boolean = false;
  passVisible: boolean = false;
  requestSent: boolean = false;
  signinLoading: boolean = false;
  private fb: FormBuilder = inject(FormBuilder)
  private service: SignInService = inject(SignInService);

  constructor() {
    this.service.component = this;
    this.service.checkRememberMe();
  }

  requestForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    remember: [false]
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
    if (this.requestForm.valid) {
      var req: AuthRequestModel = this.requestForm.value as AuthRequestModel;
      this.service.SignIn(req);
    }
  }
}
