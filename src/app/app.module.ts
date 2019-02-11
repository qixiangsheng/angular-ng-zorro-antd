import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NgZorroAntdModule, NZ_I18N, zh_CN} from 'ng-zorro-antd';
import {registerLocaleData} from '@angular/common';
import zh from '@angular/common/locales/zh';
import {ReactiveFormsModule} from '@angular/forms';
import {ChartModule} from 'angular-highcharts';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {AuthInterceptor} from './authInterceptor';
// 导入highcharts-angular
import {HighchartsChartModule} from 'highcharts-angular';

import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {TestComponent} from './test/test.component';
import {HighchartsComponent} from './highcharts/highcharts.component';
import {DefaultComponent} from './default/default.component';
import {HighAngularComponent} from './high-angular/high-angular.component';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    TestComponent,
    HighchartsComponent,
    DefaultComponent,
    HighAngularComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    ChartModule,
    HighchartsChartModule
  ],
  providers: [
    {provide: NZ_I18N, useValue: zh_CN},
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
