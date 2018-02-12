import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MaterialuiModule } from './materialui/materialui.module'
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MaterialuiModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
