
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatTableModule} from '@angular/material/table';
import { MatCardModule} from '@angular/material/card'
import { MatInputModule} from '@angular/material/input'
import { MatButtonModule} from '@angular/material/button'
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { TerminalComponent } from './terminal/terminal.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule} from '@angular/material/list';

import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSidenavModule} from '@angular/material/sidenav';
// used to create fake backend
import { fakeBackendProvider } from './_helpers';
import { TransactionComponent } from './transaction/transaction.component';
import { AppRoutingModule } from './app-routing.module';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AppComponent } from './app.component';
import { AlertComponent } from './component/alert.component';
import { HomeComponent } from './home';
import { AuthInterceptor } from './_helpers/auth-interceptor';
import { DxDataGridModule,DxScrollViewModule ,DxNumberBoxModule, DxButtonModule, DxSelectBoxModule, DxPopupModule,DxTemplateModule } from 'devextreme-angular';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { PagingComponent } from './paging/paging.component';
import { DxResponsiveBoxModule } from 'devextreme-angular';
import { DxTextBoxModule } from 'devextreme-angular';
import { TransactionDetailsComponent } from './transaction-details/transaction-details.component';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,DxNumberBoxModule,DxScrollViewModule , DxDataGridModule, DxButtonModule, DxSelectBoxModule, DxPopupModule,DxTemplateModule,
        MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatRippleModule,
    MatTableModule,
    MatIconModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule,
    MatSelectModule,
    MatToolbarModule,MatPaginatorModule,MatSidenavModule,CommonModule,DxResponsiveBoxModule,DxTextBoxModule
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,TerminalComponent,TransactionComponent,PagingComponent,TransactionDetailsComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
      
      // fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})
export class AppModule { };
