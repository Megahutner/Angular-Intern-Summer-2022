import { Component, OnInit, Input, SimpleChanges, Output,EventEmitter, NgModule } from '@angular/core';
import { delay } from 'rxjs/operators';
import * as _ from 'underscore';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import * as moment from 'moment';
import { getMultipleValuesInSingleSelectionError } from '@angular/cdk/collections';

@Component({
  selector: 'filter-component',
  templateUrl: `./filter.component.html`	
})
export class FilterComponent implements OnInit {
  
selectedStatus: any
selectedType: any
isOpened: boolean;
selectedData: any

@Input() filterOption: number;
  @Input() dataSearchs:any
  // @Input() dataSearchsTrans: any=[{key: "Transaction Number", value: ""},{key: "Request Type", value: ""},{key: "Request Ref Number", value: ""},{key: "Created By", value: ""},{key: "Polyclinic", value: ""},{key: "End By", value: ""},{key: "Ended Reason", value: ""}]
  // @Input() dataSearchsTrans: any=[];
  // @Input() dataSelect: any=[{key: "IsOnline", value: "-1"},{key: "Status", value: "-1"},{key: "Type", value: "-1"},]
icon:[{name:"fas fa-less-than-equal",value:"<"},{name:"fas fa-greater-than-equal",value:">"}]
icon1:[{name:"<sdsds",value:"<"},{name:">dsds",value:">"}]

  


  @Output() filterSelects: EventEmitter<any> = new EventEmitter<any>()
  @Output() valueSearchChanges: EventEmitter<any> = new EventEmitter<any>()
  @Output() valueSearchTrChanges: EventEmitter<any> = new EventEmitter<any>()

  typeButton: any;


  constructor() {
    this.typeButton = {
      icon: 'lessorequal',
      value:"<=",
      stylingMode: 'text',
      width: 32,
      elementAttr: {
        class: 'type',
      },
      onClick: (e) => {
        this.dataSearchs.forEach(element => {
          
          if(element.type==this.typeButton.value){
            if (e.component.option('icon') === 'greaterorequal') {
              e.component.option('icon', 'lessorequal');   
              this.typeButton.value="<="
              element.type = this.typeButton.value
            } 
            else 
            {
              e.component.option('icon', 'greaterorequal');
              this.typeButton.value=">="
              element.type = this.typeButton.value
            }

          }
        })
      },
    };



  
  }

  ngOnInit() {
   
  }

  ngOnChanges(changes: SimpleChanges):void{
   

    



    }
    addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
      console.log(moment(event.value).format("YYYY-MM-DD"))
    }
changeType(e:any){
  if (e=="<="){
    e=">=";
    console.log("1")
  }
  if (e==">="){
    e="<=";
    console.log("2")
  }
}
public valueSearchChange(e:any):void{
  console.log(this.dataSearchs)
this.dataSearchs.forEach(element => {
  if (element.type=="<=" || element.type==">=" && element.value ==''){
    element.value=moment(element.value).format("YYYY-MM-DD")
  }  
  if ((element.type =="<=" || element.type == ">=") && element.value == "Invalid date"){
    element.value = '';
  }
 
 });


 
this.valueSearchChanges.emit(this.dataSearchs)
}



        public filterSelect(e:any):void{
          
        }


     
  }
