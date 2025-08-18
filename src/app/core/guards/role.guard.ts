import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRouteSnapshot, Router, CanActivate } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { CryptoService } from '../../auth/shared/services/crypto.service';
import { AuthResponseModel } from '../../auth/shared/models/auth-response.model';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(
    private router: Router,
    private storage: StorageService,
    private cryptoService: CryptoService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (!isPlatformBrowser(this.platformId)) {
      // Block route activation on server-side rendering
      return false;
    }

    const SignInResult = this.storage.getObject('authResponse') as AuthResponseModel;
    const allowedPermission = route.data['permissionTypes'] as string;
    const encryptedRole = this.storage.getObject('role') as string;

    if (!SignInResult?.accessToken || !encryptedRole) {
      this.navigateToHome();
      return false;
    }

    const userRole = SignInResult.role;

    if (this.cryptoService.encrypt(userRole, 3) !== encryptedRole) {
      this.navigateToHome();
      return false;
    }

    if (userRole !== allowedPermission) {
      this.navigateToHome();
      return false;
    }

    return true;
  }

  private navigateToHome() {
    this.router.navigate(['/sign-in']);
  }
}
