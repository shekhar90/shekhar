import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
// import { AngularFireModule } from 'angularfire2';
// import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
// import { AngularFireAuthModule } from 'angularfire2/auth';
// import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';
// import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
// import { MaterialuiModule } from './materialui/materialui.module';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { PracticeComponent } from './practice/practice.component';
import { HomeComponent } from './home/home.component';
import { LoginSignupComponent } from './login-signup/login-signup.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
// import { AuthenticationService } from './shared/authentication.service';
import { RoutingService } from './shared/routing.service';
import { UtilityService } from './shared/utility.service';
import { environment } from '../environments/environment';
import { FooterComponent } from './footer/footer.component';
import { AuthComponent } from './auth/auth.component';

@NgModule({
  declarations: [
    AppComponent,
    PracticeComponent,
    HomeComponent,
    LoginSignupComponent,
    LoginComponent,
    SignupComponent,
    FooterComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    // MaterialuiModule,
    AppRoutingModule,
    FormsModule,
    Angular2FontawesomeModule,
    ModalModule.forRoot(),
    ProgressbarModule.forRoot(),
    // ToastrModule.forRoot(),
    // AngularFireModule.initializeApp(environment.firebase),
    // AngularFireDatabaseModule,
    // AngularFireAuthModule,
    BrowserAnimationsModule
  ],
  providers: [ RoutingService, UtilityService], /* AuthenticationService, */
  bootstrap: [AppComponent]

})
export class AppModule { }
