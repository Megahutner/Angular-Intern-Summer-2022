import {
    NgModule, Component, enableProdMode, ChangeDetectionStrategy,ViewChild,OnInit
  } from '@angular/core';import { User } from '../_models';
import { TerminalService } from '../_services/terminal.service';
import notify from  'devextreme/ui/notify'
import { DxDataGridComponent,  } from 'devextreme-angular';
import { DxDataGridModule, DxSelectBoxModule, DxButtonModule,DxChartModule } from 'devextreme-angular';
import CustomStore from 'devextreme/data/custom_store';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {
  HttpClient, HttpClientModule, HttpHeaders, HttpParams,
} from '@angular/common/http';
import {Router, NavigationEnd,ActivatedRoute} from '@angular/router';
import { DashBoardService } from '../_services/dashboard.service';


import { UserService } from '../_services/user.service';

@Component({ templateUrl: 'home.component.html',styleUrls: ['./home.component.css'] })



export class HomeComponent implements OnInit {
    @ViewChild(DxDataGridComponent, { static: false }) dataGrid!: DxDataGridComponent;

    hasFilter:boolean=false;
    user: User;
    showFilterRow: boolean;
    showHeaderFilter: boolean;
    currentFilter: any;
    posts: any;
    terminalInfo: any;
    transactionInfo: any;
    lockerInfo:any;
    parcelInfo:any;
    parcel:any;

    cartridge:any;

    Status=[
      {ID:4, Name:"Done"},
      {ID:5, Name:"Failed"},
      {ID:6,Name:"Ended"}]

    parcelChart=[
      {name:"Success",Count:null},
      {name:"Failed",Count:null},
      {name:"Ended",Count:null},
    ]

    constructor(private accountService: UserService, private terS: TerminalService ,private router: Router, private activatedRoute: ActivatedRoute, private dbService:DashBoardService) {

    }
    customizeTooltip(arg: any) {
      return {
        text: `${arg.valueText} ${arg.seriesName}s`,
      };
    }

    customizeTooltipCartridge(arg:any){
      return {
        text:`${arg.valueText} cartridges in Terminal ${arg.argumentText}`
      }
    }

    customizeTooltipParcel(arg:any){
      return {
        text:`${arg.valueText} ${arg.argumentText} parcels `
      }
    }
    customizeLabel(arg:any){
      return`${arg.valueText} cartridges in T${arg.argumentText}`
      
    }

    customizeLabelParcel(arg:any){
      return`${arg.valueText} ${arg.argumentText} parcels`
      
    }


    customizePoint = (arg:any)=>{
      if (arg.argument=="Success"){
        return{color:'#69f869'}
      }
      if (arg.argument=="Failed"){
        return{color:'#e44530'}
      }
      if (arg.argument=="Ended"){
        return{color:'#999b18'}
      }

    }
    ngOnInit(){

    this.dbService.getLockerInfo().then(locker=>{
      this.lockerInfo=locker.data.ActiveCartridges
    })
    this.dbService.getParcelInfo().then(parcel=>{
      this.parcel=parcel;
      this.parcelInfo=parcel.data.parcelInfo

      this.parcelChart.forEach(element=>{
        if (element.name=="Success"){
          element.Count=this.parcelInfo.Done
        }
        if (element.name=="Failed"){
          element.Count=this.parcelInfo.Fail
        }
        if (element.name=="Ended"){
          element.Count=this.parcelInfo.Ended
        }
       
      }
      
      
      )

    })
    this.dbService.getTerminalInfo().then(terminal=>{
      this.terminalInfo=terminal.data.Terminal
    })
    this.dbService.getTransactionInfo().then(transaction=>{
      this.transactionInfo=transaction.data.transaction
    })

    this.dbService.getAllCartridges().then(cartridge=>{
      this.cartridge=cartridge.data

    })

      
   }
    
    
}
@NgModule({
    imports: [
      BrowserModule,
      DxDataGridModule,
      DxSelectBoxModule,
      DxButtonModule,
      HttpClientModule,DxChartModule
    ]
  })
  export class AppModule { }
  
  platformBrowserDynamic().bootstrapModule(AppModule);
