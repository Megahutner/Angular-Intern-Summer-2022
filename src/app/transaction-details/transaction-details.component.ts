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
import { ActivatedRoute } from '@angular/router';
@Component({ selector:'trans-component',templateUrl: 'transaction-details.component.html'})


export class TransactionDetailsComponent implements OnInit {
  transactionID:any;
  transLogs: any;
  transactionInfo:any;
  transDetails: any;
  transImage: any;
  payment: any;
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

    @ViewChild(DxDataGridComponent, { static: false }) dataGrid!: DxDataGridComponent;
    
    constructor(private route: ActivatedRoute, private terS:TerminalService){}
    
    ngOnInit(){

      this.route.queryParams.subscribe(params=>{
        this.transactionID=JSON.parse(params['id']);

      })



      this.terS.getTransactionDetail(this.transactionID).then(transDetail=>{
        console.log(transDetail)
        this.transactionInfo=transDetail.data.transaction;
        this.transLogs=transDetail.data.transactionlogs;
        this.transDetails=transDetail.data.transactionDetails;
        this.transImage=transDetail.data.transactionImages;
        this.payment=transDetail.data.payment;
        console.log(transDetail)
  
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
  
  
  
  
  
  
  
  }