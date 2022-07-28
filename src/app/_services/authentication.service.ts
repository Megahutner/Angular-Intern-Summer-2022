// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { BehaviorSubject, Observable } from 'rxjs';
// import { map } from 'rxjs/operators';
// import { environment } from 'src/environments/environment';

// import { User, User2 } from '../_models';

// @Injectable({ providedIn: 'root' })
// export class AuthenticationService {
//     private userSubject: BehaviorSubject<User>;
//     public user: Observable<User>;

//     constructor(private http: HttpClient) {
//         this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('current')));
//         this.user = this.userSubject.asObservable();
//     }   

//     public get userValue(): User {
//         return this.userSubject.value;
//     }

//     headers = new HttpHeaders({
//         'Content-type':'application/json',
//         'accept':'text/plain',
//         'Server':'Microsoft-IIS/10.0'})
//     options ={headers: this.headers};


//     async login(Username:string, Password:string): Promise<any> {
//         return this.http.post<any>(`${environment.apiUrl}auth/user-login`, {Username, Password})//.toPromise().then(data => console.log(data))
//             .pipe(
//               map(({token}) => {
//                  let user: User={
//                     email:Username,
//                     token: token
//                  };
//                  localStorage.setItem('current',JSON.stringify(user));
//                  this.userSubject.next(user);
//                  return user;
//              })
//           );
//       }
//     // login(Username:string, Password:string): Observable<any> {
        
//     //     console.log("2");
//     //     let postData = {username: Username, password: Password};
//     //     return this.http.post<User2>('http://vendingmachine-api.dotnet.speranzainc.net/api/auth/user-login', postData,this.options).toPromise().then(data => {
//     //         return data;
//     //     })
//             // .pipe(map(user => {
                
//             //     // localStorage.setItem('currentUser', JSON.stringify(user));
//             //     // this.currentUserSubject.next(user);
//             //     // return user;
//             // }));
//     // }

//     logout() {
//         localStorage.removeItem('current');
//         this.userSubject.next(null);
//     }
//     //register( user: User){
//       //  return this.http.post('${environment.apiUrl}/users/register',user);
//    // }
// }