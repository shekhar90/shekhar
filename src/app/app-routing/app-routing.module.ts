import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { PracticeComponent } from '../practice/practice.component';
import { LoginSignupComponent } from '../login-signup/login-signup.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'practice', component: PracticeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginSignupComponent, data: { login: true } },
  { path: 'signup', component: LoginSignupComponent, data: { login: false } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
