import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';
import { DriversComponent } from './drivers/drivers.component';

const routes: Routes = [
  {path:'', component: LoginComponent},
  {path:'users', component:UsersComponent},
  {path:'drivers', component:DriversComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
