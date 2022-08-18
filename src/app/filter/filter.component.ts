import { Component, OnInit, Input, SimpleChanges, Output,EventEmitter, NgModule } from '@angular/core';
import { delay } from 'rxjs/operators';
import * as _ from 'underscore';

@Component({
  selector: 'filter-component',
  templateUrl: `./filter.component.html`	
})
export class FilterComponent implements OnInit {
  
selectedStatus: any
selectedType: any

selectedData: any

@Input() filterOption: number;
  @Input() dataSearchs:any = [ {key: "Terminal ID", value: ""},{key: "Ezy Code", value: ""},{key: "Name", value: ""},{key: "Description", value: ""},]
  @Input() dataSearchsTrans: any=[{key: "Transaction Number", value: ""},{key: "Request Type", value: ""},{key: "Request Ref Number", value: ""},{key: "Created By", value: ""},{key: "Polyclinic", value: ""},{key: "End By", value: ""},{key: "Ended Reason", value: ""}]
  @Input() typeTerminal:any;
  @Input() onlineStatus:any;
  @Input() statusData:any;
  @Output() filterOnlineStatuss: EventEmitter<any> = new EventEmitter<any>()
  @Output() filterTypeTerminals: EventEmitter<any> = new EventEmitter<any>()
  @Output() filterStatusDatas: EventEmitter<any> = new EventEmitter<any>()

  @Output() valueSearchTChanges: EventEmitter<any> = new EventEmitter<any>()
  @Output() valueSearchTrChanges: EventEmitter<any> = new EventEmitter<any>()

public option: number;
public terminal: string
public oStatus: string;
public sData: string

  constructor() {


    this.valueSearchTChange= _.debounce(this.valueSearchTChange,400)
    this.valueSearchTrChange= _.debounce(this.valueSearchTrChange,400)
  }

  ngOnInit() {
   
  }

  ngOnChanges(changes: SimpleChanges):void{
    if (changes['filterOption'] && changes['filterOption'].currentValue){
this.option=this.filterOption
console.log(this.option)

    }



    }
public valueSearchTChange(e:any):void{
this.dataSearchs.forEach(element => {
  if (element.key===e.target.placeholder){
    element.value=e.target.value
  }  
});
this.valueSearchTChanges.emit(this.dataSearchs)

}

public valueSearchTrChange(e:any):void{
  this.dataSearchsTrans.forEach(element => {
    if (element.key===e.target.placeholder){
      element.value=e.target.value
    }  
  });
  this.valueSearchTrChanges.emit(this.dataSearchsTrans)
  
  }


      public filterOnlineStatus(x:any):void{
           this.filterOnlineStatuss.emit(x) }
      public filterTypeTerminal(x:any):void{
           this.filterTypeTerminals.emit(x) }
      public filterStatusData(x:any):void{
           this.filterStatusDatas.emit(x)   }

  }
