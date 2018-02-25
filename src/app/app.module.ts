import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';

import { AppComponent } from './app.component';
// import { MaterialuiModule } from './materialui/materialui.module';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { PracticeComponent } from './practice/practice.component';
import { HomeComponent } from './home/home.component'
@NgModule({
  declarations: [
    AppComponent,
    PracticeComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    // MaterialuiModule,
    AppRoutingModule,
    FormsModule,
    ModalModule.forRoot(),
    ProgressbarModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
