import {inject, Injectable} from '@angular/core';
import {VerifyCompanyCodeComponent} from "./verify-company-code.component";
import {CompaniesApiService} from "../shared/services/companies.api.service";

@Injectable({
  providedIn: 'root'
})
export class VerifyCompanyCodeService {
  component: VerifyCompanyCodeComponent;
  private service:CompaniesApiService = inject(CompaniesApiService)
  constructor() { }

  signup() {
    let req = structuredClone(this.component.request)
    req.otpCode = Number(req.otpCode);
    console.log(req)
    this.service.Signup(req).subscribe(resp=>{
      console.log(resp)
    })
  }
}
