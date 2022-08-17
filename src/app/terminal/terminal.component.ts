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
import { typeService,onlineStatus,statusType,typeID } from '../_services/type.service';
import { UserService } from '../_services/user.service';
import { SlicePipe } from '@angular/common';


@Component({ templateUrl: 'terminal.component.html'})



export class TerminalComponent implements OnInit{
  @ViewChild('gridListCollectionLog') gridListCollectionLog: DxDataGridComponent;
public total: number;
public totalRecords: number
  public current:number = 1;
  public perPage:number = 10;
  special:string="Special"
  currentTerminal: any;
  popupTerminalVisible: boolean = false;
  isUpdate: boolean=false;
  refreshMode:string;
  x:any;
    requestUrl='';
  value1='';
    value2='';
    value3='';
    value4='';
    value5:any;
    value6:any;
    value7:any;
    url1='';
    url2='';
    url3='';
    url4='';
    url5='';
    url6='';
    url7='';
  typeShow=[
    {Id: 0, Name: "Show Full"},
    {Id: 1, Name: "Not Show Full"},
  ]
  onlineStatus=[{
    
    ID:-1, Name:"(All)"
  },{

    ID:0, Name:"Unknown"
  },
{
  ID:1,Name:"Online"
}]
  statusData=[{
    Id:-1,Name:"(All)"
  },{
    Id:0,Name:"Disabled"
  },{
    Id:1, Name:"Active"
  }
]
typeTerminal = [
  {Id: -1, Name: "(All)"},
  {Id: 0, Name: "Standard"},
  {Id: 1, Name: "Special"}
]

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
  min1 = -40;
  max1 = 84;
  min2 = -39;
  max2 = 85;
  ezyCode:any;
  group:any;
  type:any;
  dataPolyclinic:any;
  filterOption: number;
    user: User;
    showFilterRow: boolean;
    showHeaderFilter: boolean;
    currentFilter: any;
    posts: any;
    terminals: any;
    transactions: any;
    constructor(private accountService: UserService, private terS: TerminalService,private router: Router, private activatedRoute: ActivatedRoute) {
        // this.statusType=this.typeS.getStatus();
        // this.typeID=this.typeS.getType();
        // this.onlineStatus=this.typeS.getOnlineStatus();
          
        //   this.terS.getTransactions().then(trans=>{
        //     this.transactions = trans.data.transaction;
        // //    console.log(this.transactions)
        //   });
          
        this.edit=this.edit.bind(this);

    }
    ngOnInit():void{
      this.filterOption =2;

      this.getBasicPolyclinic();

      
      this.currentTerminal = {
        Name: "",
        Description: "",
        Status: null,
        Id:null,
        IsShowFullDiagram:null,
      };
      // this.refreshComponent();
      this.user = this.accountService.userValue;
     this.terS.getTerminals1(this.current,this.perPage).then(ter=>{
            this.terminals = ter.data.terminal;
            this.totalRecords = ter.data.meta.TotalRecords
            this.total = Math.ceil(this.totalRecords/this.perPage)
           // console.log(this.terminals.length)

            //console.log(this.perPage)


            //this.terminalsToDisplay=this.paginate(this.current,this.perPage)
          })
            // this.gridListCollectionLog.instance.clearFilter();
            // this.gridListCollectionLog.instance.clearSorting();
            // this.gridListCollectionLog.instance.refresh();
            console.log(this.popupTerminalVisible)
    }
   
  //   refreshComponent(){
  //     this.router.navigate([this.router.url])
  //  }
    // changeFromParent(){
    //   this.data +=1;
    // }
    Add(){
      this.currentTerminal = {
        Name: "",
        Description: "",
        EzyCode:"",
        Status: null,
        Id:0,
        IsShowFullDiagram:null,
        TemperatureRangeFrom:0,
        TemperatureRangeTo:0,
        Type:0,
      };
      this.isUpdate=false
      this.popupTerminalVisible = true;
    
    }
    edit(e:any){
      this.popupTerminalVisible = true;

      this.currentTerminal=e.row.data;
      this.isUpdate= true;
      console.log(this.currentTerminal);


    }
   

    cancelUpdateTerminal(){
      this.popupTerminalVisible = false;
     
    }
    getBasicPolyclinic(){
      this.terS.GetBasicPolyclinic().then(res=>{
//        console.log(res)
        if(res.code == 200){
          this.dataPolyclinic = res.data;
        }
      })
    }

    public onGoTo(page:number): void{
      this.current = page
      this.perPage=this.perPage
      this.total=this.total
      var initialUrl=`api/terminal/get-terminals?PageNumber=`+this.current+`&Take=`+this.perPage+`&Filter=[`;
     
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
      if (this.value5!='-1'){
        this.requestUrl=this.requestUrl+this.url5
      }
      if (this.value6!='-1'){
        this.requestUrl=this.requestUrl+this.url6
      }
      if (this.value7!='-1'){
        this.requestUrl=this.requestUrl+this.url7
      }
      this.terS.getFilterTerminals1(this.requestUrl).then(ters=>{
        this.terminals = ters.data.terminal;})
    }
    // public onNext(page:number): void{
    //   this.current = page +1
    //   this.terminalsToDisplay= this.paginate(this.current,this.perPage)
    // }
    // public onPrevious(page:number): void{
    //   this.current = page-1
    //   this.terminalsToDisplay= this.paginate(this.current,this.perPage)
    // }
    deleteTerminal(e:any){
      console.log(e.data.Id)
      this.terS.deleteTerminal(e.data.Id).then(res=>{
        console.log(res.code)
        if(res.code===200){
        this.showNotify("Delete Terminal successsfully!","success")
        window.setTimeout(function(){location.reload()},1000)}
        else {
          this.showNotify("Failed","error");
        }
      }).catch(err=>{
        this.showNotify("Failed","error");
        this.terS.error(err);
      })


    }


    public showNotify(content: string, status: string){
      notify({
        message: content,
        width: 1000
      }, status, 2000);
    }
public switch(perPage:number):void{
  this.perPage =perPage
  this.total= Math.floor(this.totalRecords/this.perPage)+1
  this.current=1
  var initialUrl=`api/terminal/get-terminals?PageNumber=`+this.current+`&Take=`+this.perPage+`&Filter=[`;
     
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
      if (this.value5!='-1'){
        this.requestUrl=this.requestUrl+this.url5
      }
      if (this.value6!='-1'){
        this.requestUrl=this.requestUrl+this.url6
      }
      if (this.value7!='-1'){
        this.requestUrl=this.requestUrl+this.url7
      }
      this.terS.getFilterTerminals1(this.requestUrl).then(ters=>{
        this.terminals = ters.data.terminal;})
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
  
    getStatusType(status:number):string{
      if (status==1){
        return "Active";
      }

      if(status==0){
        return "Disabled"
      }
    }
    gettypeID(status:number):string{
      if (status==1){
        return this.special;
      }

      if(status==0){
        return "Standard"
      }
    }
    getonlineStatus(status:number):string{
      if (status==1){
        return "Online";
      }

      if(status==0){
        return "Unknown"
      }
    }


    updateTerminal(){
      var newData = {
        name: this.currentTerminal.Name,
        description: this.currentTerminal.Description,
        ezyCode: this.currentTerminal.EzyCode,
        status:null,
        id:0,
        isShowFullDiagram: this.currentTerminal.IsShowFullDiagram,
        polyclinicId: this.currentTerminal.PolyclinicId,
        temperatureRangeFrom: this.currentTerminal.TemperatureRangeFrom,
        temperatureRangeTo: this.currentTerminal.TemperatureRangeTo,
        type: this.currentTerminal.Type
      }
      if(newData.name === "" || newData.name === null || newData.name === undefined){
        this.showNotify("Please enter Terminal Name!","warning");
        return;
      }
      if(newData.ezyCode === "" || newData.ezyCode === null || newData.ezyCode === undefined){
        this.showNotify("Please enter EzyCode!","warning");
        return;
      }
      if(newData.isShowFullDiagram === "" || newData.isShowFullDiagram === null || newData.isShowFullDiagram === undefined){
        this.showNotify("Please select Show Type!","warning");
        return;
      }
      if(newData.polyclinicId === "" || newData.polyclinicId === null || newData.polyclinicId === undefined){
        this.showNotify("Please select Polyclinic!","warning");
        return;
      }
      if(newData.type === "" || newData.type === null || newData.type === undefined){
        this.showNotify("Please select Type!","warning");
        return;
      }
      if(newData.temperatureRangeFrom === "" || newData.temperatureRangeFrom === null || newData.temperatureRangeFrom === undefined || newData.temperatureRangeTo === "" || newData.temperatureRangeTo === null || newData.temperatureRangeTo === undefined){
        this.showNotify("Please enter the Range!","warning");
        return;
      }
      if(newData.temperatureRangeFrom >= newData.temperatureRangeTo){
        this.showNotify("Temperature range from can not higher than temperature range to","warning");
        return;
      }

      if (this.isUpdate === true){
        newData.id=this.currentTerminal.Id;
        newData.status=this.currentTerminal.Status;
        if(newData.status === ""||newData.status === null||newData.status === undefined){
          this.showNotify("Please select status!","warning")
          return;
        }
        this.terS.UpdateTerminal(newData).then(res=>{
          if (res.code === 200){
            let index=this.terminalsToDisplay.findIndex((m:any)=> m.Id===res.data.terminal.Id)
            this.terminalsToDisplay.splice(index,1,res.data.terminal);
            this.popupTerminalVisible=false;
            this.showNotify("Update Terminal successfully!","success")
            window.setTimeout(function(){location.reload()},1000)
          }
          else{
            this.showNotify(res.message,'error');

          }
        }).catch(err=>{
          this.showNotify("Update Terminal failed!",'error');
          
        })
       }

      else{
      newData.status = 1,
      this.terS.CreateTerminal(newData).then(res=>{
        if(res.code === 200){
          this.showNotify("Create Terminal successfully!","success");
          this.terminalsToDisplay.splice(0,0,res.data.terminal);
          this.popupTerminalVisible = false;
          window.setTimeout(function(){location.reload()},2000)


          
        }
        else
          this.showNotify(res.message,"error");
      }).catch(err=>{
        this.showNotify("Create Terminal failed!","error");
        this.terS.error(err);
      })
    }}


    filterId(x):void{
      this.value1=x.target.value;
      this.current=1
      this.perPage=this.perPage
      var initialUrl=`api/terminal/get-terminals?PageNumber=`+this.current+`&Take=`+this.perPage+`&Filter=[`;
      if(this.value1 != '' ){
        var initialUrl=`api/terminal/get-terminals?PageNumber=`+this.current+`&Take=`+this.perPage+`&Filter=[`;
    
    
    
        this.url1= ',"or",["TerminalId","contains","'+this.value1+'"]';
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
        if(this.value5!='-1'){
          this.requestUrl=this.requestUrl+this.url5
        }
        if(this.value6!='-1'){
          this.requestUrl=this.requestUrl+this.url6
        }
        if(this.value7!='-1'){
          this.requestUrl=this.requestUrl+this.url7
        }
        this.terS.getFilterTerminals1(this.requestUrl).then(terF=>{  this.totalRecords = terF.data.meta.TotalRecords
          this.total = Math.ceil(this.totalRecords/this.perPage)
          this.terminals = terF.data.terminal 
    
        })
      }
      else if(this.value1=='' && this.value2==''&& this.value3==''&& this.value4==''&& this.value5=='-1'&& this.value6=='-1'&& this.value7=='-1'){
        this.terS.getTerminals1(1,this.perPage).then(ter=>{
          this.terminals = ter.data.terminal;
          this.totalRecords = ter.data.meta.TotalRecords
          this.total = Math.ceil(this.totalRecords/this.perPage)})
    
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
        if(this.value5!='-1'){
          this.requestUrl=this.requestUrl+this.url5
        }
        if(this.value6!='-1'){
          this.requestUrl=this.requestUrl+this.url6
        }
        if(this.value7!='-1'){
          this.requestUrl=this.requestUrl+this.url7
        }
     
        this.terS.getFilterTerminals1(this.requestUrl).then(terF=>{  this.totalRecords = terF.data.meta.TotalRecords
          this.total = Math.ceil(this.totalRecords/this.perPage)
          this.terminals = terF.data.terminal 
    
        })
      }}
      filterCode(x):void{
        this.value2=x.target.value;
        this.current=1
        this.perPage=this.perPage
        var initialUrl=`api/terminal/get-terminals?PageNumber=`+this.current+`&Take=`+this.perPage+`&Filter=[`;
        if(this.value2 != '' ){
          var initialUrl=`api/terminal/get-terminals?PageNumber=`+this.current+`&Take=`+this.perPage+`&Filter=[`;
      
      
      
          this.url2= ',"or",["EzyCode","contains","'+this.value2+'"]';
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
          if(this.value5!='-1'){
            this.requestUrl=this.requestUrl+this.url5
          }
          if(this.value6!='-1'){
            this.requestUrl=this.requestUrl+this.url6
          }
          if(this.value7!='-1'){
            this.requestUrl=this.requestUrl+this.url7
          }
          this.terS.getFilterTerminals1(this.requestUrl).then(terF=>{  this.totalRecords = terF.data.meta.TotalRecords
            this.total = Math.ceil(this.totalRecords/this.perPage)
            this.terminals = terF.data.terminal 
      
          })
        }
        else if(this.value1=='' && this.value2==''&& this.value3==''&& this.value4==''){
          this.terS.getTerminals1(1,this.perPage).then(ter=>{
            this.terminals = ter.data.terminal;
            this.totalRecords = ter.data.meta.TotalRecords
            this.total = Math.ceil(this.totalRecords/this.perPage)})
      
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
          if(this.value5!='-1'){
            this.requestUrl=this.requestUrl+this.url5
          }
          if(this.value6!='-1'){
            this.requestUrl=this.requestUrl+this.url6
          }
          if(this.value7!='-1'){
            this.requestUrl=this.requestUrl+this.url7
          }
       
          this.terS.getFilterTerminals1(this.requestUrl).then(terF=>{  this.totalRecords = terF.data.meta.TotalRecords
            this.total = Math.ceil(this.totalRecords/this.perPage)
            this.terminals = terF.data.terminal 
      
          })
        }}
        filterName(x):void{
          console.log(3)
          this.value3=x.target.value;
          this.current=1
          this.perPage=this.perPage
          var initialUrl=`api/terminal/get-terminals?PageNumber=`+this.current+`&Take=`+this.perPage+`&Filter=[`;
          if(this.value3 != '' ){
            var initialUrl=`api/terminal/get-terminals?PageNumber=`+this.current+`&Take=`+this.perPage+`&Filter=[`;
        
        
        
            this.url3= ',"or",["Name","contains","'+this.value3+'"]';
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
            if(this.value5!='-1'){
              this.requestUrl=this.requestUrl+this.url5
            }
            if(this.value6!='-1'){
              this.requestUrl=this.requestUrl+this.url6
            }
            if(this.value7!='-1'){
              this.requestUrl=this.requestUrl+this.url7
            }
            this.terS.getFilterTerminals1(this.requestUrl).then(terF=>{  this.totalRecords = terF.data.meta.TotalRecords
              this.total = Math.ceil(this.totalRecords/this.perPage)
              this.terminals = terF.data.terminal 
        
            })
          }
          else if(this.value1=='' && this.value2==''&& this.value3==''&& this.value4==''){
            this.terS.getTerminals1(1,this.perPage).then(ter=>{
              this.terminals = ter.data.terminal;
              this.totalRecords = ter.data.meta.TotalRecords
              this.total = Math.ceil(this.totalRecords/this.perPage)})
        
          }
          else{
            this.requestUrl=initialUrl
            if(this.value2!=''){
              this.requestUrl=this.requestUrl+this.url2
            }
            if(this.value1!=''){
              this.requestUrl=this.requestUrl+this.url1
            }
            if(this.value4!=''){
              this.requestUrl=this.requestUrl+this.url4
            }
            if(this.value5!='-1'){
              this.requestUrl=this.requestUrl+this.url5
            }
            if(this.value6!='-1'){
              this.requestUrl=this.requestUrl+this.url6
            }
            if(this.value7!='-1'){
              this.requestUrl=this.requestUrl+this.url7
            }
         
            this.terS.getFilterTerminals1(this.requestUrl).then(terF=>{  this.totalRecords = terF.data.meta.TotalRecords
              this.total = Math.ceil(this.totalRecords/this.perPage)
              this.terminals = terF.data.terminal 
        
            })
          }}




          filterDes(x):void{
            console.log(4)
            this.value4=x.target.value;
            this.current=1
            this.perPage=this.perPage
            var initialUrl=`api/terminal/get-terminals?PageNumber=`+this.current+`&Take=`+this.perPage+`&Filter=[`;
            if(this.value4 != '' ){
              var initialUrl=`api/terminal/get-terminals?PageNumber=`+this.current+`&Take=`+this.perPage+`&Filter=[`;
          
          
          
              this.url4= ',"or",["Description","contains","'+this.value4+'"]';
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
              if(this.value5!='-1'){
                this.requestUrl=this.requestUrl+this.url5
              }
              if(this.value6!='-1'){
                this.requestUrl=this.requestUrl+this.url6
              }
              if(this.value7!='-1'){
                this.requestUrl=this.requestUrl+this.url7
              }
              this.terS.getFilterTerminals1(this.requestUrl).then(terF=>{  this.totalRecords = terF.data.meta.TotalRecords
                this.total = Math.ceil(this.totalRecords/this.perPage)
                this.terminals = terF.data.terminal 
          
              })
            }
            else if(this.value1=='' && this.value2==''&& this.value3==''&& this.value4==''){
              this.terS.getTerminals1(1,this.perPage).then(ter=>{
                this.terminals = ter.data.terminal;
                this.totalRecords = ter.data.meta.TotalRecords
                this.total = Math.ceil(this.totalRecords/this.perPage)})
          
            }
            else{
              this.requestUrl=initialUrl
              if(this.value2!=''){
                this.requestUrl=this.requestUrl+this.url2
              }
              if(this.value3!=''){
                this.requestUrl=this.requestUrl+this.url3
              }
              if(this.value1!=''){
                this.requestUrl=this.requestUrl+this.url1
              }
              if(this.value5!='-1'){
                this.requestUrl=this.requestUrl+this.url5
              }
              if(this.value6!='-1'){
                this.requestUrl=this.requestUrl+this.url6
              }
              if(this.value7!='-1'){
                this.requestUrl=this.requestUrl+this.url7
              }
           
              this.terS.getFilterTerminals1(this.requestUrl).then(terF=>{  this.totalRecords = terF.data.meta.TotalRecords
                this.total = Math.ceil(this.totalRecords/this.perPage)
                this.terminals = terF.data.terminal 
          
              })
            }}
            filterOnlineStatus(x):void{

            this.value5=x.target.value;
            this.current=1
            this.perPage=this.perPage
            var initialUrl=`api/terminal/get-terminals?PageNumber=`+this.current+`&Take=`+this.perPage+`&Filter=[`;
            if(this.value5 != '-1' ){
              var initialUrl=`api/terminal/get-terminals?PageNumber=`+this.current+`&Take=`+this.perPage+`&Filter=[`;
          
          
          
              this.url5= ',"or",["IsOnline","=","'+this.value5+'"]';
              this.requestUrl=initialUrl + this.url5
              if(this.value2!=''){
                this.requestUrl=this.requestUrl+this.url2
              }
              if(this.value3!=''){
                this.requestUrl=this.requestUrl+this.url3
              }
              if(this.value1!=''){
                this.requestUrl=this.requestUrl+this.url1
              }
              if(this.value4!=''){
                this.requestUrl=this.requestUrl+this.url4
              }
              if(this.value6!='-1'){
                this.requestUrl=this.requestUrl+this.url6
              }
              if(this.value7!='-1'){
                this.requestUrl=this.requestUrl+this.url7
              }
              this.terS.getFilterTerminals1(this.requestUrl).then(terF=>{  this.totalRecords = terF.data.meta.TotalRecords
                this.total = Math.ceil(this.totalRecords/this.perPage)
                this.terminals = terF.data.terminal 
          
              })
            }
            else if(this.value1=='' && this.value2==''&& this.value3==''&& this.value4==''&& this.value5=='-1'&& this.value6=='-1'&& this.value7=='-1'){
              this.terS.getTerminals1(1,this.perPage).then(ter=>{
                this.terminals = ter.data.terminal;
                this.totalRecords = ter.data.meta.TotalRecords
                this.total = Math.ceil(this.totalRecords/this.perPage)})
          
            }
            else{
              this.requestUrl=initialUrl
              if(this.value2!=''){
                this.requestUrl=this.requestUrl+this.url2
              }
              if(this.value3!=''){
                this.requestUrl=this.requestUrl+this.url3
              }
              if(this.value1!=''){
                this.requestUrl=this.requestUrl+this.url1
              }
              if(this.value4!=''){
                this.requestUrl=this.requestUrl+this.url4
              }
              if(this.value6!='-1'){
                this.requestUrl=this.requestUrl+this.url6
              }
              if(this.value7!='-1'){
                this.requestUrl=this.requestUrl+this.url7
              }
           
              this.terS.getFilterTerminals1(this.requestUrl).then(terF=>{  this.totalRecords = terF.data.meta.TotalRecords
                this.total = Math.ceil(this.totalRecords/this.perPage)
                this.terminals = terF.data.terminal 
          
              })
            }
          
          
           }






            filterStatusData(x):void{
              this.value6=x.target.value;
            this.current=1
            this.perPage=this.perPage
            var initialUrl=`api/terminal/get-terminals?PageNumber=`+this.current+`&Take=`+this.perPage+`&Filter=[`;
            if(this.value6 != '-1' ){
              var initialUrl=`api/terminal/get-terminals?PageNumber=`+this.current+`&Take=`+this.perPage+`&Filter=[`;
          
          
          
              this.url6= ',"or",["Status","=","'+this.value6+'"]';
              this.requestUrl=initialUrl + this.url6
              if(this.value2!=''){
                this.requestUrl=this.requestUrl+this.url2
              }
              if(this.value3!=''){
                this.requestUrl=this.requestUrl+this.url3
              }
              if(this.value1!=''){
                this.requestUrl=this.requestUrl+this.url1
              }
              if(this.value5!='-1'){
                this.requestUrl=this.requestUrl+this.url5
              }
              if(this.value4!=''){
                this.requestUrl=this.requestUrl+this.url4
              }
              if(this.value7!='-1'){
                this.requestUrl=this.requestUrl+this.url7
              }
              this.terS.getFilterTerminals1(this.requestUrl).then(terF=>{  this.totalRecords = terF.data.meta.TotalRecords
                this.total = Math.ceil(this.totalRecords/this.perPage)
                this.terminals = terF.data.terminal 
          
              })
            }
            else if(this.value1=='' && this.value2==''&& this.value3==''&& this.value4==''&& this.value5=='-1'&& this.value6=='-1'&& this.value7=='-1'){
              this.terS.getTerminals1(1,this.perPage).then(ter=>{
                this.terminals = ter.data.terminal;
                this.totalRecords = ter.data.meta.TotalRecords
                this.total = Math.ceil(this.totalRecords/this.perPage)})
          
            }
            else{
              this.requestUrl=initialUrl
              if(this.value2!=''){
                this.requestUrl=this.requestUrl+this.url2
              }
              if(this.value3!=''){
                this.requestUrl=this.requestUrl+this.url3
              }
              if(this.value1!=''){
                this.requestUrl=this.requestUrl+this.url1
              }
              if(this.value5!='-1'){
                this.requestUrl=this.requestUrl+this.url5
              }
              if(this.value4!=''){
                this.requestUrl=this.requestUrl+this.url4
              }
              if(this.value7!='-1'){
                this.requestUrl=this.requestUrl+this.url7
              }
           
              this.terS.getFilterTerminals1(this.requestUrl).then(terF=>{  this.totalRecords = terF.data.meta.TotalRecords
                this.total = Math.ceil(this.totalRecords/this.perPage)
                this.terminals = terF.data.terminal 
          
              })
            }
              

            }
            filterTypeTerminal(x):void{
              this.value7=x.target.value;
            this.current=1
            this.perPage=this.perPage
            var initialUrl=`api/terminal/get-terminals?PageNumber=`+this.current+`&Take=`+this.perPage+`&Filter=[`;
            if(this.value7 != '-1' ){
              var initialUrl=`api/terminal/get-terminals?PageNumber=`+this.current+`&Take=`+this.perPage+`&Filter=[`;
          
          
          
              this.url7= ',"or",["Type","=","'+this.value7+'"]';
              this.requestUrl=initialUrl + this.url7
              if(this.value2!=''){
                this.requestUrl=this.requestUrl+this.url2
              }
              if(this.value3!=''){
                this.requestUrl=this.requestUrl+this.url3
              }
              if(this.value1!=''){
                this.requestUrl=this.requestUrl+this.url1
              }
              if(this.value5!='-1'){
                this.requestUrl=this.requestUrl+this.url5
              }
              if(this.value6!='-1'){
                this.requestUrl=this.requestUrl+this.url6
              }
              if(this.value4!=''){
                this.requestUrl=this.requestUrl+this.url4
              }
              this.terS.getFilterTerminals1(this.requestUrl).then(terF=>{  this.totalRecords = terF.data.meta.TotalRecords
                this.total = Math.ceil(this.totalRecords/this.perPage)
                this.terminals = terF.data.terminal 
          
              })
            }
            else if(this.value1=='' && this.value2==''&& this.value3==''&& this.value4==''&& this.value5=='-1'&& this.value6=='-1'&& this.value7=='-1'){
              this.terS.getTerminals1(1,this.perPage).then(ter=>{
                this.terminals = ter.data.terminal;
                this.totalRecords = ter.data.meta.TotalRecords
                this.total = Math.ceil(this.totalRecords/this.perPage)})
          
            }
            else{
              this.requestUrl=initialUrl
              if(this.value2!=''){
                this.requestUrl=this.requestUrl+this.url2
              }
              if(this.value3!=''){
                this.requestUrl=this.requestUrl+this.url3
              }
              if(this.value1!=''){
                this.requestUrl=this.requestUrl+this.url1
              }
              if(this.value5!='-1'){
                this.requestUrl=this.requestUrl+this.url5
              }
              if(this.value6!='-1'){
                this.requestUrl=this.requestUrl+this.url6
              }
              if(this.value4!=''){
                this.requestUrl=this.requestUrl+this.url4
              }
           
              this.terS.getFilterTerminals1(this.requestUrl).then(terF=>{  this.totalRecords = terF.data.meta.TotalRecords
                this.total = Math.ceil(this.totalRecords/this.perPage)
                this.terminals = terF.data.terminal 
          
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
      HttpClientModule,DxCheckBoxModule
    ]
  })
  export class AppModule { }
  
  platformBrowserDynamic().bootstrapModule(AppModule);
