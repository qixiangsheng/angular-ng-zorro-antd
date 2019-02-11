import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AuthGuard} from './auth.guard';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {DefaultComponent} from './default/default.component';
import {TestComponent} from './test/test.component';
import {HighchartsComponent} from './highcharts/highcharts.component';
import {HighAngularComponent} from './high-angular/high-angular.component';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: DefaultComponent
      },
      {
        path: 'employee',
        loadChildren: './employee/employee.module#EmployeeModule'
      }, {
        path: 'test',
        component: TestComponent
      }, {
        path: 'charts',
        component: HighchartsComponent
      }, {
        path: 'high-angular',
        component: HighAngularComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
