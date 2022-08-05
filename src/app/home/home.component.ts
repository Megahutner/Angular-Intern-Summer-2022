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
import {Router, NavigationEnd,ActivatedRoute} from '@angular/router';


import { UserService } from '../_services/user.service';

@Component({ templateUrl: 'home.component.html',styleUrls: ['./home.component.css'] })



export class HomeComponent implements OnInit {
    @ViewChild(DxDataGridComponent, { static: false }) dataGrid!: DxDataGridComponent;

    user: User;
    showFilterRow: boolean;
    showHeaderFilter: boolean;
    currentFilter: any;
    posts: any;
    terminals: any;
    transactions: any;
    constructor(private accountService: UserService, private terS: TerminalService ,private router: Router, private activatedRoute: ActivatedRoute) {
        this.user = this.accountService.userValue;
     this.terS.getTerminals().then(ter=>{
            this.terminals = ter.data.terminal;
            console.log(this.terminals)
          });
          this.terS.getTransactions().then(trans=>{
            this.transactions = trans.data.transaction;
        //    console.log(this.transactions)
          });
          

    }
    ngOnInit(){
      this.refreshComponent()}


    refreshComponent(){
      this.router.navigate([this.router.url])
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
