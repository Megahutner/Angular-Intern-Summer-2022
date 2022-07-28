import { Component } from '@angular/core';
import { User } from '../_models';


import { UserService } from '../_services/user.service';
@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    user: User;

    constructor(private accountService: UserService) {
        this.user = this.accountService.userValue;
    }
}