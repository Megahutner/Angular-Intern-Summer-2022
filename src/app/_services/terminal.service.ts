import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
  
@Injectable({
  providedIn: 'root'
})
export class TerminalService {
  //private url = 'http://vendingmachine-api.dotnet.speranzainc.net/api/terminal/get-terminals?PageNumber=1&Take=10';
  //private terminalUrl='http://vendingmachine-api.dotnet.speranzainc.net/api/terminal/get-terminals?PageNumber=4&Take=1';


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
     //  console.log(this.url+api)
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
      //  this.url_image = res.serverImage
        return res;

      });
  }
  private  getConfig(): Observable<any>  {
    return this.http.get("../../../assets/config.txt");
  }
  
   getTerminals(){
     // return this.httpClient.get(this.terminalUrl,{headers:{'Authorization':`${this.token}`}})


     return this.Get(`api/terminal/get-terminals`);
   }
   GetBasicPolyclinic(){
    return this.Get('api/polyclinic/get-polyclinic-basic-data');
  }
   getTransactions(){
     // return this.httpClient.get(this.terminalUrl,{headers:{'Authorization':`${this.token}`}})


     return this.Get(`api/transaction/get-transactions`);
   }


   getTransactionDetail(Id:any){
    return this.Get(`api/transaction/get-transaction?Id=`+Id);
   }
   UpdateTerminal(data: any){
    return this.Put('api/terminal/update-terminal',data)
   }

   getTransactions1(pageNumber: any, pageSize: any){
    // return this.httpClient.get(this.terminalUrl,{headers:{'Authorization':`${this.token}`}})


    return this.Get(`api/transaction/get-transactions?PageNumber=`+pageNumber+`&Take=`+pageSize);
  }
  getFilterTransactions(value:string,pageNumber: any, pageSize: any){
console.log(value)


    //return this.Get(`api/transaction/get-transactions?Filter=["TranNo","contains","`+value+`"],"or",["RequestType","contains","`+value+`"][,"or",["RequestRefNo","contains","`+value+`"],"or",["Polyclinic","contains","`+value+`"],"or",["EndedReason","contains","`+value+`"],"or",["CreateBy","contains","`+value+`"],"or",["EndBy","contains","`+value+`"]]`);
    //return this.Get(`api/transaction/get-transactions?Filter=[["TranNo","contains","`+value+`"],"or",["Id","contains","`+value+`"]]`);
    return this.Get(`api/transaction/get-transactions?PageNumber=`+pageNumber+`&Take=`+pageSize+`&Filter=[["TranNo","contains","`+value+`"],"or",["RequestRefNo","contains","`+value+`"]`);

  }

  getFilterTransactions1(filterUrl:string){
    console.log(filterUrl)
    
    
        //return this.Get(`api/transaction/get-transactions?Filter=["TranNo","contains","`+value+`"],"or",["RequestType","contains","`+value+`"][,"or",["RequestRefNo","contains","`+value+`"],"or",["Polyclinic","contains","`+value+`"],"or",["EndedReason","contains","`+value+`"],"or",["CreateBy","contains","`+value+`"],"or",["EndBy","contains","`+value+`"]]`);
        //return this.Get(`api/transaction/get-transactions?Filter=[["TranNo","contains","`+value+`"],"or",["Id","contains","`+value+`"]]`);
        return this.Get(filterUrl);
    
      }
      CreateTerminal(data: any){
        return this.Post('api/terminal/create-terminal', data);
      }
      deleteTerminal(terminalID: any){
        return this.Delete('api/terminal/delete-terminal?terminalId='+terminalID)
      }
      error(err){
        if(err.status==401){

        }
      }
  
} 