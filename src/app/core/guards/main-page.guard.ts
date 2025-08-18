import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthResponseModel} from '../../auth/shared/models/auth-response.model';
import {StorageService} from '../services/storage.service';
import {isPlatformBrowser} from "@angular/common";
@Injectable({
  providedIn: 'root',
})
export class MainPageGuard  implements CanActivate{
  constructor(
    private router: Router,
    private storage: StorageService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}
  canActivate(): any {
    if (!isPlatformBrowser(this.platformId)) {
      return false;
    }

    let result: boolean = false;
    let SignInResult = this.storage.getObject('authResponse') as AuthResponseModel;
    if (!SignInResult || !SignInResult.accessToken) {
      this.router.navigate(['/sign-in']).then();
      result = false;
    } else {
      let token = SignInResult.accessToken;
      if (!token) {
        this.router.navigate(['/sign-in']).then();
        result = false;
      } else {
        result = true;
        return result;
      }
      return result;
    }

    return result;
  }
}
