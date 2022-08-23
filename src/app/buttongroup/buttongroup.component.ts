import { Component, OnInit, Input, SimpleChanges, Output,EventEmitter, NgModule } from '@angular/core';
import { delay } from 'rxjs/operators';
import * as _ from 'underscore';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import * as moment from 'moment';

@Component({
  selector: 'buttongroup-component',
  templateUrl: `./buttongroup.component.html`	
})
export class ButtonGroupComponent implements OnInit {
  


 @Input() hasAdd:any
  


  


  
   @Output() Add: EventEmitter<any> = new EventEmitter<any>()
   @Output() Refresh: EventEmitter<any> = new EventEmitter<any>()




  constructor() {


    
  }

  ngOnInit() {
   
  }

  ngOnChanges(changes: SimpleChanges):void{
   

    



    }
    public Adds(){
        this.Add.emit()
    }
    public Refreshs(){
      this.Refresh.emit()
  }

     
  }
