import {
    NgModule, Component, enableProdMode, ChangeDetectionStrategy,ViewChild,OnInit
  } from '@angular/core';import { User } from '../_models';
import { TerminalService } from '../_services/terminal.service';
import notify from  'devextreme/ui/notify'
import { DxDataGridComponent,  } from 'devextreme-angular';
import { DxDataGridModule, DxSelectBoxModule, DxButtonModule,DxCheckBoxModule } from 'devextreme-angular';
import CustomStore from 'devextreme/data/custom_store';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {
  HttpClient, HttpClientModule, HttpHeaders, HttpParams,
} from '@angular/common/http';
import {Router, NavigationEnd,ActivatedRoute} from '@angular/router';

import { UserService } from '../_services/user.service';
import { SlicePipe } from '@angular/common';

@Component({ templateUrl: 'terminal.component.html'})



export class TerminalComponent implements OnInit{
  @ViewChild('gridListCollectionLog') gridListCollectionLog: DxDataGridComponent;
public total: number;
  public current:number = 1;
  public perPage:number = 10;

//  public total: number= 72
  // readonly allowedPageSizes =[5,10,15,'all'];
  // readonly displayModes=[{ text:"Display Mode 'full'",value:'full'},{text:"Display Mode 'compact'",value:'compact'}];
  // displayMode='full';
  // showPageSizeSelector = true;
  // showInfo = true;
  // showNavButtons = true;
  // customizeColumns(columns){
  //   columns[0].width = 70;
  // }
  // get isCompactMode(){
  //   return this.displayMode === 'compact'
  // }
    user: User;
    showFilterRow: boolean;
    showHeaderFilter: boolean;
    currentFilter: any;
    posts: any;
    terminals: any;
    transactions: any;
    constructor(private accountService: UserService, private terS: TerminalService,private router: Router, private activatedRoute: ActivatedRoute ) {
        
          
        //   this.terS.getTransactions().then(trans=>{
        //     this.transactions = trans.data.transaction;
        // //    console.log(this.transactions)
        //   });
          

    }
    ngOnInit():void{
      // this.refreshComponent();
      this.user = this.accountService.userValue;
     this.terS.getTerminals().then(ter=>{
            this.terminals = ter.data.terminal;
           // console.log(this.terminals.length)
            this.total = Math.ceil(this.terminals.length/this.perPage)

            //console.log(this.perPage)


            this.terminalsToDisplay=this.paginate(this.current,this.perPage)
          })
            // this.gridListCollectionLog.instance.clearFilter();
            // this.gridListCollectionLog.instance.clearSorting();
            // this.gridListCollectionLog.instance.refresh();
    }
  //   refreshComponent(){
  //     this.router.navigate([this.router.url])
  //  }
    // changeFromParent(){
    //   this.data +=1;
    // }

    public onGoTo(page:number): void{
      this.current = page
      
      this.terminalsToDisplay= this.paginate(this.current,this.perPage)
    }
    public onNext(page:number): void{
      this.current = page +1
      this.terminalsToDisplay= this.paginate(this.current,this.perPage)
    }
    public onPrevious(page:number): void{
      this.current = page-1
      this.terminalsToDisplay= this.paginate(this.current,this.perPage)
    }
public switch(perPage:number):void{
  this.perPage =perPage
  this.total= Math.floor(this.terminals.length/this.perPage)+1
  this.terminalsToDisplay= this.paginate(this.current,this.perPage)
}
    public terminalsToDisplay: string[]=[]
    public paginate(current: number, perPage: number):string[]{
      return [... this.terminals.slice((current-1)*perPage).slice(0,perPage)]
    }
    onRowUpdated(e:any){ //edit
     
    }
    onRowRemoved(e:any){ //delete
        
    }
    
    onRowInserted(e:any){ //add
       
    }
    
    
    
}
@NgModule({
    imports: [
      BrowserModule,
      DxDataGridModule,
      DxSelectBoxModule,
      DxButtonModule,
      HttpClientModule,DxCheckBoxModule
    ]
  })
  export class AppModule { }
  
  platformBrowserDynamic().bootstrapModule(AppModule);
