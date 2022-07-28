import { NgModule } from '@angular/core';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.moudle';
import { LayoutComponent } from './layout.component';
import { LoginComponent } from './login2.component';
import { RegisterComponent } from './register.component';

@NgModule({
    imports: [
        CommonModule,FormsModule,
        ReactiveFormsModule,
        AccountRoutingModule
    ],
    declarations: [
        LayoutComponent,
        LoginComponent,
        RegisterComponent
    ]
})
export class AccountModule { }