import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';

import { HomeComponent } from './pages/home/home.component';

import { AuthenticationComponent } from './components/authentication/authentication.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { PostNewComponent } from './components/post-new/post-new.component';



const routes: Routes = [
  { path: '', children: [
      { path: 'home', component: HomeComponent },
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: '', component: HeaderComponent, outlet: 'header' },
      { path: '', component: FooterComponent, outlet: 'footer' }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ScrollToModule,
    NgbModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule,
    AuthenticationComponent,
    UserListComponent,
    PostNewComponent,
  ],
  declarations: [
    AuthenticationComponent,
    UserListComponent,
    PostNewComponent,
    HomeComponent,
  ]
})
export class AppRoutingModule { }
