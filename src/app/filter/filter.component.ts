import { Component, OnInit, Input, SimpleChanges, Output,EventEmitter, NgModule } from '@angular/core';

@Component({
  selector: 'filter-component',
  templateUrl: `./filter.component.html`	
})
export class FilterComponent implements OnInit {
  
selectedStatus: any
selectedType: any

selectedData: any

@Input() filterOption: number;
  @Input() x: any;
  @Input() typeTerminal:any;
  @Input() onlineStatus:any;
  @Input() statusData:any;
  @Output() filterOnlineStatuss: EventEmitter<any> = new EventEmitter<any>()
  @Output() filterTypeTerminals: EventEmitter<any> = new EventEmitter<any>()
  @Output() filterStatusDatas: EventEmitter<any> = new EventEmitter<any>()

  @Output() filterIds: EventEmitter<any> = new EventEmitter<any>()
  @Output() filterCodes: EventEmitter<any> = new EventEmitter<any>()
  @Output() filterDess: EventEmitter<any> = new EventEmitter<any>()
  @Output() filterNames: EventEmitter<any> = new EventEmitter<any>()
  @Output() filterTransNs: EventEmitter<any> = new EventEmitter<any>()
  @Output() filterRequestNs: EventEmitter<any> = new EventEmitter<any>()
  @Output() filterRequestTs: EventEmitter<any> = new EventEmitter<any>()
  @Output() filterCreateBs: EventEmitter<any> = new EventEmitter<any>()
  @Output() filterEndBs: EventEmitter<any> = new EventEmitter<any>()
  @Output() filterEndRs: EventEmitter<any> = new EventEmitter<any>()
  @Output() filterPolyclinics: EventEmitter<any> = new EventEmitter<any>()
public option: number;
public terminal: string
public oStatus: string;
public sData: string

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges):void {
    console.log(changes)
    if (changes['filterOption'] && changes['filterOption'].currentValue){
this.option=this.filterOption
    }



    }
    public filterTransN(x:any):void{
      this.filterTransNs.emit(x)}

      public filterRequestN(x:any):void{
        this.filterRequestNs.emit(x)}

        public filterRequestT(x:any):void{
          this.filterRequestTs.emit(x)}

          public filterCreateB(x:any):void{
            this.filterCreateBs.emit(x)}

            public filterEndB(x:any):void{
              this.filterEndBs.emit(x)}

              public filterEndR(x:any):void{
                this.filterEndRs.emit(x)}

                public filterPolyclinic(x:any):void{
                  this.filterPolyclinics.emit(x)}

                  public filterId(x:any):void{
                    this.filterIds.emit(x)}     

                    public filterName(x:any):void{
                      this.filterNames.emit(x)}

                      public filterCode(x:any):void{
                        this.filterCodes.emit(x)}

                        public filterDes(x:any):void{
                          this.filterDess.emit(x)}



                          public filterOnlineStatus(x):void{
                            this.filterOnlineStatuss.emit(x)
                          }
                          public filterTypeTerminal(x):void{
                            this.filterTypeTerminals.emit(x)
                          }
                          public filterStatusData(x):void{
                            this.filterStatusDatas.emit(x)
                          }

  }
