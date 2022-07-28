import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class PostService {
    private apiUrl ='http://jsonplaceholder.typicode.com/posts';
    constructor(private httpClient: HttpClient){}
    getPosts(){
        return this.httpClient.get(this.apiUrl);
    }
    private apiUrl2='http://vendingmachine-api.dotnet.speranzainc.net/api/auth/user-login';
    getDatas(){
        return this.httpClient.get(this.apiUrl2);
    }
}