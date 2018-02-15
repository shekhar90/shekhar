import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { PracticeComponent } from '../practice/practice.component';

const routes: Routes = [
  { path: '', redirectTo: '/practice', pathMatch: 'full' },
  { path: 'practice', component: PracticeComponent },
  { path: 'home', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
