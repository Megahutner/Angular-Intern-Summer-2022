import { Component,OnInit,OnDestroy } from '@angular/core';
//import * as moment from 'moment';

import { UserService } from './_services/user.service';
import { User } from './_models';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
    user: User;
    currentUser: any;
    username: string;
    id: string;
    constructor(private accountService: UserService) {
        this.accountService.user.subscribe(x => this.user = x);
       
    }
    
//     myTime!: any;
//     myInterval!: any;
//     ngOnInit(){
//       this.curTime()
//       this.myInterval = setInterval(()=>{this.curTime()},1000)
//     }



//     ngOnDestroy(){
//       clearInterval(this.myInterval)
//     }




//   curTime(){
//     this.myTime = moment().format("hh:mm:ss");
// }
  

    logout() {
        this.accountService.logout();
    }
}