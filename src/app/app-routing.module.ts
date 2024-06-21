import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PoPageDynamicDetailComponent, PoPageDynamicEditComponent, PoPageDynamicTableComponent } from '@po-ui/ng-templates';
import { HttpHeaders } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { HelpComponent } from './home/help/help.component';
import { LoginComponent } from './login/login.component';
import { environment } from 'src/environments/environment';
import { LogoutComponent } from './home/logout/logout.component';
import { UploadComponent } from './upload/upload.component';
 
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'exit', component: LogoutComponent },
  { path: 'home', component: HomeComponent },
  { path: 'upload', component: UploadComponent },
  { path: 'checklist', 
    component: PoPageDynamicTableComponent,
    data: {
            serviceApi: `${environment.host}checklist`
          }
  },
  { path: 'checklist/edit/:id', 
  component: PoPageDynamicEditComponent,
  data: {
          serviceApi: `${environment.host}checklist`
        }
  }, 
  { path: 'checklist/new', 
    component: PoPageDynamicEditComponent,
    data: {
            serviceApi: `${environment.host}checklist`
          }
  },
  { path: 'checklist/detail/:id', 
   component: PoPageDynamicDetailComponent,
   data: {
           serviceApi: `${environment.host}checklist`
         } 
  }, 
  { path: 'diario', 
    component: PoPageDynamicTableComponent,
    data: {
            serviceApi: `${environment.host}checklist/diario`
          }
  }, 
  { path: 'help', component: HelpComponent}       
    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }