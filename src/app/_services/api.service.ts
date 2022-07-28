import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    auth_token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjNmQwY2FkLWIwNjYtNDZiMC1iOTZmLTVhMWZlNzYxN2UzNCIsIm5iZiI6MTY1NzE1Nzg0NCwiZXhwIjoxNjU3MTc1ODQ0LCJpYXQiOjE2NTcxNTc4NDR9.JA0KPIe2jHz5M9pU-Gro-Kej5ZYJsotOFN7z1ByK63U.5c6d0cad-b066-46b0-b96f-5a1fe7617e34";
    private apiUrl ='http://vendingmachine-api.dotnet.speranzainc.net/api/auth/user-login';

    constructor(private httpClient: HttpClient){}
    getPosts(){
        return this.httpClient.get(this.apiUrl);
    }
}