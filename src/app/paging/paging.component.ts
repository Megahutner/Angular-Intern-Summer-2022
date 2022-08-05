import { Component, OnInit, Input, SimpleChanges, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'paging-component',
  templateUrl: `./paging.component.html`	
})
export class PagingComponent implements OnInit {
  @Input() current: number =0;
  @Input() total: number =0;
  @Input() perPage: number =0;
  @Output() goTo: EventEmitter<number> = new EventEmitter<number>()
  @Output() next: EventEmitter<number> = new EventEmitter<number>()
  @Output() switchs: EventEmitter<number> = new EventEmitter<number>()

  @Output() previous: EventEmitter<number> = new EventEmitter<number>()
public pages:number[]=[]
public pagesize: number[]=[5,10,15,20]
  constructor() {
  }

  ngOnInit() {
  }

  public onGoTo(page: number):void{
    this.goTo.emit(page)
  }
  public switch(size: number):void{
this.switchs.emit(size)
    //  window.location.reload();
    //    console.log(this.perPage)
  }

  public onNext():void{
    this.next.emit(this.current)
  }

  public onPrevious():void{
    this.previous.next(this.current)
  }


  ngOnChanges(changes: SimpleChanges):void {
    //console.log(changes)

    if(
      (changes['current'] && changes['current'].currentValue)|| (changes['total'] && changes['total'].currentValue) || (changes['perPage'] && changes['perPage'].currentValue)
    ){
      this.pages=this.getPages(this.current,this.total)
    }

    


  }



  private getPages(current:number, total: number): any[]{
    if (total <=4) {
      return [...Array(total).keys()].map(x => ++x)
    }

    if (current >= 4 && current <= total -2) {
      return [1,'...', current - 1, current, current + 1,'...', total]
    }
    if (current == total-1) {
      return [1,'...', current -2,current -1,current, total]
    }
    if (current == total) {
      return [1,'...',current -3, current -2,current-1, total]
    }



    return [1, 2, 3, 4,'...', total]
  }
}