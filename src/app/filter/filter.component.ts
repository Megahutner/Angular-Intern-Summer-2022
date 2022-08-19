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
  @Input() dataSearchs:any
  // @Input() dataSearchsTrans: any=[{key: "Transaction Number", value: ""},{key: "Request Type", value: ""},{key: "Request Ref Number", value: ""},{key: "Created By", value: ""},{key: "Polyclinic", value: ""},{key: "End By", value: ""},{key: "Ended Reason", value: ""}]
  // @Input() dataSearchsTrans: any=[];
  // @Input() dataSelect: any=[{key: "IsOnline", value: "-1"},{key: "Status", value: "-1"},{key: "Type", value: "-1"},]

  


  @Output() filterSelects: EventEmitter<any> = new EventEmitter<any>()
  @Output() valueSearchChanges: EventEmitter<any> = new EventEmitter<any>()
  @Output() valueSearchTrChanges: EventEmitter<any> = new EventEmitter<any>()



  constructor() {


    // this.valueSearchTChange= _.debounce(this.valueSearchTChange,1000)
    // this.valueSearchTrChange= _.debounce(this.valueSearchTrChange,1000)
  }

  ngOnInit() {
   
  }

  ngOnChanges(changes: SimpleChanges):void{
   

    



    }
public valueSearchChange(e:any):void{
// this.dataSearchs.forEach(element => {
//   if (element.key===e.target.placeholder){
//     element.value=e.target.value
//   }  
// });
this.valueSearchChanges.emit(this.dataSearchs)
// console.log(this.dataSearchs)
}

// public valueSearchTrChange(e:any):void{
//   this.dataSearchsTrans.forEach(element => {
//     if (element.key===e.target.placeholder){
//       element.value=e.target.value
//     }  
//   });
//   this.valueSearchTrChanges.emit(this.dataSearchsTrans)
  
//   }


        public filterSelect(e:any):void{
          // this.dataSelect.forEach(element => {
          //   if (element.key===e.target.name){
          //     element.value=e.target.value
          //   }  
          // });
          // this.filterSelects.emit(this.dataSelect) 
        }


     
  }
