import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../_models';
import { environment } from 'src/environments/environment';

//import { environment } from '@environments/environment';


@Injectable({ providedIn: 'root' })
export class UserService {
    public token: string;
    url:string;
    
    httpOptions = {
        
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
          'X-PINGOTHER': 'pingpong',
     
        })
      };
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.url = environment.apiUrl
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();
    }

    
  GetHeader(): any{
    this.token = localStorage.getItem("user_token");
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'X-PINGOTHER': 'pingpong',
        'user_token': this.token,
      })
    };
    return httpOptions;
  }
    public get userValue(): User {
        return this.userSubject.value;
    }

    login(username:string, password:string) {
        return this.http.post<User>(this.url +'/api/auth/user-login', { Username: username, Password: password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
                console.log(user)
                console.log(user.code)
                console.log(localStorage.length)
                console.log(user.data.staff.fullName)
                localStorage.setItem("usernameMqtt",user.data.staff.mqtt_client_id);
                localStorage.setItem("passwordMqtt",user.data.staff.mqtt_password);
                let token = user.data.staff.user_token; // return true or false
                if (token) {
                  this.token = token;
               
                  localStorage.setItem('currentUser', JSON.stringify(user.data.staff));
                  localStorage.setItem('user_token', this.token);

            }
            this.userSubject.next(user);
        console.log(this.token)}));
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('user');
        localStorage.removeItem('');
        localStorage.removeItem('');

        this.userSubject.next(null);
        this.router.navigate(['/account/login']);
    }

    register(user: User) {
        return this.http.post(`${environment.apiUrl}/users/register`, user);
    }

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}`);
    }

    getById(id: string) {
        return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
    }

    update(id, params) {
        return this.http.put(`${environment.apiUrl}/users/${id}`, params)
            .pipe(map(x => {
                // update stored user if the logged in user updated their own record
                if (id == this.userValue.id) {
                    // update local storage
                    const user = { ...this.userValue, ...params };
                    localStorage.setItem('user', JSON.stringify(user));

                    // publish updated user to subscribers
                    this.userSubject.next(user);
                }
                return x;
            }));
    }

    delete(id: string) {
        return this.http.delete(`${environment.apiUrl}/users/${id}`)
            .pipe(map(x => {
                // auto logout if the logged in user deleted their own record
                if (id == this.userValue.id) {
                    this.logout();
                }
                return x;
            }));
    }
}