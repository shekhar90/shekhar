import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import { MaterialuiModule } from './materialui/materialui.module';
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
    MaterialuiModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
