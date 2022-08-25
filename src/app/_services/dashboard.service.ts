import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
  
@Injectable({
  providedIn: 'root'
})
export class DashBoardService {



  public token: string;
  public url: string;

  GetHeader():any{
    var httpOptions ={
      headers: new Headers({
        'Content-Type': 'apllication/json',
        'Cache-Control':'no-cache',
        'X-PINGOTHER': 'pingpong',
        'user_token': localStorage.getItem("user_token")
      })
    }
  }
  constructor(private http: HttpClient,private userS:UserService) {
    
    
   }
   async Get(api: string): Promise<any> {
    this.checkAuthen();
   
      return await this.getUrl().then(res => {
        return this.http.get<any>(this.url + api, this.GetHeader()).toPromise().then(data => {
          return data;
        });
      });      
    
   
  }



  async Delete(api:string):Promise<any>{

    this.checkAuthen();
  
      return await this.getUrl().then(res=>{
        return this.http.delete<any>(this.url+api, this.GetHeader()).toPromise().then(data=>{
          return data;
        });
      });
    
  }
  async Post(api: string, json?: any): Promise<any> {
    this.checkAuthen();         
 
      return await this.getUrl().then(res => {
        return this.http.post<any>(this.url + api, json, this.GetHeader()).toPromise().then(data => {
          return data;
        });
      });      
    
    
  }

  async Put(api: string, json?: any): Promise<any> {
    this.checkAuthen();         
 
      return await this.getUrl().then(res => {
        return this.http.put<any>(this.url + api, json, this.GetHeader()).toPromise().then(data => {
          return data;
        });
      });      
    
    
  }





  checkAuthen(){
    this.token = localStorage.getItem("user_token");
    if(this.token===""|| this.token ===null|| this.token===undefined){
      this.userS.logout()
    }
  }
  async getUrl(): Promise<any> {
    return await this.getConfig().toPromise()
    .then(res => {
        this.url = res.serverApi;
    
        return res;

      });
  }
  private  getConfig(): Observable<any>  {
    return this.http.get("../../../assets/config.txt");
  }



  getTerminalInfo(){

    return this.Get(`api/dashboard/get-terminal-info`);
  }

  getLockerInfo(){
    return this.Get(`api/dashboard/get-locker-info`);

  }
  getParcelInfo(){
    return this.Get(`api/dashboard/get-parcel-info`);

  }
  getTransactionInfo(){
    return this.Get(`api/dashboard/get-transaction-info`);

  }

  getAllCartridges(){
    return this.Get(`api/cartridge/count-all-cartridge`)
  }
  
   
  
} 