import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PoLoginComponent, PoModule } from '@po-ui/ng-components';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { PoPageDynamicModule, PoPageLoginModule, PoTemplatesModule } from '@po-ui/ng-templates';
import { PoNotificationModule  } from '@po-ui/ng-components';
import { PoDynamicModule } from '@po-ui/ng-components';
import { PoButtonModule } from '@po-ui/ng-components';




import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HelpComponent } from './home/help/help.component';
import { LoginComponent } from './login/login.component';
import { AuthInterceptor } from './login/auth.interceptors';
import { LogoutComponent } from './home/logout/logout.component';
import { UploadComponent } from './upload/upload.component';
 

@NgModule({
  declarations: [   
    AppComponent, HomeComponent, HelpComponent, LoginComponent, LogoutComponent, UploadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PoModule,
    FormsModule,
    PoPageDynamicModule,
    PoPageLoginModule,
    HttpClientModule,
    PoNotificationModule,
    PoDynamicModule,
    PoButtonModule,
    RouterModule.forRoot([]),
    PoTemplatesModule,
    ReactiveFormsModule   
  ],
  
 providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  }],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
