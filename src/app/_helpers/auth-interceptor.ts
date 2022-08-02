 import { Injectable } from "@angular/core";
 import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from "@angular/common/http";
 import { AuthService } from "../_services/auth.service";
 import { Observable } from "rxjs";

 @Injectable()

 export class AuthInterceptor implements HttpInterceptor{
     constructor(private authS: AuthService){}

     intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
         
             if(this.authS.isLoggedIn()){
                 const authToken = this.authS.getAuthorizationToken();
                 req =req.clone({
                     setHeaders:
                     {'Content-Type' : 'application/json; charset=utf-8',
                     'Accept'       : 'application/json',
                        'Authorization':`${authToken}`}
                 });
             }
             return next.handle(req)

         }
     }