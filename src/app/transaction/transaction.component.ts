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
    public perPage:number = 15;
    public current:number = 1;
    dataSearchsTrans: any=[{key: "Transaction Number", value: ""},{key: "Request Type", value: ""},{key: "Request Ref Number", value: ""},{key: "Created By", value: ""},{key: "Polyclinic", value: ""},{key: "End By", value: ""},{key: "Ended Reason", value: ""}]
    value1='';
    value2='';
    value3='';
    value4='';
    value5='';
    value6='';
    value7='';




    x:any;
    requestUrl='';
    url1='';
    url2='';
    url3='';
    url4='';
    url5='';
    url6='';
    url7='';



    
   
  //    readonly allowedPageSizes =[5,10,15,'all'];
  //  readonly displayModes=[{ text:"Display Mode 'full'",value:'full'},{text:"Display Mode 'compact'",value:'compact'}];
  //  displayMode='full';
  //  showPageSizeSelector = true;
  //  showInfo = true;
  //  showNavButtons = true;
  //  customizeColumns(columns){
  //    columns[0].width = 70;
  //  }
  //  get isCompactMode(){
  //    return this.displayMode === 'compact'
  //  }
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
//this.showHeaderFilter = true;
       // this.user = this.accountService.userValue;
    //  this.terS.getTerminals().then(ter=>{
    //         this.terminals = ter.data.terminal;
    //         console.log(this.terminals)
    //       });
         // this.terS.getTransactions().then(trans=>{
//this.transactions = trans.data.transaction;
            //console.log(this.transactions)
    //       });
          

        
    }
    ngOnInit(){ 
      this.filterOption =1;
      
      this.user = this.accountService.userValue;
        //  this.terS.getTerminals().then(ter=>{
        //         this.terminals = ter.data.terminal;
        //         console.log(this.terminals)
        //       });
          //     this.terS.getTransactions().then(trans=>{
          // //       this.transactions = trans.data.transaction;
          //     //  console.log(this.transactions)
          //     this.totalRecords = trans.data.meta.TotalRecords
          //     this.total = Math.ceil(this.totalRecords/this.perPage)
          //     console.log(this.totalRecords)


          //    // console.log(this.transactions.length)
          //   //console.log(this.perPage)


          //   //this.transactionsToDisplay=this.paginate(this.current,this.perPage)
          //       });



//this.getTransactions()


                this.terS.getTransactions1(this.current,this.perPage).then(trans=>{
                  //       this.transactions = trans.data.transaction;
                      //  console.log(this.transactions)
                      this.totalRecords = trans.data.meta.TotalRecords
                      this.total = Math.ceil(this.totalRecords/this.perPage)
                      this.transactions = trans.data.transaction })
          

    }
    public onGoTo(page:number): void{
      this.current = page
      this.perPage=this.perPage
      this.total=this.total
      var initialUrl=`api/transaction/get-transactions?PageNumber=`+this.current+`&Take=`+this.perPage+`&Filter=[`;
     
      this.requestUrl=initialUrl
      
      if (this.value1!=''){
        this.requestUrl=this.requestUrl+this.url1
      }
      if (this.value2!=''){
        this.requestUrl=this.requestUrl+this.url2
      }
      if (this.value3!=''){
        this.requestUrl=this.requestUrl+this.url3
      }
      if (this.value4!=''){
        this.requestUrl=this.requestUrl+this.url4
      }
      if (this.value5!=''){
        this.requestUrl=this.requestUrl+this.url5
      }
      if (this.value6!=''){
        this.requestUrl=this.requestUrl+this.url6
      }
      if (this.value7!=''){
        this.requestUrl=this.requestUrl+this.url7
      }
      this.terS.getFilterTransactions1(this.requestUrl).then(trans=>{
             this.transactions = trans.data.transaction;})
      
    //  this.transactionsToDisplay= this.paginate(this.current,this.perPage)
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
  this.perPage =perPage
  this.total= Math.floor(this.totalRecords/this.perPage)+1
  this.current=1
  var initialUrl=`api/transaction/get-transactions?PageNumber=`+this.current+`&Take=`+this.perPage+`&Filter=[`;
     
      this.requestUrl=initialUrl
      
      if (this.value1!=''){
        this.requestUrl=this.requestUrl+this.url1
      }
      if (this.value2!=''){
        this.requestUrl=this.requestUrl+this.url2
      }
      if (this.value3!=''){
        this.requestUrl=this.requestUrl+this.url3
      }
      if (this.value4!=''){
        this.requestUrl=this.requestUrl+this.url4
      }
      if (this.value5!=''){
        this.requestUrl=this.requestUrl+this.url5
      }
      if (this.value6!=''){
        this.requestUrl=this.requestUrl+this.url6
      }
      if (this.value7!=''){
        this.requestUrl=this.requestUrl+this.url7
      }
  this.terS.getFilterTransactions1(this.requestUrl).then(trans=>{
    this.transactions = trans.data.transaction;})

  //this.transactionsToDisplay= this.paginate(this.current,this.perPage)
}
    public transactionsToDisplay: string[]=[]
  //  public paginate(current: number, perPage: number):string[]{
   //   return [... this.transactions.slice((current-1)*perPage).slice(0,perPage)]
  //  }
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

  // cancelTransactionPopup(){
  //   this.popupTransaction=false;
    
  // }


//   newTrans(){
//     this.terS.getTransactions1().then(trans=>{
//       this.transactions = trans.data.transaction;
//      //console.log(this.transactions)
//      this.total = Math.ceil(this.transactions.length/this.perPage)

              
        

// this.current=1
//             this.transactionsToDisplay=this.paginate(this.current,this.perPage)
//     });
//   }
// getTransactions(){
  
//   function isNotEmpty(value: any): boolean {
//     return value !== undefined && value !== null && value !== "";
//   }
//   let headers = this.terS.GetHeader();
//   this.dataSource = new CustomStore({
//     key: "id",
//     load: function (loadOptions: any) {
//       console.log(loadOptions);
//         let params: HttpParams = new HttpParams();
//         [
//             "skip",
//             "take",
//             "requireTotalCount",
//             "requireGroupCount",
//             "sort",
//             "filter",
//             "totalSummary",
//             "group",
//             "groupSummary"
//         ].forEach(function(i) {
//             if (i in loadOptions && isNotEmpty(loadOptions[i])){
//               if(i == 'filter') {               
//                 if(typeof loadOptions[i][0] == 'string') {
//                   loadOptions[i] = [loadOptions[i]]
//                 } 
//               }
//               params = params.set(i, JSON.stringify(loadOptions[i]));
//             }
//         });
//         console.log(params, 'p')
//         return this.terS.getUrl().then(res => {
//             var url = res.serverApi;
//             return this.httpClient.get(
//               url +'api/transaction/get-transactions',{
//               params,
//               ...headers
//               })
//             .toPromise()
//             .then((data: any) => {
//               data.data.transaction.forEach(i=>{
//                 i.listPackage.forEach(j=>{
//                   if(j.temperatureId === 0 || j.temperatureId === null || j.temperatureId === undefined)
//                   j.blockType = 0;
//                 else
//                   j.blockType = 1;
//                 if(j.retrieveUser !== null && j.retrieveUser !== undefined && j.retrieveUser !== "")
//                   j.retrievedTime = j.collectTime;
//                 else
//                   j.retrievedTime = null;
//                 })
//               })
//                 return {
//                     data: data.data.transaction,
//                     totalCount: data.data.meta.totalRecords,
//                     // summary: data.summary,
//                     // groupCount: data.groupCount
//                 };
//             })
//             .catch(error => { throw 'Data Loading Error' });
//           });
//     }
//   });
// }


  
filterTransN():void{
  this.value1=this.dataSearchsTrans[0].value;
  this.current=1
  this.perPage=this.perPage
  var initialUrl=`api/transaction/get-transactions?PageNumber=`+this.current+`&Take=`+this.perPage+`&Filter=[`;
  if(this.value1 != '' ){
    var initialUrl=`api/transaction/get-transactions?PageNumber=`+this.current+`&Take=`+this.perPage+`&Filter=[`;



    this.url1= ',"or",["TranNo","contains",'+this.value1+']';
    this.requestUrl=initialUrl + this.url1
    if(this.value2!=''){
      this.requestUrl=this.requestUrl+this.url2
    }
    if(this.value3!=''){
      this.requestUrl=this.requestUrl+this.url3
    }
    if(this.value4!=''){
      this.requestUrl=this.requestUrl+this.url4
    }
    if(this.value5!=''){
      this.requestUrl=this.requestUrl+this.url5
    }
    if(this.value6!=''){
      this.requestUrl=this.requestUrl+this.url6
    }
    if(this.value7!=''){
      this.requestUrl=this.requestUrl+this.url7
    }
    this.terS.getFilterTransactions1(this.requestUrl).then(transF=>{  this.totalRecords = transF.data.meta.TotalRecords
      this.total = Math.ceil(this.totalRecords/this.perPage)
      this.transactions = transF.data.transaction 

    })





  }
  else if(this.value1=='' && this.value2==''&& this.value3==''&& this.value4==''&& this.value5==''&& this.value6==''&& this.value7==''){
    this.terS.getTransactions1(1,this.perPage).then(trans=>{
     
          this.totalRecords = trans.data.meta.TotalRecords
          this.total = Math.ceil(this.totalRecords/this.perPage)
          this.transactions = trans.data.transaction })

  }
  else{
    this.requestUrl=initialUrl
    if(this.value2!=''){
      this.requestUrl=this.requestUrl+this.url2
    }
    if(this.value3!=''){
      this.requestUrl=this.requestUrl+this.url3
    }
    if(this.value4!=''){
      this.requestUrl=this.requestUrl+this.url4
    }
    if(this.value5!=''){
      this.requestUrl=this.requestUrl+this.url5
    }
    if(this.value6!=''){
      this.requestUrl=this.requestUrl+this.url6
    } if(this.value7!=''){
      this.requestUrl=this.requestUrl+this.url7
    }
    this.terS.getFilterTransactions1(this.requestUrl).then(transF=>{  this.totalRecords = transF.data.meta.TotalRecords
      this.total = Math.ceil(this.totalRecords/this.perPage)
      this.transactions = transF.data.transaction 

    })
  }


}

filterRequestT():void{
  this.value2=this.dataSearchsTrans[1].value;;
  this.current=1
  this.perPage=this.perPage
  var initialUrl=`api/transaction/get-transactions?PageNumber=`+this.current+`&Take=`+this.perPage+`&Filter=[`;
  if(this.value2 != '' ){
    var initialUrl=`api/transaction/get-transactions?PageNumber=`+this.current+`&Take=`+this.perPage+`&Filter=[`;



    this.url2= ',"or",["RequestType","contains","'+this.value2+'"]';
    this.requestUrl=initialUrl + this.url2
    if(this.value1!=''){
      this.requestUrl=this.requestUrl+this.url1
    }
    if(this.value3!=''){
      this.requestUrl=this.requestUrl+this.url3
    }
    if(this.value4!=''){
      this.requestUrl=this.requestUrl+this.url4
    }
    if(this.value5!=''){
      this.requestUrl=this.requestUrl+this.url5
    }
    if(this.value6!=''){
      this.requestUrl=this.requestUrl+this.url6
    } if(this.value7!=''){
      this.requestUrl=this.requestUrl+this.url7
    }
    this.terS.getFilterTransactions1(this.requestUrl).then(transF=>{  this.totalRecords = transF.data.meta.TotalRecords
      this.total = Math.ceil(this.totalRecords/this.perPage)
      this.transactions = transF.data.transaction 

    })


  }
  else if(this.value1=='' && this.value2==''&& this.value3==''&& this.value4==''&& this.value5==''&& this.value6==''&& this.value7==''){
    this.terS.getTransactions1(1,this.perPage).then(trans=>{
     
          this.totalRecords = trans.data.meta.TotalRecords
          this.total = Math.ceil(this.totalRecords/this.perPage)
          this.transactions = trans.data.transaction })

  }
  else{
    this.requestUrl=initialUrl
    if(this.value1!=''){
      this.requestUrl=this.requestUrl+this.url1
    }
    if(this.value3!=''){
      this.requestUrl=this.requestUrl+this.url3
    }
    if(this.value4!=''){
      this.requestUrl=this.requestUrl+this.url4
    }
    if(this.value5!=''){
      this.requestUrl=this.requestUrl+this.url5
    }
    if(this.value6!=''){
      this.requestUrl=this.requestUrl+this.url6
    } if(this.value7!=''){
      this.requestUrl=this.requestUrl+this.url7
    }
    this.terS.getFilterTransactions1(this.requestUrl).then(transF=>{  this.totalRecords = transF.data.meta.TotalRecords
      this.total = Math.ceil(this.totalRecords/this.perPage)
      this.transactions = transF.data.transaction 

    })
  }


}
filterRequestN():void{
  this.value3=this.dataSearchsTrans[2].value;;
  this.current=1
  this.perPage=this.perPage
  var initialUrl=`api/transaction/get-transactions?PageNumber=`+this.current+`&Take=`+this.perPage+`&Filter=[`;
  if(this.value3 != '' ){
    var initialUrl=`api/transaction/get-transactions?PageNumber=`+this.current+`&Take=`+this.perPage+`&Filter=[`;



    this.url3= ',"or",["RequestRefNo","contains",'+this.value3+']';
    this.requestUrl=initialUrl + this.url3
    if(this.value2!=''){
      this.requestUrl=this.requestUrl+this.url2
    }
    if(this.value1!=''){
      this.requestUrl=this.requestUrl+this.url1
    }
    if(this.value4!=''){
      this.requestUrl=this.requestUrl+this.url4
    }
    if(this.value5!=''){
      this.requestUrl=this.requestUrl+this.url5
    }
    if(this.value6!=''){
      this.requestUrl=this.requestUrl+this.url6
    } if(this.value7!=''){
      this.requestUrl=this.requestUrl+this.url7
    }
    this.terS.getFilterTransactions1(this.requestUrl).then(transF=>{  this.totalRecords = transF.data.meta.TotalRecords
      this.total = Math.ceil(this.totalRecords/this.perPage)
      this.transactions = transF.data.transaction 

    })


  }
  else if(this.value1=='' && this.value2==''&& this.value3==''&& this.value4==''&& this.value5==''&& this.value6==''&& this.value7==''){
    this.terS.getTransactions1(1,this.perPage).then(trans=>{
     
          this.totalRecords = trans.data.meta.TotalRecords
          this.total = Math.ceil(this.totalRecords/this.perPage)
          this.transactions = trans.data.transaction })

  }
  else{this.requestUrl=initialUrl 
    if(this.value2!=''){
      this.requestUrl=this.requestUrl+this.url2
    }
    if(this.value1!=''){
      this.requestUrl=this.requestUrl+this.url1
    }
    if(this.value4!=''){
      this.requestUrl=this.requestUrl+this.url4
    }
    if(this.value5!=''){
      this.requestUrl=this.requestUrl+this.url5
    }
    if(this.value6!=''){
      this.requestUrl=this.requestUrl+this.url6
    } if(this.value7!=''){
      this.requestUrl=this.requestUrl+this.url7
    }
    this.terS.getFilterTransactions1(this.requestUrl).then(transF=>{  this.totalRecords = transF.data.meta.TotalRecords
      this.total = Math.ceil(this.totalRecords/this.perPage)
      this.transactions = transF.data.transaction 

    })
}


}
filterCreateB():void{
  this.value4=this.dataSearchsTrans[3].value;;
  this.current=1
  this.perPage=this.perPage
  var initialUrl=`api/transaction/get-transactions?PageNumber=`+this.current+`&Take=`+this.perPage+`&Filter=[`;
  if(this.value4 != '' ){
    var initialUrl=`api/transaction/get-transactions?PageNumber=`+this.current+`&Take=`+this.perPage+`&Filter=[`;



    this.url4= ',"or",["CreateBy","contains","'+this.value4+'"]';
    this.requestUrl=initialUrl + this.url4
    if(this.value2!=''){
      this.requestUrl=this.requestUrl+this.url2
    }
    if(this.value3!=''){
      this.requestUrl=this.requestUrl+this.url3
    }
    if(this.value1!=''){
      this.requestUrl=this.requestUrl+this.url1
    }
    if(this.value5!=''){
      this.requestUrl=this.requestUrl+this.url5
    }
    if(this.value6!=''){
      this.requestUrl=this.requestUrl+this.url6
    } if(this.value7!=''){
      this.requestUrl=this.requestUrl+this.url7
    }
    this.terS.getFilterTransactions1(this.requestUrl).then(transF=>{  this.totalRecords = transF.data.meta.TotalRecords
      this.total = Math.ceil(this.totalRecords/this.perPage)
      this.transactions = transF.data.transaction 

    })


  }
 
  else if(this.value1=='' && this.value2==''&& this.value3==''&& this.value4==''&& this.value5==''&& this.value6==''&& this.value7==''){
    this.terS.getTransactions1(1,this.perPage).then(trans=>{
     
          this.totalRecords = trans.data.meta.TotalRecords
          this.total = Math.ceil(this.totalRecords/this.perPage)
          this.transactions = trans.data.transaction })

  }
else{
  this.requestUrl=initialUrl + this.url1
    if(this.value2!=''){
      this.requestUrl=this.requestUrl+this.url2
    }
    if(this.value3!=''){
      this.requestUrl=this.requestUrl+this.url3
    }
    if(this.value1!=''){
      this.requestUrl=this.requestUrl+this.url1
    }
    if(this.value5!=''){
      this.requestUrl=this.requestUrl+this.url5
    }
    if(this.value6!=''){
      this.requestUrl=this.requestUrl+this.url6
    } if(this.value7!=''){
      this.requestUrl=this.requestUrl+this.url7
    }
    this.terS.getFilterTransactions1(this.requestUrl).then(transF=>{  this.totalRecords = transF.data.meta.TotalRecords
      this.total = Math.ceil(this.totalRecords/this.perPage)
      this.transactions = transF.data.transaction 

    })
}


}
filterPolyclinic():void{
  this.value5=this.dataSearchsTrans[4].value;;
  this.current=1
  this.perPage=this.perPage
  var initialUrl=`api/transaction/get-transactions?PageNumber=`+this.current+`&Take=`+this.perPage+`&Filter=[`;
  if(this.value5 != '' ){
    var initialUrl=`api/transaction/get-transactions?PageNumber=`+this.current+`&Take=`+this.perPage+`&Filter=[`;



    this.url5= ',"or",["Polyclinic","contains","'+this.value5+'"]';
    this.requestUrl=initialUrl + this.url5
    if(this.value2!=''){
      this.requestUrl=this.requestUrl+this.url2
    }
    if(this.value3!=''){
      this.requestUrl=this.requestUrl+this.url3
    }
    if(this.value4!=''){
      this.requestUrl=this.requestUrl+this.url4
    }
    if(this.value1!=''){
      this.requestUrl=this.requestUrl+this.url1
    }
    if(this.value6!=''){
      this.requestUrl=this.requestUrl+this.url6
    } if(this.value7!=''){
      this.requestUrl=this.requestUrl+this.url7
    }
    this.terS.getFilterTransactions1(this.requestUrl).then(transF=>{  this.totalRecords = transF.data.meta.TotalRecords
      this.total = Math.ceil(this.totalRecords/this.perPage)
      this.transactions = transF.data.transaction 

    })


  }
  else if(this.value1=='' && this.value2==''&& this.value3==''&& this.value4==''&& this.value5==''&& this.value6==''&& this.value7==''){
    this.terS.getTransactions1(1,this.perPage).then(trans=>{
     
          this.totalRecords = trans.data.meta.TotalRecords
          this.total = Math.ceil(this.totalRecords/this.perPage)
          this.transactions = trans.data.transaction })

  }
  else{ this.requestUrl=initialUrl 
    if(this.value2!=''){
      this.requestUrl=this.requestUrl+this.url2
    }
    if(this.value3!=''){
      this.requestUrl=this.requestUrl+this.url3
    }
    if(this.value4!=''){
      this.requestUrl=this.requestUrl+this.url4
    }
    if(this.value1!=''){
      this.requestUrl=this.requestUrl+this.url1
    }
    if(this.value6!=''){
      this.requestUrl=this.requestUrl+this.url6
    } if(this.value7!=''){
      this.requestUrl=this.requestUrl+this.url7
    }
    this.terS.getFilterTransactions1(this.requestUrl).then(transF=>{  this.totalRecords = transF.data.meta.TotalRecords
      this.total = Math.ceil(this.totalRecords/this.perPage)
      this.transactions = transF.data.transaction 

    })
}


}
filterEndB():void{
  this.value6=this.dataSearchsTrans[5].value;;
  this.current=1
  this.perPage=this.perPage
  var initialUrl=`api/transaction/get-transactions?PageNumber=1&Take=`+this.perPage+`&Filter=[`;
  if(this.value6 != '' ){
   



    this.url6= ',"or",["EndBy","contains","'+this.value6+'"]';
    this.requestUrl=initialUrl + this.url6
    if(this.value2!=''){
      this.requestUrl=this.requestUrl+this.url2
    }
    if(this.value3!=''){
      this.requestUrl=this.requestUrl+this.url3
    }
    if(this.value4!=''){
      this.requestUrl=this.requestUrl+this.url4
    }
    if(this.value5!=''){
      this.requestUrl=this.requestUrl+this.url5
    }
    if(this.value1!=''){
      this.requestUrl=this.requestUrl+this.url1
    } if(this.value7!=''){
      this.requestUrl=this.requestUrl+this.url7
    }

    this.terS.getFilterTransactions1(this.requestUrl).then(transF=>{  this.totalRecords = transF.data.meta.TotalRecords
      this.total = Math.ceil(this.totalRecords/this.perPage)
      this.transactions = transF.data.transaction 

    })


  }
  else if(this.value1=='' && this.value2==''&& this.value3==''&& this.value4==''&& this.value5==''&& this.value6==''&& this.value7==''){
    this.terS.getTransactions1(1,this.perPage).then(trans=>{
     
          this.totalRecords = trans.data.meta.TotalRecords
          this.total = Math.ceil(this.totalRecords/this.perPage)
          this.transactions = trans.data.transaction })

  }
  else{
    this.requestUrl=initialUrl 
    if(this.value2!=''){
      this.requestUrl=this.requestUrl+this.url2
    }
    if(this.value3!=''){
      this.requestUrl=this.requestUrl+this.url3
    }
    if(this.value4!=''){
      this.requestUrl=this.requestUrl+this.url4
    }
    if(this.value5!=''){
      this.requestUrl=this.requestUrl+this.url5
    }
    if(this.value1!=''){
      this.requestUrl=this.requestUrl+this.url1
    } if(this.value7!=''){
      this.requestUrl=this.requestUrl+this.url7
    }

    this.terS.getFilterTransactions1(this.requestUrl).then(transF=>{  this.totalRecords = transF.data.meta.TotalRecords
      this.total = Math.ceil(this.totalRecords/this.perPage)
      this.transactions = transF.data.transaction 

    })
  }


}
filterEndR():void{
  this.value7=this.dataSearchsTrans[6].value;;
  this.current=1
  this.perPage=this.perPage
  var initialUrl=`api/transaction/get-transactions?PageNumber=1&Take=`+this.perPage+`&Filter=[`;
  if(this.value7 != '' ){
   



    this.url7= ',"or",["EndedReason","contains","'+this.value7+'"]';
    this.requestUrl=initialUrl + this.url7
    if(this.value2!=''){
      this.requestUrl=this.requestUrl+this.url2
    }
    if(this.value3!=''){
      this.requestUrl=this.requestUrl+this.url3
    }
    if(this.value4!=''){
      this.requestUrl=this.requestUrl+this.url4
    }
    if(this.value5!=''){
      this.requestUrl=this.requestUrl+this.url5
    }
    if(this.value1!=''){
      this.requestUrl=this.requestUrl+this.url1
    } if(this.value6!=''){
      this.requestUrl=this.requestUrl+this.url7
    }

    this.terS.getFilterTransactions1(this.requestUrl).then(transF=>{  this.totalRecords = transF.data.meta.TotalRecords
      this.total = Math.ceil(this.totalRecords/this.perPage)
      this.transactions = transF.data.transaction 

    })


  }
  else if(this.value1=='' && this.value2==''&& this.value3==''&& this.value4==''&& this.value5==''&& this.value6==''&& this.value7==''){
    this.terS.getTransactions1(1,this.perPage).then(trans=>{
     
          this.totalRecords = trans.data.meta.TotalRecords
          this.total = Math.ceil(this.totalRecords/this.perPage)
          this.transactions = trans.data.transaction })

  }
  else{
    this.requestUrl=initialUrl 
    if(this.value2!=''){
      this.requestUrl=this.requestUrl+this.url2
    }
    if(this.value3!=''){
      this.requestUrl=this.requestUrl+this.url3
    }
    if(this.value4!=''){
      this.requestUrl=this.requestUrl+this.url4
    }
    if(this.value5!=''){
      this.requestUrl=this.requestUrl+this.url5
    }
    if(this.value1!=''){
      this.requestUrl=this.requestUrl+this.url1
    } if(this.value6!=''){
      this.requestUrl=this.requestUrl+this.url7
    }

    this.terS.getFilterTransactions1(this.requestUrl).then(transF=>{  this.totalRecords = transF.data.meta.TotalRecords
      this.total = Math.ceil(this.totalRecords/this.perPage)
      this.transactions = transF.data.transaction 

    })
  }


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
