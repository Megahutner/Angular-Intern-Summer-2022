import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor,HttpRequest,HttpErrorResponse} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import 'rxjs/add/operator/catch';
import { catchError } from 'rxjs/operators';



import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable()
export class AppHttpIntercxeptor implements HttpInterceptor {
    constructor(private router: Router) {
    }

    intercept(req: HttpRequest<any>,next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe((err: any) => {
            if (err instanceof HttpErrorResponse) {
                if (err.status === 401) {
                    console.log('401 UnAuthorized')
                    this.router.navigate(["/login"])
                }
                if (err.status === 400) {
                    
                }
            }
            console.log(err,'HttpRequest::Error')
            return throwError(()=> new Error('Your Error'))
        });
    }
}
