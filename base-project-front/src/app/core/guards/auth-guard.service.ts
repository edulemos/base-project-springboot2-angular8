import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(public auth: AuthService, public router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {

    const expectedRole = route.data.expectedRole;
    const authenticated = this.auth.isAuthenticated();
    const authorized = this.auth.isAuthorized(expectedRole);

    if (!authenticated) {
      this.router.navigate(['login']);
      return false;
    }

    if (!authorized) {
      this.router.navigate(['/main/acesso-negado']);
      return false;
    }

    return true;
  }



}
