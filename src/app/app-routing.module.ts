import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { EvalComponentModule } from 'projects/eval-component/src/public_api';
//import { EvalComponentModule } from 'eval-component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';

import { HomeComponent } from './pages/home/home.component';

import { AuthenticationComponent } from './components/authentication/authentication.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { PostNewComponent } from './components/post-new/post-new.component';
import { WpPageComponent } from './pages/wp-page/wp-page.component';
import { ListRepliesComponent } from './components/list-replies/list-replies.component';



const routes: Routes = [
  { path: '', children: [
      { path: 'home', component: HomeComponent },
      { path: 'page/:slug', component: WpPageComponent },
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
    EvalComponentModule,
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
    HeaderComponent,
    FooterComponent,
    WpPageComponent,
    ListRepliesComponent
  ]
})
export class AppRoutingModule { }
