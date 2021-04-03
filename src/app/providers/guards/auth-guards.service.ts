import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardsService implements CanActivate{

  constructor(private jwtHelper: JwtHelperService, private router: Router) { }

  canActivate(){
    //Grab the token from localstorage
    const token = localStorage.getItem('jwt');

    if(token && !this.jwtHelper.isTokenExpired(token)){
      console.log(this.jwtHelper.decodeToken(token));
      return true;
    } else {
      localStorage.removeItem('jwt');
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}
