import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { LoginService } from './login.service';
@Injectable({
  providedIn: 'root'
})
// нужно наследоваться от CanActivate
export class AuthGuardService implements CanActivate {

  constructor(private login: LoginService, private router: Router) { }
  canActivate(route, state: RouterStateSnapshot) {
    let user: string = this.login.currentUser;
    if (!user) {
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
    }

    return true;
  }
}
