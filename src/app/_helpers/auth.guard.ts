// import { Injectable } from '@angular/core';
// import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
// import { Observable } from 'rxjs';

// import { AuthenticationService } from '../_services';
// import { AuthService } from '../_services/auth.service';

// @Injectable({ providedIn: 'root' })
// export class AuthGuard implements CanActivate {
//     constructor(
//         private router: Router,
//         private authS: AuthService
//     ) { }

//   //  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
//     //    const currentUser = this.authenticationService.userValue;
//       //  if (currentUser) {
//       //      return true;
//        // }
//        // this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
//        // return false;
//    // }


//    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
//     const url: string = state.url;
//     return this.checkLogin(url);
//    }
//    canActivateChild(route:ActivatedRouteSnapshot,state:RouterStateSnapshot){
//     return this.canActivate(route, state)
//    }

//    checkLogin(url:string){
//     if(this.authS.isLoggedIn()){
//         return true;
//     }
//     this.authS.redirectUrl=url;
//     this.router.navigate(['/login'],{queryParams:{returnUrl:url}});

//    }

       
//    }

import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { UserService } from '../_services/user.service';
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private accountService: UserService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = this.accountService.userValue;
        if (user) {
            // authorised so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/account/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}
