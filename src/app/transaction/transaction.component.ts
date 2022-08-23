import {
    NgModule, Component, enableProdMode, ChangeDetectionStrategy,ViewChild,OnInit
  } from '@angular/core';import { User } from '../_models';
import { TerminalService } from '../_services/terminal.service';
import notify from  'devextreme/ui/notify'
import { DxDataGridComponent,  } from 'devextreme-angular';
import { DxDataGridModule, DxSelectBoxModule, DxButtonModule } from 'devextreme-angular';
import CustomStore from 'devextreme/data/custom_store';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {
  HttpClient, HttpClientModule, HttpHeaders, HttpParams,
} from '@angular/common/http';

import { UserService } from '../_services/user.service';

@Component({ selector:'trans-component',templateUrl: 'transaction.component.html'})



export class TransactionComponent implements OnInit {
    @ViewChild(DxDataGridComponent, { static: false }) dataGrid!: DxDataGridComponent;
    public total: number;
    public perPage:number = 10;
    public current:number = 1;
    dataSearchs: any=[{key: "TranNo",label:"Transaction Number", value: "",type:"contains"},{key: "RequestType",label:"Request Type", value: "",type:"contains"},{key: "RequestRefNo",label:"Request Ref Number", value: "",type:"contains"},{key: "CreateBy",label:"Created By", value: "",type:"contains"},{key: "Polyclinic",label:"Polyclinic", value: "",type:"contains"},{key: "EndBy",label:"End By", value: "",type:"contains"},{key: "EndedReason",label:"End Reason", value: "",type:"contains"},
    //{key: "CreateDate",label:"Create Date", value: "",type:"",typeF:[{typeValue:"<="},{typeValue:">="}]},{key: "EndDate",label:"End Date", value: "",type:"",typeF:[{typeValue:"<="},{typeValue:">="}]},
    {key: "TranDateTime",label:"Tran.Date Time", value: "",type:"<=",typeF:[{typeValue:"<="},{typeValue:">="}]}]
    //dataFilter: any=[{key: "Transaction Number", value: ""},{key: "Request Type", value: ""},{key: "Request Ref Number", value: ""},{key: "Created By", value: ""},{key: "Polyclinic", value: ""},{key: "End By", value: ""},{key: "Ended Reason", value: ""}]
    filterUrl=''
    filterState: boolean = false;



    x:any;
    requestUrl='';
    url1='';
    url2='';
    url3='';
    url4='';
    url5='';
    url6='';
    url7='';

    hasFilter:boolean=true;
  hasRefresh:boolean=true;
  dataSource: any = {};
    showX: boolean;
    user: User;
    showFilterRow: boolean;
    showHeaderFilter: boolean;
    currentFilter: any;
    posts: any;
    terminals: any;
    transactions: any;
    totalRecords: number;
    transactionInfo: any;
    transLogs: any;
    transDetails: any;
    transImage: any;
    payment: any;
    filterOption: number
    statusData=[
      {id:1, name:"Waiting"},
      {id:2, name:"Collected"},
      {id:3, name:"Failed"}
    ]
    statuspayment=[
          {id:0, name:"Paying"},
          {id:1, name:"Success"},
          {id:2, name:"Failed"}
    ]
    PayType =[
      {id:1,name:"ZaloPay"},
      {id:2, name:"Momo"},
      {id:3, name:"VNPay"}
    ]

    popupTransaction:boolean=false;
    constructor(private accountService: UserService, private terS: TerminalService ,    private httpClient: HttpClient
      ) {
      

      this.showFilterRow = true;

        
    }
    ngOnInit(){ 
      this.filterOption =1;
      
      this.user = this.accountService.userValue;
      


                this.terS.getTransactions1(this.current,this.perPage).then(trans=>{
                
                      this.totalRecords = trans.data.meta.TotalRecords
                      this.total = Math.ceil(this.totalRecords/this.perPage)
                      this.transactions = trans.data.transaction })
          

    }
    Refresh(){
      window.location.reload()
    }
    public onGoTo(page:number): void{
      this.current = page
      this.perPage=this.perPage
      this.total=this.total
      this.requestUrl=`api/transaction/get-transactions?PageNumber=`+this.current+`&Take=`+this.perPage
      if(this.filterState=true){
this.requestUrl=this.requestUrl +this.filterUrl
      }
      console.log(this.requestUrl)
      this.terS.getFilterTransactions1(this.requestUrl).then(trans=>{
        this.transactions = trans.data.transaction;})
     
      
    }
    public onNext(page:number): void{
      this.current = page +1
   //   this.transactionsToDisplay= this.paginate(this.current,this.perPage)
    }
    public onPrevious(page:number): void{
      this.current = page-1
   //   this.transactionsToDisplay= this.paginate(this.current,this.perPage)
    }
public switch(perPage:number):void{
 
  this.current = 1
      this.perPage=perPage
      this.total= Math.floor(this.totalRecords/this.perPage)+1
      this.requestUrl=`api/transaction/get-transactions?PageNumber=`+this.current+`&Take=`+this.perPage
      if(this.filterState=true){
this.requestUrl=this.requestUrl +this.filterUrl
      }
      console.log(this.requestUrl)
      this.terS.getFilterTransactions1(this.requestUrl).then(trans=>{
        this.transactions = trans.data.transaction;})
}
    public transactionsToDisplay: string[]=[]
 
    onRowUpdated(e:any){ //edit
     
  }
  onRowRemoved(e:any){ //delete
      
  }
  
  onRowInserted(e:any){ //add
     
  }
  onRowClick(e:any){
    this.popupTransaction=true;

    this.terS.getTransactionDetail(e.data.Id).then(transDetail=>{
      console.log(transDetail)
      this.transactionInfo=transDetail.data.transaction;
      this.transLogs=transDetail.data.transactionlogs;
      this.transDetails=transDetail.data.transactionDetails;
      this.transImage=transDetail.data.transactionImages;
      this.payment=transDetail.data.payment;

    })
  }

  getTransactionStatus(number:number):string{
    if (number==1){
      return "Prepared"
    }
    if (number==2){
      return "Collecting"
    }
    if (number==3){
      return "Item In Collection Box"
    }
    if (number==4){
      return "Done"
    }
    if (number==5){
      return "Failed"
    }
    if (number==6){
      return "Ended"
    }
  }

filter():void{
  this.filterState=true
      this.current=1
      this.perPage
    
      
console.log(this.dataSearchs);
      var requestUrlbefore=this.requestUrl
      var initialUrl=`api/transaction/get-transactions?PageNumber=`+this.current+`&Take=`+this.perPage;

      var filterUrl=`&Filter=[`

      this.requestUrl=initialUrl
      this.dataSearchs.forEach(element => {
        if(element.value!='' &&element.value!='-1'){
          this.url1= ',"or",["' + element.key + '","'+ element.type +'","'+element.value+'"]'
          filterUrl= filterUrl + this.url1
        }
      });
      filterUrl += ']';
      
    
      this.filterUrl=filterUrl
      this.requestUrl=initialUrl+filterUrl
      console.log(this.requestUrl)
   

    this.terS.getFilterTransactions1(this.requestUrl).then(terF=>{  this.totalRecords = terF.data.meta.TotalRecords
          this.total = Math.ceil(this.totalRecords/this.perPage)
          this.transactions = terF.data.transaction })
    }
}
@NgModule({
    imports: [
      BrowserModule,
      DxDataGridModule,
      DxSelectBoxModule,
      DxButtonModule,
      HttpClientModule,
    ]
  })
  export class AppModule { }
  
  platformBrowserDynamic().bootstrapModule(AppModule);
