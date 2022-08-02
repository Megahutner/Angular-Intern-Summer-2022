import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse,HttpHeaders } from "@angular/common/http";
import { throwError } from "rxjs";
import { map, catchError } from "rxjs";
import { environment } from "src/environments/environment";
import { BehaviorSubject, Observable } from 'rxjs';

import { User } from '../_models';

@Injectable({
    providedIn:"root"
})
export class AuthService{

    
    url:string;
    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
          'X-PINGOTHER': 'pingpong',
          'Server': 'Microsoft-IIS/10.0',
          'X-Powered-By': 'PHP/8.0.0',
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
          'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Key, Authorization',
        })
      };
      private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;
    errorData:{};
    constructor(private http:HttpClient){this.url = environment.apiUrl;
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();}
    redirectUrl!:string;
    login(Username:string, Password:string){
        return this.http.post<any>(this.url+"/api/auth/user-login",{username:Username, password:Password}).pipe(map(user=>{
           {
                localStorage.setItem('currentUser',JSON.stringify(user));

                this.userSubject.next(user);

                console.log(user)
            }
        }),
        catchError(this.handleError));
    }
    isLoggedIn(){
        if(localStorage.getItem('currentUser')){
            return true;

        }
        return false;
    }

    getAuthorizationToken(){
        const currentUser=JSON.parse(localStorage.getItem('currentUser'))
        console.log(currentUser.data.staff.user_token)
   
        return currentUser.data.staff.user_token;
      
    }

    logout(){
        localStorage.removeItem('currentUser');
        localStorage.removeItem("5")
    }
    private handleError(error:HttpErrorResponse){
        if(error.error instanceof ErrorEvent){
            console.error(error.error.message);
        }
        else {
            console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`); 
               }
        this.errorData={
            errorTitle:'1',
            errorDesc:'2'
        };
        return throwError(this.errorData)       
    }
}